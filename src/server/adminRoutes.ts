import { Router, Request, Response, NextFunction } from 'express';
import { db } from './db';
import { users, listings, categories, brands, images, productAttributes } from './db/schema';
import { eq, count, sql } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

const adminRouter = Router();

// Configure multer for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Admin Login
adminRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (!user.length || user[0].role !== 'admin') {
      return res.status(401).json({ error: 'Invalid credentials or unauthorized' });
    }

    const isValid = await bcrypt.compare(password, user[0].password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user[0].id, role: user[0].role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user[0].id, name: user[0].name, email: user[0].email } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Middleware for authentication
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

adminRouter.use(isAdmin); // Protect all routes below

// Dashboard Stats
adminRouter.get('/stats', async (req, res) => {
  try {
    const totalListings = await db.select({ count: count() }).from(listings);
    const activeListings = await db.select({ count: count() }).from(listings).where(eq(listings.status, 'published'));
    const lowStock = await db.select({ count: count() }).from(listings).where(sql`${listings.stock} > 0 AND ${listings.stock} <= 5`);
    const outOfStock = await db.select({ count: count() }).from(listings).where(eq(listings.stock, 0));

    res.json({
      totalListings: totalListings[0].count,
      activeListings: activeListings[0].count,
      lowStock: lowStock[0].count,
      outOfStock: outOfStock[0].count,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// --- LISTINGS (PRODUCTS) ---

adminRouter.get('/listings', async (req, res) => {
  try {
    const allListings = await db.select({
      id: listings.id,
      title: listings.title,
      slug: listings.slug,
      sku: listings.sku,
      price: listings.price,
      stock: listings.stock,
      status: listings.status,
      category: categories.name,
      brand: brands.name,
      createdAt: listings.createdAt,
    })
    .from(listings)
    .leftJoin(categories, eq(listings.categoryId, categories.id))
    .leftJoin(brands, eq(listings.brandId, brands.id));

    res.json(allListings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

adminRouter.post('/listings', async (req, res) => {
  try {
    const data = req.body;
    // Basic auto-slug if missing
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    }
    // Set sellerId to current admin for now
    data.sellerId = (req as any).user.id;
    
    // Ensure id is provided or generated
    if (!data.id) {
      data.id = 'l' + Date.now();
    }
    if (!data.location) {
      data.location = 'Online';
    }

    const { attributes, ...listingData } = data;
    
    await db.insert(listings).values({
      ...listingData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (attributes && Array.isArray(attributes)) {
      for (const attr of attributes) {
        await db.insert(productAttributes).values({
          id: 'attr' + Math.random().toString(36).substring(2, 9),
          listingId: listingData.id,
          key: attr.key,
          value: attr.value
        });
      }
    }
    
    res.json({ success: true, id: listingData.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create listing' });
  }
});

adminRouter.put('/listings/:id', async (req, res) => {
  try {
    const { attributes, ...listingData } = req.body;
    listingData.updatedAt = new Date();
    
    await db.update(listings).set(listingData).where(eq(listings.id, req.params.id));
    
    if (attributes && Array.isArray(attributes)) {
      await db.delete(productAttributes).where(eq(productAttributes.listingId, req.params.id));
      for (const attr of attributes) {
        await db.insert(productAttributes).values({
          id: 'attr' + Math.random().toString(36).substring(2, 9),
          listingId: req.params.id,
          key: attr.key,
          value: attr.value
        });
      }
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update listing' });
  }
});

adminRouter.delete('/listings/:id', async (req, res) => {
  try {
    // Soft delete
    await db.update(listings).set({ status: 'archived' }).where(eq(listings.id, req.params.id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete listing' });
  }
});

// --- CATEGORIES ---

adminRouter.get('/categories', async (req, res) => {
  try {
    const all = await db.select().from(categories);
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

adminRouter.post('/categories', async (req, res) => {
  try {
    const data = req.body;
    if (!data.id) data.id = 'c' + Date.now();
    await db.insert(categories).values(data);
    res.json({ success: true, category: data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

adminRouter.put('/categories/:id', async (req, res) => {
  try {
    await db.update(categories).set(req.body).where(eq(categories.id, req.params.id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

adminRouter.delete('/categories/:id', async (req, res) => {
  try {
    await db.delete(categories).where(eq(categories.id, req.params.id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// --- BRANDS ---

adminRouter.get('/brands', async (req, res) => {
  try {
    const all = await db.select().from(brands);
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch brands' });
  }
});

adminRouter.post('/brands', async (req, res) => {
  try {
    const data = req.body;
    if (!data.id) data.id = 'b' + Date.now();
    await db.insert(brands).values(data);
    res.json({ success: true, brand: data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create brand' });
  }
});

adminRouter.put('/brands/:id', async (req, res) => {
  try {
    await db.update(brands).set(req.body).where(eq(brands.id, req.params.id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update brand' });
  }
});

adminRouter.delete('/brands/:id', async (req, res) => {
  try {
    await db.delete(brands).where(eq(brands.id, req.params.id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete brand' });
  }
});

// --- UPLOAD ---

adminRouter.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

export default adminRouter;

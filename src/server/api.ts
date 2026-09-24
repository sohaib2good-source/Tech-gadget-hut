import { Router } from 'express';
import { db } from './db';
import { listings, categories, images, brands } from './db/schema';
import { eq, desc, and, sql } from 'drizzle-orm';

const apiRouter = Router();

// Get Brands
apiRouter.get('/brands', async (req, res) => {
  try {
    const allBrands = await db.select().from(brands);
    res.json(allBrands);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch brands' });
  }
});

// Get Categories
apiRouter.get('/categories', async (req, res) => {
  try {
    const cats = await db.select().from(categories);
    res.json(cats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get Featured/Recent Listings
apiRouter.get('/listings/recent', async (req, res) => {
  try {
    const recentListings = await db.select({
      id: listings.id,
      title: listings.title,
      slug: listings.slug,
      price: listings.price,
      originalPrice: listings.originalPrice,
      condition: listings.condition,
      location: listings.location,
      createdAt: listings.createdAt,
      imageUrl: images.url,
      category: categories.name,
    })
    .from(listings)
    .leftJoin(images, and(eq(listings.id, images.listingId), eq(images.isMain, true)))
    .leftJoin(categories, eq(listings.categoryId, categories.id))
    .where(eq(listings.status, 'published'))
    .orderBy(desc(listings.createdAt))
    .limit(8);
    
    res.json(recentListings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

apiRouter.get('/listings', async (req, res) => {
  try {
    const { q, category, brand, condition, minPrice, maxPrice } = req.query;

    let conditions = [eq(listings.status, 'published')];
    
    if (q) {
      conditions.push(sql`${listings.title} LIKE ${'%' + q + '%'}`);
    }
    if (category) {
      conditions.push(eq(categories.slug, String(category)));
    }
    if (brand) {
      conditions.push(eq(brands.slug, String(brand)));
    }
    if (condition) {
      conditions.push(eq(listings.condition, String(condition)));
    }
    if (minPrice) {
      conditions.push(sql`${listings.price} >= ${Number(minPrice)}`);
    }
    if (maxPrice) {
      conditions.push(sql`${listings.price} <= ${Number(maxPrice)}`);
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const allListings = await db.select({
      id: listings.id,
      title: listings.title,
      slug: listings.slug,
      price: listings.price,
      originalPrice: listings.originalPrice,
      condition: listings.condition,
      createdAt: listings.createdAt,
      imageUrl: images.url,
      category: categories.name,
      brand: brands.name,
    })
    .from(listings)
    .leftJoin(images, and(eq(listings.id, images.listingId), eq(images.isMain, true)))
    .leftJoin(categories, eq(listings.categoryId, categories.id))
    .leftJoin(brands, eq(listings.brandId, brands.id))
    .where(whereClause)
    .orderBy(desc(listings.createdAt));
    
    res.json(allListings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

// Get single listing by slug
apiRouter.get('/listings/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const listingData = await db.select({
      listing: listings,
      category: categories,
      brand: brands,
    })
    .from(listings)
    .leftJoin(categories, eq(listings.categoryId, categories.id))
    .leftJoin(brands, eq(listings.brandId, brands.id))
    .where(and(eq(listings.slug, slug), eq(listings.status, 'published')))
    .limit(1);

    if (!listingData.length) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    const listingImages = await db.select().from(images).where(eq(images.listingId, listingData[0].listing.id)).orderBy(images.order);
    
    res.json({
      ...listingData[0],
      images: listingImages
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listing' });
  }
});

// Checkout handling (simulate email/db store)
apiRouter.post('/checkout', async (req, res) => {
  try {
    const { customer, items, total } = req.body;
    console.log('--- NEW ORDER RECEIVED ---');
    console.log('Customer:', customer);
    console.log('Items:', items);
    console.log('Total: Rs.', total);
    console.log('--------------------------');
    // In a real application, you would send an email here using nodemailer, SendGrid, etc.
    res.json({ success: true, message: 'Order submitted' });
  } catch (error) {
    res.status(500).json({ error: 'Checkout failed' });
  }
});

export default apiRouter;

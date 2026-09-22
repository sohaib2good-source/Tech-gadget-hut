import { db } from './index';
import { users, categories, brands, listings, images } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('Seeding database...');
  
  // Clear existing
  await db.delete(images);
  await db.delete(listings);
  await db.delete(brands);
  await db.delete(categories);
  await db.delete(users);

  // Users
  const hashedPassword = await bcrypt.hash('password123', 10);
  await db.insert(users).values([
    { id: 'u1', email: 'admin@techgadgethut.com', password: hashedPassword, name: 'Admin User', role: 'admin', createdAt: new Date() },
    { id: 'u2', email: 'seller@example.com', password: hashedPassword, name: 'Pro Seller', role: 'seller', createdAt: new Date() },
    { id: 'u3', email: 'buyer@example.com', password: hashedPassword, name: 'Gadget Fan', role: 'user', createdAt: new Date() },
  ]);

  // Categories
  await db.insert(categories).values([
    { id: 'c1', name: 'Laptops', slug: 'laptops', icon: 'Laptop', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600' },
    { id: 'c2', name: 'Mobile Phones', slug: 'mobile-phones', icon: 'Smartphone', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600' },
    { id: 'c3', name: 'Tablets', slug: 'tablets', icon: 'Tablet', imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600' },
    { id: 'c4', name: 'Audio', slug: 'audio', icon: 'Headphones', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600' },
    { id: 'c5', name: 'Smartwatches', slug: 'smartwatches', icon: 'Watch', imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600' },
    { id: 'c6', name: 'Gaming', slug: 'gaming', icon: 'Gamepad', imageUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=600' },
  ]);

  // Brands
  await db.insert(brands).values([
    { id: 'b1', name: 'Apple', slug: 'apple' },
    { id: 'b2', name: 'Samsung', slug: 'samsung' },
    { id: 'b3', name: 'Sony', slug: 'sony' },
    { id: 'b4', name: 'Dell', slug: 'dell' },
  ]);

  // Listings
  await db.insert(listings).values([
    {
      id: 'l1',
      title: 'MacBook Pro 16" M3 Max',
      slug: 'macbook-pro-16-m3-max',
      categoryId: 'c1',
      brandId: 'b1',
      price: 2499.00,
      originalPrice: 3499.00,
      condition: 'Like New',
      description: 'Barely used MacBook Pro 16-inch with M3 Max chip. 36GB RAM, 1TB SSD.',
      sellerId: 'u2',
      location: 'San Francisco, CA',
      status: 'published',
      stock: 10,
      sku: 'MAC-16-M3',
      views: 120,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'l2',
      title: 'Samsung Galaxy S24 Ultra 512GB',
      slug: 'samsung-galaxy-s24-ultra-512gb',
      categoryId: 'c2',
      brandId: 'b2',
      price: 999.00,
      condition: 'Excellent',
      description: 'Unlocked Galaxy S24 Ultra in Titanium Gray. Comes with original box and cable.',
      sellerId: 'u2',
      location: 'Austin, TX',
      status: 'published',
      stock: 5,
      sku: 'SAM-S24-ULTRA',
      views: 85,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'l3',
      title: 'Sony WH-1000XM5 Wireless Headphones',
      slug: 'sony-wh-1000xm5',
      categoryId: 'c4',
      brandId: 'b3',
      price: 249.99,
      originalPrice: 398.00,
      condition: 'Refurbished',
      description: 'Manufacturer refurbished Sony headphones. Perfect working condition. Industry-leading noise cancellation.',
      sellerId: 'u2',
      location: 'New York, NY',
      status: 'published',
      stock: 0,
      sku: 'SONY-WH-1000XM5',
      views: 230,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);

  // Images
  await db.insert(images).values([
    { id: 'i1', listingId: 'l1', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000', isMain: true, order: 0 },
    { id: 'i2', listingId: 'l2', url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=1000', isMain: true, order: 0 },
    { id: 'i3', listingId: 'l3', url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1000', isMain: true, order: 0 },
  ]);

  console.log('Seeding complete!');
}

seed().catch(console.error);

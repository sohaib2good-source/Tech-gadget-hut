import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull().default('user'), // 'user', 'seller', 'admin'
  avatar: text('avatar'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  icon: text('icon'),
  imageUrl: text('image_url'),
  parentId: text('parent_id'),
});

export const brands = sqliteTable('brands', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  logo: text('logo'),
});

export const listings = sqliteTable('listings', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  sku: text('sku').unique(), // New field for Admin
  categoryId: text('category_id').notNull().references(() => categories.id),
  brandId: text('brand_id').references(() => brands.id),
  price: real('price').notNull(),
  originalPrice: real('original_price'),
  stock: integer('stock').notNull().default(0), // New field for Admin
  condition: text('condition').notNull(), // 'New', 'Like New', 'Excellent', 'Good', 'Fair', 'Refurbished'
  description: text('description').notNull(),
  sellerId: text('seller_id').notNull().references(() => users.id),
  location: text('location').notNull(),
  status: text('status').notNull().default('published'), // 'draft', 'pending', 'published', 'sold', 'archived', 'hidden', 'out_of_stock'
  views: integer('views').notNull().default(0),
  color: text('color'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const productAttributes = sqliteTable('product_attributes', {
  id: text('id').primaryKey(),
  listingId: text('listing_id').notNull().references(() => listings.id, { onDelete: 'cascade' }),
  key: text('key').notNull(),
  value: text('value').notNull(),
});

export const images = sqliteTable('images', {
  id: text('id').primaryKey(),
  listingId: text('listing_id').notNull().references(() => listings.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  isMain: integer('is_main', { mode: 'boolean' }).notNull().default(false),
  order: integer('order').notNull().default(0),
});

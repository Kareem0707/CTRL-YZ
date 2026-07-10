-- 1. Create Products Table
CREATE TABLE products (
  id text PRIMARY KEY,
  name text NOT NULL,
  price numeric NOT NULL,
  description text,
  image text,
  "isBestSeller" boolean DEFAULT false
);

-- 2. Create Orders Table
CREATE TABLE orders (
  id text PRIMARY KEY,
  "customerName" text NOT NULL,
  email text,
  phone text NOT NULL,
  address text NOT NULL,
  "paymentMethod" text NOT NULL,
  "receiptImage" text,
  total numeric NOT NULL,
  status text DEFAULT 'pending',
  items jsonb NOT NULL,
  "createdAt" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Set up Row Level Security (RLS) - Allow public read/write for now to make it easy
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public insert to products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to products" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow public delete to products" ON products FOR DELETE USING (true);

CREATE POLICY "Allow public read access to orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert to orders" ON orders FOR INSERT WITH CHECK (true);

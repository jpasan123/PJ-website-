/*
  # Add Product Likes Table

  1. New Tables
    - `product_likes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `product_id` (uuid)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `product_likes` table
    - Add policies for authenticated users to:
      - Read their own likes
      - Add new likes
      - Remove their likes
*/

-- Create Product Likes Table
CREATE TABLE IF NOT EXISTS product_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  product_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable Row Level Security
ALTER TABLE product_likes ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can read own likes"
  ON product_likes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add likes"
  ON product_likes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own likes"
  ON product_likes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS product_likes_user_id_idx ON product_likes(user_id);
CREATE INDEX IF NOT EXISTS product_likes_product_id_idx ON product_likes(product_id);
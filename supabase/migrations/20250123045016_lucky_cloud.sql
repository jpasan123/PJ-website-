/*
  # Add Admin User

  1. Changes
    - Add admin role to an existing user
    - Set up admin permissions

  2. Security
    - Only admins can access admin features
*/

-- Update an existing user to be an admin (using the email you want to use)
UPDATE users 
SET role = 'admin'
WHERE email = 'john@example.com';

-- Ensure admin role is properly set
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM users 
    WHERE role = 'admin' 
    LIMIT 1
  ) THEN
    RAISE EXCEPTION 'No admin user was created';
  END IF;
END $$;
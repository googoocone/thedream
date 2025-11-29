-- Add is_subscribed column to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS is_subscribed BOOLEAN DEFAULT FALSE;

-- Update existing users to have false by default (optional, as default handles it for new rows, but good for existing)
UPDATE users SET is_subscribed = FALSE WHERE is_subscribed IS NULL;

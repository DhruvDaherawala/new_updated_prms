-- Add status column to renters table
ALTER TABLE renters ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'Active';

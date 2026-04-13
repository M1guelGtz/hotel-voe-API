-- Migration: Add fcm_token column to employees table
-- Run this on your MySQL database

ALTER TABLE employees
  ADD COLUMN fcm_token TEXT NULL AFTER password;

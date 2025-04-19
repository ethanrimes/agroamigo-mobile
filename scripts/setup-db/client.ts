/**
 * This file provides a wrapper around the supabase client
 * It's useful when you need to execute custom SQL statements
 * Since the client from your main application might not have
 * all the necessary methods for database setup
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Try to get the Supabase URL and key from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase environment variables.');
  console.error('Please ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env file.');
  process.exit(1);
}

// Create a Supabase client with the service role key for admin privileges
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Verify the connection
const verifyConnection = async (): Promise<boolean> => {
  try {
    // Try to fetch a simple query to verify the connection
    const { data, error } = await supabase
      .from('pg_tables')
      .select('tablename')
      .limit(1);
    
    if (error) {
      console.error('Error connecting to Supabase:', error);
      return false;
    }
    
    console.log('Successfully connected to Supabase!');
    return true;
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
    return false;
  }
};

// Apply custom SQL function that's needed for our utils
const setupCustomFunctions = async (): Promise<boolean> => {
  try {
    console.log('Setting up custom SQL functions...');
    
    // Create a function to execute arbitrary SQL
    // This is useful for creating tables with complex constraints
    const { error } = await supabase.rpc('exec_sql', { sql: `
      CREATE OR REPLACE FUNCTION exec_sql(sql text) RETURNS void AS $$
      BEGIN
        EXECUTE sql;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `});
    
    if (error) {
      // If the function already exists, that's fine
      if (error.message.includes('already exists')) {
        console.log('Custom SQL functions already exist. Skipping setup.');
        return true;
      }
      
      console.error('Error setting up custom SQL functions:', error);
      return false;
    }
    
    console.log('Custom SQL functions set up successfully!');
    return true;
  } catch (error) {
    console.error('Error setting up custom SQL functions:', error);
    return false;
  }
};

// Initialize connection and setup
const initializeClient = async (): Promise<boolean> => {
  const connected = await verifyConnection();
  
  if (!connected) {
    return false;
  }
  
  return await setupCustomFunctions();
};

// Export the client and initialization function
export { supabase, initializeClient };
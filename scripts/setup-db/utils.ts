import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { SupabaseClient } from '@supabase/supabase-js';
import { TableSchema } from './types';

// Import the supabase client from your existing project
import { supabase, initializeClient } from './client';

// Initialize the Supabase client
export { supabase, initializeClient };

/**
 * Read data from a CSV file
 */
export const readCsvFile = <T>(filename: string): T[] => {
  try {
    const dataDir = path.join(__dirname, '../../data');
    const filePath = path.join(dataDir, filename);
    
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return [];
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as T[];
  } catch (error) {
    console.error(`Error reading CSV file ${filename}:`, error);
    return [];
  }
};

/**
 * Build a CREATE TABLE SQL statement from a table schema
 */
export const buildCreateTableSQL = (schema: TableSchema): string => {
  const columnsSQL = schema.columns
    .map(col => {
      let colDef = `"${col.name}" ${col.type}`;
      
      if (col.name === schema.primaryKey) {
        colDef += ' PRIMARY KEY';
      }
      
      if (col.nullable === false) {
        colDef += ' NOT NULL';
      }
      
      if (col.defaultValue) {
        colDef += ` DEFAULT ${col.defaultValue}`;
      }
      
      return colDef;
    })
    .join(',\n  ');
  
  let foreignKeysSQL = '';
  
  if (schema.foreignKeys && schema.foreignKeys.length > 0) {
    foreignKeysSQL = ',\n  ' + schema.foreignKeys
      .map(fk => `FOREIGN KEY ("${fk.column}") REFERENCES "${fk.references.table}"("${fk.references.column}")`)
      .join(',\n  ');
  }
  
  return `CREATE TABLE IF NOT EXISTS "${schema.name}" (\n  ${columnsSQL}${foreignKeysSQL}\n);`;
};

/**
 * Create a table using the Supabase client
 */
export const createTable = async (
  client: SupabaseClient,
  schema: TableSchema
): Promise<boolean> => {
  try {
    console.log(`Creating table: ${schema.name}`);
    
    const sql = buildCreateTableSQL(schema);
    console.log(`SQL: ${sql}`);
    
    const { error } = await client.rpc('exec_sql', { sql });
    
    if (error) {
      console.error(`Error creating table ${schema.name}:`, error);
      return false;
    }
    
    console.log(`Successfully created table: ${schema.name}`);
    return true;
  } catch (error) {
    console.error(`Error creating table ${schema.name}:`, error);
    return false;
  }
};

/**
 * Insert data into a table
 */
export const insertData = async <T>(
  client: SupabaseClient,
  tableName: string,
  data: T[]
): Promise<boolean> => {
  try {
    if (data.length === 0) {
      console.warn(`No data to insert into table ${tableName}`);
      return true;
    }
    
    console.log(`Inserting ${data.length} rows into table: ${tableName}`);
    
    // Supabase has a limit on how many rows can be inserted at once
    // We'll chunk the data into batches of 1000 rows
    const batchSize = 1000;
    const batches = [];
    
    for (let i = 0; i < data.length; i += batchSize) {
      batches.push(data.slice(i, i + batchSize));
    }
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`Inserting batch ${i + 1}/${batches.length} (${batch.length} rows) into ${tableName}`);
      
      const { error } = await client
        .from(tableName)
        .insert(batch);
      
      if (error) {
        console.error(`Error inserting data into table ${tableName} (batch ${i + 1}):`, error);
        return false;
      }
    }
    
    console.log(`Successfully inserted ${data.length} rows into table: ${tableName}`);
    return true;
  } catch (error) {
    console.error(`Error inserting data into table ${tableName}:`, error);
    return false;
  }
};

/**
 * Check if a table exists in the database
 */
export const tableExists = async (
  client: SupabaseClient,
  tableName: string
): Promise<boolean> => {
  try {
    const { data, error } = await client
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', tableName);
    
    if (error) {
      console.error(`Error checking if table ${tableName} exists:`, error);
      return false;
    }
    
    return data && data.length > 0;
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
};

/**
 * Drop a table if it exists
 */
export const dropTable = async (
  client: SupabaseClient,
  tableName: string
): Promise<boolean> => {
  try {
    console.log(`Dropping table if exists: ${tableName}`);
    
    const sql = `DROP TABLE IF EXISTS "${tableName}" CASCADE;`;
    const { error } = await client.rpc('exec_sql', { sql });
    
    if (error) {
      console.error(`Error dropping table ${tableName}:`, error);
      return false;
    }
    
    console.log(`Successfully dropped table: ${tableName}`);
    return true;
  } catch (error) {
    console.error(`Error dropping table ${tableName}:`, error);
    return false;
  }
};
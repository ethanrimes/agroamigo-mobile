import createAllTables from './createTables';
import importAllData from './importData';

/**
 * Main script to set up the database
 * This script will:
 * 1. Create all tables
 * 2. Import all data
 */
const setupDatabase = async (options: {
  dropExisting?: boolean;
  skipImport?: boolean;
}): Promise<boolean> => {
  try {
    console.log('Starting database setup...');
    console.log('Environment:', process.env.NODE_ENV || 'development');
    
    // Create tables
    console.log('\n--- CREATING TABLES ---');
    const tableResults = await createAllTables(options.dropExisting);
    
    if (!tableResults.every(r => r.created)) {
      console.error('Failed to create all tables. Aborting setup.');
      return false;
    }
    
    console.log('All tables created successfully.');
    
    // Skip data import if requested
    if (options.skipImport) {
      console.log('Skipping data import as requested.');
      return true;
    }
    
    // Import data
    console.log('\n--- IMPORTING DATA ---');
    const { success } = await importAllData(false); // false because we already created tables
    
    if (!success) {
      console.error('Failed to import all data.');
      return false;
    }
    
    console.log('All data imported successfully.');
    console.log('\nDatabase setup completed successfully!');
    return true;
  } catch (error) {
    console.error('Error setting up database:', error);
    return false;
  }
};

// Execute the script if run directly
if (require.main === module) {
  (async () => {
    try {
      const options = {
        dropExisting: process.argv.includes('--drop') || process.argv.includes('-d'),
        skipImport: process.argv.includes('--no-import') || process.argv.includes('-n')
      };
      
      console.log(`Options:
- Drop existing tables: ${options.dropExisting ? 'YES' : 'NO'}
- Skip data import: ${options.skipImport ? 'YES' : 'NO'}
`);
      
      const success = await setupDatabase(options);
      
      if (success) {
        console.log('Database setup completed successfully!');
        process.exit(0);
      } else {
        console.error('Database setup failed.');
        process.exit(1);
      }
    } catch (error) {
      console.error('Error running database setup:', error);
      process.exit(1);
    }
  })();
}

export default setupDatabase;
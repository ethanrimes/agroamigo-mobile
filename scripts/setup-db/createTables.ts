import { TableSchema, TableStatus } from './types';
import { supabase, createTable, dropTable, initializeClient } from './utils';

// Define all table schemas
const tableSchemas: TableSchema[] = [
  // Departamento table
  {
    name: 'Departamento',
    columns: [
      { name: 'CodDepartamento', type: 'INT', nullable: false },
      { name: 'Departamento', type: 'VARCHAR(255)', nullable: false }
    ],
    primaryKey: 'CodDepartamento'
  },
  
  // Municipio table
  {
    name: 'Municipio',
    columns: [
      { name: 'CodMunicipio', type: 'INT', nullable: false },
      { name: 'Municipio', type: 'VARCHAR(255)', nullable: false },
      { name: 'CodDepartamento', type: 'INT', nullable: false },
      { name: 'Departamento', type: 'VARCHAR(255)', nullable: false }
    ],
    foreignKeys: [
      {
        column: 'CodDepartamento',
        references: {
          table: 'Departamento',
          column: 'CodDepartamento'
        }
      }
    ],
    primaryKey: 'CodMunicipio'
  },
  
  // Mercado table
  {
    name: 'Mercado',
    columns: [
      { name: 'fuenId', type: 'INT', nullable: false },
      { name: 'Mercado', type: 'VARCHAR(255)', nullable: false },
      { name: 'CodMunicipio', type: 'INT', nullable: false },
      { name: 'Municipio', type: 'VARCHAR(255)', nullable: false },
      { name: 'CodDepartamento', type: 'INT', nullable: false },
      { name: 'Departamento', type: 'VARCHAR(255)', nullable: false }
    ],
    foreignKeys: [
      {
        column: 'CodMunicipio',
        references: {
          table: 'Municipio',
          column: 'CodMunicipio'
        }
      },
      {
        column: 'CodDepartamento',
        references: {
          table: 'Departamento',
          column: 'CodDepartamento'
        }
      }
    ],
    primaryKey: 'fuenId'
  },
  
  // MajorCategory table
  {
    name: 'MajorCategory',
    columns: [
      { name: 'MajorCategoryId', type: 'INT', nullable: false },
      { name: 'MajorCategory', type: 'VARCHAR(255)', nullable: false }
    ],
    primaryKey: 'MajorCategoryId'
  },
  
  // Subcategory table
  {
    name: 'Subcategory',
    columns: [
      { name: 'Subcategory_Id', type: 'INT', nullable: false },
      { name: 'Subcategory', type: 'VARCHAR(255)', nullable: false },
      { name: 'MajorCategoryId', type: 'INT', nullable: false }
    ],
    foreignKeys: [
      {
        column: 'MajorCategoryId',
        references: {
          table: 'MajorCategory',
          column: 'MajorCategoryId'
        }
      }
    ],
    primaryKey: 'Subcategory_Id'
  },
  
  // Producto table
  {
    name: 'Producto',
    columns: [
      { name: 'artiId', type: 'INT', nullable: false },
      { name: 'artiNombre', type: 'VARCHAR(255)', nullable: false },
      { name: 'keystring', type: 'VARCHAR(255)', nullable: false },
      { name: 'MajorCategoryId', type: 'INT', nullable: false },
      { name: 'SubcategoryId', type: 'INT', nullable: false },
      { name: 'icon', type: 'VARCHAR(255)', nullable: true }
    ],
    foreignKeys: [
      {
        column: 'MajorCategoryId',
        references: {
          table: 'MajorCategory',
          column: 'MajorCategoryId'
        }
      },
      {
        column: 'SubcategoryId',
        references: {
          table: 'Subcategory',
          column: 'Subcategory_Id'
        }
      }
    ],
    primaryKey: 'artiId'
  },
  
  // Presentation table
  {
    name: 'Presentation',
    columns: [
      { name: 'PresentationId', type: 'INT', nullable: false },
      { name: 'Presentation', type: 'VARCHAR(255)', nullable: false }
    ],
    primaryKey: 'PresentationId'
  },
  
  // Units table
  {
    name: 'Units',
    columns: [
      { name: 'UnitsId', type: 'INT', nullable: false },
      { name: 'Units', type: 'VARCHAR(255)', nullable: false },
      { name: 'Kilogramos', type: 'INT', nullable: false }
    ],
    primaryKey: 'UnitsId'
  },
  
  // DailyProductPriceObservation table
  {
    name: 'DailyProductPriceObservation',
    columns: [
      { name: 'dailyPriceObsId', type: 'INT', nullable: false },
      { name: 'minPrice', type: 'INT', nullable: false },
      { name: 'maxPrice', type: 'INT', nullable: false },
      { name: 'artiId', type: 'INT', nullable: false },
      { name: 'SubcategoryId', type: 'INT', nullable: false },
      { name: 'MajorCategoryId', type: 'INT', nullable: false },
      { name: 'fuenId', type: 'INT', nullable: false },
      { name: 'CodMunicipio', type: 'INT', nullable: false },
      { name: 'CodDepartamento', type: 'INT', nullable: false },
      { name: 'PresentationId', type: 'INT', nullable: false },
      { name: 'UnitsId', type: 'INT', nullable: false },
      { name: 'date', type: 'DATE', defaultValue: 'CURRENT_DATE', nullable: true }
    ],
    foreignKeys: [
      {
        column: 'artiId',
        references: {
          table: 'Producto',
          column: 'artiId'
        }
      },
      {
        column: 'SubcategoryId',
        references: {
          table: 'Subcategory',
          column: 'Subcategory_Id'
        }
      },
      {
        column: 'MajorCategoryId',
        references: {
          table: 'MajorCategory',
          column: 'MajorCategoryId'
        }
      },
      {
        column: 'fuenId',
        references: {
          table: 'Mercado',
          column: 'fuenId'
        }
      },
      {
        column: 'CodMunicipio',
        references: {
          table: 'Municipio',
          column: 'CodMunicipio'
        }
      },
      {
        column: 'CodDepartamento',
        references: {
          table: 'Departamento',
          column: 'CodDepartamento'
        }
      },
      {
        column: 'PresentationId',
        references: {
          table: 'Presentation',
          column: 'PresentationId'
        }
      },
      {
        column: 'UnitsId',
        references: {
          table: 'Units',
          column: 'UnitsId'
        }
      }
    ],
    primaryKey: 'dailyPriceObsId'
  }
];

/**
 * Create all tables
 */
export const createAllTables = async (dropExisting: boolean = false): Promise<TableStatus[]> => {
    console.log('Creating tables...');
    
    // Initialize the client first
    console.log('Initializing Supabase client...');
    const initialized = await initializeClient();
    
    if (!initialized) {
      console.error('Failed to initialize Supabase client. Aborting.');
      return tableSchemas.map(schema => ({
        name: schema.name,
        created: false,
        error: 'Failed to initialize Supabase client'
      }));
    }
    
    const results: TableStatus[] = [];
  
  // Create tables in order (respecting dependencies)
  for (const schema of tableSchemas) {
    console.log(`Processing table: ${schema.name}`);
    
    if (dropExisting) {
      await dropTable(supabase, schema.name);
    }
    
    const success = await createTable(supabase, schema);
    
    results.push({
      name: schema.name,
      created: success
    });
    
    if (!success) {
      console.error(`Failed to create table: ${schema.name}`);
    }
  }
  
  return results;
};

// Execute the script if run directly
if (require.main === module) {
  (async () => {
    try {
      console.log('Starting table creation...');
      
      // Ask if we should drop existing tables
      const dropExisting = process.argv.includes('--drop') || process.argv.includes('-d');
      
      if (dropExisting) {
        console.log('Will drop existing tables before creating new ones.');
      }
      
      const results = await createAllTables(dropExisting);
      
      // Print results
      console.log('\nTable creation results:');
      results.forEach(({ name, created }) => {
        console.log(`- ${name}: ${created ? 'SUCCESS' : 'FAILED'}`);
      });
      
      const successCount = results.filter(r => r.created).length;
      console.log(`\nSuccessfully created ${successCount} out of ${results.length} tables.`);
      
      if (successCount === results.length) {
        console.log('All tables created successfully!');
      } else {
        console.error('Some tables failed to create. Check the logs for details.');
        process.exit(1);
      }
    } catch (error) {
      console.error('Error creating tables:', error);
      process.exit(1);
    }
  })();
}

export default createAllTables;
import {
    Departamento,
    Municipio,
    Mercado,
    MajorCategory,
    Subcategory,
    Producto,
    Presentation,
    Unit,
    DailyProductPriceObservation
  } from './types';
  
  import { supabase, readCsvFile, insertData, tableExists } from './utils';
  import createAllTables from './createTables';
  
  // Define the import functions for each table
  const importDepartamentos = async (): Promise<boolean> => {
    try {
      console.log('Importing Departamentos...');
      const rawData = readCsvFile<any>('Departamento.csv');
      
      if (!rawData.length) {
        console.error('No Departamento data found');
        return false;
      }
      
      // Convert CSV data to the correct types
      const data: Departamento[] = rawData.map(row => ({
        CodDepartamento: parseInt(row.CodDepartamento),
        Departamento: row.Departamento,
      }));
      
      return await insertData(supabase, 'Departamento', data);
    } catch (error) {
      console.error('Error importing Departamentos:', error);
      return false;
    }
  };
  
  const importMunicipios = async (): Promise<boolean> => {
    try {
      console.log('Importing Municipios...');
      const rawData = readCsvFile<any>('Municipio.csv');
      
      if (!rawData.length) {
        console.error('No Municipio data found');
        return false;
      }
      
      // Convert CSV data to the correct types
      const data: Municipio[] = rawData.map(row => ({
        CodMunicipio: parseInt(row.CodMunicipio),
        Municipio: row.Municipio,
        CodDepartamento: parseInt(row.CodDepartamento),
        Departamento: row.Departamento,
      }));
      
      return await insertData(supabase, 'Municipio', data);
    } catch (error) {
      console.error('Error importing Municipios:', error);
      return false;
    }
  };
  
  const importMercados = async (): Promise<boolean> => {
    try {
      console.log('Importing Mercados...');
      const rawData = readCsvFile<any>('Mercado.csv');
      
      if (!rawData.length) {
        console.error('No Mercado data found');
        return false;
      }
      
      // Convert CSV data to the correct types
      const data: Mercado[] = rawData.map(row => ({
        fuenId: parseInt(row.fuenId),
        Mercado: row.Mercado,
        CodMunicipio: parseInt(row.CodMunicipio),
        Municipio: row.Municipio,
        CodDepartamento: parseInt(row.CodDepartamento),
        Departamento: row.Departamento,
      }));
      
      return await insertData(supabase, 'Mercado', data);
    } catch (error) {
      console.error('Error importing Mercados:', error);
      return false;
    }
  };
  
  const importMajorCategories = async (): Promise<boolean> => {
    try {
      console.log('Importing MajorCategories...');
      const rawData = readCsvFile<any>('MajorCategory.csv');
      
      if (!rawData.length) {
        console.error('No MajorCategory data found');
        return false;
      }
      
      // Convert CSV data to the correct types
      const data: MajorCategory[] = rawData.map(row => ({
        MajorCategoryId: parseInt(row.MajorCategoryId),
        MajorCategory: row.MajorCategory,
      }));
      
      return await insertData(supabase, 'MajorCategory', data);
    } catch (error) {
      console.error('Error importing MajorCategories:', error);
      return false;
    }
  };
  
  const importSubcategories = async (): Promise<boolean> => {
    try {
      console.log('Importing Subcategories...');
      const rawData = readCsvFile<any>('Subcategory.csv');
      
      if (!rawData.length) {
        console.error('No Subcategory data found');
        return false;
      }
      
      // Convert CSV data to the correct types
      const data: Subcategory[] = rawData.map(row => ({
        Subcategory_Id: parseInt(row.Subcategory_Id),
        Subcategory: row.Subcategory,
        MajorCategoryId: parseInt(row.MajorCategoryId),
      }));
      
      return await insertData(supabase, 'Subcategory', data);
    } catch (error) {
      console.error('Error importing Subcategories:', error);
      return false;
    }
  };
  
  const importProductos = async (): Promise<boolean> => {
    try {
      console.log('Importing Productos...');
      const rawData = readCsvFile<any>('Producto.csv');
      
      if (!rawData.length) {
        console.error('No Producto data found');
        return false;
      }
      
      // Convert CSV data to the correct types
      const data: Producto[] = rawData.map(row => ({
        artiId: parseInt(row.artiId),
        artiNombre: row.artiNombre,
        keystring: row.keystring,
        MajorCategoryId: parseInt(row.MajorCategoryId),
        SubcategoryId: parseInt(row.SubcategoryId),
        icon: row.icon || null,
      }));
      
      return await insertData(supabase, 'Producto', data);
    } catch (error) {
      console.error('Error importing Productos:', error);
      return false;
    }
  };
  
  const importPresentations = async (): Promise<boolean> => {
    try {
      console.log('Importing Presentations...');
      const rawData = readCsvFile<any>('Presentation.csv');
      
      if (!rawData.length) {
        console.error('No Presentation data found');
        return false;
      }
      
      // Convert CSV data to the correct types
      const data: Presentation[] = rawData.map(row => ({
        PresentationId: parseInt(row.PresentationId),
        Presentation: row.Presentation,
      }));
      
      return await insertData(supabase, 'Presentation', data);
    } catch (error) {
      console.error('Error importing Presentations:', error);
      return false;
    }
  };
  
  const importUnits = async (): Promise<boolean> => {
    try {
      console.log('Importing Units...');
      const rawData = readCsvFile<any>('Units.csv');
      
      if (!rawData.length) {
        console.error('No Units data found');
        return false;
      }
      
      // Convert CSV data to the correct types
      const data: Unit[] = rawData.map(row => ({
        UnitsId: parseInt(row.UnitsId),
        Units: row.Units,
        Kilogramos: parseInt(row.Kilogramos),
      }));
      
      return await insertData(supabase, 'Units', data);
    } catch (error) {
      console.error('Error importing Units:', error);
      return false;
    }
  };
  
  const importDailyPriceObservations = async (): Promise<boolean> => {
    try {
      console.log('Importing DailyProductPriceObservations...');
      const rawData = readCsvFile<any>('DailyProductPriceObservation.csv');
      
      if (!rawData.length) {
        console.error('No DailyProductPriceObservation data found');
        return false;
      }
      
      // Convert CSV data to the correct types
      const data: DailyProductPriceObservation[] = rawData.map(row => ({
        dailyPriceObsId: parseInt(row.dailyPriceObsId),
        minPrice: parseInt(row.minPrice),
        maxPrice: parseInt(row.maxPrice),
        artiId: parseInt(row.artiId),
        SubcategoryId: parseInt(row.SubcategoryId),
        MajorCategoryId: parseInt(row.MajorCategoryId),
        fuenId: parseInt(row.fuenId),
        CodMunicipio: parseInt(row.CodMunicipio),
        CodDepartamento: parseInt(row.CodDepartamento),
        PresentationId: parseInt(row.PresentationId),
        UnitsId: parseInt(row.UnitsId),
        date: row.date || undefined,
      }));
      
      return await insertData(supabase, 'DailyProductPriceObservation', data);
    } catch (error) {
      console.error('Error importing DailyProductPriceObservations:', error);
      return false;
    }
  };
  
  /**
   * Import all data in the correct order
   */
  export const importAllData = async (createTablesFirst: boolean = true): Promise<{
    success: boolean;
    results: Record<string, boolean>;
  }> => {
    try {
      console.log('Starting data import process...');
      
      // Create tables first if requested
      if (createTablesFirst) {
        console.log('Creating tables before importing data...');
        const tableResults = await createAllTables(true);
        
        if (!tableResults.every(r => r.created)) {
          console.error('Failed to create all tables. Aborting data import.');
          return {
            success: false,
            results: {}
          };
        }
      }
      
      // Import data in correct order (respecting foreign key constraints)
      const importResults: Record<string, boolean> = {};
      
      // Define the import functions and their order
      const importFunctions = [
        { name: 'Departamento', fn: importDepartamentos },
        { name: 'Municipio', fn: importMunicipios },
        { name: 'Mercado', fn: importMercados },
        { name: 'MajorCategory', fn: importMajorCategories },
        { name: 'Subcategory', fn: importSubcategories },
        { name: 'Producto', fn: importProductos },
        { name: 'Presentation', fn: importPresentations },
        { name: 'Units', fn: importUnits },
        { name: 'DailyProductPriceObservation', fn: importDailyPriceObservations }
      ];
      
      // Execute each import function in order
      for (const { name, fn } of importFunctions) {
        console.log(`Importing ${name}...`);
        importResults[name] = await fn();
        
        if (!importResults[name]) {
          console.error(`Failed to import ${name} data.`);
        }
      }
      
      // Check if all imports were successful
      const allSuccessful = Object.values(importResults).every(Boolean);
      
      if (allSuccessful) {
        console.log('All data imported successfully!');
      } else {
        console.error('Some data imports failed. Check the logs for details.');
      }
      
      return {
        success: allSuccessful,
        results: importResults
      };
    } catch (error) {
      console.error('Error importing data:', error);
      return {
        success: false,
        results: {}
      };
    }
  };
  
  // Execute the script if run directly
  if (require.main === module) {
    (async () => {
      try {
        console.log('Starting data import process...');
        
        // Check if we should create tables first
        const skipTableCreation = process.argv.includes('--skip-tables') || process.argv.includes('-s');
        
        const { success, results } = await importAllData(!skipTableCreation);
        
        // Print results
        console.log('\nImport results:');
        Object.entries(results).forEach(([table, success]) => {
          console.log(`- ${table}: ${success ? 'SUCCESS' : 'FAILED'}`);
        });
        
        if (success) {
          console.log('\nAll data imported successfully!');
          process.exit(0);
        } else {
          console.error('\nSome data imports failed. Check the logs for details.');
          process.exit(1);
        }
      } catch (error) {
        console.error('Error running import script:', error);
        process.exit(1);
      }
    })();
  }
  
  export default importAllData;
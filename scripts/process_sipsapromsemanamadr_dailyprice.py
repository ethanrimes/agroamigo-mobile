import pandas as pd
import os
from tqdm import tqdm

# Define file paths
source_file = '/Users/ethankallett/Documents/Projects/AgroAmigo_DataScraping/ServicioWeb/csv/promediosSipsaSemanaMadr.csv'
product_file = '/Users/ethankallett/Documents/Projects/agro-amigo-expolaunch/agro-amigo/data/Producto.csv'
market_file = '/Users/ethankallett/Documents/Projects/agro-amigo-expolaunch/agro-amigo/data/Mercado.csv'
output_dir = '/Users/ethankallett/Documents/Projects/AgroAmigo_DataScraping/ServicioWeb/FormattedDailyPriceObs'

def main():
    # Load reference data
    print("Loading reference data...")
    producto_df = pd.read_csv(product_file)
    producto_df = producto_df[['artiId', 'SubcategoryId', 'MajorCategoryId']]
    
    mercado_df = pd.read_csv(market_file)
    mercado_df = mercado_df[['fuenId', 'CodMunicipio', 'CodDepartamento']]
    
    # Get output filename
    file_name = os.path.basename(source_file)
    output_path = os.path.join(output_dir, f"transformed_{file_name}")
    
    # Make sure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    try:
        # Load the source data
        print(f"Loading source data from {source_file}...")
        df = pd.read_csv(source_file)
        
        # Skip if empty
        if df.empty:
            print("Source file is empty. Exiting.")
            return
            
        # Ensure expected columns exist
        required_cols = ['artiId', 'minimoKg', 'maximoKg', 'fuenId']
        if not all(col in df.columns for col in required_cols):
            missing_cols = [col for col in required_cols if col not in df.columns]
            print(f"Source file missing required columns: {missing_cols}. Exiting.")
            return
        
        print("Joining with reference data...")
        # Join with reference data
        df = df.merge(producto_df, on='artiId', how='left')
        df = df.merge(mercado_df, on='fuenId', how='left')
        
        # Add constant columns
        df['PresentationId'] = 1
        df['UnitsId'] = 1
        
        # Create unique IDs
        num_rows = len(df)
        df['dailyPriceObsId'] = range(1, num_rows + 1)
        
        # Select and rename columns
        result_df = df[[
            'dailyPriceObsId', 
            'minimoKg', 
            'maximoKg', 
            'artiId', 
            'SubcategoryId', 
            'MajorCategoryId', 
            'fuenId', 
            'CodMunicipio', 
            'CodDepartamento', 
            'PresentationId', 
            'UnitsId'
        ]].rename(columns={
            'minimoKg': 'minPrice',
            'maximoKg': 'maxPrice'
        })
        
        # Handle potential missing values in the joined columns
        for col in ['SubcategoryId', 'MajorCategoryId', 'CodMunicipio', 'CodDepartamento']:
            if result_df[col].isna().any():
                print(f"Warning: Found {result_df[col].isna().sum()} missing values in {col}")
                # Fill missing values with -1 or appropriate default
                result_df[col] = result_df[col].fillna(-1).astype(int)
                
        # Ensure all columns are integers
        for col in result_df.columns:
            if col in ['minPrice', 'maxPrice']:
                # These might be floats, so convert carefully
                result_df[col] = result_df[col].fillna(0).astype(float).astype(int)
            else:
                result_df[col] = result_df[col].fillna(0).astype(int)
        
        # Save the transformed data
        result_df.to_csv(output_path, index=False)
        print(f"Successfully processed data and saved to {output_path}")
        print(f"Transformed {num_rows} rows of data")
        
    except Exception as e:
        print(f"Error processing data: {str(e)}")
    
    print("Processing complete!")

if __name__ == "__main__":
    main()
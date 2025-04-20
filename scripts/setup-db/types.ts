// Common types for database setup scripts

export interface TableSchema {
    name: string;
    columns: Column[];
    foreignKeys?: ForeignKey[];
    primaryKey: string;
  }
  
  export interface Column {
    name: string;
    type: string;
    nullable?: boolean;
    defaultValue?: string;
  }
  
  export interface ForeignKey {
    column: string;
    references: {
      table: string;
      column: string;
    };
  }
  
  // Interface for tracking created tables
  export interface TableStatus {
    name: string;
    created: boolean;
    error?: any;
  }
  
  // DB Models matching your CSV files
  export interface Departamento {
    CodDepartamento: number;
    Departamento: string;
  }
  
  export interface Municipio {
    CodMunicipio: number;
    Municipio: string;
    CodDepartamento: number;
    Departamento: string;
  }
  
  export interface Mercado {
    fuenId: number;
    Mercado: string;
    CodMunicipio: number;
    Municipio: string;
    CodDepartamento: number;
    Departamento: string;
  }
  
  export interface MajorCategory {
    MajorCategoryId: number;
    MajorCategory: string;
  }
  
  export interface Subcategory {
    SubcategoryId: number;
    Subcategory: string;
    MajorCategoryId: number;
  }
  
  export interface Producto {
    artiId: number;
    artiNombre: string;
    keystring: string;
    MajorCategoryId: number;
    SubcategoryId: number;
    icon: string | null;
  }
  
  export interface Presentation {
    PresentationId: number;
    Presentation: string;
  }
  
  export interface Unit {
    UnitsId: number;
    Units: string;
    Kilogramos: number;
  }
  
  export interface DailyProductPriceObservation {
    dailyPriceObsId: number;
    minPrice: number;
    maxPrice: number;
    artiId: number;
    SubcategoryId: number;
    MajorCategoryId: number;
    fuenId: number;
    CodMunicipio: number;
    CodDepartamento: number;
    PresentationId: number;
    UnitsId: number;
    date?: string;
  }
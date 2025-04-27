// src/services/supabase/entities/prices.ts
import supabase from '../client';
import cacheService from '../../cache';
import { getTTLForEntity } from '../../cache/utils/expiration';

export type DailyPriceObservation = {
  id: number;
  date: string | null;
  artiId: number;
  fuenId: number;
  minPrice: number;
  maxPrice: number;
  UnitsPresentationId?: number;
  UnitsId?: number;
  PresentationId?: number;
};

/**
 * Get all daily price observations, with cache support
 */
export const getDailyPriceObservations = async (): Promise<DailyPriceObservation[]> => {
  // Try to get from cache first
  const cachedData = await cacheService.getCollection<DailyPriceObservation>('DailyProductPriceObservation');
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('DailyProductPriceObservation')
    .select('*');
  
  if (error) throw error;
  
  // Store in cache before returning
  const observations = data as DailyPriceObservation[];
  await cacheService.setCollection('DailyProductPriceObservation', observations, getTTLForEntity('DailyProductPriceObservation'));
  
  return observations;
};

/**
 * Get daily price observations by product, with cache support
 */
export const getDailyPriceObservationsByProduct = async (artiId: number): Promise<DailyPriceObservation[]> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'DailyProductPriceObservation',
    method: 'getByProduct',
    params: { artiId }
  };
  
  const cachedData = await cacheService.get<DailyPriceObservation[]>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('DailyProductPriceObservation')
    .select('*')
    .eq('artiId', artiId)
    .order('date', { ascending: false });
  
  if (error) throw error;
  
  // Store in cache before returning
  const observations = data as DailyPriceObservation[];
  await cacheService.set(cacheParams, observations);
  
  return observations;
};

/**
 * Get filtered product market price distribution with server-side filtering and joining
 * This optimizes by filtering on the server instead of fetching all and filtering client-side
 * and joins market, municipio, and departamento data
 */
export const getFilteredProductMarketPriceDistribution = async (
  artiId: number,
  params: {
    unitsPresentationId?: number | null;
    unitsId?: number | null;
    presentationId?: number | null;
    date?: string | null;
  }
): Promise<any[]> => {
  console.log(`[getFilteredProductMarketPriceDistribution] Called with params:`, { artiId, ...params });
  
  // Build cache key with all filter parameters
  const cacheParams = {
    entity: 'DailyProductPriceObservation',
    method: 'getFilteredWithMarketData',
    params: { 
      artiId, 
      unitsPresentationId: params.unitsPresentationId,
      unitsId: params.unitsId,
      presentationId: params.presentationId,
      date: params.date
    }
  };
  
  // Try to get from cache first
  const cachedData = await cacheService.get<any[]>(cacheParams);
  
  if (cachedData) {
    console.log(`[getFilteredProductMarketPriceDistribution] Cache hit, returning ${cachedData.length} observations`);
    return cachedData;
  }
  
  try {
    console.log(`[getFilteredProductMarketPriceDistribution] Cache miss, using manual joins`);
    
    // First get price observations with filters
    let query = supabase
      .from('DailyProductPriceObservation')
      .select('*')
      .eq('artiId', artiId);
    
    // Apply UnitsId filter if provided
    if (params.unitsId) {
      query = query.eq('UnitsId', params.unitsId);
    }
    
    // Apply PresentationId filter if provided
    if (params.presentationId) {
      query = query.eq('PresentationId', params.presentationId);
    }
    
    // Apply date filter if provided
    if (params.date) {
      query = query.eq('date', params.date);
    }
    
    // Order by date
    query = query.order('date', { ascending: false });
    
    // Execute query
    const { data: priceObservations, error } = await query;
    
    if (error) {
      console.error(`[getFilteredProductMarketPriceDistribution] Error fetching price observations:`, error);
      throw error;
    }
    
    console.log(`[getFilteredProductMarketPriceDistribution] Retrieved ${priceObservations?.length || 0} price observations`);
    
    if (!priceObservations || priceObservations.length === 0) {
      return [];
    }
    
    // If unitsPresentationId is provided, filter manually
    let filteredObservations = priceObservations;
    if (params.unitsPresentationId) {
      // Get the specific units and presentation for this unitsPresentationId
      const { data: unitsPresentationData, error: upError } = await supabase
        .from('UnitsPresentation')
        .select('*')
        .eq('UnitsPresentationId', params.unitsPresentationId)
        .single();
        
      if (upError) {
        console.error(`[getFilteredProductMarketPriceDistribution] Error fetching UnitsPresentation:`, upError);
      } else if (unitsPresentationData) {
        // Filter observations to match the UnitsId and PresentationId
        filteredObservations = priceObservations.filter(
          po => po.UnitsId === unitsPresentationData.UnitsId && 
                po.PresentationId === unitsPresentationData.PresentationId
        );
        console.log(`[getFilteredProductMarketPriceDistribution] Filtered to ${filteredObservations.length} observations matching UnitsPresentationId ${params.unitsPresentationId}`);
      }
    }
    
    // Get all unique market IDs
    const marketIds = [...new Set(filteredObservations.map(po => po.fuenId))];
    
    // Get all markets data
    const { data: marketsData, error: marketsError } = await supabase
      .from('Mercado')
      .select('*')
      .in('fuenId', marketIds);
      
    if (marketsError) {
      console.error(`[getFilteredProductMarketPriceDistribution] Error fetching markets:`, marketsError);
      throw marketsError;
    }
    
    // Get all municipio data
    const municipioIds = [...new Set(marketsData.map(m => m.CodMunicipio))];
    const { data: municipiosData, error: municipiosError } = await supabase
      .from('Municipio')
      .select('*')
      .in('CodMunicipio', municipioIds);
      
    if (municipiosError) {
      console.error(`[getFilteredProductMarketPriceDistribution] Error fetching municipios:`, municipiosError);
      throw municipiosError;
    }
    
    // Get all departamento data
    const departamentoIds = [...new Set(municipiosData.map(m => m.CodDepartamento))];
    const { data: departamentosData, error: departamentosError } = await supabase
      .from('Departamento')
      .select('*')
      .in('CodDepartamento', departamentoIds);
      
    if (departamentosError) {
      console.error(`[getFilteredProductMarketPriceDistribution] Error fetching departamentos:`, departamentosError);
      throw departamentosError;
    }
    
    // Create lookup maps for faster access
    const marketsMap = new Map(marketsData.map(m => [m.fuenId, m]));
    const municipiosMap = new Map(municipiosData.map(m => [m.CodMunicipio, m]));
    const departamentosMap = new Map(departamentosData.map(d => [d.CodDepartamento, d]));
    
    // Join data manually
    const joinedObservations = filteredObservations.map(po => {
      const market = marketsMap.get(po.fuenId);
      const municipio = market ? municipiosMap.get(market.CodMunicipio) : null;
      const departamento = municipio ? departamentosMap.get(municipio.CodDepartamento) : null;
      
      return {
        ...po,
        precio: po.precio || ((po.minPrice + po.maxPrice) / 2), // Add average price if not available
        // Market data
        marketId: po.fuenId,
        marketName: market ? market.Mercado : 'Unknown Market',
        marketIcon: market ? market.Icon : '',
        // Municipio data
        municipioId: market ? market.CodMunicipio : 0,
        municipioName: municipio ? municipio.Municipio : 'Unknown Municipio',
        municipioIcon: municipio ? municipio.Icon : '',
        // Departamento data
        departamentoId: municipio ? municipio.CodDepartamento : 0,
        departamentoName: departamento ? departamento.Departamento : 'Unknown Departamento',
        departamentoIcon: departamento ? departamento.Icon : ''
      };
    });
    
    console.log(`[getFilteredProductMarketPriceDistribution] Successfully joined data for ${joinedObservations.length} observations`);
    
    // Store in cache before returning
    await cacheService.set(cacheParams, joinedObservations);
    
    return joinedObservations;
  } catch (error) {
    console.error(`[getFilteredProductMarketPriceDistribution] Error:`, error);
    throw error;
  }
};

/**
 * Get daily price observations by market, with cache support
 */
export const getDailyPriceObservationsByMarket = async (fuenId: number): Promise<DailyPriceObservation[]> => {
  console.log(`[getDailyPriceObservationsByMarket] Called with fuenId: ${fuenId}`);

  // Try to get from cache first
  const cacheParams = {
    entity: 'DailyProductPriceObservation',
    method: 'getByMarket',
    params: { fuenId }
  };

  console.log(`[getDailyPriceObservationsByMarket] Checking cache for:`, cacheParams);

  const cachedData = await cacheService.get<DailyPriceObservation[]>(cacheParams);

  if (cachedData) {
    console.log(`[getDailyPriceObservationsByMarket] Found data in cache for fuenId: ${fuenId}`);
    return cachedData;
  }

  console.log(`[getDailyPriceObservationsByMarket] No cache found. Fetching from API for fuenId: ${fuenId}`);

  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('DailyProductPriceObservation')
    .select('*')
    .eq('fuenId', fuenId)
    .order('date', { ascending: false });

  if (error) {
    console.error(`[getDailyPriceObservationsByMarket] Error fetching from API:`, error);
    throw error;
  }

  console.log(`[getDailyPriceObservationsByMarket] Fetched ${data?.length ?? 0} records from API. Caching result.`);

  // Store in cache before returning
  const observations = data as DailyPriceObservation[];
  await cacheService.set(cacheParams, observations);

  console.log(`[getDailyPriceObservationsByMarket] Data cached for fuenId: ${fuenId}`);

  return observations;
};

/**
 * Get daily price observations by product and market, with cache support
 * and optional date range filtering
 */
export const getDailyPriceObservationsByProductAndMarket = async (
  artiId: number,
  fuenId: number,
  startDate?: Date,
  endDate?: Date
): Promise<DailyPriceObservation[]> => {
  // Prepare cache parameters
  const cacheParams = {
    entity: 'DailyProductPriceObservation',
    method: 'getByProductAndMarket',
    params: { 
      artiId,
      fuenId,
      startDate: startDate ? startDate.toISOString() : undefined,
      endDate: endDate ? endDate.toISOString() : undefined
    }
  };
  
  // Try to get from cache first
  const cachedData = await cacheService.get<DailyPriceObservation[]>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Start query
  let query = supabase
    .from('DailyProductPriceObservation')
    .select('*')
    .eq('artiId', artiId)
    .eq('fuenId', fuenId);
  
  // Add date filters if provided
  if (startDate) {
    query = query.gte('date', startDate.toISOString().split('T')[0]);
  }
  
  if (endDate) {
    query = query.lte('date', endDate.toISOString().split('T')[0]);
  }
  
  // Order by date
  query = query.order('date', { ascending: true });
  
  // Execute query
  const { data, error } = await query;
  
  if (error) throw error;
  
  // Store in cache before returning
  const observations = data as DailyPriceObservation[];
  await cacheService.set(cacheParams, observations);
  
  return observations;
};

/**
 * Get the latest daily price observation for a product and market, with cache support
 */
export const getLatestPriceObservation = async (
  artiId: number,
  fuenId: number
): Promise<DailyPriceObservation | null> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'DailyProductPriceObservation',
    method: 'getLatestByProductAndMarket',
    params: { artiId, fuenId }
  };
  
  const cachedData = await cacheService.get<DailyPriceObservation>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('DailyProductPriceObservation')
    .select('*')
    .eq('artiId', artiId)
    .eq('fuenId', fuenId)
    .order('date', { ascending: false })
    .limit(1);
  
  if (error) throw error;
  
  // If no results, return null
  if (!data || data.length === 0) {
    return null;
  }
  
  // Store in cache before returning
  const observation = data[0] as DailyPriceObservation;
  await cacheService.set(cacheParams, observation);
  
  return observation;
};

/**
 * Get the most recent price date for a product and units presentation
 * Enhanced to work with both UnitsPresentationId or individual UnitsId/PresentationId
 */
export const getMostRecentPriceDateByProductAndUnitsPresentation = async (
  artiId: number,
  unitsPresentationId: number
): Promise<string | null> => {
  console.log(`[getMostRecentPriceDateByProductAndUnitsPresentation] Called with artiId: ${artiId}, unitsPresentationId: ${unitsPresentationId}`);
  
  // Try to get from cache first
  const cacheParams = {
    entity: 'DailyProductPriceObservation',
    method: 'getMostRecentDateByProductAndUnitsPresentation',
    params: { artiId, unitsPresentationId }
  };
  
  const cachedData = await cacheService.get<string>(cacheParams);
  
  if (cachedData) {
    console.log(`[getMostRecentPriceDateByProductAndUnitsPresentation] Cache hit: ${cachedData}`);
    return cachedData;
  }
  
  try {
    // Get the UnitsId and PresentationId from the UnitsPresentationId first
    // to ensure we have both representations available
    let unitsId: number | null = null;
    let presentationId: number | null = null;
    
    try {
      const { data: upData, error: upError } = await supabase
        .from('UnitsPresentation')
        .select('UnitsId, PresentationId')
        .eq('UnitsPresentationId', unitsPresentationId)
        .single();
      
      if (!upError && upData) {
        unitsId = upData.UnitsId;
        presentationId = upData.PresentationId;
        console.log(`[getMostRecentPriceDateByProductAndUnitsPresentation] Got UnitsId: ${unitsId}, PresentationId: ${presentationId} from UnitsPresentationId`);
      }
    } catch (err) {
      console.log(`[getMostRecentPriceDateByProductAndUnitsPresentation] Could not get UnitsId/PresentationId from UnitsPresentationId: ${err}`);
    }
    
    // Try multiple query approaches in order of preference
    
    // 1. Try with UnitsPresentationId first
    let { data, error } = await supabase
      .from('DailyProductPriceObservation')
      .select('date')
      .eq('artiId', artiId)
      .eq('UnitsPresentationId', unitsPresentationId)
      .order('date', { ascending: false })
      .limit(1);
    
    // 2. If that didn't work, try with UnitsId and PresentationId if we have them
    if ((error || !data || data.length === 0 || !data[0].date) && unitsId && presentationId) {
      console.log(`[getMostRecentPriceDateByProductAndUnitsPresentation] Trying with UnitsId and PresentationId`);
      
      const { data: filteredData, error: filteredError } = await supabase
        .from('DailyProductPriceObservation')
        .select('date')
        .eq('artiId', artiId)
        .eq('UnitsId', unitsId)
        .eq('PresentationId', presentationId)
        .order('date', { ascending: false })
        .limit(1);
      
      if (!filteredError && filteredData && filteredData.length > 0 && filteredData[0].date) {
        data = filteredData;
      } else {
        console.log(`[getMostRecentPriceDateByProductAndUnitsPresentation] No results with UnitsId/PresentationId`);
      }
    }
    
    // 3. As a last resort, just get the most recent date for this product
    if (error || !data || data.length === 0 || !data[0].date) {
      console.log(`[getMostRecentPriceDateByProductAndUnitsPresentation] Falling back to most recent date for product`);
      
      const { data: productData, error: productError } = await supabase
        .from('DailyProductPriceObservation')
        .select('date')
        .eq('artiId', artiId)
        .order('date', { ascending: false })
        .limit(1);
      
      if (!productError && productData && productData.length > 0 && productData[0].date) {
        data = productData;
        console.log(`[getMostRecentPriceDateByProductAndUnitsPresentation] Found date using product-only fallback`);
      }
    }
    
    // If we have a date, cache and return it
    if (data && data.length > 0 && data[0].date) {
      const mostRecentDate = data[0].date as string;
      console.log(`[getMostRecentPriceDateByProductAndUnitsPresentation] Found date: ${mostRecentDate}`);
      
      await cacheService.set(cacheParams, mostRecentDate);
      return mostRecentDate;
    }
    
  } catch (err) {
    console.error(`[getMostRecentPriceDateByProductAndUnitsPresentation] Error:`, err);
  }
  
  console.log(`[getMostRecentPriceDateByProductAndUnitsPresentation] Could not find any date`);
  return null;
};
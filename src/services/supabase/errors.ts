import { PostgrestError } from '@supabase/supabase-js';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  statusCode?: number;
  details?: any;
  
  constructor(message: string, statusCode?: number, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

/**
 * Handle Supabase error and convert to a standardized ApiError
 */
export function handleSupabaseError(error: PostgrestError): ApiError {
  return new ApiError(
    error.message || 'An unknown error occurred',
    error.code ? parseInt(error.code) : undefined,
    {
      hint: error.hint,
      details: error.details,
      code: error.code
    }
  );
}

/**
 * Handle network errors
 */
export function handleNetworkError(error: Error): ApiError {
  return new ApiError(
    'Network error: ' + error.message,
    0,
    { originalError: error }
  );
}

/**
 * General error handler that can be used for any API call
 */
export function handleApiError(error: any): ApiError {
  if (error instanceof ApiError) {
    return error;
  }
  
  // Handle PostgrestError from Supabase
  if (error && 'code' in error && 'message' in error && 'details' in error) {
    return handleSupabaseError(error as PostgrestError);
  }
  
  // Handle network errors
  if (error instanceof Error) {
    return handleNetworkError(error);
  }
  
  // Fallback for unknown error types
  return new ApiError(
    typeof error === 'string' ? error : 'An unknown error occurred',
    undefined,
    { originalError: error }
  );
}

/**
 * Try to execute a function and handle errors gracefully
 */
export async function tryCatchApi<T>(
  fn: () => Promise<T>,
  errorHandler?: (error: ApiError) => void
): Promise<{ data: T | null; error: ApiError | null }> {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (e) {
    const error = handleApiError(e);
    
    if (errorHandler) {
      errorHandler(error);
    } else {
      // Default error logging
      console.error('API Error:', error);
    }
    
    return { data: null, error };
  }
}
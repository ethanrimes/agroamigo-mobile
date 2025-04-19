// import supabase from '../client';

// export type User = {
//   id: string;
//   email: string;
//   firstName?: string;
//   lastName?: string;
//   preferredLocation?: {
//     departamento: number;
//     municipio?: number;
//   };
//   favoriteProducts?: number[];
//   favoriteMarkets?: number[];
//   favoriteInsumos?: number[];
//   created_at: string;
//   updated_at: string;
// };

// export const getCurrentUser = async () => {
//   const { data: session, error: sessionError } = await supabase.auth.getSession();
  
//   if (sessionError) throw sessionError;
//   if (!session.session) return null;
  
//   const { data, error } = await supabase
//     .from('users')
//     .select('*')
//     .eq('id', session.session.user.id)
//     .single();
  
//   if (error) throw error;
//   return data as User;
// };

// export const updateUserProfile = async (profile: Partial<User>) => {
//   const { data: session } = await supabase.auth.getSession();
//   if (!session.session) throw new Error('User not authenticated');
  
//   const { data, error } = await supabase
//     .from('users')
//     .update(profile)
//     .eq('id', session.session.user.id)
//     .select()
//     .single();
  
//   if (error) throw error;
//   return data as User;
// };

// export const addFavoriteProduct = async (productId: number) => {
//   const user = await getCurrentUser();
//   if (!user) throw new Error('User not authenticated');
  
//   const currentFavorites = user.favoriteProducts || [];
//   if (currentFavorites.includes(productId)) return user;
  
//   const updatedFavorites = [...currentFavorites, productId];
  
//   return updateUserProfile({
//     favoriteProducts: updatedFavorites,
//   });
// };

// export const removeFavoriteProduct = async (productId: number) => {
//   const user = await getCurrentUser();
//   if (!user) throw new Error('User not authenticated');
  
//   const currentFavorites = user.favoriteProducts || [];
//   const updatedFavorites = currentFavorites.filter(id => id !== productId);
  
//   return updateUserProfile({
//     favoriteProducts: updatedFavorites,
//   });
// };

// export const addFavoriteMarket = async (marketId: number) => {
//   const user = await getCurrentUser();
//   if (!user) throw new Error('User not authenticated');
  
//   const currentFavorites = user.favoriteMarkets || [];
//   if (currentFavorites.includes(marketId)) return user;
  
//   const updatedFavorites = [...currentFavorites, marketId];
  
//   return updateUserProfile({
//     favoriteMarkets: updatedFavorites,
//   });
// };

// export const removeFavoriteMarket = async (marketId: number) => {
//   const user = await getCurrentUser();
//   if (!user) throw new Error('User not authenticated');
  
//   const currentFavorites = user.favoriteMarkets || [];
//   const updatedFavorites = currentFavorites.filter(id => id !== marketId);
  
//   return updateUserProfile({
//     favoriteMarkets: updatedFavorites,
//   });
// };

// export const addFavoriteInsumo = async (insumoId: number) => {
//   const user = await getCurrentUser();
//   if (!user) throw new Error('User not authenticated');
  
//   const currentFavorites = user.favoriteInsumos || [];
//   if (currentFavorites.includes(insumoId)) return user;
  
//   const updatedFavorites = [...currentFavorites, insumoId];
  
//   return updateUserProfile({
//     favoriteInsumos: updatedFavorites,
//   });
// };

// export const removeFavoriteInsumo = async (insumoId: number) => {
//   const user = await getCurrentUser();
//   if (!user) throw new Error('User not authenticated');
  
//   const currentFavorites = user.favoriteInsumos || [];
//   const updatedFavorites = currentFavorites.filter(id => id !== insumoId);
  
//   return updateUserProfile({
//     favoriteInsumos: updatedFavorites,
//   });
// };

// export const setPreferredLocation = async (departamento: number, municipio?: number) => {
//   const user = await getCurrentUser();
//   if (!user) throw new Error('User not authenticated');
  
//   return updateUserProfile({
//     preferredLocation: { departamento, municipio }
//   });
// };
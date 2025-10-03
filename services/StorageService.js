import AsyncStorage from '@react-native-async-storage/async-storage';

const RECIPES_KEY = '@foodie_recipes';
const FAVORITES_KEY = '@foodie_favorites';
const SETTINGS_KEY = '@foodie_settings';

export const getRecipes = async () => {
  try {
    const recipesData = await AsyncStorage.getItem(RECIPES_KEY);
    return recipesData ? JSON.parse(recipesData) : [];
  } catch (error) {
    console.error('Error getting recipes:', error);
    return [];
  }
};

export const saveRecipe = async (recipe) => {
  try {
    const recipes = await getRecipes();
    const existingIndex = recipes.findIndex(r => r.id === recipe.id);
    
    if (existingIndex >= 0) {
      recipes[existingIndex] = recipe;
    } else {
      recipes.push(recipe);
    }
    
    await AsyncStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
    return recipe;
  } catch (error) {
    console.error('Error saving recipe:', error);
    throw error;
  }
};

export const deleteRecipe = async (recipeId) => {
  try {
    const recipes = await getRecipes();
    const filteredRecipes = recipes.filter(r => r.id !== recipeId);
    await AsyncStorage.setItem(RECIPES_KEY, JSON.stringify(filteredRecipes));
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};

export const getFavorites = async () => {
  try {
    const favoritesData = await AsyncStorage.getItem(FAVORITES_KEY);
    return favoritesData ? JSON.parse(favoritesData) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const toggleFavorite = async (recipeId) => {
  try {
    const favorites = await getFavorites();
    const isFavorite = favorites.includes(recipeId);
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter(id => id !== recipeId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      return false;
    } else {
      const updatedFavorites = [...favorites, recipeId];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      return true;
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
};

export const getSettings = async () => {
  try {
    const settingsData = await AsyncStorage.getItem(SETTINGS_KEY);
    return settingsData ? JSON.parse(settingsData) : {
      dietary: [],
      notifications: true,
      darkMode: false,
    };
  } catch (error) {
    console.error('Error getting settings:', error);
    return {
      dietary: [],
      notifications: true,
      darkMode: false,
    };
  }
};

export const saveSettings = async (settings) => {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    return settings;
  } catch (error) {
    console.error('Error saving settings:', error);
    throw error;
  }
};
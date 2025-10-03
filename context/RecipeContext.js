// context/RecipeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { CATEGORIES } from '../utils/constants';
import { getRecipes, saveRecipe, deleteRecipe, getFavorites, toggleFavorite } from '../services/StorageService';
import { refreshSampleData } from '../utils/sampleData';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState(CATEGORIES);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState({
    dietary: [],
    difficulty: null,
    maxPrepTime: null,
  });
  const [sortBy, setSortBy] = useState('prepTime');

  useEffect(() => {
    loadRecipes();
    loadFavorites();
  }, []);

  const loadRecipes = async () => {
    try {
      setIsLoading(true);
      console.log('Loading recipes...');
      const loadedRecipes = await getRecipes();
      console.log(`Found ${loadedRecipes.length} recipes in storage`);
      
      // If no recipes exist, initialize with sample data
      if (loadedRecipes.length === 0) {
        console.log('No recipes found. Initializing sample data...');
        await refreshSampleData();
        const refreshedRecipes = await getRecipes();
        console.log(`Initialized with ${refreshedRecipes.length} recipes`);
        setRecipes(refreshedRecipes);
      } else {
        console.log(`Using existing ${loadedRecipes.length} recipes`);
        setRecipes(loadedRecipes);
      }
    } catch (error) {
      console.error('Error loading recipes:', error);
      // If there's an error, try to refresh the sample data
      console.log('Error loading recipes, trying to refresh sample data...');
      await refreshSampleData();
      const refreshedRecipes = await getRecipes();
      console.log(`Initialized with ${refreshedRecipes.length} recipes after error`);
      setRecipes(refreshedRecipes);
    } finally {
      setIsLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const loadedFavorites = await getFavorites();
      setFavorites(loadedFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const addRecipe = async (recipe) => {
    try {
      const newRecipe = {
        ...recipe,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        isFavorite: false,
        likes: 0,
        comments: [],
      };
      
      await saveRecipe(newRecipe);
      setRecipes([...recipes, newRecipe]);
      return newRecipe;
    } catch (error) {
      console.error('Error adding recipe:', error);
      throw error;
    }
  };

  const updateRecipe = async (updatedRecipe) => {
    try {
      await saveRecipe(updatedRecipe);
      setRecipes(recipes.map(recipe => 
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ));
      return updatedRecipe;
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw error;
    }
  };

  const removeRecipe = async (recipeId) => {
    try {
      await deleteRecipe(recipeId);
      setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
      setFavorites(favorites.filter(id => id !== recipeId));
    } catch (error) {
      console.error('Error removing recipe:', error);
      throw error;
    }
  };

  const handleToggleFavorite = async (recipeId) => {
    try {
      const isFavorite = await toggleFavorite(recipeId);
      
      if (isFavorite) {
        setFavorites([...favorites, recipeId]);
      } else {
        setFavorites(favorites.filter(id => id !== recipeId));
      }
      
      setRecipes(recipes.map(recipe => 
        recipe.id === recipeId ? { ...recipe, isFavorite } : recipe
      ));
      
      return isFavorite;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  };

  const getFilteredRecipes = () => {
    let filtered = [...recipes];
    
    if (searchQuery) {
      filtered = filtered.filter(recipe => 
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ingredient => 
          ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(recipe => 
        recipe.categoryId === selectedCategory.id
      );
    }
    
    if (filters.dietary.length > 0) {
      filtered = filtered.filter(recipe => 
        filters.dietary.every(diet => 
          recipe.dietary && recipe.dietary.includes(diet)
        )
      );
    }
    
    if (filters.difficulty) {
      filtered = filtered.filter(recipe => 
        recipe.difficulty === filters.difficulty
      );
    }
    
    if (filters.maxPrepTime) {
      filtered = filtered.filter(recipe => 
        recipe.prepTime <= filters.maxPrepTime
      );
    }
    
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'prepTime': return a.prepTime - b.prepTime;
        case 'popularity': return b.likes - a.likes;
        case 'difficulty': 
          const difficultyOrder = { EASY: 1, MEDIUM: 2, HARD: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'calories': return a.nutrition.calories - b.nutrition.calories;
        default: return 0;
      }
    });
    
    return filtered;
  };

  const value = {
    recipes, categories, favorites, isLoading, searchQuery, selectedCategory, filters, sortBy,
    setSearchQuery, setSelectedCategory, setFilters, setSortBy,
    addRecipe, updateRecipe, removeRecipe, handleToggleFavorite, getFilteredRecipes, loadRecipes,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};
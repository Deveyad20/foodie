// utils/constants.js

export const CATEGORIES = [
  { id: '1', name: 'Appetizers', icon: 'restaurant-outline' },
  { id: '2', name: 'Salads', icon: 'leaf-outline' },
  { id: '3', name: 'Main Dishes', icon: 'fast-food-outline' },
  { id: '4', name: 'Desserts', icon: 'ice-cream-outline' },
  { id: '5', name: 'Drinks', icon: 'cafe-outline' },
  { id: '6', name: 'Vegan', icon: 'leaf-outline' },
  { id: '7', name: 'Low-Carb', icon: 'fitness-outline' },
  { id: '8', name: 'High-Protein', icon: 'barbell-outline' },
  { id: '9', name: 'Quick Meals', icon: 'timer-outline' },
  { id: '10', name: 'International Cuisine', icon: 'globe-outline' },
];

export const DIFFICULTY_LEVELS = {
  EASY: { label: 'Easy', color: '#4CAF50' },
  MEDIUM: { label: 'Medium', color: '#FF9800' },
  HARD: { label: 'Hard', color: '#F44336' },
};

export const DIETARY_PREFERENCES = [
  { id: '1', name: 'Vegan', icon: 'leaf-outline' },
  { id: '2', name: 'Vegetarian', icon: 'leaf-outline' },
  { id: '3', name: 'Gluten-Free', icon: 'nutrition-outline' },
  { id: '4', name: 'Dairy-Free', icon: 'nutrition-outline' },
  { id: '5', name: 'Keto', icon: 'fitness-outline' },
  { id: '6', name: 'Paleo', icon: 'fish-outline' },
];

export const SORT_OPTIONS = [
  { id: '1', name: 'Preparation Time', value: 'prepTime' },
  { id: '2', name: 'Popularity', value: 'popularity' },
  { id: '3', name: 'Difficulty', value: 'difficulty' },
  { id: '4', name: 'Calories', value: 'calories' },
];
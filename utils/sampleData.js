// utils/sampleData.js

import { CATEGORIES } from './constants';
import { getRecipes, saveRecipe } from '../services/StorageService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RECIPES_KEY = '@foodie_recipes';

export const SAMPLE_RECIPES = [
  {
    id: '1',
    name: 'Classic Margherita Pizza',
    description: 'A traditional Italian pizza with fresh mozzarella, tomatoes, and basil.',
    image: require('../assets/images/240_F_232418936.jpg'),
    categoryId: '3', // Main Dishes
    prepTime: 30,
    cookTime: 15,
    servings: 4,
    difficulty: 'MEDIUM',
    ingredients: [
      { name: 'Pizza dough', quantity: 1, unit: 'lb' },
      { name: 'Tomato sauce', quantity: 1, unit: 'cup' },
      { name: 'Fresh mozzarella', quantity: 8, unit: 'oz' },
      { name: 'Fresh basil', quantity: 1, unit: 'handful' },
      { name: 'Olive oil', quantity: 2, unit: 'tbsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' },
    ],
    instructions: [
      { text: 'Preheat your oven to 475°F (245°C).', image: '', video: '' },
      { text: 'Roll out the pizza dough on a floured surface to your desired thickness.', image: '', video: '' },
      { text: 'Spread tomato sauce evenly over the dough, leaving a small border for the crust.', image: '', video: '' },
      { text: 'Tear the mozzarella into pieces and distribute over the sauce.', image: '', video: '' },
      { text: 'Drizzle with olive oil and sprinkle with salt.', image: '', video: '' },
      { text: 'Bake for 12-15 minutes until the crust is golden and the cheese is bubbly.', image: '', video: '' },
      { text: 'Garnish with fresh basil leaves before serving.', image: '', video: '' },
    ],
    nutrition: { calories: 250, protein: 12, carbs: 30, fat: 10 },
    userId: 'sample-user',
    dietary: ['Vegetarian'],
    likes: 42,
    comments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Greek Salad',
    description: 'A refreshing Mediterranean salad with feta cheese, olives, and a tangy dressing.',
    image: require('../assets/images/240_F_551829600.jpg'),
    categoryId: '2', // Salads
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    difficulty: 'EASY',
    ingredients: [
      { name: 'Cucumber', quantity: 2, unit: 'medium' },
      { name: 'Tomatoes', quantity: 2, unit: 'large' },
      { name: 'Red onion', quantity: 1, unit: 'small' },
      { name: 'Feta cheese', quantity: 200, unit: 'g' },
      { name: 'Kalamata olives', quantity: 1, unit: 'cup' },
      { name: 'Olive oil', quantity: 3, unit: 'tbsp' },
      { name: 'Lemon juice', quantity: 2, unit: 'tbsp' },
      { name: 'Oregano', quantity: 1, unit: 'tsp' },
      { name: 'Salt', quantity: 0.5, unit: 'tsp' },
      { name: 'Black pepper', quantity: 0.25, unit: 'tsp' },
    ],
    instructions: [
      { text: 'Cut the cucumber into thick slices and halve the tomatoes.', image: '', video: '' },
      { text: 'Thinly slice the red onion.', image: '', video: '' },
      { text: 'Combine cucumber, tomatoes, and onion in a large bowl.', image: '', video: '' },
      { text: 'Add crumbled feta cheese and olives.', image: '', video: '' },
      { text: 'In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper.', image: '', video: '' },
      { text: 'Pour the dressing over the salad and toss gently to combine.', image: '', video: '' },
      { text: 'Let the salad sit for 10 minutes before serving to allow flavors to meld.', image: '', video: '' },
    ],
    nutrition: { calories: 180, protein: 8, carbs: 8, fat: 14 },
    userId: 'sample-user',
    dietary: ['Gluten-Free', 'Vegetarian'],
    likes: 28,
    comments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Chocolate Chip Cookies',
    description: 'Classic homemade chocolate chip cookies that are crispy on the edges and chewy in the center.',
    image: require('../assets/images/cake.jpg'),
    categoryId: '4', // Desserts
    prepTime: 15,
    cookTime: 12,
    servings: 24,
    difficulty: 'EASY',
    ingredients: [
      { name: 'All-purpose flour', quantity: 2.25, unit: 'cups' },
      { name: 'Baking soda', quantity: 1, unit: 'tsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' },
      { name: 'Butter', quantity: 1, unit: 'cup' },
      { name: 'Granulated sugar', quantity: 0.75, unit: 'cup' },
      { name: 'Brown sugar', quantity: 0.75, unit: 'cup' },
      { name: 'Eggs', quantity: 2, unit: 'large' },
      { name: 'Vanilla extract', quantity: 2, unit: 'tsp' },
      { name: 'Chocolate chips', quantity: 2, unit: 'cups' },
    ],
    instructions: [
      { text: 'Preheat oven to 375°F (190°C).', image: '', video: '' },
      { text: 'In a bowl, whisk together flour, baking soda, and salt.', image: '', video: '' },
      { text: 'In a large bowl, cream together butter and both sugars until fluffy.', image: '', video: '' },
      { text: 'Beat in eggs one at a time, then stir in vanilla.', image: '', video: '' },
      { text: 'Gradually blend in the flour mixture.', image: '', video: '' },
      { text: 'Fold in chocolate chips.', image: '', video: '' },
      { text: 'Drop rounded tablespoons of dough onto ungreased cookie sheets.', image: '', video: '' },
      { text: 'Bake for 9 to 11 minutes or until golden brown.', image: '', video: '' },
      { text: 'Cool on baking sheet for 2 minutes; remove to a wire rack.', image: '', video: '' },
    ],
    nutrition: { calories: 150, protein: 2, carbs: 20, fat: 8 },
    userId: 'sample-user',
    dietary: ['Vegetarian'],
    likes: 56,
    comments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Green Smoothie',
    description: 'A healthy and refreshing smoothie packed with nutrients from spinach, banana, and mango.',
    image: require('../assets/images/240_F_858548495.jpg'),
    categoryId: '5', // Drinks
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    difficulty: 'EASY',
    ingredients: [
      { name: 'Fresh spinach', quantity: 2, unit: 'cups' },
      { name: 'Banana', quantity: 1, unit: 'large' },
      { name: 'Mango', quantity: 1, unit: 'cup' },
      { name: 'Greek yogurt', quantity: 0.5, unit: 'cup' },
      { name: 'Almond milk', quantity: 1, unit: 'cup' },
      { name: 'Honey', quantity: 1, unit: 'tbsp' },
      { name: 'Chia seeds', quantity: 1, unit: 'tbsp' },
    ],
    instructions: [
      { text: 'Place all ingredients in a blender.', image: '', video: '' },
      { text: 'Blend on high speed until smooth and creamy.', image: '', video: '' },
      { text: 'If the smoothie is too thick, add more almond milk.', image: '', video: '' },
      { text: 'Pour into glasses and serve immediately.', image: '', video: '' },
    ],
    nutrition: { calories: 180, protein: 8, carbs: 30, fat: 4 },
    userId: 'sample-user',
    dietary: ['Vegan', 'Gluten-Free'],
    likes: 33,
    comments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Quinoa Buddha Bowl',
    description: 'A nutritious and colorful bowl with quinoa, roasted vegetables, and tahini dressing.',
    image: require('../assets/images/pasta.jpg'),
    categoryId: '6', // Vegan
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    difficulty: 'MEDIUM',
    ingredients: [
      { name: 'Quinoa', quantity: 1, unit: 'cup' },
      { name: 'Sweet potato', quantity: 1, unit: 'large' },
      { name: 'Chickpeas', quantity: 1, unit: 'can' },
      { name: 'Broccoli', quantity: 1, unit: 'head' },
      { name: 'Red bell pepper', quantity: 1, unit: 'large' },
      { name: 'Avocado', quantity: 1, unit: 'large' },
      { name: 'Tahini', quantity: 0.25, unit: 'cup' },
      { name: 'Lemon juice', quantity: 2, unit: 'tbsp' },
      { name: 'Garlic', quantity: 1, unit: 'clove' },
      { name: 'Olive oil', quantity: 2, unit: 'tbsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' },
      { name: 'Black pepper', quantity: 0.5, unit: 'tsp' },
    ],
    instructions: [
      { text: 'Preheat oven to 400°F (200°C).', image: '', video: '' },
      { text: 'Cook quinoa according to package instructions and set aside.', image: '', video: '' },
      { text: 'Peel and dice the sweet potato. Toss with olive oil, salt, and pepper.', image: '', video: '' },
      { text: 'Spread sweet potato on a baking sheet and roast for 20-25 minutes.', image: '', video: '' },
      { text: 'Add broccoli and bell pepper to the baking sheet for the last 10 minutes.', image: '', video: '' },
      { text: 'Rinse and drain chickpeas.', image: '', video: '' },
      { text: 'In a small bowl, whisk together tahini, lemon juice, minced garlic, and water to make dressing.', image: '', video: '' },
      { text: 'Assemble bowls with quinoa, roasted vegetables, chickpeas, and sliced avocado.', image: '', video: '' },
      { text: 'Drizzle with tahini dressing before serving.', image: '', video: '' },
    ],
    nutrition: { calories: 380, protein: 12, carbs: 50, fat: 16 },
    userId: 'sample-user',
    dietary: ['Vegan', 'Gluten-Free'],
    likes: 47,
    comments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Beef Tacos',
    description: ' flavorful ground beef tacos topped with fresh lettuce, tomatoes, and cheese.',
    image: require('../assets/images/240_F_1422327525.jpg'),
    categoryId: '3', // Main Dishes
    prepTime: 15,
    cookTime: 20,
    servings: 6,
    difficulty: 'EASY',
    ingredients: [
      { name: 'Ground beef', quantity: 1, unit: 'lb' },
      { name: 'Taco seasoning', quantity: 1, unit: 'packet' },
      { name: 'Taco shells', quantity: 12, unit: 'count' },
      { name: 'Lettuce', quantity: 1, unit: 'head' },
      { name: 'Tomatoes', quantity: 2, unit: 'medium' },
      { name: 'Cheddar cheese', quantity: 1, unit: 'cup' },
      { name: 'Sour cream', quantity: 0.5, unit: 'cup' },
      { name: 'Avocado', quantity: 1, unit: 'medium' },
    ],
    instructions: [
      { text: 'Brown ground beef in a skillet over medium heat.', image: '', video: '' },
      { text: 'Drain excess fat and add taco seasoning with water according to package directions.', image: '', video: '' },
      { text: 'Simmer for 5 minutes until thickened.', image: '', video: '' },
      { text: 'Warm taco shells according to package directions.', image: '', video: '' },
      { text: 'Fill shells with beef mixture.', image: '', video: '' },
      { text: 'Top with shredded lettuce, diced tomatoes, cheese, sour cream, and avocado.', image: '', video: '' },
    ],
    nutrition: { calories: 320, protein: 18, carbs: 25, fat: 16 },
    userId: 'sample-user',
    dietary: [],
    likes: 35,
    comments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Vegetable Stir Fry',
    description: 'A quick and healthy vegetable stir fry with a savory sauce.',
    image: require('../assets/images/240_F_1427815839.jpg'),
    categoryId: '3', // Main Dishes
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: 'EASY',
    ingredients: [
      { name: 'Broccoli', quantity: 1, unit: 'head' },
      { name: 'Bell peppers', quantity: 2, unit: 'large' },
      { name: 'Carrots', quantity: 2, unit: 'medium' },
      { name: 'Snow peas', quantity: 1, unit: 'cup' },
      { name: 'Soy sauce', quantity: 3, unit: 'tbsp' },
      { name: 'Sesame oil', quantity: 1, unit: 'tbsp' },
      { name: 'Garlic', quantity: 2, unit: 'cloves' },
      { name: 'Ginger', quantity: 1, unit: 'tsp' },
      { name: 'Vegetable oil', quantity: 2, unit: 'tbsp' },
    ],
    instructions: [
      { text: 'Cut vegetables into bite-sized pieces.', image: '', video: '' },
      { text: 'Heat vegetable oil in a wok or large skillet over high heat.', image: '', video: '' },
      { text: 'Add garlic and ginger, stir for 30 seconds.', image: '', video: '' },
      { text: 'Add carrots and broccoli, stir fry for 3 minutes.', image: '', video: '' },
      { text: 'Add bell peppers and snow peas, stir fry for 2-3 minutes until crisp-tender.', image: '', video: '' },
      { text: 'Add soy sauce and sesame oil, toss to coat.', image: '', video: '' },
      { text: 'Serve hot over rice or noodles.', image: '', video: '' },
    ],
    nutrition: { calories: 150, protein: 6, carbs: 20, fat: 5 },
    userId: 'sample-user',
    dietary: ['Vegan', 'Gluten-Free'],
    likes: 42,
    comments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Berry Smoothie Bowl',
    description: 'A thick and creamy smoothie bowl topped with fresh fruits and granola.',
    image: require('../assets/images/240_F_1554865015.jpg'),
    categoryId: '5', // Drinks
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    difficulty: 'EASY',
    ingredients: [
      { name: 'Mixed frozen berries', quantity: 1, unit: 'cup' },
      { name: 'Banana', quantity: 1, unit: 'large' },
      { name: 'Greek yogurt', quantity: 0.5, unit: 'cup' },
      { name: 'Almond milk', quantity: 0.25, unit: 'cup' },
      { name: 'Honey', quantity: 1, unit: 'tbsp' },
      { name: 'Granola', quantity: 0.25, unit: 'cup' },
      { name: 'Fresh berries', quantity: 0.5, unit: 'cup' },
      { name: 'Coconut flakes', quantity: 1, unit: 'tbsp' },
    ],
    instructions: [
      { text: 'Place frozen berries, banana, Greek yogurt, almond milk, and honey in a blender.', image: '', video: '' },
      { text: 'Blend until thick and creamy.', image: '', video: '' },
      { text: 'Pour into bowls.', image: '', video: '' },
      { text: 'Top with fresh berries, granola, and coconut flakes.', image: '', video: '' },
      { text: 'Serve immediately.', image: '', video: '' },
    ],
    nutrition: { calories: 280, protein: 12, carbs: 45, fat: 8 },
    userId: 'sample-user',
    dietary: ['Vegetarian', 'Gluten-Free'],
    likes: 58,
    comments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'Chicken Caesar Salad',
    description: 'A classic Caesar salad with grilled chicken and homemade dressing.',
    image: require('../assets/images/240_F_1579409250.jpg'),
    categoryId: '2', // Salads
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: 'MEDIUM',
    ingredients: [
      { name: 'Chicken breast', quantity: 2, unit: 'large' },
      { name: 'Romaine lettuce', quantity: 2, unit: 'heads' },
      { name: 'Caesar dressing', quantity: 0.5, unit: 'cup' },
      { name: 'Parmesan cheese', quantity: 0.5, unit: 'cup' },
      { name: 'Croutons', quantity: 1, unit: 'cup' },
      { name: 'Lemon', quantity: 1, unit: 'whole' },
      { name: 'Olive oil', quantity: 2, unit: 'tbsp' },
      { name: 'Salt', quantity: 0.5, unit: 'tsp' },
      { name: 'Black pepper', quantity: 0.25, unit: 'tsp' },
    ],
    instructions: [
      { text: 'Preheat grill to medium-high heat.', image: '', video: '' },
      { text: 'Season chicken with salt and pepper.', image: '', video: '' },
      { text: 'Grill chicken for 6-7 minutes per side until cooked through.', image: '', video: '' },
      { text: 'Let chicken rest for 5 minutes, then slice.', image: '', video: '' },
      { text: 'Wash and chop romaine lettuce.', image: '', video: '' },
      { text: 'In a large bowl, toss lettuce with Caesar dressing.', image: '', video: '' },
      { text: 'Top with sliced chicken, Parmesan cheese, and croutons.', image: '', video: '' },
      { text: 'Serve with lemon wedges.', image: '', video: '' },
    ],
    nutrition: { calories: 380, protein: 35, carbs: 12, fat: 22 },
    userId: 'sample-user',
    dietary: [],
    likes: 51,
    comments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '10',
    name: 'Chocolate Lava Cake',
    description: 'Decadent individual chocolate cakes with a molten center.',
    image: require('../assets/images/240_F_1580489729.jpg'),
    categoryId: '4', // Desserts
    prepTime: 20,
    cookTime: 12,
    servings: 4,
    difficulty: 'MEDIUM',
    ingredients: [
      { name: 'Dark chocolate', quantity: 6, unit: 'oz' },
      { name: 'Butter', quantity: 4, unit: 'tbsp' },
      { name: 'Eggs', quantity: 2, unit: 'large' },
      { name: 'Sugar', quantity: 2, unit: 'tbsp' },
      { name: 'All-purpose flour', quantity: 2, unit: 'tbsp' },
      { name: 'Vanilla extract', quantity: 0.5, unit: 'tsp' },
      { name: 'Powdered sugar', quantity: 1, unit: 'tbsp' },
    ],
    instructions: [
      { text: 'Preheat oven to 425°F (220°C). Butter and flour four 6-ounce ramekins.', image: '', video: '' },
      { text: 'Melt chocolate and butter in a double boiler until smooth.', image: '', video: '' },
      { text: 'In a bowl, whisk eggs and sugar until thick and pale.', image: '', video: '' },
      { text: 'Fold chocolate mixture into egg mixture.', image: '', video: '' },
      { text: 'Add flour and vanilla extract, fold until just combined.', image: '', video: '' },
      { text: 'Divide batter among ramekins.', image: '', video: '' },
      { text: 'Bake for 12-14 minutes until edges are firm but centers jiggle.', image: '', video: '' },
      { text: 'Let cool for 1 minute, then invert onto plates.', image: '', video: '' },
      { text: 'Dust with powdered sugar and serve immediately.', image: '', video: '' },
    ],
    nutrition: { calories: 320, protein: 5, carbs: 28, fat: 22 },
    userId: 'sample-user',
    dietary: [],
    likes: 67,
    comments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '11',
    name: 'Avocado Toast',
    description: 'Creamy avocado on toasted bread with a sprinkle of seasonings.',
    image: require('../assets/images/240_F_1601653505.jpg'),
    categoryId: '1', // Breakfast
    prepTime: 10,
    cookTime: 5,
    servings: 2,
    difficulty: 'EASY',
    ingredients: [
      { name: 'Bread', quantity: 2, unit: 'slices' },
      { name: 'Avocado', quantity: 1, unit: 'large' },
      { name: 'Lemon juice', quantity: 1, unit: 'tsp' },
      { name: 'Salt', quantity: 0.25, unit: 'tsp' },
      { name: 'Black pepper', quantity: 0.25, unit: 'tsp' },
      { name: 'Red pepper flakes', quantity: 0.25, unit: 'tsp' },
      { name: 'Olive oil', quantity: 1, unit: 'tsp' },
    ],
    instructions: [
      { text: 'Toast bread until golden brown.', image: '', video: '' },
      { text: 'Cut avocado in half, remove pit, and scoop flesh into a bowl.', image: '', video: '' },
      { text: 'Mash avocado with lemon juice, salt, and pepper.', image: '', video: '' },
      { text: 'Spread avocado mixture evenly on toast.', image: '', video: '' },
      { text: 'Drizzle with olive oil and sprinkle with red pepper flakes.', image: '', video: '' },
      { text: 'Serve immediately.', image: '', video: '' },
    ],
    nutrition: { calories: 240, protein: 4, carbs: 20, fat: 18 },
    userId: 'sample-user',
    dietary: ['Vegetarian', 'Vegan'],
    likes: 39,
    comments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '12',
    name: 'Pancakes',
    description: 'Fluffy pancakes perfect for a weekend breakfast.',
    image: require('../assets/images/cake.jpg'),
    categoryId: '1', // Breakfast
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'EASY',
    ingredients: [
      { name: 'All-purpose flour', quantity: 1.5, unit: 'cups' },
      { name: 'Baking powder', quantity: 2, unit: 'tsp' },
      { name: 'Salt', quantity: 0.5, unit: 'tsp' },
      { name: 'Sugar', quantity: 1, unit: 'tbsp' },
      { name: 'Milk', quantity: 1.25, unit: 'cups' },
      { name: 'Egg', quantity: 1, unit: 'large' },
      { name: 'Butter', quantity: 2, unit: 'tbsp' },
      { name: 'Vanilla extract', quantity: 1, unit: 'tsp' },
    ],
    instructions: [
      { text: 'In a bowl, whisk together flour, baking powder, salt, and sugar.', image: '', video: '' },
      { text: 'In another bowl, whisk together milk, egg, melted butter, and vanilla.', image: '', video: '' },
      { text: 'Pour wet ingredients into dry ingredients and stir until just combined.', image: '', video: '' },
      { text: 'Heat a griddle or large skillet over medium heat and lightly grease.', image: '', video: '' },
      { text: 'Pour 1/4 cup batter for each pancake onto griddle.', image: '', video: '' },
      { text: 'Cook until bubbles form on surface and edges look dry, about 2-3 minutes.', image: '', video: '' },
      { text: 'Flip and cook until golden brown on the other side, 1-2 minutes more.', image: '', video: '' },
      { text: 'Serve hot with maple syrup and butter.', image: '', video: '' },
    ],
    nutrition: { calories: 220, protein: 6, carbs: 30, fat: 7 },
    userId: 'sample-user',
    dietary: [],
    likes: 45,
    comments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '13',
    name: 'Vegetable Curry',
    description: 'Aromatic and flavorful vegetable curry with coconut milk.',
    image: require('../assets/images/pasta.jpg'),
    categoryId: '6', // Vegan
    prepTime: 20,
    cookTime: 30,
    servings: 6,
    difficulty: 'MEDIUM',
    ingredients: [
      { name: 'Coconut oil', quantity: 2, unit: 'tbsp' },
      { name: 'Onion', quantity: 1, unit: 'large' },
      { name: 'Garlic', quantity: 3, unit: 'cloves' },
      { name: 'Ginger', quantity: 1, unit: 'tbsp' },
      { name: 'Curry powder', quantity: 2, unit: 'tbsp' },
      { name: 'Coconut milk', quantity: 1, unit: 'can' },
      { name: 'Vegetable broth', quantity: 1, unit: 'cup' },
      { name: 'Potatoes', quantity: 2, unit: 'large' },
      { name: 'Carrots', quantity: 3, unit: 'medium' },
      { name: 'Bell peppers', quantity: 2, unit: 'large' },
      { name: 'Green beans', quantity: 1, unit: 'cup' },
      { name: 'Salt', quantity: 1, unit: 'tsp' },
      { name: 'Black pepper', quantity: 0.5, unit: 'tsp' },
    ],
    instructions: [
      { text: 'Heat coconut oil in a large pot over medium heat.', image: '', video: '' },
      { text: 'Add onion, garlic, and ginger, sauté until fragrant.', image: '', video: '' },
      { text: 'Add curry powder and cook for 1 minute.', image: '', video: '' },
      { text: 'Add coconut milk and vegetable broth, stir to combine.', image: '', video: '' },
      { text: 'Add potatoes and carrots, bring to a simmer.', image: '', video: '' },
      { text: 'Cover and cook for 15 minutes.', image: '', video: '' },
      { text: 'Add bell peppers and green beans, cook for 10 more minutes.', image: '', video: '' },
      { text: 'Season with salt and pepper.', image: '', video: '' },
      { text: 'Serve hot over rice.', image: '', video: '' },
    ],
    nutrition: { calories: 280, protein: 6, carbs: 35, fat: 14 },
    userId: 'sample-user',
    dietary: ['Vegan', 'Gluten-Free'],
    likes: 53,
    comments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '14',
    name: 'Fish Tacos',
    description: 'Light and flavorful fish tacos with a tangy slaw.',
    image: require('../assets/images/240_F_232418936.jpg'),
    categoryId: '3', // Main Dishes
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: 'MEDIUM',
    ingredients: [
      { name: 'White fish fillets', quantity: 1, unit: 'lb' },
      { name: 'Corn tortillas', quantity: 8, unit: 'count' },
      { name: 'Cabbage', quantity: 0.5, unit: 'head' },
      { name: 'Carrots', quantity: 2, unit: 'medium' },
      { name: 'Lime', quantity: 1, unit: 'whole' },
      { name: 'Cilantro', quantity: 0.25, unit: 'cup' },
      { name: 'Sour cream', quantity: 0.25, unit: 'cup' },
      { name: 'Chipotle powder', quantity: 1, unit: 'tsp' },
      { name: 'Olive oil', quantity: 1, unit: 'tbsp' },
      { name: 'Salt', quantity: 0.5, unit: 'tsp' },
      { name: 'Black pepper', quantity: 0.25, unit: 'tsp' },
    ],
    instructions: [
      { text: 'Preheat oven to 400°F (200°C).', image: '', video: '' },
      { text: 'Season fish with chipotle powder, salt, and pepper.', image: '', video: '' },
      { text: 'Heat olive oil in a skillet over medium-high heat.', image: '', video: '' },
      { text: 'Cook fish for 4-5 minutes per side until flaky.', image: '', video: '' },
      { text: 'Shred cabbage and julienne carrots.', image: '', video: '' },
      { text: 'Mix cabbage, carrots, lime juice, and cilantro for slaw.', image: '', video: '' },
      { text: 'Warm tortillas in oven or dry skillet.', image: '', video: '' },
      { text: 'Assemble tacos with fish, slaw, and a dollop of sour cream.', image: '', video: '' },
    ],
    nutrition: { calories: 290, protein: 25, carbs: 18, fat: 14 },
    userId: 'sample-user',
    dietary: [],
    likes: 48,
    comments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '15',
    name: 'Berry Parfait',
    description: 'Layers of yogurt, granola, and fresh berries for a healthy breakfast.',
    image: require('../assets/images/240_F_551829600.jpg'),
    categoryId: '1', // Breakfast
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    difficulty: 'EASY',
    ingredients: [
      { name: 'Greek yogurt', quantity: 1, unit: 'cup' },
      { name: 'Granola', quantity: 0.5, unit: 'cup' },
      { name: 'Mixed berries', quantity: 1, unit: 'cup' },
      { name: 'Honey', quantity: 1, unit: 'tbsp' },
      { name: 'Mint leaves', quantity: 4, unit: 'leaves' },
    ],
    instructions: [
      { text: 'Layer yogurt, granola, and berries in glasses.', image: '', video: '' },
      { text: 'Repeat layers.', image: '', video: '' },
      { text: 'Drizzle with honey.', image: '', video: '' },
      { text: 'Garnish with mint leaves.', image: '', video: '' },
      { text: 'Serve immediately.', image: '', video: '' },
    ],
    nutrition: { calories: 220, protein: 12, carbs: 30, fat: 6 },
    userId: 'sample-user',
    dietary: ['Vegetarian', 'Gluten-Free'],
    likes: 36,
    comments: [],
    createdAt: new Date().toISOString(),
  },
];

export const initializeSampleData = async () => {
  try {
    const existingRecipes = await getRecipes();
    
    if (existingRecipes.length === 0) {
      console.log('No recipes found. Initializing sample data...');
      for (const recipe of SAMPLE_RECIPES) {
        await saveRecipe(recipe);
      }
      console.log('Sample data initialized successfully');
    } else {
      console.log('Sample data already exists.');
    }
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
};

// Function to refresh sample data
export const refreshSampleData = async () => {
  try {
    console.log('Refreshing sample data...');
    console.log(`Total sample recipes to save: ${SAMPLE_RECIPES.length}`);
    
    // Clear existing recipes
    await AsyncStorage.setItem(RECIPES_KEY, JSON.stringify([]));
    console.log('Cleared existing recipes');
    
    // Save all sample recipes
    for (let i = 0; i < SAMPLE_RECIPES.length; i++) {
      const recipe = SAMPLE_RECIPES[i];
      console.log(`Saving recipe ${i + 1}/${SAMPLE_RECIPES.length}: ${recipe.name}`);
      
      // Create a fresh recipe object to avoid ID conflicts
      const freshRecipe = {
        ...recipe,
        id: Date.now().toString() + i, // Ensure unique ID
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [],
      };
      
      await saveRecipe(freshRecipe);
    }
    
    console.log('Sample data refreshed successfully');
    
    // Verify the saved recipes
    const savedRecipes = await getRecipes();
    console.log(`Verification: ${savedRecipes.length} recipes saved`);
    if (savedRecipes.length !== SAMPLE_RECIPES.length) {
      console.error(`Error: Expected ${SAMPLE_RECIPES.length} recipes but got ${savedRecipes.length}`);
    }
    
    return savedRecipes;
  } catch (error) {
    console.error('Error refreshing sample data:', error);
    throw error;
  }
};
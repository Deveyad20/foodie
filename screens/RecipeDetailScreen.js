// screens/RecipeDetailScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Share,
  Alert,
} from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useRecipes } from '../context/RecipeContext';
import { DIFFICULTY_LEVELS } from '../utils/constants';
import IngredientItem from '../components/IngredientItem';
import InstructionStep from '../components/InstructionStep';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

const RecipeDetailScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { handleToggleFavorite, favorites, updateRecipe } = useRecipes();
  const { recipe: initialRecipe } = route.params || {};
  const [recipe, setRecipe] = useState(initialRecipe || {});
  const [servings, setServings] = useState(recipe?.servings || 4);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const isFavorite = recipe?.id && favorites.includes(recipe.id);
  const difficulty = recipe?.difficulty ? DIFFICULTY_LEVELS[recipe.difficulty] : { label: 'Unknown', color: '#999' };
  
  // Helper function to properly handle image sources
  const getImageSource = (image) => {
    // Handle null/undefined
    if (!image) {
      return require('../assets/images/240_F_232418936.jpg');
    }
    
    // Handle numbers (require() results)
    if (typeof image === 'number') {
      return image;
    }
    
    // Handle existing image objects
    if (typeof image === 'object') {
      // Check if it's already a valid image source
      if (image.uri || image.uri === null) {
        return image;
      }
      // If it's an object but not a valid image source, use require()
      return require('../assets/images/240_F_232418936.jpg');
    }
    
    // Handle string URIs - treat all strings as URIs
    if (typeof image === 'string') {
      return { uri: image };
    }
    
    // Fallback for any other type
    return require('../assets/images/240_F_232418936.jpg');
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: recipe.name || 'Recipe Details',
      headerRight: () => (
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => recipe?.id && handleToggleFavorite(recipe.id)}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? theme.colors.primary : theme.colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleShare}
          >
            <Ionicons
              name="share-outline"
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, recipe.name, isFavorite, theme]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this recipe: ${recipe.name || 'Unknown Recipe'}\n\n${recipe.description || 'No description available'}`,
        url: typeof recipe.image === 'string' ? recipe.image : undefined,
      });
    } catch (error) {
      console.log('Share error:', error);
      // Don't show an alert for share cancellation, only for actual errors
      if (error.message !== 'User cancelled share') {
        Alert.alert('Error', 'Failed to share the recipe');
      }
    }
  };

  const handleIngredientToggle = (index) => {
    const newCheckedIngredients = [...checkedIngredients];
    const ingredientIndex = newCheckedIngredients.indexOf(index);
    
    if (ingredientIndex > -1) {
      newCheckedIngredients.splice(ingredientIndex, 1);
    } else {
      newCheckedIngredients.push(index);
    }
    
    setCheckedIngredients(newCheckedIngredients);
  };

  const handleServingsChange = (change) => {
    const newServings = Math.max(1, servings + change);
    setServings(newServings);
  };

  const handleLike = async () => {
    try {
      const updatedRecipe = {
        ...recipe,
        likes: (recipe.likes || 0) + 1,
      };
      
      await updateRecipe(updatedRecipe);
      setRecipe(updatedRecipe);
    } catch (error) {
      console.log('Like error:', error);
      Alert.alert('Error', 'Failed to like the recipe');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    imageContainer: {
      height: 250,
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 12,
    },
    videoContainer: {
      height: 250,
      position: 'relative',
    },
    playButton: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -25 }, { translateY: -25 }],
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      padding: theme.spacing.lg,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    description: {
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: theme.spacing.lg,
      lineHeight: 24,
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: theme.colors.border,
    },
    infoItem: {
      alignItems: 'center',
    },
    infoLabel: {
      fontSize: 12,
      color: theme.colors.placeholder,
      marginBottom: theme.spacing.xs,
    },
    infoValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    difficultyValue: {
      color: difficulty.color,
    },
    section: {
      marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    servingsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.md,
    },
    servingsControls: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    servingsButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    servingsValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginHorizontal: theme.spacing.md,
    },
    nutritionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: theme.spacing.md,
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.lg,
    },
    nutritionItem: {
      alignItems: 'center',
    },
    nutritionLabel: {
      fontSize: 12,
      color: theme.colors.placeholder,
      marginBottom: theme.spacing.xs,
    },
    nutritionValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.md,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.md,
    },
    actionButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginLeft: theme.spacing.sm,
    },
    headerButtons: {
      flexDirection: 'row',
      marginRight: theme.spacing.md,
    },
    headerButton: {
      marginLeft: theme.spacing.md,
    },
  });

  return (
    // WRAP the ScrollView in SafeAreaView
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {recipe.video ? (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: recipe.video }}
            style={styles.image}
            useNativeControls
            resizeMode="cover"
            isLooping
            shouldPlay={isPlaying}
            onPlaybackStatusUpdate={(status) => {
              if (status.isLoaded) {
                setIsPlaying(status.isPlaying);
              }
            }}
            onError={(error) => console.log('Video error:', error)}
          />
          {!isPlaying && (
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => setIsPlaying(true)}
            >
              <Ionicons name="play" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image
            source={getImageSource(recipe.image)}
            style={styles.image}
            resizeMode="cover"
            onError={(error) => console.log('Image error:', error)}
            defaultSource={require('../assets/images/240_F_232418936.jpg')}
          />
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{recipe.name || 'Untitled Recipe'}</Text>
        <Text style={styles.description}>{recipe.description || 'No description available'}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Prep Time</Text>
            <Text style={styles.infoValue}>{recipe.prepTime || 0} min</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Cook Time</Text>
            <Text style={styles.infoValue}>{recipe.cookTime || 0} min</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Difficulty</Text>
            <Text style={[styles.infoValue, styles.difficultyValue]}>
              {difficulty.label}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.servingsContainer}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.servingsControls}>
              <TouchableOpacity
                style={styles.servingsButton}
                onPress={() => handleServingsChange(-1)}
              >
                <Ionicons name="remove" size={16} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.servingsValue}>{servings} servings</Text>
              <TouchableOpacity
                style={styles.servingsButton}
                onPress={() => handleServingsChange(1)}
              >
                <Ionicons name="add" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {recipe.ingredients && Array.isArray(recipe.ingredients) && recipe.ingredients.map((ingredient, index) => (
            <IngredientItem
              key={index}
              ingredient={ingredient}
              isChecked={checkedIngredients.includes(index)}
              onToggle={() => handleIngredientToggle(index)}
              servings={servings}
              baseServings={recipe.servings || 4}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {recipe.instructions && Array.isArray(recipe.instructions) && recipe.instructions.map((step, index) => (
            <InstructionStep key={index} step={step} index={index} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nutrition Facts</Text>
          <View style={styles.nutritionContainer}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Calories</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition?.calories || 0}</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Protein</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition?.protein || 0}g</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Carbs</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition?.carbs || 0}g</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Fat</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition?.fat || 0}g</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Ionicons name="heart" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Like Recipe ({recipe.likes || 0})</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeDetailScreen;

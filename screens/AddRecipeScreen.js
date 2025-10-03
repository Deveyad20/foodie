// screens/AddRecipeScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../context/ThemeContext';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { DIFFICULTY_LEVELS } from '../utils/constants';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

const AddRecipeScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { addRecipe, updateRecipe, categories } = useRecipes();
  const { user } = useAuth();
  const isEditing = route.params?.recipe !== undefined;
  const initialRecipe = route.params?.recipe || {};

  // Request media library permissions
  React.useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Sorry, we need camera roll permissions to make this work!',
          [{ text: 'OK' }]
        );
      }
    })();
  }, []);

  // Debug logging when component mounts
  React.useEffect(() => {
    console.log('Component mounted. Initial recipe:', initialRecipe);
    console.log('Initial categoryId from route:', initialRecipe.categoryId);
    console.log('Current categoryId state:', categoryId);
  }, []);

  const [name, setName] = useState(initialRecipe.name || '');
  const [description, setDescription] = useState(initialRecipe.description || '');
  const [image, setImage] = useState(initialRecipe.image || '');
  const [video, setVideo] = useState(initialRecipe.video || '');
  const [categoryId, setCategoryId] = useState(initialRecipe.categoryId || '');
  
  // Debug logging for initial state
  console.log('Initial categoryId:', initialRecipe.categoryId);
  console.log('Initial categoryId state:', categoryId);
  
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
  
  // Debug logging when categoryId changes
  React.useEffect(() => {
    console.log('categoryId changed to:', categoryId);
  }, [categoryId]);
  const [prepTime, setPrepTime] = useState(initialRecipe.prepTime?.toString() || '');
  const [cookTime, setCookTime] = useState(initialRecipe.cookTime?.toString() || '');
  const [servings, setServings] = useState(initialRecipe.servings?.toString() || '4');
  const [difficulty, setDifficulty] = useState(initialRecipe.difficulty || 'EASY');
  const [ingredients, setIngredients] = useState(
    initialRecipe.ingredients || [{ name: '', quantity: '', unit: '' }]
  );
  const [instructions, setInstructions] = useState(
    initialRecipe.instructions || [{ text: '', image: '', video: '' }]
  );
  const [calories, setCalories] = useState(initialRecipe.nutrition?.calories?.toString() || '');
  const [protein, setProtein] = useState(initialRecipe.nutrition?.protein?.toString() || '');
  const [carbs, setCarbs] = useState(initialRecipe.nutrition?.carbs?.toString() || '');
  const [fat, setFat] = useState(initialRecipe.nutrition?.fat?.toString() || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Recipe' : 'Add Recipe',
    });
  }, [navigation, isEditing]);

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const handleVideoPicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setVideo(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking video:', error);
      Alert.alert('Error', 'Failed to pick video. Please try again.');
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const updateIngredient = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      const updatedIngredients = [...ingredients];
      updatedIngredients.splice(index, 1);
      setIngredients(updatedIngredients);
    }
  };

  const addInstruction = () => {
    setInstructions([...instructions, { text: '', image: '', video: '' }]);
  };

  const updateInstruction = (index, field, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index][field] = value;
    setInstructions(updatedInstructions);
  };

  const removeInstruction = (index) => {
    if (instructions.length > 1) {
      const updatedInstructions = [...instructions];
      updatedInstructions.splice(index, 1);
      setInstructions(updatedInstructions);
    }
  };

  const handleInstructionImagePicker = async (index) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        updateInstruction(index, 'image', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking instruction image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const handleInstructionVideoPicker = async (index) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        updateInstruction(index, 'video', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking instruction video:', error);
      Alert.alert('Error', 'Failed to pick video. Please try again.');
    }
  };

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a recipe name');
      return false;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a recipe description');
      return false;
    }

    if (!image) {
      Alert.alert('Error', 'Please select a recipe image');
      return false;
    }

    if (!categoryId) {
      console.log('Category validation failed. Selected categoryId:', categoryId);
      Alert.alert('Error', 'Please select a category');
      return false;
    }

    if (!prepTime || isNaN(prepTime) || parseInt(prepTime) <= 0) {
      Alert.alert('Error', 'Please enter a valid preparation time');
      return false;
    }

    if (!cookTime || isNaN(cookTime) || parseInt(cookTime) < 0) {
      Alert.alert('Error', 'Please enter a valid cooking time');
      return false;
    }

    if (!servings || isNaN(servings) || parseInt(servings) <= 0) {
      Alert.alert('Error', 'Please enter a valid number of servings');
      return false;
    }

    for (const ingredient of ingredients) {
      if (!ingredient.name.trim() || !ingredient.quantity || !ingredient.unit.trim()) {
        Alert.alert('Error', 'Please fill in all ingredient fields');
        return false;
      }
    }

    for (const instruction of instructions) {
      if (!instruction.text.trim()) {
        Alert.alert('Error', 'Please fill in all instruction text fields');
        return false;
      }
    }

    if (!calories || isNaN(calories) || parseInt(calories) < 0) {
      Alert.alert('Error', 'Please enter a valid calorie count');
      return false;
    }

    if (!protein || isNaN(protein) || parseInt(protein) < 0) {
      Alert.alert('Error', 'Please enter a valid protein amount');
      return false;
    }

    if (!carbs || isNaN(carbs) || parseInt(carbs) < 0) {
      Alert.alert('Error', 'Please enter a valid carb amount');
      return false;
    }

    if (!fat || isNaN(fat) || parseInt(fat) < 0) {
      Alert.alert('Error', 'Please enter a valid fat amount');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    console.log('Saving recipe. Current categoryId:', categoryId);
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    setIsSubmitting(true);

    try {
      const recipeData = {
        name,
        description,
        image,
        video,
        categoryId,
        prepTime: parseInt(prepTime),
        cookTime: parseInt(cookTime),
        servings: parseInt(servings),
        difficulty,
        ingredients: ingredients.map(ingredient => ({
          ...ingredient,
          quantity: parseFloat(ingredient.quantity),
        })),
        instructions,
        nutrition: {
          calories: parseInt(calories),
          protein: parseInt(protein),
          carbs: parseInt(carbs),
          fat: parseInt(fat),
        },
        userId: user?.id,
        dietary: [], // Can be extended to include dietary preferences
      };

      if (isEditing) {
        await updateRecipe({ ...recipeData, id: initialRecipe.id });
        Alert.alert('Success', 'Recipe updated successfully');
      } else {
        await addRecipe(recipeData);
        Alert.alert('Success', 'Recipe added successfully');
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error saving recipe:', error);
      Alert.alert('Error', 'Failed to save recipe');
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
      padding: theme.spacing.lg,
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
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      fontSize: 16,
      color: theme.colors.text,
      backgroundColor: theme.colors.card,
      marginBottom: theme.spacing.md,
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    imageContainer: {
      height: 200,
      borderRadius: theme.borderRadius.md,
      overflow: 'hidden',
      marginBottom: theme.spacing.md,
      backgroundColor: theme.colors.card,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    imagePlaceholder: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    imagePlaceholderText: {
      fontSize: 16,
      color: theme.colors.placeholder,
      marginTop: theme.spacing.sm,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.md,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.md,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginLeft: theme.spacing.sm,
    },
    categoryContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: theme.spacing.md,
    },
    categoryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      marginRight: theme.spacing.sm,
      marginBottom: theme.spacing.sm,
      borderRadius: theme.borderRadius.full,
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    selectedCategoryButton: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    categoryText: {
      fontSize: 14,
      color: theme.colors.text,
      marginLeft: theme.spacing.xs,
    },
    selectedCategoryText: {
      color: '#FFFFFF',
    },
    difficultyContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.md,
    },
    difficultyButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.sm,
      marginHorizontal: theme.spacing.xs,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    selectedDifficultyButton: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    difficultyText: {
      fontSize: 14,
      color: theme.colors.text,
      marginLeft: theme.spacing.xs,
    },
    selectedDifficultyText: {
      color: '#FFFFFF',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    halfInput: {
      flex: 1,
      marginRight: theme.spacing.sm,
    },
    ingredientContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    ingredientInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      fontSize: 16,
      color: theme.colors.text,
      backgroundColor: theme.colors.card,
      marginRight: theme.spacing.sm,
    },
    removeButton: {
      padding: theme.spacing.sm,
      justifyContent: 'center',
      alignItems: 'center',
    },
    instructionContainer: {
      marginBottom: theme.spacing.lg,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.md,
    },
    instructionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    instructionNumber: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    instructionNumberText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    instructionImageContainer: {
      height: 150,
      borderRadius: theme.borderRadius.md,
      overflow: 'hidden',
      marginBottom: theme.spacing.md,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    instructionImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    instructionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    instructionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.sm,
      marginHorizontal: theme.spacing.xs,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    saveButton: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.sm,
    },
    saveButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginLeft: theme.spacing.sm,
    },
    saveButtonContainer: {
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    saveButtonFull: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    saveButtonDisabled: {
      backgroundColor: theme.colors.disabled,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: 100 } // Add extra padding at bottom to ensure content is fully scrollable
        ]}
        showsVerticalScrollIndicator={true}
      >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Recipe Name"
          placeholderTextColor={theme.colors.placeholder}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Recipe Description"
          placeholderTextColor={theme.colors.placeholder}
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recipe Image</Text>
        <TouchableOpacity style={styles.imageContainer} onPress={handleImagePicker}>
          {image ? (
            <Image source={getImageSource(image)} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={40} color={theme.colors.placeholder} />
              <Text style={styles.imagePlaceholderText}>Tap to select an image</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recipe Video (Optional)</Text>
        <TouchableOpacity style={styles.button} onPress={handleVideoPicker}>
          <Ionicons name="videocam-outline" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Select Video</Text>
        </TouchableOpacity>
        {video && (
          <Text style={styles.input}>{video}</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Category</Text>
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                categoryId === category.id && styles.selectedCategoryButton,
              ]}
              onPress={() => {
                console.log('Category selected:', category.name, 'ID:', category.id);
                setCategoryId(category.id);
              }}
            >
              <Ionicons
                name={category.icon}
                size={16}
                color={
                  categoryId === category.id ? '#FFFFFF' : theme.colors.text
                }
              />
              <Text
                style={[
                  styles.categoryText,
                  categoryId === category.id && styles.selectedCategoryText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Time & Servings</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Prep Time (min)"
            placeholderTextColor={theme.colors.placeholder}
            value={prepTime}
            onChangeText={setPrepTime}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Cook Time (min)"
            placeholderTextColor={theme.colors.placeholder}
            value={cookTime}
            onChangeText={setCookTime}
            keyboardType="numeric"
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Servings"
          placeholderTextColor={theme.colors.placeholder}
          value={servings}
          onChangeText={setServings}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Difficulty</Text>
        <View style={styles.difficultyContainer}>
          {Object.keys(DIFFICULTY_LEVELS).map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.difficultyButton,
                difficulty === level && styles.selectedDifficultyButton,
              ]}
              onPress={() => setDifficulty(level)}
            >
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: DIFFICULTY_LEVELS[level].color,
                }}
              />
              <Text
                style={[
                  styles.difficultyText,
                  difficulty === level && styles.selectedDifficultyText,
                ]}
              >
                {DIFFICULTY_LEVELS[level].label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientContainer}>
            <TextInput
              style={styles.ingredientInput}
              placeholder="Ingredient Name"
              placeholderTextColor={theme.colors.placeholder}
              value={ingredient.name}
              onChangeText={(text) => updateIngredient(index, 'name', text)}
            />
            <TextInput
              style={[styles.ingredientInput, { flex: 0.5 }]}
              placeholder="Qty"
              placeholderTextColor={theme.colors.placeholder}
              value={ingredient.quantity}
              onChangeText={(text) => updateIngredient(index, 'quantity', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.ingredientInput, { flex: 0.5 }]}
              placeholder="Unit"
              placeholderTextColor={theme.colors.placeholder}
              value={ingredient.unit}
              onChangeText={(text) => updateIngredient(index, 'unit', text)}
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeIngredient(index)}
            >
              <Ionicons name="remove-circle-outline" size={24} color={theme.colors.error} />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={addIngredient}>
          <Ionicons name="add-outline" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Add Ingredient</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        {instructions.map((instruction, index) => (
          <View key={index} style={styles.instructionContainer}>
            <View style={styles.instructionHeader}>
              <View style={styles.instructionNumber}>
                <Text style={styles.instructionNumberText}>{index + 1}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeInstruction(index)}
              >
                <Ionicons name="remove-circle-outline" size={24} color={theme.colors.error} />
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Instruction Step"
              placeholderTextColor={theme.colors.placeholder}
              value={instruction.text}
              onChangeText={(text) => updateInstruction(index, 'text', text)}
              multiline
            />
            <TouchableOpacity
              style={styles.instructionImageContainer}
              onPress={() => handleInstructionImagePicker(index)}
            >
              {instruction.image ? (
                <Image source={getImageSource(instruction.image)} style={styles.instructionImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="image-outline" size={30} color={theme.colors.placeholder} />
                  <Text style={styles.imagePlaceholderText}>Tap to add image</Text>
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.instructionButtons}>
              <TouchableOpacity
                style={styles.instructionButton}
                onPress={() => handleInstructionImagePicker(index)}
              >
                <Ionicons name="image-outline" size={16} color={theme.colors.text} />
                <Text style={styles.categoryText}>Add Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.instructionButton}
                onPress={() => handleInstructionVideoPicker(index)}
              >
                <Ionicons name="videocam-outline" size={16} color={theme.colors.text} />
                <Text style={styles.categoryText}>Add Video</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={addInstruction}>
          <Ionicons name="add-outline" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Add Instruction Step</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nutrition Facts</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Calories"
            placeholderTextColor={theme.colors.placeholder}
            value={calories}
            onChangeText={setCalories}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Protein (g)"
            placeholderTextColor={theme.colors.placeholder}
            value={protein}
            onChangeText={setProtein}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Carbs (g)"
            placeholderTextColor={theme.colors.placeholder}
            value={carbs}
            onChangeText={setCarbs}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Fat (g)"
            placeholderTextColor={theme.colors.placeholder}
            value={fat}
            onChangeText={setFat}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Save Button at the bottom */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity
          style={[styles.saveButtonFull, isSubmitting && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Ionicons name="hourglass-outline" size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Saving...</Text>
            </>
          ) : (
            <>
              <Ionicons name="save-outline" size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>{isEditing ? 'Update Recipe' : 'Save Recipe'}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default AddRecipeScreen;




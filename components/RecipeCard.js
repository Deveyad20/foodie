// components/RecipeCard.js

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { DIFFICULTY_LEVELS } from '../utils/constants';

const { width: screenWidth } = Dimensions.get('window');

const RecipeCard = ({ recipe, onPress, onToggleFavorite, isFavorite, isFeatured = false, showOptions = false, onEdit, onDelete }) => {
  const { theme } = useTheme();
  const difficulty = DIFFICULTY_LEVELS[recipe.difficulty] || { label: 'Unknown', color: '#999' };

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

  // Calculate consistent card dimensions
  const cardWidth = isFeatured ? 280 : '100%'; // Full width for grid items
  const imageHeight = isFeatured ? 260 : 180;
  const titleHeight = isFeatured ? 40 : 35;
  const detailsHeight = 70; // Increased to accommodate spacing
  const cardHeight = imageHeight + titleHeight + detailsHeight + 20; // Added extra space for padding

  const styles = StyleSheet.create({
    card: {
      width: cardWidth,
      height: cardHeight,
      margin: isFeatured ? 8 : 0, // Remove margin for grid items
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.card,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: isFeatured ? 8 : 6,
      },
      shadowOpacity: isFeatured ? 0.4 : 0.35,
      shadowRadius: isFeatured ? 25 : 20,
      elevation: isFeatured ? 12 : 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: 'hidden',
      ...Platform.select({
        ios: {
          shadowOpacity: isFeatured ? 0.35 : 0.3,
          shadowRadius: isFeatured ? 25 : 20,
        },
      }),
    },
    imageContainer: {
      height: imageHeight,
      position: 'relative',
      overflow: 'hidden',
      borderRadius: theme.borderRadius.lg,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: theme.borderRadius.lg,
    },
    gradientOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: isFeatured ? '70%' : '65%',
      justifyContent: 'flex-end',
      padding: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
    },
    title: {
      fontSize: isFeatured ? theme.typography.h3.fontSize : theme.typography.h4.fontSize,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
      lineHeight: isFeatured ? theme.typography.h3.fontSize + 6 : theme.typography.h4.fontSize + 4,
      textAlign: 'center',
      zIndex: 20,
      flexShrink: 1,
      width: '100%',
    },
    categoryBadge: {
      position: 'absolute',
      top: theme.spacing.md,
      left: theme.spacing.md,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 3,
      zIndex: 15,
    },
    favoriteButton: {
      position: 'absolute',
      top: theme.spacing.md,
      right: theme.spacing.md,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
      zIndex: 15,
    },
    detailsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 0,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.card,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      minHeight: 50,
    },
    detailItem: {
      alignItems: 'center',
      flex: 1,
    },
    detailText: {
      fontSize: theme.typography.caption.fontSize,
      fontWeight: '600',
      color: theme.colors.text,
      marginTop: theme.spacing.xs,
      textAlign: 'center',
      opacity: 0.9,
    },
    icon: {
      color: theme.colors.primary,
      marginBottom: theme.spacing.sm,
    },
    difficultyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    difficultyText: {
      fontSize: theme.typography.caption.fontSize,
      fontWeight: '600',
      color: '#FFFFFF',
      marginLeft: theme.spacing.sm,
    },
    difficultyIcon: {
      width: isFeatured ? 20 : 16,
      height: isFeatured ? 20 : 16,
      borderRadius: isFeatured ? 10 : 8,
      backgroundColor: difficulty.color,
    },
    categoryIcon: {
      fontSize: theme.typography.caption.fontSize,
      color: theme.colors.primary,
      marginRight: theme.spacing.xs,
    },
    categoryText: {
      fontSize: theme.typography.caption.fontSize,
      fontWeight: '600',
      color: theme.colors.text,
    },
    optionsContainer: {
      position: 'absolute',
      bottom: theme.spacing.md,
      left: theme.spacing.md,
      right: theme.spacing.md,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: 16,
      padding: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 6,
      zIndex: 15,
    },
    optionButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    optionIcon: {
      fontSize: 20,
      fontWeight: '600',
    },
    editIcon: {
      color: theme.colors.primary,
    },
    deleteIcon: {
      color: '#FF5252',
    },
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(recipe)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={getImageSource(recipe.image)}
          style={styles.image}
          resizeMode="cover"
          onError={(error) => console.log('Image error:', error)}
          defaultSource={require('../assets/images/240_F_232418936.jpg')}
        />
        <LinearGradient
          colors={['transparent', isFeatured ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.9)']}
          style={styles.gradientOverlay}
        />
        
        {/* Options Buttons (Edit/Delete) - Only shown when showOptions is true */}
        {showOptions && (
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={(e) => {
                e.stopPropagation();
                onEdit && onEdit(recipe);
              }}
            >
              <Ionicons name="create-outline" size={18} style={[styles.optionIcon, styles.editIcon]} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={(e) => {
                e.stopPropagation();
                onDelete && onDelete(recipe.id);
              }}
            >
              <Ionicons name="trash-bin-outline" size={18} style={[styles.optionIcon, styles.deleteIcon]} />
            </TouchableOpacity>
          </View>
        )}
        
        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <Ionicons name={recipe.category?.icon || 'restaurant-outline'} size={12} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>{recipe.category?.name || 'Recipe'}</Text>
        </View>
        
        {/* Favorite Button - Only shown when not showing options */}
        {!showOptions && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={(e) => {
              e.stopPropagation();
              onToggleFavorite(recipe.id);
            }}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={20}
              color={isFavorite ? theme.colors.primary : '#666'}
            />
          </TouchableOpacity>
        )}
        
      </View>
      
      {/* Recipe Title */}
      <View style={{ paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.sm }}>
        <Text
          style={styles.title}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {recipe.name || 'Recipe Name'}
        </Text>
      </View>
      
      {/* Recipe Details */}
      <View style={[styles.detailsContainer, { paddingVertical: theme.spacing.sm }]}>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={isFeatured ? 20 : 18} style={styles.icon} />
          <Text style={styles.detailText}>{recipe.prepTime || '0'} min</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Ionicons name="flame-outline" size={isFeatured ? 20 : 18} style={styles.icon} />
          <Text style={styles.detailText}>{recipe.nutrition?.calories || '0'} cal</Text>
        </View>
        
        <View style={styles.detailItem}>
          <View style={styles.difficultyIcon} />
          <Text style={styles.difficultyText}>{difficulty.label || 'Easy'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard;

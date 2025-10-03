import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const IngredientItem = ({ ingredient, isChecked, onToggle, servings, baseServings }) => {
  const { theme } = useTheme();
  
  // Calculate adjusted quantity based on servings
  const adjustedQuantity = baseServings 
    ? (ingredient.quantity * servings) / baseServings 
    : ingredient.quantity;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.md,
    },
    checkedCheckbox: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    name: {
      flex: 1,
      fontSize: 16,
      color: isChecked ? theme.colors.disabled : theme.colors.text,
      textDecorationLine: isChecked ? 'line-through' : 'none',
    },
    quantity: {
      fontSize: 16,
      color: isChecked ? theme.colors.disabled : theme.colors.text,
      textDecorationLine: isChecked ? 'line-through' : 'none',
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={() => onToggle && onToggle()}>
      <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
        {isChecked && (
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        )}
      </View>
      <Text style={styles.name}>{ingredient.name}</Text>
      <Text style={styles.quantity}>
        {adjustedQuantity} {ingredient.unit}
      </Text>
    </TouchableOpacity>
  );
};

export default IngredientItem;
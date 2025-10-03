import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const CategoryCard = ({ category, onPress, isSelected }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      marginRight: theme.spacing.sm,
      marginBottom: theme.spacing.xs,
      borderRadius: theme.borderRadius.md,
      backgroundColor: isSelected
        ? theme.colors.primary
        : theme.colors.card,
      borderWidth: 1,
      borderColor: isSelected
        ? theme.colors.primary
        : theme.colors.border,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
      minWidth: 80,
      maxWidth: 120,
      ...Platform.select({
        ios: {
          shadowOpacity: 0.15,
        },
      }),
    },
    icon: {
      marginBottom: theme.spacing.xs,
      fontSize: theme.typography.h4.fontSize,
    },
    name: {
      fontSize: theme.typography.caption.fontSize,
      fontWeight: '600',
      color: isSelected ? '#FFFFFF' : theme.colors.text,
      textAlign: 'center',
      lineHeight: theme.typography.caption.fontSize + 2,
    },
    selectedIcon: {
      transform: [{ scale: 1.1 }],
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(category)}
      activeOpacity={0.7}
    >
      <Ionicons
        name={category.icon}
        size={22}
        color={isSelected ? '#FFFFFF' : theme.colors.primary}
        style={[styles.icon, isSelected && styles.selectedIcon]}
      />
      <Text style={styles.name} numberOfLines={1}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
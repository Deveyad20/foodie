import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const { width: screenWidth } = Dimensions.get('window');

const SearchBar = ({ value, onChangeText, onFilterPress }) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      paddingHorizontal: 16,
      marginHorizontal: 16,
      marginVertical: 12,
      borderWidth: 1,
      borderColor: isFocused ? theme.colors.primary : theme.colors.border,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      height: 56,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text,
      marginLeft: 12,
      fontFamily: 'System',
    },
    icon: {
      opacity: 0.6,
    },
    filterButton: {
      padding: 8,
      borderRadius: 12,
      backgroundColor: theme.colors.background,
      marginLeft: 8,
    },
    filterIcon: {
      opacity: 0.8,
    },
    clearButton: {
      padding: 8,
      marginLeft: 8,
    },
    clearIcon: {
      opacity: 0.6,
    },
  });

  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={20}
        color={theme.colors.placeholder}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder="Search recipes, ingredients, or cuisines..."
        placeholderTextColor={theme.colors.placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="search"
      />
      
      {value.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => onChangeText('')}
        >
          <Ionicons
            name="close-circle-outline"
            size={20}
            color={theme.colors.placeholder}
            style={styles.clearIcon}
          />
        </TouchableOpacity>
      )}
      
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <Ionicons
          name="filter-outline"
          size={20}
          color={theme.colors.primary}
          style={styles.filterIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
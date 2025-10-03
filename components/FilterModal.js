import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
// Import SafeAreaView
import { SafeAreaView } from 'react-native-safe-area-context';
import { DIETARY_PREFERENCES, DIFFICULTY_LEVELS, SORT_OPTIONS } from '../utils/constants';

const FilterModal = ({ visible, onClose, onApply, filters, sortBy }) => {
  const { theme } = useTheme();
  const [localFilters, setLocalFilters] = useState({
    dietary: filters.dietary || [],
    difficulty: filters.difficulty || null,
    maxPrepTime: filters.maxPrepTime || null,
  });
  const [localSortBy, setLocalSortBy] = useState(sortBy || 'prepTime');

  const handleDietaryToggle = (dietaryId) => {
    const updatedDietary = [...localFilters.dietary];
    const index = updatedDietary.indexOf(dietaryId);
    
    if (index > -1) {
      updatedDietary.splice(index, 1);
    } else {
      updatedDietary.push(dietaryId);
    }
    
    setLocalFilters({ ...localFilters, dietary: updatedDietary });
  };

  const handleDifficultyToggle = (difficulty) => {
    setLocalFilters({
      ...localFilters,
      difficulty: localFilters.difficulty === difficulty ? null : difficulty,
    });
  };

  const handleApply = () => {
    onApply({ filters: localFilters, sortBy: localSortBy });
    onClose();
  };

  const handleReset = () => {
    setLocalFilters({
      dietary: [],
      difficulty: null,
      maxPrepTime: null,
    });
    setLocalSortBy('prepTime');
  };

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: theme.colors.backdrop,
    },
    modalContent: {
      backgroundColor: theme.colors.card,
      borderTopLeftRadius: theme.borderRadius.xl,
      borderTopRightRadius: theme.borderRadius.xl,
      padding: theme.spacing.lg,
      maxHeight: '80%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    closeButton: {
      padding: theme.spacing.xs,
    },
    section: {
      marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    optionContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    option: {
      width: '48%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    selectedOption: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    optionText: {
      fontSize: 14,
      color: theme.colors.text,
      marginLeft: theme.spacing.sm,
    },
    selectedOptionText: {
      color: '#FFFFFF',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: theme.spacing.lg,
      gap: theme.spacing.md,
    },
    button: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    resetButton: {
      backgroundColor: theme.colors.background,
    },
    applyButton: {
      backgroundColor: theme.colors.primary,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    resetButtonText: {
      color: theme.colors.text,
    },
    applyButtonText: {
      color: '#FFFFFF',
    },
  });

  return (
        <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Filter & Sort</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dietary Preferences</Text>
              <View style={styles.optionContainer}>
                {DIETARY_PREFERENCES.map((diet) => (
                  <TouchableOpacity
                    key={diet.id}
                    style={[
                      styles.option,
                      localFilters.dietary.includes(diet.id) && styles.selectedOption,
                    ]}
                    onPress={() => handleDietaryToggle(diet.id)}
                  >
                    <Ionicons
                      name={diet.icon}
                      size={16}
                      color={
                        localFilters.dietary.includes(diet.id)
                          ? '#FFFFFF'
                          : theme.colors.text
                      }
                    />
                    <Text
                      style={[
                        styles.optionText,
                        localFilters.dietary.includes(diet.id) && styles.selectedOptionText,
                      ]}
                    >
                      {diet.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Difficulty</Text>
              <View style={styles.optionContainer}>
                {Object.keys(DIFFICULTY_LEVELS).map((difficulty) => (
                  <TouchableOpacity
                    key={difficulty}
                    style={[
                      styles.option,
                      localFilters.difficulty === difficulty && styles.selectedOption,
                    ]}
                    onPress={() => handleDifficultyToggle(difficulty)}
                  >
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        backgroundColor: DIFFICULTY_LEVELS[difficulty].color,
                      }}
                    />
                    <Text
                      style={[
                        styles.optionText,
                        localFilters.difficulty === difficulty && styles.selectedOptionText,
                      ]}
                    >
                      {DIFFICULTY_LEVELS[difficulty].label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              <View style={styles.optionContainer}>
                {SORT_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.option,
                      localSortBy === option.value && styles.selectedOption,
                    ]}
                    onPress={() => setLocalSortBy(option.value)}
                  >
                    <Ionicons
                      name="swap-vertical-outline"
                      size={16}
                      color={
                        localSortBy === option.value ? '#FFFFFF' : theme.colors.text
                      }
                    />
                    <Text
                      style={[
                        styles.optionText,
                        localSortBy === option.value && styles.selectedOptionText,
                      ]}
                    >
                      {option.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
              <Text style={[styles.buttonText, styles.resetButtonText]}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.applyButton]} onPress={handleApply}>
              <Text style={[styles.buttonText, styles.applyButtonText]}>Apply</Text>
            </TouchableOpacity>
          </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default FilterModal;
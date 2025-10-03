import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Video } from 'expo-video';
import { useTheme } from '../context/ThemeContext';

const InstructionStep = ({ step, index }) => {
  const { theme } = useTheme();
  
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

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: theme.spacing.lg,
    },
    stepNumber: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.md,
    },
    stepNumberText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    content: {
      flex: 1,
    },
    text: {
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
      lineHeight: 24,
    },
    media: {
      width: '100%',
      height: 200,
      borderRadius: theme.borderRadius.md,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{index + 1}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>{step.text}</Text>
        {step.image && (
          <Image source={getImageSource(step.image)} style={styles.media} resizeMode="cover" />
        )}
        {step.video && (
          <Video
            source={{ uri: step.video }}
            style={styles.media}
            useNativeControls
            resizeMode="cover"
            isLooping
          />
        )}
      </View>
    </View>
  );
};

export default InstructionStep;
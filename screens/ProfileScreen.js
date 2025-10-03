// screens/ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  TextInput, // <-- ADD THIS LINE
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Keep this for when the package is installed
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { user, updateUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');
  const [name, setName] = useState(user?.displayName || '');
  const [bio, setBio] = useState(user?.bio || '');
  
  // Helper function to properly handle image sources
  const getImageSource = (image) => {
    // Handle null/undefined
    if (!image) {
      return require('../assets/default-profile.jpg');
    }
    
    // Handle numbers (require() results)
    if (typeof image === 'number') {
      return image;
    }
    
    // Handle existing image objects
    if (typeof image === 'object') {
      // Check if it's already a valid image source
      if (image.uri) {
        return image;
      }
      // If it's an object but not a valid image source, use default
      return require('../assets/default-profile.jpg');
    }
    
    // Handle string URIs - only treat as URI if it starts with http, https, or data:
    if (typeof image === 'string') {
      if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:')) {
        return { uri: image };
      }
      // For other strings, use default image instead of trying to require dynamically
      console.warn(`Dynamic image require not supported: ${image}`);
      return require('../assets/default-profile.jpg');
    }
    
    // Fallback for any other type
    return require('../assets/default-profile.jpg');
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      const updatedUser = {
        ...user,
        profileImage,
        displayName: name,
        bio,
      };
      
      await updateUser(updatedUser);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: logout,
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      alignItems: 'center',
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.card,
    },
    profileImageContainer: {
      position: 'relative',
      marginBottom: theme.spacing.md,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    editImageButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    email: {
      fontSize: 16,
      color: theme.colors.placeholder,
      marginBottom: theme.spacing.md,
    },
    bio: {
      fontSize: 16,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.md,
    },
    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.full,
    },
    editButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginLeft: theme.spacing.xs,
    },
    content: {
      flex: 1,
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
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    menuItemText: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text,
      marginLeft: theme.spacing.md,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.md,
      backgroundColor: theme.colors.error,
      borderRadius: theme.borderRadius.md,
      marginTop: theme.spacing.lg,
    },
    logoutButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginLeft: theme.spacing.sm,
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={getImageSource(profileImage)}
            style={styles.profileImage}
          />
          {isEditing && (
            <TouchableOpacity
              style={styles.editImageButton}
              onPress={handleImagePicker}
            >
              <Ionicons name="camera" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
        
        {isEditing ? (
          <View style={{ width: '100%' }}>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              placeholderTextColor={theme.colors.placeholder}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Your Bio"
              placeholderTextColor={theme.colors.placeholder}
              value={bio}
              onChangeText={setBio}
              multiline
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={[styles.editButton, { backgroundColor: theme.colors.background, borderWidth: 1, borderColor: theme.colors.border }]}
                onPress={() => {
                  setIsEditing(false);
                  setName(user?.displayName || '');
                  setBio(user?.bio || '');
                  setProfileImage(user?.profileImage || '');
                }}
              >
                <Ionicons name="close" size={18} color={theme.colors.text} />
                <Text style={[styles.editButtonText, { color: theme.colors.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton} onPress={handleSave}>
                <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                <Text style={styles.editButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.name}>{user?.displayName || 'Foodie User'}</Text>
            <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
            {bio ? <Text style={styles.bio}>{bio}</Text> : null}
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Ionicons name="create-outline" size={18} color="#FFFFFF" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings-outline" size={24} color={theme.colors.text} />
            <Text style={styles.menuItemText}>Settings</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.placeholder} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={24} color={theme.colors.text} />
            <Text style={styles.menuItemText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.placeholder} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="lock-closed-outline" size={24} color={theme.colors.text} />
            <Text style={styles.menuItemText}>Privacy</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.placeholder} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={24} color={theme.colors.text} />
            <Text style={styles.menuItemText}>Help Center</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.placeholder} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="document-text-outline" size={24} color={theme.colors.text} />
            <Text style={styles.menuItemText}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.placeholder} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="shield-checkmark-outline" size={24} color={theme.colors.text} />
            <Text style={styles.menuItemText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.placeholder} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

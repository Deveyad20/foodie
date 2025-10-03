// screens/SettingsScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { DIETARY_PREFERENCES } from '../utils/constants';
import { getSettings, saveSettings } from '../services/StorageService';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = ({ navigation }) => {
  const { theme, isDarkMode, setIsDarkMode } = useTheme();
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    dietary: [],
    notifications: true,
    darkMode: isDarkMode,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    if (settings.darkMode !== isDarkMode) {
      setIsDarkMode(settings.darkMode);
    }
  }, [settings.darkMode, isDarkMode, setIsDarkMode]);

  const loadSettings = async () => {
    try {
      const loadedSettings = await getSettings();
      setSettings(loadedSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await saveSettings(settings);
      Alert.alert('Success', 'Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  const handleDietaryToggle = (dietaryId) => {
    const updatedDietary = [...settings.dietary];
    const index = updatedDietary.indexOf(dietaryId);
    if (index > -1) {
      updatedDietary.splice(index, 1);
    } else {
      updatedDietary.push(dietaryId);
    }
    setSettings({ ...settings, dietary: updatedDietary });
  };

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    content: { padding: theme.spacing.lg },
    section: { marginBottom: theme.spacing.lg },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text, marginBottom: theme.spacing.md },
    settingItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: theme.spacing.md, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
    settingLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    settingIcon: { marginRight: theme.spacing.md },
    settingText: { fontSize: 16, color: theme.colors.text },
    settingDescription: { fontSize: 14, color: theme.colors.placeholder, marginTop: theme.spacing.xs },
    dietaryContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: theme.spacing.md },
    dietaryItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.md, marginRight: theme.spacing.sm, marginBottom: theme.spacing.sm, borderRadius: theme.borderRadius.full, backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.border },
    selectedDietaryItem: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
    dietaryText: { fontSize: 14, color: theme.colors.text, marginLeft: theme.spacing.xs },
    selectedDietaryText: { color: '#FFFFFF' },
    saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: theme.spacing.md, backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.md, marginTop: theme.spacing.lg },
    saveButtonText: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', marginLeft: theme.spacing.sm },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon-outline" size={24} color={theme.colors.text} style={styles.settingIcon} />
              <View>
                <Text style={styles.settingText}>Dark Mode</Text>
                <Text style={styles.settingDescription}>Switch between light and dark theme</Text>
              </View>
            </View>
            <Switch value={settings.darkMode} onValueChange={(value) => setSettings({ ...settings, darkMode: value })} trackColor={{ false: theme.colors.border, true: theme.colors.primary }} thumbColor={settings.darkMode ? '#FFFFFF' : theme.colors.card} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dietary Preferences</Text>
          <Text style={styles.settingDescription}>Select your dietary preferences to personalize recipe recommendations</Text>
          <View style={styles.dietaryContainer}>
            {DIETARY_PREFERENCES.map((diet) => (
              <TouchableOpacity key={diet.id} style={[styles.dietaryItem, settings.dietary.includes(diet.id) && styles.selectedDietaryItem]} onPress={() => handleDietaryToggle(diet.id)}>
                <Ionicons name={diet.icon} size={16} color={settings.dietary.includes(diet.id) ? '#FFFFFF' : theme.colors.text} />
                <Text style={[styles.dietaryText, settings.dietary.includes(diet.id) && styles.selectedDietaryText]}>{diet.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" size={24} color={theme.colors.text} style={styles.settingIcon} />
              <View>
                <Text style={styles.settingText}>Push Notifications</Text>
                <Text style={styles.settingDescription}>Receive notifications about new recipes and updates</Text>
              </View>
            </View>
            <Switch value={settings.notifications} onValueChange={(value) => setSettings({ ...settings, notifications: value })} trackColor={{ false: theme.colors.border, true: theme.colors.primary }} thumbColor={settings.notifications ? '#FFFFFF' : theme.colors.card} />
          </View>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
          <Ionicons name="save-outline" size={20} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
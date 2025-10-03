// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './context/ThemeContext';
import { RecipeProvider } from './context/RecipeContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import AppNavigator from './navigation/AppNavigator';
import { initializeSampleData } from './utils/sampleData';

export default function App() {
  // Initialize sample data on app start
  React.useEffect(() => {
    initializeSampleData();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <RecipeProvider>
          <NotificationProvider>
            <NavigationContainer>
              <StatusBar style="auto" />
              <AppNavigator />
            </NavigationContainer>
          </NotificationProvider>
        </RecipeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
// navigation/AppNavigator.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MyFoodScreen from '../screens/MyFoodScreen';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// --- STACK NAVIGATORS ---
// Using inline options functions to avoid hook order issues.

const HomeStack = ({ theme }) => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="RecipeDetail"
      component={RecipeDetailScreen}
      options={{
        title: 'Recipe Details',
        headerStyle: { backgroundColor: theme.colors.card, shadowColor: 'transparent', elevation: 0 },
        headerTintColor: theme.colors.text,
        headerBackTitleVisible: false,
        headerBackImage: () => <Ionicons name="chevron-back" size={24} color={theme.colors.text} />,
      }}
    />
    <Stack.Screen
      name="Notifications"
      component={NotificationScreen}
      options={{
        title: 'Notifications',
        headerStyle: { backgroundColor: theme.colors.card, shadowColor: 'transparent', elevation: 0 },
        headerTintColor: theme.colors.text,
        headerBackTitleVisible: false,
        headerBackImage: () => <Ionicons name="chevron-back" size={24} color={theme.colors.text} />,
      }}
    />
  </Stack.Navigator>
);

const FavoritesStack = ({ theme }) => (
  <Stack.Navigator>
    <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="RecipeDetail"
      component={RecipeDetailScreen}
      options={{
        title: 'Recipe Details',
        headerStyle: { backgroundColor: theme.colors.card, shadowColor: 'transparent', elevation: 0 },
        headerTintColor: theme.colors.text,
        headerBackTitleVisible: false,
        headerBackImage: () => <Ionicons name="chevron-back" size={24} color={theme.colors.text} />,
      }}
    />
  </Stack.Navigator>
);

const MyFoodStack = ({ theme }) => (
  <Stack.Navigator>
    <Stack.Screen name="MyFoodScreen" component={MyFoodScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="AddRecipe"
      component={AddRecipeScreen}
      options={{
        title: 'Add Recipe',
        headerStyle: { backgroundColor: theme.colors.card, shadowColor: 'transparent', elevation: 0 },
        headerTintColor: theme.colors.text,
        headerBackTitleVisible: false,
        headerBackImage: () => <Ionicons name="chevron-back" size={24} color={theme.colors.text} />,
      }}
    />
    <Stack.Screen
      name="RecipeDetail"
      component={RecipeDetailScreen}
      options={{
        title: 'Edit Recipe',
        headerStyle: { backgroundColor: theme.colors.card, shadowColor: 'transparent', elevation: 0 },
        headerTintColor: theme.colors.text,
        headerBackTitleVisible: false,
        headerBackImage: () => <Ionicons name="chevron-back" size={24} color={theme.colors.text} />,
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = ({ theme }) => (
  <Stack.Navigator>
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        title: 'Settings',
        headerStyle: { backgroundColor: theme.colors.card, shadowColor: 'transparent', elevation: 0 },
        headerTintColor: theme.colors.text,
        headerBackTitleVisible: false,
        headerBackImage: () => <Ionicons name="chevron-back" size={24} color={theme.colors.text} />,
      }}
    />
  </Stack.Navigator>
);

// --- MAIN APP NAVIGATOR ---

const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Favorites') iconName = focused ? 'heart' : 'heart-outline';
            else if (route.name === 'MyFood') iconName = focused ? 'book' : 'book-outline';
            else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.disabled,
          tabBarStyle: {
            backgroundColor: theme.colors.card,
            borderTopColor: theme.colors.border,
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" options={{ title: 'Home' }}>
          {() => <HomeStack theme={theme} />}
        </Tab.Screen>
        <Tab.Screen name="Favorites" options={{ title: 'Favorites' }}>
          {() => <FavoritesStack theme={theme} />}
        </Tab.Screen>
        <Tab.Screen name="MyFood" options={{ title: 'My Food' }}>
          {() => <MyFoodStack theme={theme} />}
        </Tab.Screen>
        <Tab.Screen name="Profile" options={{ title: 'Profile' }}>
          {() => <ProfileStack theme={theme} />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default AppNavigator;
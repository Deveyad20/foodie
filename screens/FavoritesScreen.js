// screens/FavoritesScreen.js
import React, { useEffect, useState } from 'react'; // This is correct
// ... other imports

import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';

const FavoritesScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { recipes, favorites, isLoading, handleToggleFavorite, loadRecipes } = useRecipes();
  const { user } = useAuth();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const filtered = recipes.filter(recipe => favorites.includes(recipe.id));
    setFavoriteRecipes(filtered);
  }, [recipes, favorites]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadRecipes();
    setIsRefreshing(false);
  };

  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe });
  };

  const renderRecipeItem = ({ item }) => (
    <View style={styles.gridItem}>
      <RecipeCard
        recipe={item}
        onPress={handleRecipePress}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={favorites.includes(item.id)}
      />
    </View>
  );

  // Component for the app bar
  const renderAppBar = () => (
    <View style={styles.appBar}>
      <View style={styles.appBarContent}>
        <Text style={styles.appBarTitle}>My Favorites</Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <EmptyState
        icon="heart-outline"
        title="No Favorites Yet"
        message="Start adding recipes to your favorites to see them here."
      />
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    appBar: {
      backgroundColor: theme.colors.card,
      paddingTop: StatusBar.currentHeight || 0,
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    appBarContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    appBarTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    listContainer: {
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.xxl,
      paddingHorizontal: theme.spacing.md,
    },
    gridList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    gridItem: {
      width: '48%', // 48% width with 2% margin for spacing
      marginBottom: theme.spacing.md, // Vertical spacing between cards
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '20%',
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      {/* App Bar */}
      {renderAppBar()}
      
      {favoriteRecipes.length > 0 ? (
        <FlatList
          data={favoriteRecipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          columnWrapperStyle={styles.gridList}
          key="favorites-grid"
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmptyState()
      )}
    </View>
  );
};

export default FavoritesScreen;
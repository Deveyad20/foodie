import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Text,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import RecipeCard from '../components/RecipeCard';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';

const MyFoodScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { recipes, isLoading, removeRecipe, loadRecipes, favorites, handleToggleFavorite } = useRecipes();
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [myRecipes, setMyRecipes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const filtered = recipes.filter(recipe => recipe.userId === user?.id);
    setMyRecipes(filtered);
  }, [recipes, user]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadRecipes();
    setIsRefreshing(false);
  };

  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe });
  };

  const handleAddRecipe = () => {
    navigation.navigate('AddRecipe');
  };

  const handleDeleteRecipe = (recipeId) => {
    Alert.alert(
      'Delete Recipe',
      'Are you sure you want to delete this recipe? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeRecipe(recipeId);
              addNotification({
                title: 'Recipe Deleted',
                message: 'Recipe has been deleted successfully',
                type: 'success',
              });
            } catch (error) {
              addNotification({
                title: 'Delete Failed',
                message: 'Failed to delete recipe. Please try again.',
                type: 'error',
              });
            }
          },
        },
      ]
    );
  };

  const renderRecipeItem = ({ item }) => (
    <View style={styles.gridItem}>
      <RecipeCard
        recipe={item}
        onPress={handleRecipePress}
        showOptions={true}
        isFavorite={favorites.includes(item.id)}
        onToggleFavorite={() => handleToggleFavorite(item.id)}
        onEdit={() => {
          console.log('Edit recipe:', item.id);
          navigation.navigate('AddRecipe', { recipe: item });
        }}
        onDelete={() => {
          console.log('Delete recipe:', item.id);
          handleDeleteRecipe(item.id);
        }}
      />
    </View>
  );

  // Component for the app bar
  const renderAppBar = () => (
    <View style={styles.appBar}>
      <View style={styles.appBarContent}>
        <Text style={styles.appBarTitle}>My Food</Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <EmptyState
        icon="book-outline"
        title="No Recipes Yet"
        message="Create your own recipes to build your personal cookbook."
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
    fab: {
      position: 'absolute',
      bottom: theme.spacing.xl,
      right: theme.spacing.lg,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      {/* App Bar */}
      {renderAppBar()}
      
      {myRecipes.length > 0 ? (
        <FlatList
          data={myRecipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          columnWrapperStyle={styles.gridList}
          key="myfood-grid"
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

      <TouchableOpacity style={styles.fab} onPress={handleAddRecipe}>
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default MyFoodScreen;


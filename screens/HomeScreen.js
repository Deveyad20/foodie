// screens/HomeScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useRecipes } from '../context/RecipeContext';
import { refreshSampleData } from '../utils/sampleData';
import RecipeCard from '../components/RecipeCard';
import CategoryCard from '../components/CategoryCard';
import SearchBar from '../components/SearchBar';
import FilterModal from '../components/FilterModal';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const {
    recipes,
    categories,
    favorites,
    isLoading,
    searchQuery,
    selectedCategory,
    filters,
    sortBy,
    setSearchQuery,
    setSelectedCategory,
    setFilters,
    setSortBy,
    handleToggleFavorite,
    getFilteredRecipes,
    loadRecipes,
  } = useRecipes();

  // Add custom categories for My Food, My Favorites, and Tap All
  const customCategories = [
    { id: 'tap-all', name: 'All', icon: 'grid-outline' },
    { id: 'my-food', name: 'My Food', icon: 'book-outline' },
    { id: 'my-favorites', name: 'My Favorites', icon: 'heart-outline' },
  ];
  
  // State for notification count
  const [notificationCount, setNotificationCount] = useState(5);
  
  // Combine custom categories with existing categories
  const allCategories = [...customCategories, ...categories];

  // State for managing the list of recipes to display
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  // State for showing/hiding the filter modal
  const [showFilterModal, setShowFilterModal] = useState(false);
  // State for featured recipes
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;
  // State for tracking if there are more recipes to load
  const [hasMore, setHasMore] = useState(true);

  // Update the filtered recipes whenever dependencies change
  useEffect(() => {
    let filtered = getFilteredRecipes();
    
    // Apply special category filters
    if (selectedCategory?.id === 'my-favorites') {
      filtered = filtered.filter(recipe => favorites.includes(recipe.id));
    } else if (selectedCategory?.id === 'my-food') {
      // Filter to show only user's recipes (assuming they have a property like isMyRecipe)
      filtered = filtered.filter(recipe => recipe.isMyRecipe || recipe.userId === 'current-user');
    }
    
    setFilteredRecipes(filtered);
    // Reset pagination to first page when filters change
    setCurrentPage(1);
    // Set featured recipes (first 4 recipes)
    setFeaturedRecipes(filtered.slice(0, 4));
  }, [recipes, searchQuery, selectedCategory, filters, sortBy, favorites]);

  // Function to handle manual refresh of data
  const handleRefreshData = async () => {
    try {
      await refreshSampleData();
      await loadRecipes();
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  // Function to navigate to the recipe detail screen
  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe });
  };

  // Function to handle category selection
  const handleCategoryPress = (category) => {
    // Handle special categories
    if (category.id === 'tap-all') {
      // Show all categories by clearing the selected category
      setSelectedCategory(null);
      return;
    }
    
    if (category.id === 'my-favorites') {
      // Navigate to Favorites tab
      navigation.navigate('Favorites');
      return;
    }
    
    if (category.id === 'my-food') {
      // Navigate to My Food tab
      setSelectedCategory(null); // Clear any selected category
      navigation.navigate('MyFood');
      return;
    }
    
    // Handle regular categories
    setSelectedCategory(selectedCategory?.id === category.id ? null : category);
  };

  // Function to apply filters from the modal
  const handleFilterApply = ({ filters: newFilters, sortBy: newSortBy }) => {
    setFilters(newFilters);
    setSortBy(newSortBy);
  };

  // Component for the featured recipes section
  const renderFeaturedSection = () => (
    <View style={styles.featuredContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Recipes</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={featuredRecipes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={handleRecipePress}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={favorites.includes(item.id)}
            isFeatured={true}
          />
        )}
        contentContainerStyle={styles.featuredList}
      />
    </View>
  );

  // Component for the app bar
  const renderAppBar = () => (
    <View style={styles.appBar}>
      <View style={styles.appBarContent}>
        <Text style={styles.appBarTitle}>Foodie</Text>
        <View style={styles.appBarActions}>
          <TouchableOpacity style={styles.notificationButton} onPress={handleNotificationPress}>
            <Ionicons name="notifications-outline" size={24} color={theme.colors.text} />
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>
                  {notificationCount > 99 ? '99+' : notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Component for the header section
  const renderHeader = () => (
    <View>
      {/* App Bar */}
      {renderAppBar()}
      
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFilterPress={() => setShowFilterModal(true)}
      />

      {/* Horizontal Categories List */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={allCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryCard
              category={item}
              onPress={handleCategoryPress}
              isSelected={selectedCategory?.id === item.id}
            />
          )}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
    </View>
  );

  // Component for rendering each recipe item in a grid
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

  // Function to get recipes for current page
  const getCurrentPageRecipes = () => {
    const startIndex = (currentPage - 1) * recipesPerPage;
    const endIndex = startIndex + recipesPerPage;
    return filteredRecipes.slice(startIndex, endIndex);
  };

  // Function to check if there are more recipes to load
  const hasMoreRecipes = () => {
    return currentPage * recipesPerPage < filteredRecipes.length;
  };

  // Function to calculate total number of pages
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  
  // Function to go to the previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };
  
  // Function to go to the next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };
  
  // Function to go to a specific page
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  // Component for rendering pagination controls
  const renderPaginationControls = () => {
    if (totalPages <= 1) return null;
    
    // Calculate which page numbers to show
    let pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are fewer than maxVisiblePages
      pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Show ellipsis for large page counts
      if (currentPage <= 3) {
        pageNumbers = [1, 2, 3, 4, '...', totalPages];
      } else if (currentPage >= totalPages - 2) {
        pageNumbers = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pageNumbers = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }
    
    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.paginationButton, currentPage === 1 && styles.paginationButtonDisabled]}
          onPress={goToPreviousPage}
          disabled={currentPage === 1}
        >
          <Ionicons name="chevron-back-outline" size={20} color={currentPage === 1 ? theme.colors.disabled : theme.colors.text} />
        </TouchableOpacity>
        
        <View style={styles.pageNumbersContainer}>
          {pageNumbers.map((page, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.pageNumber,
                currentPage === page && styles.pageNumberActive,
                page === '...' && styles.pageNumberEllipsis
              ]}
              onPress={() => typeof page === 'number' && goToPage(page)}
              disabled={page === '...' || currentPage === page}
            >
              {page === '...' ? (
                <Text style={styles.pageNumberEllipsisText}>...</Text>
              ) : (
                <Text style={[styles.pageNumberText, currentPage === page && styles.pageNumberTextActive]}>
                  {page}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity
          style={[styles.paginationButton, currentPage === totalPages && styles.paginationButtonDisabled]}
          onPress={goToNextPage}
          disabled={currentPage === totalPages}
        >
          <Ionicons name="chevron-forward-outline" size={20} color={currentPage === totalPages ? theme.colors.disabled : theme.colors.text} />
        </TouchableOpacity>
      </View>
    );
  };

  // Function to handle notification press
  const handleNotificationPress = () => {
    // Navigate to notifications screen
    navigation.navigate('Notifications');
  };

  // Styles for the component
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
    notificationButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    notificationBadge: {
      position: 'absolute',
      top: -5,
      right: -5,
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    notificationBadgeText: {
      color: '#FFFFFF',
      fontSize: 10,
      fontWeight: 'bold',
      textAlign: 'center',
      lineHeight: 12,
    },
    categoriesContainer: {
      marginBottom: theme.spacing.lg,
    },
    categoriesList: {
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
    },
    featuredContainer: {
      marginHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.xxl, // Increased space between Featured section and cards
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    seeAllText: {
      fontSize: 14,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    featuredList: {
      paddingLeft: 4,
    },
    gridContainer: {
      paddingHorizontal: 0,
      paddingBottom: theme.spacing.xxl,
    },
    gridList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.md,
    },
    gridItem: {
      width: '48%', // 48% width with 2% margin for spacing
      marginBottom: theme.spacing.md, // Adjusted vertical spacing between cards
    },
    loadingIndicator: {
      paddingVertical: 20,
    },
    sectionContainer: {
      marginHorizontal: 0,
      marginBottom: theme.spacing.xl,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: theme.spacing.md,
      fontSize: 16,
      color: theme.colors.text,
      opacity: 0.7,
    },
    loadMoreButton: {
      marginVertical: theme.spacing.lg,
      marginHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadMoreText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    paginationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.md,
    },
    paginationButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.card,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: theme.spacing.sm,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    paginationButtonDisabled: {
      opacity: 0.5,
    },
    pageNumbersContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    pageNumber: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.card,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: theme.spacing.sm / 2,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    pageNumberActive: {
      backgroundColor: theme.colors.primary,
    },
    pageNumberText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
    },
    pageNumberTextActive: {
      color: '#FFFFFF',
    },
    pageNumberEllipsis: {
      paddingHorizontal: theme.spacing.sm,
    },
    pageNumberEllipsisText: {
      fontSize: 14,
      color: theme.colors.text,
      opacity: 0.7,
    },
  });

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Main component render
  return (
    <View style={styles.container}>
      {filteredRecipes.length > 0 ? (
        // Show FlatList if there are recipes to display
        <FlatList
          data={getCurrentPageRecipes()}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View>
              {renderHeader()}
              {featuredRecipes.length > 0 && (
                <View style={styles.sectionContainer}>
                  {renderFeaturedSection()}
                </View>
              )}
            </View>
          }
          contentContainerStyle={styles.gridContainer}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.gridList}
          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={11}
          updateCellsBatchingPeriod={50}
          ListFooterComponent={
            renderPaginationControls()
          }
        />
      ) : (
        // Show EmptyState if there are no recipes
        <View style={{ flex: 1 }}>
          {renderHeader()}
          <EmptyState
            icon="restaurant-outline"
            title="No Recipes Found"
            message="Try adjusting your search or filters to find what you're looking for."
          />
        </View>
      )}

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleFilterApply}
        filters={filters}
        sortBy={sortBy}
      />
    </View>
  );
};

export default HomeScreen;

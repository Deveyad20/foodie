// screens/NotificationScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useNotification } from '../context/NotificationContext';
import NotificationCard from '../components/NotificationCard';
import EmptyState from '../components/EmptyState';

const NotificationScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const {
    notifications,
    unreadCount,
    filter,
    setFilter,
    clearAllNotifications,
    getFilteredNotifications,
    NOTIFICATION_TYPES,
  } = useNotification();

  const [refreshing, setRefreshing] = useState(false);

  const filteredNotifications = getFilteredNotifications();

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => clearAllNotifications(),
        },
      ]
    );
  };

  const handleNotificationPress = (notification) => {
    if (notification.data?.recipeId) {
      // Navigate to recipe detail
      navigation.navigate('RecipeDetail', { recipe: { id: notification.data.recipeId } });
    }
  };

  const renderFilterButton = (filterType, label, icon) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filter === filterType && {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        },
      ]}
      onPress={() => setFilter(filterType)}
    >
      <Ionicons
        name={icon}
        size={18}
        color={filter === filterType ? '#FFFFFF' : theme.colors.text}
      />
      <Text
        style={[
          styles.filterButtonText,
          filter === filterType && { color: '#FFFFFF' },
        ]}
      >
        {label}
      </Text>
      {filterType === 'unread' && unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <EmptyState
      icon="notifications-outline"
      title="No Notifications"
      message={
        filter === 'unread'
          ? "You don't have any unread notifications"
          : "You're all caught up! No notifications to show."
      }
      buttonTitle={filter === 'unread' ? 'View All' : null}
      onButtonPress={() => setFilter('all')}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.unreadCountContainer}>
              <Text style={styles.unreadCountText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearAll}
          disabled={notifications.length === 0}
        >
          <Ionicons
            name="trash-bin-outline"
            size={18}
            color={notifications.length === 0 ? theme.colors.disabled : theme.colors.error}
          />
          <Text
            style={[
              styles.clearButtonText,
              notifications.length === 0 && { color: theme.colors.disabled },
            ]}
          >
            Clear All
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {renderFilterButton('all', 'All', 'notifications-outline')}
        {renderFilterButton('unread', 'Unread', 'mail-unread')}
        {renderFilterButton('read', 'Read', 'mail-open')}
      </View>
    </View>
  );

  const renderNotification = ({ item }) => (
    <NotificationCard
      notification={item}
      onPress={handleNotificationPress}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        ListHeaderComponentStyle={[styles.stickyHeader, {
          backgroundColor: theme.colors.card,
          borderBottomColor: theme.colors.border,
          shadowColor: theme.colors.shadow,
        }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  stickyHeader: {
    zIndex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginRight: 8,
  },
  unreadCountContainer: {
    backgroundColor: '#FF6B6B',
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F44336',
    marginLeft: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 6,
  },
  unreadBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF6B6B',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  unreadBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default NotificationScreen;
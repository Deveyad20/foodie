// context/NotificationContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTheme } from './ThemeContext';

// Notification types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

// Notification actions
export const NOTIFICATION_ACTIONS = {
  MARK_AS_READ: 'mark_as_read',
  MARK_AS_UNREAD: 'mark_as_unread',
  DELETE: 'delete',
  CLEAR_ALL: 'clear_all',
};

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState('all'); // all, unread, read

  // Initialize with sample notifications
  useEffect(() => {
    const sampleNotifications = [
      {
        id: '1',
        title: 'New Recipe Available',
        message: 'Check out the latest recipe: "Chocolate Cake Recipe"',
        type: NOTIFICATION_TYPES.INFO,
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        isRead: false,
        data: { recipeId: 'recipe123' },
      },
      {
        id: '2',
        title: 'Recipe Saved',
        message: 'Your recipe "Pasta Carbonara" has been saved successfully',
        type: NOTIFICATION_TYPES.SUCCESS,
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        isRead: true,
        data: { recipeId: 'recipe456' },
      },
      {
        id: '3',
        title: 'Reminder',
        message: "Don't forget to rate the recipes you've tried this week",
        type: NOTIFICATION_TYPES.WARNING,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        isRead: false,
        data: {},
      },
      {
        id: '4',
        title: 'Error',
        message: 'Failed to sync your recipes. Please check your connection',
        type: NOTIFICATION_TYPES.ERROR,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        isRead: true,
        data: {},
      },
    ];
    
    setNotifications(sampleNotifications);
    updateUnreadCount(sampleNotifications);
  }, []);

  const updateUnreadCount = (notificationList) => {
    const count = notificationList.filter(notification => !notification.isRead).length;
    setUnreadCount(count);
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false,
      ...notification,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    updateUnreadCount([newNotification, ...notifications]);
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
    updateUnreadCount(notifications.filter(n => n.id !== id || n.isRead));
  };

  const markAsUnread = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: false }
          : notification
      )
    );
    updateUnreadCount([...notifications, { id, isRead: false }]);
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    updateUnreadCount(notifications.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const getFilteredNotifications = () => {
    switch (filter) {
      case 'unread':
        return notifications.filter(notification => !notification.isRead);
      case 'read':
        return notifications.filter(notification => notification.isRead);
      default:
        return notifications;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return 'checkmark-circle-outline';
      case NOTIFICATION_TYPES.WARNING:
        return 'alert-circle-outline';
      case NOTIFICATION_TYPES.ERROR:
        return 'close-circle-outline';
      default:
        return 'information-circle-outline';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return theme.colors.success;
      case NOTIFICATION_TYPES.WARNING:
        return theme.colors.warning;
      case NOTIFICATION_TYPES.ERROR:
        return theme.colors.error;
      default:
        return theme.colors.info;
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return new Date(timestamp).toLocaleDateString();
  };

  const value = {
    notifications,
    unreadCount,
    filter,
    setFilter,
    addNotification,
    markAsRead,
    markAsUnread,
    deleteNotification,
    clearAllNotifications,
    getFilteredNotifications,
    getNotificationIcon,
    getNotificationColor,
    formatTimeAgo,
    NOTIFICATION_TYPES,
    NOTIFICATION_ACTIONS,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
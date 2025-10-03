// components/NotificationCard.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useNotification as useNotificationContext } from '../context/NotificationContext';

const NotificationCard = ({ notification, onPress }) => {
  const { theme } = useTheme();
  const { markAsRead, deleteNotification, getNotificationIcon, getNotificationColor, formatTimeAgo } = useNotificationContext();

  const handlePress = () => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    onPress?.(notification);
  };

  const handleLongPress = () => {
    deleteNotification(notification.id);
  };

  const icon = getNotificationIcon(notification.type);
  const iconColor = getNotificationColor(notification.type);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: theme.spacing.md,
      backgroundColor: notification.isRead ? theme.colors.card : theme.colors.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      ...Platform.select({
        ios: {
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
        },
      }),
    },
    unreadIndicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.primary,
      marginRight: theme.spacing.md,
      marginTop: theme.spacing.md,
    },
    contentContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: `${iconColor}20`,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.md,
    },
    icon: {
      color: iconColor,
      fontSize: 20,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: theme.typography.h4.fontSize,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    message: {
      fontSize: theme.typography.body2.fontSize,
      color: theme.colors.placeholder,
      lineHeight: theme.typography.body2.fontSize + 4,
      marginBottom: theme.spacing.sm,
    },
    timestamp: {
      fontSize: theme.typography.caption.fontSize,
      color: theme.colors.disabled,
      alignSelf: 'flex-flex-start',
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: theme.spacing.sm,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: theme.spacing.md,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 16,
      backgroundColor: `${theme.colors.primary}10`,
    },
    actionIcon: {
      color: theme.colors.primary,
      fontSize: 16,
      marginRight: 4,
    },
    actionText: {
      fontSize: theme.typography.caption.fontSize,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    deleteButton: {
      padding: 8,
      borderRadius: 16,
      backgroundColor: `${theme.colors.error}10`,
    },
    deleteIcon: {
      color: theme.colors.error,
      fontSize: 18,
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      {!notification.isRead && <View style={styles.unreadIndicator} />}
      
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} style={styles.icon} />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.message} numberOfLines={2}>
            {notification.message}
          </Text>
          <Text style={styles.timestamp}>{formatTimeAgo(notification.timestamp)}</Text>
          
          {notification.data?.recipeId && (
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="restaurant-outline" style={styles.actionIcon} />
                <Text style={styles.actionText}>View Recipe</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={(e) => {
          e.stopPropagation();
          deleteNotification(notification.id);
        }}
      >
        <Ionicons name="trash-bin-outline" style={styles.deleteIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default NotificationCard;
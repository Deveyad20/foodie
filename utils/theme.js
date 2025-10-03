export const lightTheme = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#333333',
    border: '#E0E0E0',
    notification: '#FF6B6B',
    error: '#F44336',
    success: '#4CAF50',
    warning: '#FF9800',
    info: '#2196F3',
    disabled: '#BDBDBD',
    placeholder: '#9E9E9E',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      fontFamily: 'System',
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
      fontFamily: 'System',
    },
    h3: {
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'System',
    },
    h4: {
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'System',
    },
    body1: {
      fontSize: 16,
      fontWeight: 'normal',
      fontFamily: 'System',
    },
    body2: {
      fontSize: 14,
      fontWeight: 'normal',
      fontFamily: 'System',
    },
    caption: {
      fontSize: 12,
      fontWeight: 'normal',
      fontFamily: 'System',
    },
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#FF8A80',
    secondary: '#80DEEA',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    border: '#333333',
    placeholder: '#AAAAAA',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};
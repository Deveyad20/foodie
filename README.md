# Foodie - Recipe Management App

![Foodie App Logo](assets/icon.png)

A modern, feature-rich recipe management application built with React Native and Expo. Foodie helps users discover, save, organize, and share their favorite recipes with an intuitive and beautiful interface.

## 🌟 Features

### Core Functionality
- **Recipe Discovery**: Browse through a diverse collection of recipes with beautiful images
- **Search & Filter**: Find recipes by name, ingredients, or dietary preferences
- **Categories**: Organize recipes by type (Appetizers, Salads, Main Dishes, Desserts, Drinks, etc.)
- **Favorites**: Save and quickly access your favorite recipes
- **Personal Recipes**: Add and manage your own custom recipes
- **Smart Filtering**: Filter by dietary preferences, difficulty level, and preparation time
- **Sorting Options**: Sort recipes by preparation time, popularity, difficulty, or calories

### User Experience
- **Responsive Design**: Optimized for both iOS and Android devices
- **Dark/Light Mode**: Theme switching for comfortable viewing in any environment
- **Offline Support**: Access your recipes without an internet connection
- **Notifications**: Stay updated with recipe recommendations and updates
- **Pagination**: Efficiently browse through large recipe collections

### Recipe Details
- **Complete Information**: Each recipe includes ingredients, step-by-step instructions, and nutritional information
- **Visual Guides**: High-quality images to help visualize the final dish
- **Nutritional Data**: Calorie counts and macronutrient information
- **Preparation Details**: Cooking time, difficulty level, and serving sizes

## 📱 Screenshots

<!-- Add screenshots here when available -->
*Home Screen with Recipe Grid*
*Recipe Detail View*
*Favorites Collection*
*Add New Recipe Form*

## 🛠️ Technology Stack

### Core Technologies
- **React Native**: Cross-platform mobile application framework
- **Expo**: Development platform and tooling for React Native apps
- **JavaScript**: Primary programming language

### Navigation & UI
- **React Navigation**: Navigation library for managing app screens
- **React Native Elements**: UI component library
- **React Native Paper**: Material Design components
- **React Native Vector Icons**: Icon library
- **Expo Linear Gradient**: Gradient effects for UI elements

### State Management
- **React Context API**: Global state management for themes, recipes, and user data
- **AsyncStorage**: Local data persistence

### Data & Storage
- **Firebase**: Backend services (authentication, database)
- **SQLite**: Local database for offline functionality
- **AsyncStorage**: Key-value storage for preferences and settings

### Media & Assets
- **Expo AV**: Audio and video handling
- **Expo Image Picker**: Image selection and management
- **Expo Video**: Video playback capabilities

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (for iOS development) or Android Emulator (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/foodie-app.git
   cd foodie-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on your device or emulator**
   - For iOS: `npm run ios` or press `i` in the Expo CLI
   - For Android: `npm run android` or press `a` in the Expo CLI
   - For Web: `npm run web` or press `w` in the Expo CLI

### Project Structure

```
foodie/
├── assets/                 # App assets (images, icons, etc.)
├── components/             # Reusable UI components
├── context/                # React contexts for state management
├── navigation/             # Navigation configuration
├── screens/                # Application screens
├── services/               # API and data services
├── utils/                  # Utility functions and constants
├── App.js                  # Main app component
├── app.json                # Expo app configuration
├── index.js                # App entry point
└── package.json            # Project dependencies and scripts
```

## 📁 Key Components

### Screens
- **HomeScreen**: Main recipe browsing interface with search and filtering
- **RecipeDetailScreen**: Detailed view of individual recipes
- **FavoritesScreen**: Collection of saved favorite recipes
- **MyFoodScreen**: Personal recipe management
- **AddRecipeScreen**: Form for adding new recipes
- **ProfileScreen**: User profile and settings
- **SettingsScreen**: App configuration options
- **NotificationScreen**: Notifications and updates

### Components
- **RecipeCard**: Displays recipe information in a card format
- **CategoryCard**: Category selection interface
- **SearchBar**: Search functionality with filters
- **FilterModal**: Advanced filtering options
- **EmptyState**: Empty collection placeholders
- **LoadingSpinner**: Loading indicators

### Context Providers
- **RecipeProvider**: Manages recipe data and operations
- **ThemeProvider**: Handles app theming
- **AuthProvider**: User authentication state
- **NotificationProvider**: Notification management

## 🔧 Configuration

### Environment Setup
Create a `.env` file in the root directory for environment-specific configurations:

```env
API_KEY=your_api_key_here
FIREBASE_CONFIG=your_firebase_config
```

### Customization
- **Theme Colors**: Modify `utils/theme.js` to customize the app's color scheme
- **App Icons**: Replace assets in the `assets/` directory
- **Splash Screen**: Update in `app.json` under the `splash` section

## 📊 Data Management

### Sample Data
The app includes sample recipes that are automatically initialized on first launch. You can refresh this data by calling the `refreshSampleData()` function.

### Local Storage
- **Recipes**: Stored locally using AsyncStorage and SQLite
- **User Preferences**: Theme settings, search history, filters
- **Favorites**: User's favorite recipe IDs

### Cloud Integration
- **Firebase**: For user authentication and remote data synchronization
- **Cloud Storage**: For recipe images and media files

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

### Development Guidelines
- Follow the existing code style and patterns
- Add appropriate comments for complex logic
- Include tests for new functionality
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Native and Expo teams for the excellent frameworks
- Icon libraries and component providers
- Recipe contributors and sample data providers

## 📞 Support

For support, questions, or feature requests:
- Create an issue in the GitHub repository
- Check the documentation in the `docs/` folder
- Contact the development team at support@foodie-app.com

## 🔄 Version History

- **1.0.0** - Initial release
  - Basic recipe browsing and search functionality
  - User authentication and profile management
  - Favorites and personal recipe collections
  - Theme switching and responsive design

---

Made with ❤️ using React Native and Expo
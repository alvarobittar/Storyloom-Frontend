import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import WatchScreen from './watchscreen';
import SearchScreen from './SerchScreen';
import MovieScreen from './moviescreen';

// Importa tus imágenes
import homeIcon from '../assets/images/home_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24 (1).png'; 
import searchIcon from '../assets/images/search_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png'; 
import watchIcon from '../assets/images/visibility_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png'; 
import userIcon from '../assets/images/account_circle_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png'; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBarStyle, // Estilo de la barra de pestañas
        tabBarActiveTintColor: styles.tabBarActiveTintColor.color, // Color del texto activo en las pestañas
        tabBarInactiveTintColor: styles.tabBarInactiveTintColor.color, // Color del texto inactivo en las pestañas
        headerShown: false, // Ocultar el header
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Asigna los iconos dependiendo de la ruta
          if (route.name === 'Home') {
            iconName = homeIcon;
          } else if (route.name === 'Search') {
            iconName = searchIcon;
          } else if (route.name === 'Watch') {
            iconName = watchIcon;
          } else if (route.name === 'User') {
            iconName = userIcon;
          }

          // Devuelve la imagen con el tamaño y color deseados
          return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Watch" component={WatchScreen}/> 
      <Tab.Screen name="User" component={RegisterScreen} />
    </Tab.Navigator>
  );
}

export default function MainScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerTitleStyle: styles.headerTitleStyle, // Estilo del título del header
          headerStyle: styles.headerStyle, // Estilo del header
        }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ title: 'STORYLOOM' }} />
        <Stack.Screen name="SearchScreen" component={SearchScreen}/>
        <Stack.Screen name="MovieScreen" component={MovieScreen}/>
        <Stack.Screen name="watchscreen" component={WatchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#000', 
  },
  tabBarActiveTintColor: {
    color: '#9370DB',
  },
  tabBarInactiveTintColor: {
    color: 'white',
  },
  headerTitleStyle: {
    color: 'white',
  },
  headerStyle: {
    backgroundColor: '#000',
  },
});

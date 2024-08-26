import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigators/TabNavigator';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AnimeDetailsScreen from './views/AnimeDetailsScreen';
import CharacterDetailsScreen from './views/CharacterDetailsScreen';
import VoiceActorDetailsScreen from './views/VoiceActorDetailsScreen';
import SearchScreen from './views/SearchScreen';
import SWFFilterScreen from './views/SWFFilterScreen';
import { StatusBar } from 'react-native';
import EpisodesDetailsScreen from './views/EpisodesDetailsScreen';
import LogoutScreen from './views/LogoutScreen';
import GenresAnimeScreen from './views/GenreAnimeScreen';

const Stack = createNativeStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    'Lato-Black': require('./assets/fonts/lato/Lato-Black.ttf'),
    'Lato-BlackItalic': require('./assets/fonts/lato/Lato-BlackItalic.ttf'),
    'Lato-Bold': require('./assets/fonts/lato/Lato-Bold.ttf'),
    'Lato-BoldItalic': require('./assets/fonts/lato/Lato-BoldItalic.ttf'),
    'Lato-Italic': require('./assets/fonts/lato/Lato-Italic.ttf'),
    'Lato-Light': require('./assets/fonts/lato/Lato-Light.ttf'),
    'Lato-LightItalic': require('./assets/fonts/lato/Lato-LightItalic.ttf'),
    'Lato-Regular': require('./assets/fonts/lato/Lato-Regular.ttf'),
    'Lato-Thin': require('./assets/fonts/lato/Lato-Thin.ttf'),
    'Lato-ThinItalic': require('./assets/fonts/lato/Lato-ThinItalic.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    fetchFonts().then(() => {
      setFontsLoaded(true);
      SplashScreen.hideAsync();
    });
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{animation: 'default'}}
        />
        <Stack.Screen
          name="AnimeDetails"
          component={AnimeDetailsScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="EpisodesDetails"
          component={EpisodesDetailsScreen}
          options={{animation: 'slide_from_left'}}
        />
        <Stack.Screen
          name="CharacterDetails"
          component={CharacterDetailsScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="VoiceActorDetails"
          component={VoiceActorDetailsScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="GenreAnime"
          component={GenresAnimeScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Group screenOptions={{ presentation: 'transparentModal' ,animation : 'fade',animationDuration:500}}>
          <Stack.Screen 
            name="SWFModal" 
            component={SWFFilterScreen}
          />
          <Stack.Screen
            name="Logout"
            component={LogoutScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
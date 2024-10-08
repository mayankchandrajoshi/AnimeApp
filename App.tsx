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
import AuthenticationScreen from './views/AuthenticationScreen';
import LoginScreen from './views/LoginScreen';
import AccountRegisterScreen from './views/AccountRegisterScreen';
import { COLORS } from './themes/themes';
import AppLoadingScreen from './views/AppLoadingScreen';
import * as NavigationBar from 'expo-navigation-bar';
import userStore from './store/userStore';
import UpdateUserScreen from './views/UpdateUserScreen';
import Toast from 'react-native-toast-message';
import * as SecureStore from 'expo-secure-store';
import { userInterface } from './interface/commonInterface';
import axios from 'axios';

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

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { userData } = userStore();
  const { login }  = userStore();

  useEffect(() => {
    async function prepare() {
      try {
        await NavigationBar.setBackgroundColorAsync(COLORS.Black); 
        await fetchFonts();
        
        const token = await SecureStore.getItemAsync('JWTToken');
        
        if(token){
          const { data:{user} }:{ data :{user:userInterface}} = await axios.get('https://anime-backend-delta.vercel.app/api/v1/me',{
            headers : {
              "Content-Type":"application/json",
              'Authorization': `Bearer ${token}`
          }});
    
          login(user);
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000)); // To add delay
        setFontsLoaded(true); 

      } catch (error:any) {
        if(error?.response?.data?.message) {
          Toast.show({
            type: 'error',
            text1: error.response.data.message,
          })
        }
        else {
          console.log(error);
          Toast.show({
            type: 'error',
            text1: 'An error occurred.'
          });
        }
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return <AppLoadingScreen/>
  }
  
  return (
    <>
      <NavigationContainer>
        <StatusBar translucent backgroundColor={'transparent'} />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {
            !userData.isAuthenticated?(
              <Stack.Group>
                <Stack.Screen
                  name="Auth"
                  component={AuthenticationScreen}
                />
                <Stack.Screen 
                  name="Login" 
                  component={LoginScreen}
                  options={{ presentation:"transparentModal" }}
                />
                <Stack.Screen 
                  name="Register" 
                  component={AccountRegisterScreen}
                  options={{ presentation:"transparentModal" }}
                />
              </Stack.Group>
            ):(
              <Stack.Group>
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
                <Stack.Screen
                  name="UpdateUser"
                  component={UpdateUserScreen}
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
              </Stack.Group>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
      <Toast/>
    </>
  );
}
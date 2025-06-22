import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { HomeTabbar } from './src/screens/Tabbar';
import { SpendingLimit } from './src/screens/SpendingLimit';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { store } from './src/store';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="HomeTabbar">
      <Stack.Screen name="HomeTabbar" component={HomeTabbar} options={{ headerShown: false }} /> 
      <Stack.Screen name="SpendingLimit" component={SpendingLimit} options={{ headerShown: false }} /> 
    </Stack.Navigator>
  );
}

export default function App() {
  
    const [fontsLoaded] = useFonts({
    AvenirBold: require('./assets/fonts/AvenirNextLTProBold.otf'),
    AvenirRegular: require('./assets/fonts/AvenirNextLTProRegular.otf'),
    AvenirDemiBold: require('./assets/fonts/avenir-next-demi-bold.ttf'),
    AvenirMedium: require('./assets/fonts/avenir-next-medium.ttf')
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
          <RootStack />
      </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
});

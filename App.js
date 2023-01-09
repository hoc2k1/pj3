import {React} from 'react';
import { LogBox } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {MainStackNavigator} from './src/navigation/StackNavigator'

LogBox.ignoreAllLogs();
export default function App() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}

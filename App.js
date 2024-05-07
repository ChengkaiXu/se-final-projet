import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './App/HomePage'; // Make sure the path is correct
import SearchPage from './App/SearchPage'; // Make sure the path is correct
import WeeklySchedule from "./App/WeeklySchedule";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="Search" component={SearchPage} />
                <Stack.Screen name="WeeklySchedule" component={WeeklySchedule} options={{ title: 'Weekly Schedule' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

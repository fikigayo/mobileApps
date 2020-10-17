import * as React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Scanner from "../screens/scanner";
import Setting from "../screens/setting";
import Home from "../routes/drawNavigator";

function ScannerScreen() {
    return (
        <Scanner/>
    );
}

function HomeScreen() {
    return (
        <Home/>
    );
}

function SettingsScreen() {
    return (
        <Setting/>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
    <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Scanner') {
                    iconName = focused ? 'ios-camera' : 'ios-camera';
                }
                else if (route.name === 'Home') {
                    iconName = focused ? 'ios-home' : 'ios-home';
                } 
                else if (route.name === 'Settings') {
                    iconName = focused ? 'ios-settings' : 'ios-settings';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            initialRouteName="Scanner"
            tabBarOptions={{
                activeTintColor: 'green',
                inactiveTintColor: 'gray',
            }}
        >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Scanner" component={ScannerScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    </NavigationContainer>
    );
}
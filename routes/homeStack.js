import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/home";
import Scanner from "../screens/scanner";
import React from "react";

const screens = createStackNavigator({
    Home:{
        screen: Home,
        navigationOptions:{
            headerShown:false,
        }
    },
    Scanner:{
        screen: Scanner,
        navigationOptions:{
            headerShown:false,
        }
    },
});

const appContainer = createAppContainer(screens);

export default appContainer;
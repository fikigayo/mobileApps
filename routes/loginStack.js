import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "../screens/login";
import Registration from "../screens/registration";
import React from "react";

const screens = createStackNavigator({
    Login:{
        screen: Login,
        navigationOptions:{
            headerShown:false,
        }
    },
    Registration:{
        screen: Registration,
        navigationOptions:{
            headerShown:false,
        }
    },
});

const appContainer = createAppContainer(screens);

export default appContainer;
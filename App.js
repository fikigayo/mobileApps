import React, { Component } from 'react';
import NavigatorLogin from "./routes/loginStack";
import NavigatorHome from "./routes/homeStack";
import TabNavigator from "./routes/tabNavigator";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

export default class App extends Component {
  render() {
    return <AppContainer/>
  }
}

const AppSwitchNavigator = createSwitchNavigator(
  {
    routeHome: TabNavigator,
    routeLogin: NavigatorLogin,
    // routeHome: NavigatorHome,
  }
);

const AppContainer = createAppContainer(AppSwitchNavigator);
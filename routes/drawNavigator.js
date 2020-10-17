import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

import HomeStack from "../routes/homeStack";
import Setting from "../screens/setting";

const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen : HomeStack
    },
    Setting: {
        screen : Setting
    }
})

export default createAppContainer(RootDrawerNavigator);
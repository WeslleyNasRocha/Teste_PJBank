import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import SplashScreen from "../screens/Splash";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";

const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator(
  { Login: LoginScreen },
  { headerMode: "none" }
);

export default createSwitchNavigator(
  {
    Splash: SplashScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "Splash"
  }
);

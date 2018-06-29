import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import TodoScreen from "../screens/TodoScreen";

const HomeStack = createStackNavigator(
  { Home: HomeScreen },
  { headerMode: "none" }
);
const AuthStack = createStackNavigator(
  { Login: LoginScreen },
  { headerMode: "none" }
);
const AppStack = createStackNavigator(
  { Todos: TodoScreen },
  { headerMode: "none" }
);

export default createSwitchNavigator(
  {
    Auth: AuthStack,
    Home: HomeStack,
    App: AppStack
  },
  {
    initialRouteName: "Home"
  }
);

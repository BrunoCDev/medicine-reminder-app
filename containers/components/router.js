import { StackNavigator, TabNavigator } from "react-navigation";

import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";

import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Create from "./screens/Create";

import Interaction from "./screens/Interaction";

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};

export const SignedOut = StackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up"
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In"
    }
  }
});

export const SignedIn = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerStyle: { height: 0 }
    }
  },
  Interaction: {
    screen: Interaction,
    navigationOptions: {
      headerStyle: { height: 0 }
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerStyle: { height: 0 }
    }
  },
  Create: {
    screen: Create,
    navigationOptions: {
      headerStyle: { height: 0 }
    }
  }
});

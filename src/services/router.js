import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
// import {NavigationContainer} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Welcome from '../screens/Welcome';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Workouts from '../screens/Workouts';
import Sessions from '../screens/Sessions';

Icon.loadFont();

const AuthStack = createStackNavigator();
export const SignedOut = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      options={{headerShown: false}}
      name="Welcome"
      component={Welcome}
    />
    <AuthStack.Screen
      options={{headerShown: true, headerBackTitleStyle: {color: '#A68FB1'}}}
      name="Sign In"
      component={SignIn}
    />
    <AuthStack.Screen
      options={{
        headerShown: true,
        headerBackTitleStyle: {color: '#A68FB1'},
      }}
      name="Sign Up"
      component={SignUp}
    />
  </AuthStack.Navigator>
);

const Tab = createBottomTabNavigator();
export const SignedIn = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Profile':
            iconName = 'user';
            break;
          case 'Workouts':
            iconName = 'headphones';
            break;
          case 'Sessions':
            iconName = 'calendar';
            break;
        }
        return <Icon name={iconName} size={30} color="#A68FB1" />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'black',
      inactiveTintColor: '#A68FB1',
    }}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Workouts" component={Workouts} />
    <Tab.Screen name="Sessions" component={Sessions} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

// const Stack = createStackNavigator();
// export const createRootNavigator = (signedIn = false) => {
//   return (
//     <NavigationContainer>
//       {!signedIn ? (
//         <Stack.Screen
//           options={{headerShown: false}}
//           name="Auth"
//           component={SignedOut()}
//         />
//       ) : (
//         <Stack.Screen
//           options={{headerShown: false}}
//           name="SignedIn"
//           component={SignedIn()}
//         />
//       )}
//     </NavigationContainer>
//   );
// };

import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

import Welcome from '../screens/Welcome';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Workouts from '../screens/Workouts';
import Sessions from '../screens/Sessions';
import Goals from '../screens/Goals';
import Settings from '../screens/Settings';
import Stats from '../screens/Stats';
import Workout from '../screens/Workout';

const AuthStack = createStackNavigator();
const SignedOutScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{headerShown: false}}
        name="Welcome"
        component={Welcome}
      />
      <AuthStack.Screen
        options={{
          title: 'Sign In',
          headerShown: true,
          headerBackTitleStyle: {color: '#A68FB1'},
        }}
        name="SignIn"
        component={SignIn}
      />
      <AuthStack.Screen
        options={{
          title: 'Sign Up',
          headerShown: true,
          headerBackTitleStyle: {color: '#A68FB1'},
        }}
        name="SignUp"
        component={SignUp}
      />
    </AuthStack.Navigator>
  );
};

const WorkoutStack = createStackNavigator();
const WorkoutScreen = () => (
  <WorkoutStack.Navigator>
    <WorkoutStack.Screen
      options={{headerShown: false}}
      name="Workout"
      component={Workout}
    />
    <WorkoutStack.Screen
      options={{
        title: 'All Workouts',
        headerShown: true,
        headerBackTitleStyle: {color: '#fff'},
        headerStyle: {
          backgroundColor: '#A68FB1',
        },
        headerTitleStyle: {
          color: '#fff',
        },
      }}
      name="Workouts"
      component={Workouts}
    />
  </WorkoutStack.Navigator>
);

const Tab = createBottomTabNavigator();
const TabScreen = () => (
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
        return (
          <Icon
            name={iconName}
            size={30}
            color={focused ? 'black' : '#A68FB1'}
          />
        );
      },
    })}
    tabBarOptions={{
      activeTintColor: 'black',
      inactiveTintColor: '#A68FB1',
    }}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Workouts" component={WorkoutScreen} />
    <Tab.Screen name="Sessions" component={Sessions} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

const Drawer = createDrawerNavigator();
const SignedInScreen = () => (
  <Drawer.Navigator
    drawerContentOptions={{
      activeTintColor: 'black',
      inactiveTintColor: '#A68FB1',
    }}
    screenOptions={{
      headerStyle: {
        backgroundColor: '#A68FB1',
      },
      headerTintColor: '#fff',
    }}>
    <Drawer.Screen
      name="Dashboard"
      component={TabScreen}
      options={{
        headerTitle: false,
      }}
    />
    <Drawer.Screen name="Stats" component={Stats} />
    <Drawer.Screen name="Goals" component={Goals} />
    <Drawer.Screen name="Settings" component={Settings} />
    {/* <Drawer.Screen name="Signout" component={Signout} /> */}
  </Drawer.Navigator>
);

const RootStack = createStackNavigator();
export const CreateRootNavigator = ({signedIn}) => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {!signedIn ? (
          <RootStack.Screen
            options={{headerShown: false}}
            name="Auth"
            component={SignedOutScreen}
          />
        ) : (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="SignedIn"
            component={SignedInScreen}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

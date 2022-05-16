// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import { useState, useEffect, useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";

import Colors from "../constants/Colors";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ClassScreen from "../screens/ClassScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RecentScreen from "../screens/RecentScreen";
import { AuthContext } from "../context/AuthProvider";

const BottomTab = createBottomTabNavigator();

export default function Navigator() {
  const colorScheme = useColorScheme();
  const auth = useContext(AuthContext);

  const AuthStack = createStackNavigator();

  if (!auth?.isAuthenticated) {
    return (
      <AuthStack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: "#fff",
          },
        }}
      >
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        children={() => <HomeScreen />}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Recent"
        component={RecentScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="list-outline" color={color} />
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Classes"
        component={ClassScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="add-outline" color={color} />
          ),
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

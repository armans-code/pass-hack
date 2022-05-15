// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native';

import Colors from '../constants/Colors';
import LoginScreen from '../screens/LoginScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import RegisterScreen from '../screens/RegisterScreen';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();

	useEffect(() => {
		// onAuthStateChanged returns an unsubscriber
		const unsubscribeAuthStateChanged = onAuthStateChanged(
			auth,
			(authenticatedUser) => {
				authenticatedUser ? setUser(authenticatedUser) : setUser(null);
				setInitializing(false);
			}
		);

		// unsubscribe auth listener on unmount
		return unsubscribeAuthStateChanged;
	}, [user]);

	if (initializing) return null;

	if (!user) {
		return AuthNavigator();
	}

	return (
		<BottomTab.Navigator
			initialRouteName='Home'
			screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
		>
			<BottomTab.Screen
				name='Home'
				component={TabOneNavigator}
				options={{
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='home-outline' color={color} />
					),
					headerShown: false,
				}}
			/>
			<BottomTab.Screen
				name='Recent'
				component={TabTwoNavigator}
				options={{
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='list-outline' color={color} />
					),
					headerShown: false,
				}}
			/>
			<BottomTab.Screen
				name='Classes'
				component={TabThreeNavigator}
				options={{
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='add-outline' color={color} />
					),
					headerShown: false,
				}}
			/>
		</BottomTab.Navigator>
	);
}

const AuthStack = createStackNavigator();

function AuthNavigator() {
	return (
		<AuthStack.Navigator
			screenOptions={{
				cardStyle: {
					backgroundColor: '#fff',
				},
			}}
		>
			<AuthStack.Screen
				name='Login'
				component={LoginScreen}
				options={{ headerShown: false }}
			/>
			<AuthStack.Screen
				name='Register'
				component={RegisterScreen}
				options={{ headerShown: false }}
			/>
		</AuthStack.Navigator>
	);
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
	return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

function TabOneNavigator() {
	return (
		<TabOneStack.Navigator>
			<TabOneStack.Screen
				name='Home'
				component={TabOneScreen}
				options={{ headerShown: false }}
			/>
		</TabOneStack.Navigator>
	);
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
	return (
		<TabTwoStack.Navigator>
			<TabTwoStack.Screen
				name='List'
				component={TabTwoScreen}
				options={{ headerShown: false }}
			/>
		</TabTwoStack.Navigator>
	);
}

const TabThreeStack = createStackNavigator();

function TabThreeNavigator() {
	return (
		<TabThreeStack.Navigator>
			<TabThreeStack.Screen
				name='Classes'
				component={TabThreeScreen}
				options={{ headerShown: false }}
			/>
		</TabThreeStack.Navigator>
	);
}

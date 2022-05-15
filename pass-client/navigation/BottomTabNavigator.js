// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native';

import Colors from '../constants/Colors';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ClassScreen from '../screens/ClassScreen';
import RenameScreen from '../screens/RecentScreen';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import RegisterScreen from '../screens/RegisterScreen';
import RecentScreen from '../screens/RecentScreen';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();

	useEffect(() => {
		const unsubscribeAuthStateChanged = onAuthStateChanged(
			auth,
			(authenticatedUser) => {
				authenticatedUser ? setUser(authenticatedUser) : setUser(null);
				setInitializing(false);
			}
		);
		console.log(user);
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
				children={() => <HomeScreen user={user} />}
				options={{
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='home-outline' color={color} />
					),
					headerShown: false,
				}}
			/>
			<BottomTab.Screen
				name='Recent'
				component={RecentScreen}
				options={{
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='list-outline' color={color} />
					),
					headerShown: false,
				}}
			/>
			<BottomTab.Screen
				name='Classes'
				component={ClassScreen}
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

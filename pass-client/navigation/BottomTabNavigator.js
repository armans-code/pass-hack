// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native';

import Colors from '../constants/Colors';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName='TabOne'
			screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
		>
			<BottomTab.Screen
				name='Home'
				component={TabOneNavigator}
				options={{
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='ios-code' color={color} />
					),
					headerShown: false,
				}}
			/>
			<BottomTab.Screen
				name='List'
				component={TabTwoNavigator}
				options={{
					tabBarIcon: ({ color }) => (
						<TabBarIcon name='ios-code' color={color} />
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

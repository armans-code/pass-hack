import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useLoadedAssets } from './hooks/useLoadedAssets';
import Navigation from './navigation';
import { useColorScheme } from 'react-native';
// import { ApolloProvider } from '@apollo/client';
// import { ApolloClient } from '@apollo/client';
// 
export default function App() {
	const isLoadingComplete = useLoadedAssets();
	const colorScheme = useColorScheme();

	// const client = new ApolloClient({
	// 	uri: 'localhost:8080/graphql',
	// 	cache: new InMemoryCache(),
	// });

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			// <ApolloProvider client={client}>
				<SafeAreaProvider>
					<Navigation colorScheme={colorScheme} />
					<StatusBar />
				</SafeAreaProvider>
			// </ApolloProvider>
		);
	}
}

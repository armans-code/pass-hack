import { React, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLoadedAssets } from './hooks/useLoadedAssets';
import Navigation from './navigation';
import { useColorScheme } from 'react-native';
import 'react-native-gesture-handler';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';

export default function App() {
	const isLoadingComplete = useLoadedAssets();
	const colorScheme = useColorScheme();

	const client = new ApolloClient({
		uri: 'http://localhost:8081/graphql',
		cache: new InMemoryCache(),
		credentials: true,
	});

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<ApolloProvider client={client}>
				<SafeAreaProvider>
					<Navigation colorScheme={colorScheme} />
					<StatusBar />
				</SafeAreaProvider>
			</ApolloProvider>
		);
	}
}

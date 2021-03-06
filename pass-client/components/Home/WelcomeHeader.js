import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function WelcomeHeader() {
	return (
		<View style={styles.container}>
			<Text style={styles.topText}>Welcome,</Text>
			<Text style={styles.bottomText}>Jithen Shriyan</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginLeft: 20,
		marginTop: 40,
	},
	topText: {
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 24,
		lineHeight: 29,
		color: 'black',
	},
	bottomText: {
		color: '#6D6D6D',
		fontSize: 18,
		color: '#6D6D6D',
	},
});

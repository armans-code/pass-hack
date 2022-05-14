import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import HorizontalPassList from './HorizontalPassList';

const ActivePasses = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Active Passes</Text>
			<HorizontalPassList color='#426AFA' />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 30,
	},
	title: {
		fontWeight: '500',
		fontSize: 20,
		lineHeight: 24,
		color: '#6D6D6D',
		marginBottom: 15,
        marginLeft: 20
	},
});

export default ActivePasses;

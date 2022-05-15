import { Text, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import ClassCodeInput from '../components/Classes/ClassCodeInput';
import ClassGrid from '../components/Classes/ClassGrid';

const ClassScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Join Class</Text>
			<ClassCodeInput />
			<Text style={styles.title}>Your Classes</Text>
			<ClassGrid />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		color: '#4D4D4D',
		fontWeight: '400',
		fontSize: 24,
		lineHeight: 29,
		marginTop: 50,
		marginBottom: 50,
	},
});

export default ClassScreen;

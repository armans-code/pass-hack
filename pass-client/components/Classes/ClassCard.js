import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const ClassCard = (props) => {
	const { name } = props;
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{name}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 150,
		margin: 10,
		height: 130,
		borderRadius: 15,
		backgroundColor: '#FFAD62',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#fff',
		fontSize: 20,
	},
});

export default ClassCard;

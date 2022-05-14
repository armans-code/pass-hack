import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import ClassCard from './ClassCard';

const ClassGrid = () => {
	const data = [
		{
			name: 'Mr. Doe',
			id: 1,
		},
		{
			name: 'Mrs. Smith',
			id: 2,
		},
		{
			name: 'Mr. Shriyan',
			id: 3,
		},
		{
			name: 'Mrs. Locks',
			id: 4,
		},
	];

	const renderItem = ({ item }) => <ClassCard name={item.name} />;

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				numColumns={2}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 400,
	},
});

export default ClassGrid;

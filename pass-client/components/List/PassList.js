import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import PassListCard from './PassListCard';

const PassList = () => {
	const data = [
		{
			name: 'Jithen Shriyan',
			time: '4:23',
			location: 'Clinic',
			expired: false,
			id: 1,
		},
		{
			name: 'Arman Kumaraswamy',
			time: '1:23',
			location: 'Library',
			expired: false,
			id: 2,
		},
		{
			name: 'Lebron James',
			time: 'Expired',
			location: 'Clinic',
			expired: true,
			id: 3,
		},
		// {
		// 	name: 'Jithen Shriyan',
		// 	time: '4:23',
		// 	location: 'Clinic',
		// },
		// {
		// 	name: 'Jithen Shriyan',
		// 	time: '4:23',
		// 	location: 'Clinic',
		// },
		// {
		// 	name: 'Jithen Shriyan',
		// 	time: '4:23',
		// 	location: 'Clinic',
		// },
		// {
		// 	name: 'Jithen Shriyan',
		// 	time: '4:23',
		// 	location: 'Clinic',
		// },
	];

	const renderItem = ({ item }) => (
		<PassListCard
			name={item.name}
			location={item.location}
			time={item.time}
			expired={item.expired}
		/>
	);

	return (
		<View style={styles.container}>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: 40,
	},
});

export default PassList;

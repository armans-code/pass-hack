import { View, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import React from 'react';
import PassCard from './PassCard';

const HorizontalPassList = (props) => {
	const data = [
		{
			name: 'Jithen Shriyan',
			text: '2:34',
			location: 'Bathroom',
		},
		{
			name: 'Arman Kumaraswamy',
			text: '3:56',
			location: 'Library',
		},
		{
			name: 'Ananth Kutuva',
			text: '1:31',
			location: 'Clinic',
		},
		{
			name: 'John Doe',
			text: '0:22',
			location: 'Locker',
		},
		{
			name: 'Lebron James',
			text: '1:12',
			location: 'Office',
		},
		{
			name: 'Elon Musk',
			text: '4:34',
			location: 'SpaceX',
		},
	];

	function _renderItem({ item }) {
		return (
			<PassCard
				time={item.text}
				name={item.name}
				location={item.location}
				color={props.color}
			/>
		);
	}

	return (
		<View style={styles.container}>
			<Carousel
				data={data}
				renderItem={_renderItem}
				itemWidth={300}
				sliderWidth={600}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		paddingBottom: 10,
	},
});

export default HorizontalPassList;

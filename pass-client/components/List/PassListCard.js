import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Card } from 'react-native-ui-lib';

const PassListCard = (props) => {
	const { name, location, time } = props;
	return (
		<View>
			<Card row containerStyle={styles.card}>
				<Card.Section
					backgroundColor={props.expired ? '#FFAD62' : '#426AFA'}
					content={[
						{ text: name, text65: true, $textDefaultLight: true },
						{ text: location, text70: true, $textDefaultLight: true },
					]}
					contentStyle={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%',
						width: 240,
					}}
				/>
				<Card.Section
					content={[{ text: time, text70: true, grey10: true }]}
					contentStyle={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: 100,
						height: '100%',
					}}
					backgroundColor={'#FAFAFA'}
				/>
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		height: 80,
		display: 'flex',
		marginBottom: 25,
	},
});

export default PassListCard;

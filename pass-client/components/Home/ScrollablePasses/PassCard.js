import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Card } from 'react-native-ui-lib';

const PassCard = (props) => {
	const TIME = props.time;
	const COLOR = props.color;

	return (
		<View style={styles.container}>
			<Card>
				<Card.Section
					backgroundColor={COLOR}
					content={[
						{ text: props.name, text70: true, $textDefaultLight: true },
						{ text: props.location, text60: true, $textDefaultLight: true },
					]}
					contentStyle={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: 130,
					}}
				/>
				<Card.Section
					content={[{ text: `${TIME} left`, text70: true, grey10: true }]}
					contentStyle={{
						padding: 10,
						alignItems: 'center',
					}}
					backgroundColor={'#FAFAFA'}
				/>
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 250,
		backgroundColor: 'white',
	},
});

export default PassCard;

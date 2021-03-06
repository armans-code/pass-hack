import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Button } from 'react-native-ui-lib';

export default function NewPost() {
	return (
		<View style={styles.container}>
			<Button
				label={'Issue Pass'}
				labelStyle={{
					fontStyle: 'normal',
					fontWeight: '400',
					fontSize: 17,
					lineHeight: 21,
				}}
				backgroundColor={'#426AFA'}
				enableShadow={true}
				fullWidth={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		marginTop: 30,
	},
});

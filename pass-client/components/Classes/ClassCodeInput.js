import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-ui-lib';

const ClassCodeInput = () => {
	const [code, setCode] = useState();

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder={'Six Digit Class Code'}
				keyboardType='numeric'
				onChangeText={(text) => setCode(text.replace(/[^0-9]/g, ''))}
				value={code}
				maxLength={6}
			/>
			<Button
				label={'Join Class'}
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
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	input: {
		height: 50,
		width: 165,
		fontSize: 15,
		paddingHorizontal: 12,
		borderRadius: 15,
		backgroundColor: '#FAFAFA',
		marginRight: 15,
	},
});

export default ClassCodeInput;

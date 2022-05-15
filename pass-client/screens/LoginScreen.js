import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from 'react-native-ui-lib';

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Login</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					value={email}
					autoCapitalize={false}
					autoCorrect={false}
					placeholderTextColor={'gray'}
					placeholder={'example@email.com'}
					onChangeText={(text) => setEmail(text)}
				/>
				<TextInput
					style={styles.input}
					value={password}
					placeholderTextColor={'gray'}
					autoCapitalize={false}
					autoCorrect={false}
					placeholder={'Password'}
					onChangeText={(text) => setPassword(text)}
					secureTextEntry={true}
				/>
			</View>
			<View style={styles.titleContainer}>
				<Button
					label={'Login'}
					labelStyle={{
						fontStyle: 'normal',
						fontWeight: '400',
						fontSize: '17px',
						lineHeight: '21px',
						color: '#fff',
					}}
					backgroundColor={'#426AFA'}
					enableShadow={true}
					fullWidth={false}
					onPress={() => {
						console.log(true);
					}}
					style={styles.loginBtn}
				/>
				<Button
					label={'Register instead'}
					labelStyle={{
						fontStyle: 'normal',
						fontWeight: '400',
						fontSize: '17px',
						lineHeight: '21px',
						color: '#fff',
					}}
					backgroundColor={'#FFAD62'}
					enableShadow={true}
					fullWidth={false}
					onPress={() => {
						navigation.navigate('Register');
					}}
					style={styles.loginBtn}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
	},
	titleContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	title: {
		display: 'flex',
		color: '#4D4D4D',
		fontWeight: '400',
		fontSize: 40,
		lineHeight: 45,
		marginTop: 50,
	},
	inputContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	input: {
		height: 40,
		width: '100%',
		marginTop: 20,
		borderWidth: 1,
		padding: 10,
		lineHeight: 20,
		fontSize: 18,
		borderRadius: 13,
		color: 'black',
	},
	loginBtn: {
		height: 50,
		width: 300,
		marginTop: 20,
	},
});

export default LoginScreen;

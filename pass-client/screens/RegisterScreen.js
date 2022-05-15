import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { Button } from 'react-native-ui-lib';

const RegisterScreen = ({ navigation }) => {
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const [value, setValue] = useState('');
	const [formattedPhone, setFormattedPhone] = useState('');

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Register</Text>
			</View>
			<View style={styles.inputContainer}>
				<View style={styles.namesContainer}>
					<TextInput
						style={styles.namesInput}
						value={firstName}
						autoCorrect={false}
						placeholder={'First Name'}
						placeholderTextColor={'gray'}
						onChangeText={(text) => setFirstName(text)}
					/>
					<TextInput
						style={styles.namesInput}
						value={lastName}
						autoCorrect={false}
						placeholder={'Last Name'}
						placeholderTextColor={'gray'}
						onChangeText={(text) => setLastName(text)}
					/>
				</View>
				<TextInput
					style={styles.input}
					value={email}
					placeholderTextColor={'gray'}
					autoCapitalize={false}
					autoCorrect={false}
					placeholder={'example@email.com'}
					onChangeText={(text) => setEmail(text)}
				/>
				<TextInput
					style={styles.input}
					value={password}
					autoCapitalize={false}
					autoCorrect={false}
					placeholder={'Password'}
					placeholderTextColor={'gray'}
					onChangeText={(text) => setPassword(text)}
					secureTextEntry={true}
				/>
				<PhoneInput
					defaultValue={value}
					defaultCode='US'
					layout='first'
					onChangeText={(text) => {
						setValue(text);
					}}
					onChangeFormattedText={(text) => {
						setFormattedPhone(text);
					}}
					withDarkTheme
					withShadow
				/>
			</View>
			<View style={styles.titleContainer}>
				<Button
					label={'Register'}
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
					label={'Login instead'}
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
						navigation.navigate('Login');
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
	namesContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		width: '100%',
		marginBottom: 20,
	},
	namesInput: {
		height: 40,
		width: 170,
		// margin: 12,
		borderWidth: 1,
		padding: 10,
		lineHeight: 20,
		fontSize: 18,
		borderRadius: 10,
	},
	input: {
		height: 40,
		width: '100%',
		marginBottom: 20,
		borderWidth: 1,
		padding: 10,
		lineHeight: 20,
		fontSize: 18,
		borderRadius: 13,
	},
	loginBtn: {
		height: 50,
		width: 300,
		marginTop: 20,
	},
});

export default RegisterScreen;

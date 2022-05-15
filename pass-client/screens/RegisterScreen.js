import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { Button, Checkbox } from 'react-native-ui-lib';
import { auth } from '../config/firebase';

const POST_STUDENT = gql`
	mutation registerStudent($registerUserInput: RegisterUserInput!) {
		registerStudent(registerUserInput: $registerUserInput) {
			id
			firstName
			lastName
			email
			phone
		}
	}
`;

const POST_TEACHER = gql`
	mutation registerTeacher($registerUserInput: RegisterUserInput!) {
		registerTeacher(registerUserInput: $registerUserInput) {
			id
			firstName
			lastName
			email
			phone
		}
	}
`;

const RegisterScreen = ({ navigation }) => {
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [isTeacher, setIsTeacher] = useState(false);

	const [value, setValue] = useState('');
	const [formattedPhone, setFormattedPhone] = useState('');

	const [postStudent, { data, loading, error }] = useMutation(POST_STUDENT);
	const [postTeacher, { tData, tLoading, tError }] = useMutation(POST_TEACHER);

	if (loading) console.log('Submitting...');
	if (error) console.log(`Submission error! ${error.message}`);

	if (tLoading) console.log('Loading...');
	if (tError) console.log(`Submission error! ${tError.message}`);

	const handleRegister = () => {
		if (isTeacher) {
			postTeacher({
				variables: {
					registerUserInput: {
						firstName: firstName,
						lastName: lastName,
						email: email,
						password: password,
						phone: formattedPhone,
					},
				},
			}).then(res => {
				if(!res.errors)
					navigation.navigate('Login')
				else
					console.log(res.errors)
			});
		} else {
			postStudent({
				variables: {
					registerUserInput: {
						firstName: firstName,
						lastName: lastName,
						email: email,
						password: password,
						phone: formattedPhone,
					},
				},
			}).then(res => {
				if(!res.errors)
					navigation.navigate('Login')
				else
					console.log(res.errors)
			});
		}
	};

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
					autoCapitalize='none'
					autoCorrect={false}
					placeholder={'example@email.com'}
					onChangeText={(text) => setEmail(text)}
				/>
				<TextInput
					style={styles.input}
					value={password}
					autoCapitalize='none'
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
				<View style={styles.checkboxContainer}>
					<Text style={{ fontSize: 17 }}>I am a teacher</Text>
					<Checkbox
						value={isTeacher}
						onValueChange={() => setIsTeacher(!isTeacher)}
					/>
				</View>
			</View>
			<View style={styles.titleContainer}>
				<Button
					label={'Register'}
					labelStyle={{
						fontStyle: 'normal',
						fontWeight: '400',
						fontSize: 17,
						lineHeight: 21,
						color: '#fff',
					}}
					backgroundColor={'#426AFA'}
					enableShadow={true}
					fullWidth={false}
					onPress={() => handleRegister()}
					style={styles.loginBtn}
				/>
				<Button
					label={'Login instead'}
					labelStyle={{
						fontStyle: 'normal',
						fontWeight: '400',
						fontSize: 17,
						lineHeight: 21,
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
	checkboxContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		width: 150,
		justifyContent: 'space-between',
		marginTop: 30,
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

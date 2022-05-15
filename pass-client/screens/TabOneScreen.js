import {
	Modal,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import ActivePasses from '../components/Home/ScrollablePasses/ActivePasses';
import ExpiredPasses from '../components/Home/ScrollablePasses/ExpiredPasses';
import WelcomeHeader from '../components/Home/WelcomeHeader';
import React, { useState } from 'react';
import { Button, Picker } from 'react-native-ui-lib';
import { Text } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';

export default function TabOneScreen() {
	const [visible, setVisible] = useState(false);
	const [query, setQuery] = useState();
	const [location, setLocation] = useState();

	const data = [
		{
			name: 'Jithen Shriyan',
			id: 1,
		},
		{
			name: 'Elon Musk',
			id: 2,
		},
		{
			name: 'Bill Gates',
			id: 3,
		},
		{
			name: 'Mark Zuckerberg',
			id: 4,
		},
	];

	const locations = [
		'Bathroom',
		'Clinic',
		'Office',
		'Locker',
		'Library',
		'Gym',
		'Other',
	];

	const dataa = [
		'tasf',
		'fdasfdsa',
		'fdjlaskfjkdl;saj;klfadsj;klfadsjkl;',
		'fdaksjl;',
	];

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<Modal
					animationType={'slide'}
					transparent={false}
					visible={visible}
					onRequestClose={() => {
						Alert.alert('Modal has now been closed.');
					}}
					style={styles.modal}
				>
					<SafeAreaView style={styles.modalContainer}>
						<Ionicons size={20} name='close-circle-outline' />
						<Text style={styles.modalTitle}>Create New Pass</Text>
						<Text style={styles.modalSubTitle}>Mrs. Smith's Class</Text>
						<Picker
							value={query}
							onChange={(item) => setQuery(item.value)}
							placeholder={'Pick a student'}
							showSearch
							useSafeArea
							placeholderTextColor={'#fff'}
							searchPlaceholder={'Search for student'}
							style={styles.picker}
						>
							{data.map((item) => (
								<Picker.Item value={item.id} key={item.id} label={item.name} />
							))}
						</Picker>
						<Picker
							value={location}
							onChange={(item) => setLocation(item.value)}
							placeholder={'Pick a location'}
							useSafeArea
							placeholderTextColor={'#fff'}
							style={styles.picker}
						>
							{locations.map((location) => (
								<Picker.Item
									style={styles.pickerItem}
									value={location}
									key={location}
									label={location}
								/>
							))}
						</Picker>
						<View style={styles.modalButtons}>
							<Button
								label={'Create Pass'}
								labelStyle={{
									fontStyle: 'normal',
									fontWeight: '400',
									fontSize: '17px',
									lineHeight: '21px',
									color: '#426AFA',
								}}
								backgroundColor={'#fff'}
								enableShadow={true}
								fullWidth={false}
								onPress={() => {
									setVisible(false);
								}}
							/>
						</View>
					</SafeAreaView>
				</Modal>

				<WelcomeHeader />

				<View style={styles.btnContainer}>
					<Button
						label={'Create New Pass'}
						labelStyle={{
							fontStyle: 'normal',
							fontWeight: '400',
							fontSize: '17px',
							lineHeight: '21px',
						}}
						backgroundColor={'#426AFA'}
						enableShadow={true}
						fullWidth={false}
						onPress={() => {
							setVisible(true);
						}}
						style={styles.addButton}
					/>
				</View>

				<ActivePasses />
				<ExpiredPasses />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
	},
	modal: {
		paddingTop: 300,
		margin: 0,
		flex: 0,
	},
	modalContainer: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: '#426AFA',
		height: '100%',
	},
	modalButtons: {
		marginTop: 'auto',
		marginBottom: 25,
		width: '80%',
	},
	modalTitle: {
		color: '#fff',
		fontWeight: '400',
		fontSize: 25,
		lineHeight: 29,
		marginTop: 50,
	},
	modalSubTitle: {
		color: '#fff',
		fontWeight: '300',
		fontSize: 18,
		lineHeight: 29,
	},
	picker: {
		color: '#fff',
		marginTop: 25,
	},
	btnContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: 30,
	},
});

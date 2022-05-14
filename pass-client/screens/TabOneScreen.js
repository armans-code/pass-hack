import {
	Modal,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import NewPost from '../components/Home/NewPost';
import ActivePasses from '../components/Home/ScrollablePasses/ActivePasses';
import ExpiredPasses from '../components/Home/ScrollablePasses/ExpiredPasses';
import WelcomeHeader from '../components/Home/WelcomeHeader';
import React, { useState } from 'react';
import { Button } from 'react-native-ui-lib';

export default function TabOneScreen() {
	const [visible, setVisible] = useState(false);
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
						<View style={styles.modalButtons}>
							<Button
								label={'Cancel'}
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
		display: 'flex',
		flexDirection: 'row',
	},
	btnContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: 30,
	},
});

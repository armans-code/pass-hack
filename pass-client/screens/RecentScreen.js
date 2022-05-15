import { SafeAreaView, StyleSheet } from 'react-native';
import PassList from '../components/List/PassList';
import { Text } from '../components/Themed';

export default function RecentScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Recent Passes</Text>
			<PassList />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
	},
	title: {
		color: '#4D4D4D',
		fontWeight: '400',
		fontSize: 24,
		lineHeight: 29,
		marginTop: 50,
		marginLeft: 30,
	},
});

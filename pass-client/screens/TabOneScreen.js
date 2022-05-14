import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import NewPost from '../components/Home/NewPost';
import ActivePasses from '../components/Home/ScrollablePasses/ActivePasses';
import ExpiredPasses from '../components/Home/ScrollablePasses/ExpiredPasses';
import WelcomeHeader from '../components/Home/WelcomeHeader';

export default function TabOneScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<WelcomeHeader />
				<NewPost />
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
		backgroundColor: 'white',
	},
});

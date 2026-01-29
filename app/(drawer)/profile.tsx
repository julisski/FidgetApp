import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Welcome to your profile.</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Go to Settings"
          onPress={() => router.push('/settings')} // navigates to Settings
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  buttonContainer: {
    marginTop: 20,
    width: '60%'
  }
});

import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

export default function HomeScreen() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F5F5F5' }]}>
      <Text style={[styles.title, { color: isDarkMode ? 'white' : 'black' }]}>Fidget App</Text>
      <Text style={[styles.subtitle, { color: isDarkMode ? 'white' : 'black' }]}>Choose a tab:</Text>

      <View style={styles.box}>
        <View style={styles.buttonContainer}>
          <Button title="Go to Fidget" onPress={() => router.push('/fidget')} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Go to Profile" onPress={() => router.push('/profile')} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Go to Settings" onPress={() => router.push('/settings')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 20 },
  box: { width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 5 },
  buttonContainer: { marginVertical: 10 },
});

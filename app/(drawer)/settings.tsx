import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F5F5F5' }]}>
      <Text style={[styles.title, { color: isDarkMode ? 'white' : 'black' }]}>Settings</Text>

      <View style={styles.row}>
        <Text style={[styles.label, { color: isDarkMode ? 'white' : 'black' }]}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          thumbColor={isDarkMode ? '#fff' : '#000'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
      </View>

      <Text style={{ color: isDarkMode ? 'white' : 'black', marginTop: 20 }}>
        Current mode: {isDarkMode ? 'Dark' : 'Light'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '60%', marginBottom: 20 },
  label: { fontSize: 18 },
});

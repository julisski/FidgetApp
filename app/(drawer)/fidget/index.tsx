import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function FidgetHub() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Fidget</Text>

      <Pressable style={styles.button} onPress={() => router.push('/fidget/colors2')}>
        <Text>🎨 Color Fidget</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push('/fidget/bubble')}>
        <Text>🫧 Bubble Fidget</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push('/fidget/buttons')}>
        <Text>🔘 Button Fidget</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, marginBottom: 20 },
  button: {
    padding: 15,
    backgroundColor: '#eee',
    marginVertical: 8,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
});

import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FidgetHub() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F5F5' },
  backButton: { paddingHorizontal: 20, paddingVertical: 10 },
  backText: { fontSize: 16, color: '#007AFF' },
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

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ButtonFidget() {
  const [pressCount, setPressCount] = useState(0);
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const buttonColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

  const handlePress = (index: number) => {
    setPressCount(prev => prev + 1);
    setActiveButton(index);
    setTimeout(() => setActiveButton(null), 200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>Button Fidget</Text>
        <Text style={styles.counter}>Presses: {pressCount}</Text>
        <View style={styles.buttonGrid}>
          {buttonColors.map((color, index) => (
            <Pressable
              key={index}
              style={[
                styles.fidgetButton,
                { backgroundColor: color },
                activeButton === index && styles.activeButton,
              ]}
              onPress={() => handlePress(index)}
            >
              <Text style={styles.buttonText}>🔘</Text>
            </Pressable>
          ))}
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={() => setPressCount(0)}>
          <Text style={styles.resetText}>Reset Counter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  counter: {
    fontSize: 18,
    marginBottom: 30,
    color: '#666',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 250,
  },
  fidgetButton: {
    width: 70,
    height: 70,
    margin: 8,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  activeButton: {
    transform: [{ scale: 0.9 }],
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 28,
  },
  resetButton: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#666',
    borderRadius: 8,
  },
  resetText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

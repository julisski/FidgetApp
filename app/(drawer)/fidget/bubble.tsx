import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BubbleFidget() {
  const [bubbles, setBubbles] = useState(
    Array(20).fill(false)
  );

  const popBubble = (index: number) => {
    const newBubbles = [...bubbles];
    newBubbles[index] = !newBubbles[index];
    setBubbles(newBubbles);
  };

  const resetBubbles = () => {
    setBubbles(Array(20).fill(false));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>Pop the Bubbles!</Text>
        <View style={styles.bubbleContainer}>
          {bubbles.map((popped, index) => (
            <Pressable
              key={index}
              style={[styles.bubble, popped && styles.poppedBubble]}
              onPress={() => popBubble(index)}
            >
              <Text style={styles.bubbleText}>{popped ? '💨' : '🫧'}</Text>
            </Pressable>
          ))}
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={resetBubbles}>
          <Text style={styles.resetText}>Reset Bubbles</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E3F2FD',
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
    marginBottom: 20,
  },
  bubbleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 300,
  },
  bubble: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 25,
    backgroundColor: '#90CAF9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  poppedBubble: {
    backgroundColor: '#E0E0E0',
  },
  bubbleText: {
    fontSize: 24,
  },
  resetButton: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2196F3',
    borderRadius: 8,
  },
  resetText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

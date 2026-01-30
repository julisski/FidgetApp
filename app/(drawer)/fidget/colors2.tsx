import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FidgetScreen() {
  const colors = ['#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFF9C4', '#D1C4E9'];
  const [index, setIndex] = useState(0);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors[index] }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.text}>Tap to change color</Text>
        <Button
          title="Change Color"
          onPress={() => setIndex((index + 1) % colors.length)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    marginBottom: 20
  }
});

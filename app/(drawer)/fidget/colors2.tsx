import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function FidgetScreen() {
  const colors = ['#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFF9C4', '#D1C4E9'];
  const [index, setIndex] = useState(0);

  return (
    <View style={[styles.container, { backgroundColor: colors[index] }]}>
      <Text style={styles.text}>Tap to change color</Text>
      <Button
        title="Change Color"
        onPress={() => setIndex((index + 1) % colors.length)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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

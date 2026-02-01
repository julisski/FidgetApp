// Example 2: React Native Component Test
// This file demonstrates testing a React Native component

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { HelloWave } from '../app/components/hello-wave';

describe('HelloWave Component', () => {
  it('renders the wave emoji', () => {
    render(<HelloWave />);

    // Check that the wave emoji is displayed
    const waveEmoji = screen.getByText('👋');
    expect(waveEmoji).toBeTruthy();
  });

  it('renders without crashing', () => {
    // This test ensures the component mounts without errors
    const { toJSON } = render(<HelloWave />);
    expect(toJSON()).toBeTruthy();
  });
});

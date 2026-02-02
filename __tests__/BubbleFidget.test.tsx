import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import BubbleFidget from '../app/(drawer)/fidget/bubble';

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
  },
}));

describe('BubbleFidget', () => {
  it('renders the title', () => {
    render(<BubbleFidget />);
    expect(screen.getByText('Pop the Bubbles!')).toBeTruthy();
  });

  it('renders 20 bubbles', () => {
    render(<BubbleFidget />);
    const bubbles = screen.getAllByText('🫧');
    expect(bubbles).toHaveLength(20);
  });

  it('renders the back button', () => {
    render(<BubbleFidget />);
    expect(screen.getByText('← Back')).toBeTruthy();
  });

  it('renders the reset button', () => {
    render(<BubbleFidget />);
    expect(screen.getByText('Reset Bubbles')).toBeTruthy();
  });

  it('pops a bubble when pressed', () => {
    render(<BubbleFidget />);
    const bubbles = screen.getAllByText('🫧');

    fireEvent.press(bubbles[0]);

    // After popping, should show popped emoji
    expect(screen.getByText('💨')).toBeTruthy();
    // Should have 19 unpopped bubbles remaining
    expect(screen.getAllByText('🫧')).toHaveLength(19);
  });

  it('resets all bubbles when reset button is pressed', () => {
    render(<BubbleFidget />);

    // Pop some bubbles
    const bubbles = screen.getAllByText('🫧');
    fireEvent.press(bubbles[0]);
    fireEvent.press(bubbles[1]);

    // Verify bubbles are popped
    expect(screen.getAllByText('💨')).toHaveLength(2);

    // Press reset
    fireEvent.press(screen.getByText('Reset Bubbles'));

    // All bubbles should be unpopped
    expect(screen.getAllByText('🫧')).toHaveLength(20);
    expect(screen.queryAllByText('💨')).toHaveLength(0);
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ButtonFidget from '../app/(drawer)/fidget/buttons';

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
  },
}));

describe('ButtonFidget', () => {
  it('renders the title', () => {
    render(<ButtonFidget />);
    expect(screen.getByText('Button Fidget')).toBeTruthy();
  });

  it('renders 6 fidget buttons', () => {
    render(<ButtonFidget />);
    const buttons = screen.getAllByText('🔘');
    expect(buttons).toHaveLength(6);
  });

  it('starts with press count of 0', () => {
    render(<ButtonFidget />);
    expect(screen.getByText('Presses: 0')).toBeTruthy();
  });

  it('renders the back button', () => {
    render(<ButtonFidget />);
    expect(screen.getByText('← Back')).toBeTruthy();
  });

  it('renders the reset button', () => {
    render(<ButtonFidget />);
    expect(screen.getByText('Reset Counter')).toBeTruthy();
  });

  it('increments counter when a button is pressed', () => {
    render(<ButtonFidget />);
    const buttons = screen.getAllByText('🔘');

    fireEvent.press(buttons[0]);
    expect(screen.getByText('Presses: 1')).toBeTruthy();

    fireEvent.press(buttons[1]);
    expect(screen.getByText('Presses: 2')).toBeTruthy();
  });

  it('resets counter when reset button is pressed', () => {
    render(<ButtonFidget />);
    const buttons = screen.getAllByText('🔘');

    // Press some buttons
    fireEvent.press(buttons[0]);
    fireEvent.press(buttons[1]);
    fireEvent.press(buttons[2]);
    expect(screen.getByText('Presses: 3')).toBeTruthy();

    // Press reset
    fireEvent.press(screen.getByText('Reset Counter'));
    expect(screen.getByText('Presses: 0')).toBeTruthy();
  });
});

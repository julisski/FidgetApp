// components/ui/icon-symbol.tsx
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';
import { ComponentProps } from 'react';

// Map SF Symbols to Material Icons
export const ICON_MAPPING = {
  'house.fill': 'home',
  'person.fill': 'person',
  'sparkles.fill': 'auto_awesome',
  'paperplane.fill': 'send',
  'chevron.right': 'chevron-right',
  'chevron.left.forwardslash.chevron.right': 'code',
  'gearshape.fill': 'settings', // ✅ Added Settings icon
} as const;

// Allowed icon names (TypeScript literal types)
export type IconSymbolName = keyof typeof ICON_MAPPING;

interface IconSymbolProps {
  name: IconSymbolName; // must be one of the keys above
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
}

export function IconSymbol({ name, size = 24, color, style }: IconSymbolProps) {
  return (
    <MaterialIcons
      name={ICON_MAPPING[name] as ComponentProps<typeof MaterialIcons>['name']}
      size={size}
      color={color}
      style={style}
    />
  );
}

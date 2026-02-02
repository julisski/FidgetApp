import { Colors } from '../app/constants/theme';

describe('Theme Colors', () => {
  it('should have light and dark color schemes', () => {
    expect(Colors.light).toBeDefined();
    expect(Colors.dark).toBeDefined();
  });

  it('should have all required light theme colors', () => {
    expect(Colors.light.text).toBe('#11181C');
    expect(Colors.light.background).toBe('#fff');
    expect(Colors.light.tint).toBe('#0a7ea4');
    expect(Colors.light.icon).toBe('#687076');
  });

  it('should have all required dark theme colors', () => {
    expect(Colors.dark.text).toBe('#ECEDEE');
    expect(Colors.dark.background).toBe('#151718');
    expect(Colors.dark.tint).toBe('#fff');
    expect(Colors.dark.icon).toBe('#9BA1A6');
  });

  it('should have different text colors for light and dark modes', () => {
    expect(Colors.light.text).not.toBe(Colors.dark.text);
    expect(Colors.light.background).not.toBe(Colors.dark.background);
  });
});

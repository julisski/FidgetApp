# Adding Jest Testing to an Expo React Native Project

A step-by-step guide for setting up Jest in an Expo project.

---

## Table of Contents

1. [What is Jest?](#what-is-jest)
2. [Prerequisites](#prerequisites)
3. [Step 1: Install Dependencies](#step-1-install-dependencies)
4. [Step 2: Add the Test Script](#step-2-add-the-test-script)
5. [Step 3: Create Jest Configuration](#step-3-create-jest-configuration)
6. [Step 4: Create the Setup File](#step-4-create-the-setup-file)
7. [Step 5: Write Your First Test](#step-5-write-your-first-test)
8. [Step 6: Write a Component Test](#step-6-write-a-component-test)
9. [Step 7: Run the Tests](#step-7-run-the-tests)
10. [Understanding Jest Syntax](#understanding-jest-syntax)
11. [Common Matchers Reference](#common-matchers-reference)
12. [Troubleshooting](#troubleshooting)

---

## What is Jest?

**Jest** is a JavaScript testing framework created by Facebook (Meta). It's the most popular testing framework for React and React Native applications.

### Why use Jest?

- **Zero configuration** - Works out of the box for most projects
- **Fast** - Runs tests in parallel
- **Snapshot testing** - Can capture component output and compare changes
- **Built-in mocking** - Easy to mock functions, modules, and timers
- **Great error messages** - Clear feedback when tests fail

### Testing terminology

| Term | Definition |
|------|------------|
| **Unit Test** | Tests a single function or component in isolation |
| **Integration Test** | Tests how multiple parts work together |
| **Assertion** | A statement that checks if something is true |
| **Matcher** | A method that checks a value (like `toBe()`, `toEqual()`) |
| **Mock** | A fake version of a function or module for testing |

---

## Prerequisites

Before starting, make sure you have:

- An Expo project created with `npx create-expo-app`
- Node.js installed
- A terminal/command line

---

## Step 1: Install Dependencies

We need to install several packages for testing. Run these commands in your project folder:

### 1a. Install Jest and jest-expo

```bash
npx expo install jest jest-expo
```

**What these packages do:**

| Package | Purpose |
|---------|---------|
| `jest` | The test runner - executes your tests |
| `jest-expo` | Expo's Jest preset - configures Jest to work with React Native and Expo |

### 1b. Install Testing Library

```bash
npm install --save-dev @testing-library/react-native @testing-library/jest-native --legacy-peer-deps
```

**What these packages do:**

| Package | Purpose |
|---------|---------|
| `@testing-library/react-native` | Utilities to render and interact with React Native components in tests |
| `@testing-library/jest-native` | Custom matchers like `toBeVisible()` and `toHaveTextContent()` |

### Why `--legacy-peer-deps`?

Sometimes packages have strict version requirements that conflict with each other. The `--legacy-peer-deps` flag tells npm to be less strict about version matching. This is safe when:

- The version mismatch is minor (e.g., 19.1.0 vs 19.2.4)
- You're in a learning/development environment

In production, you'd want to align all versions properly.

---

## Step 2: Add the Test Script

Open `package.json` and add a `"test"` script to the `"scripts"` section:

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web",
    "lint": "expo lint",
    "test": "jest"
  }
}
```

**What this does:**

- Allows you to run `npm test` from the terminal
- npm will execute the `jest` command
- Jest will find and run all test files

---

## Step 3: Create Jest Configuration

Create a file called `jest.config.js` in your project root (same level as `package.json`):

```javascript
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
  ],
};
```

### Configuration explained:

| Option | What it does |
|--------|--------------|
| `preset` | Uses `jest-expo` which pre-configures Jest for Expo/React Native |
| `setupFilesAfterEnv` | Files to run after Jest is set up but before tests run |
| `transformIgnorePatterns` | Tells Jest which `node_modules` to transform (React Native modules need transformation) |

### Why do we need `transformIgnorePatterns`?

React Native and Expo packages are written in modern JavaScript/TypeScript that needs to be transformed (compiled) before Jest can run them. By default, Jest ignores `node_modules`, but we need to make exceptions for React Native packages.

---

## Step 4: Create the Setup File

Create a file called `jest.setup.js` in your project root:

```javascript
// Jest Setup File
// This file runs before each test file

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});
```

### What is mocking?

**Mocking** means replacing real code with fake versions for testing. We need to mock certain React Native modules because:

1. **They use native code** - Jest runs in Node.js, not on a phone
2. **They have side effects** - Animations, sensors, etc. don't work in a test environment
3. **They cause errors** - Without mocks, tests would crash

### Common modules that need mocking:

| Module | Why it needs mocking |
|--------|---------------------|
| `react-native-reanimated` | Uses native animation drivers |
| `expo-haptics` | Requires device vibration hardware |
| `expo-camera` | Requires camera hardware |
| `AsyncStorage` | Requires native storage |

---

## Step 5: Write Your First Test

Create a folder called `__tests__` in your project root, then create a file called `example.test.ts`:

```typescript
// Example 1: Basic Jest Test
// This file demonstrates simple unit testing without any React components

describe('Basic Math Operations', () => {
  // Test 1: Simple assertion
  it('should add two numbers correctly', () => {
    const result = 2 + 2;
    expect(result).toBe(4);
  });

  // Test 2: Testing a function
  it('should multiply numbers correctly', () => {
    const multiply = (a: number, b: number) => a * b;
    expect(multiply(3, 4)).toBe(12);
  });

  // Test 3: Testing truthiness
  it('should check truthy and falsy values', () => {
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
    expect(null).toBeNull();
    expect(undefined).toBeUndefined();
  });

  // Test 4: Testing arrays
  it('should check array contents', () => {
    const colors = ['red', 'green', 'blue'];
    expect(colors).toContain('green');
    expect(colors).toHaveLength(3);
  });
});
```

### Understanding the test structure:

```
describe('Group Name', () => {
  it('should do something', () => {
    // Arrange - set up the test
    const input = 5;

    // Act - perform the action
    const result = input * 2;

    // Assert - check the result
    expect(result).toBe(10);
  });
});
```

### The AAA Pattern:

| Step | Purpose | Example |
|------|---------|---------|
| **Arrange** | Set up the test data | `const user = { name: 'John' }` |
| **Act** | Perform the action being tested | `const greeting = sayHello(user)` |
| **Assert** | Verify the result | `expect(greeting).toBe('Hello, John')` |

---

## Step 6: Write a Component Test

Create a file called `HelloWave.test.tsx` in the `__tests__` folder:

```tsx
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
```

### Component testing concepts:

| Function | What it does |
|----------|--------------|
| `render()` | Renders a component for testing |
| `screen` | Object to query the rendered output |
| `getByText()` | Finds an element by its text content |
| `getByTestId()` | Finds an element by its `testID` prop |
| `toJSON()` | Converts the rendered output to a JSON snapshot |

### Query methods:

| Method | Behavior |
|--------|----------|
| `getBy...` | Returns element or throws error if not found |
| `queryBy...` | Returns element or `null` if not found |
| `findBy...` | Returns a Promise, waits for element to appear |

---

## Step 7: Run the Tests

Run your tests with:

```bash
npm test
```

### Expected output:

```
 PASS  __tests__/example.test.ts
 PASS  __tests__/HelloWave.test.tsx

Test Suites: 2 passed, 2 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        3.456 s
```

### Useful test commands:

| Command | What it does |
|---------|--------------|
| `npm test` | Run all tests once |
| `npm test -- --watch` | Run tests in watch mode (re-runs on file changes) |
| `npm test -- --coverage` | Run tests and show code coverage report |
| `npm test -- MyComponent` | Run only tests matching "MyComponent" |

---

## Understanding Jest Syntax

### `describe()` - Group tests together

```javascript
describe('Calculator', () => {
  // All calculator-related tests go here
});
```

### `it()` or `test()` - Define a single test

```javascript
it('should add numbers', () => { /* ... */ });
test('should add numbers', () => { /* ... */ });  // Same thing
```

### `expect()` - Make an assertion

```javascript
expect(actualValue).toBe(expectedValue);
```

### `beforeEach()` / `afterEach()` - Run code before/after each test

```javascript
describe('User tests', () => {
  let user;

  beforeEach(() => {
    user = { name: 'John', age: 30 };  // Fresh user for each test
  });

  afterEach(() => {
    // Clean up after each test
  });

  it('should have a name', () => {
    expect(user.name).toBe('John');
  });
});
```

---

## Common Matchers Reference

### Equality

```javascript
expect(value).toBe(4);              // Strict equality (===)
expect(value).toEqual({ a: 1 });    // Deep equality for objects
expect(value).not.toBe(5);          // Negation
```

### Truthiness

```javascript
expect(value).toBeTruthy();         // Truthy value
expect(value).toBeFalsy();          // Falsy value
expect(value).toBeNull();           // Exactly null
expect(value).toBeUndefined();      // Exactly undefined
expect(value).toBeDefined();        // Not undefined
```

### Numbers

```javascript
expect(value).toBeGreaterThan(3);
expect(value).toBeGreaterThanOrEqual(3);
expect(value).toBeLessThan(5);
expect(value).toBeCloseTo(0.3);     // For floating point
```

### Strings

```javascript
expect(string).toMatch(/pattern/);  // Regex match
expect(string).toContain('world');  // Contains substring
```

### Arrays

```javascript
expect(array).toContain('item');
expect(array).toHaveLength(3);
```

### Objects

```javascript
expect(object).toHaveProperty('name');
expect(object).toHaveProperty('name', 'John');
expect(object).toMatchObject({ name: 'John' });
```

### Exceptions

```javascript
expect(() => throwingFunction()).toThrow();
expect(() => throwingFunction()).toThrow('error message');
```

---

## Troubleshooting

### Error: "Cannot find module 'react-native-reanimated/mock'"

**Solution:** Make sure you have `react-native-reanimated` installed:

```bash
npx expo install react-native-reanimated
```

### Error: "SyntaxError: Cannot use import statement outside a module"

**Solution:** Check your `transformIgnorePatterns` in `jest.config.js`. You may need to add the problematic package to the list.

### Error: "ERESOLVE unable to resolve dependency tree"

**Solution:** Use `--legacy-peer-deps` flag:

```bash
npm install package-name --legacy-peer-deps
```

### Tests are slow

**Solutions:**
1. Run tests in watch mode: `npm test -- --watch`
2. Run only changed tests: `npm test -- --onlyChanged`
3. Run a specific test file: `npm test -- MyComponent.test.tsx`

### Component test fails with "Unable to find element"

**Possible causes:**
1. Element hasn't rendered yet - use `findBy` instead of `getBy`
2. Text doesn't match exactly - check for whitespace
3. Element is hidden - check component logic

---

## Project Structure After Setup

```
FidgetApp/
├── __tests__/
│   ├── example.test.ts        # Basic unit tests
│   └── HelloWave.test.tsx     # Component tests
├── app/
│   └── components/
│       └── hello-wave.tsx     # Component being tested
├── jest.config.js             # Jest configuration
├── jest.setup.js              # Test setup and mocks
├── package.json               # Has "test" script
└── ...
```

---

## Next Steps

Once you're comfortable with basic testing, explore:

1. **Snapshot testing** - Capture component output and detect changes
2. **User interaction testing** - Simulate button presses, text input
3. **Async testing** - Test API calls and loading states
4. **Test coverage** - Measure how much code your tests cover

---

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library for React Native](https://callstack.github.io/react-native-testing-library/)
- [Expo Testing Guide](https://docs.expo.dev/develop/unit-testing/)

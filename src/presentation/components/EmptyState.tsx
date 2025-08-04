import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { COLORS } from '../theme/colors';

const EmptyState = () => (
  <View style={styles.container}>
    {/* This is a simpler, more stable SVG that avoids the crashing bug */}
    <Svg width={150} height={150} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="10" fill={COLORS.primaryLight} />
      <Path
        d="M9.75 16.2l-3.95-3.95-1.41 1.41L9.75 19l8.41-8.41-1.41-1.41L9.75 16.2z"
        fill={COLORS.primary}
      />
    </Svg>
    <Text style={styles.title}>All tasks complete!</Text>
    <Text style={styles.subtitle}>You're all caught up. Enjoy your day!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 24,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.subtleText,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default EmptyState;
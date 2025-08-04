import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-paper';
import { COLORS } from '../theme/colors';

const AppIcon = () => (
  <View style={styles.iconContainer}>
    <Icon source="check-decagram" size={60} color={COLORS.white} />
  </View>
);

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: COLORS.primary,
    width: 100,
    height: 100,
    borderRadius: 28, // More rounded
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 40,
    elevation: 8,
  },
});

export default AppIcon;
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { AuthService } from '../../data/services/authService';
import { SignupScreenProps } from '../../navigation/types';
import AppIcon from '../components/AppIcon';
import { COLORS } from '../theme/colors';

const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await AuthService.signUp({ email, password });
      // Navigation will happen automatically on success
    } catch (e: any) {
      if (e.code === 'auth/email-already-in-use') {
        setError('That email address is already in use!');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <AppIcon />
        <Text style={styles.title}>Let's get started!</Text>
        <TextInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Button
          mode="contained"
          onPress={handleSignup}
          style={styles.button}
          labelStyle={styles.buttonText}
          loading={isLoading}
          disabled={isLoading}
        >
          Sign Up
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerText}>
            Already have an account? <Text style={styles.linkText}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.surface },
  container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 32, fontWeight: 'bold', color: COLORS.text, textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: COLORS.background, marginBottom: 16, borderRadius: 12, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  button: { backgroundColor: COLORS.primary, paddingVertical: 8, borderRadius: 12, marginTop: 10, elevation: 4 },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: COLORS.white },
  errorText: { color: COLORS.danger, textAlign: 'center', marginBottom: 10 },
  footerText: { textAlign: 'center', marginTop: 20, color: COLORS.subtleText },
  linkText: { color: COLORS.primary, fontWeight: 'bold' },
});

export default SignupScreen;
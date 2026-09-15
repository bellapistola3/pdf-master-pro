import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { login, register } from '../api/client';

export default function AccountScreen() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  async function submit() {
    try {
      if (mode === 'login') await login(email, password);
      else await register(email, password);
      setLoggedIn(true);
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  }

  if (loggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Account</Text>
        <Text style={{ color: '#48566B' }}>Signed in as {email}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{mode === 'login' ? 'Log in' : 'Register'}</Text>
      <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Pressable style={styles.primaryBtn} onPress={submit}>
        <Text style={styles.primaryBtnText}>{mode === 'login' ? 'Log in' : 'Create account'}</Text>
      </Pressable>
      <Pressable onPress={() => setMode(mode === 'login' ? 'register' : 'login')}>
        <Text style={{ color: '#2F6F6D', marginTop: 16, textAlign: 'center' }}>
          {mode === 'login' ? "Don't have an account? Register" : 'Already have an account? Log in'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F5F0', padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', color: '#1E2A3A', marginBottom: 20 },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 14, borderWidth: 1, borderColor: '#E4DFD4', marginBottom: 12 },
  primaryBtn: { backgroundColor: '#B23A2E', borderRadius: 999, padding: 16, alignItems: 'center', marginTop: 8 },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
});

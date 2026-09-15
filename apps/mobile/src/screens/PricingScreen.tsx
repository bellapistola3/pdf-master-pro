import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const PLANS = [
  { name: 'Free', price: '$0', features: ['5 operations/day', 'Up to 25MB per file', 'Basic tools'] },
  { name: 'Pro', price: '$9.99/mo', features: ['500 operations/month', 'Up to 500MB per file', 'OCR & batch processing', 'AI summary'] },
  { name: 'Business', price: 'Custom', features: ['Team usage', 'API access', 'Priority processing'] },
];

export default function PricingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ gap: 16 }}>
        <Text style={styles.title}>Plans for every workload</Text>
        {PLANS.map((p) => (
          <View key={p.name} style={styles.card}>
            <Text style={styles.planName}>{p.name}</Text>
            <Text style={styles.planPrice}>{p.price}</Text>
            {p.features.map((f) => (
              <Text key={f} style={styles.feature}>✓ {f}</Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F5F0', padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#1E2A3A', marginBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#E4DFD4' },
  planName: { fontSize: 18, fontWeight: '700', color: '#1E2A3A' },
  planPrice: { fontSize: 22, fontWeight: '700', color: '#1E2A3A', marginBottom: 10 },
  feature: { color: '#48566B', marginBottom: 4 },
});

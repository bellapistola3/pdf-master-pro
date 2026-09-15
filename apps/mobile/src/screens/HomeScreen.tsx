import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { MOBILE_TOOLS } from '../api/toolsConfig';

export default function HomeScreen({ navigation }: any) {
  const popular = MOBILE_TOOLS.filter((t) => !t.roadmap).slice(0, 6);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>PDF Master Pro</Text>
      <Text style={styles.subtitle}>Your complete PDF workspace</Text>

      <Text style={styles.sectionLabel}>Popular tools</Text>
      <FlatList
        data={popular}
        keyExtractor={(t) => t.slug}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => navigation.navigate('ToolRunner', { slug: item.slug })}>
            <Text style={styles.cardTitle}>{item.name}</Text>
          </Pressable>
        )}
      />

      <Pressable style={styles.linkRow} onPress={() => navigation.navigate('Tools')}>
        <Text style={styles.link}>See all tools →</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F5F0', padding: 20 },
  title: { fontSize: 28, fontWeight: '700', color: '#1E2A3A' },
  subtitle: { fontSize: 15, color: '#48566B', marginBottom: 24 },
  sectionLabel: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#1E2A3A' },
  card: { flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E4DFD4', minHeight: 88, justifyContent: 'center' },
  cardTitle: { fontWeight: '600', color: '#1E2A3A' },
  linkRow: { marginTop: 20 },
  link: { color: '#2F6F6D', fontWeight: '600' },
});

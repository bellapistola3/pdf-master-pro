import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { MOBILE_TOOLS } from '../api/toolsConfig';

export default function ToolsScreen({ navigation }: any) {
  const [query, setQuery] = useState('');
  const filtered = MOBILE_TOOLS.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>All tools</Text>
      <TextInput
        placeholder="Search tools…"
        value={query}
        onChangeText={setQuery}
        style={styles.search}
        placeholderTextColor="#8a94a3"
      />
      <FlatList
        data={filtered}
        keyExtractor={(t) => t.slug}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() => !item.roadmap && navigation.navigate('ToolRunner', { slug: item.slug })}
          >
            <Text style={styles.rowTitle}>{item.name}</Text>
            {item.roadmap && <Text style={styles.badge}>Roadmap</Text>}
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F5F0', padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#1E2A3A', marginBottom: 14 },
  search: { backgroundColor: '#fff', borderRadius: 999, paddingHorizontal: 16, paddingVertical: 10, borderWidth: 1, borderColor: '#E4DFD4', marginBottom: 16 },
  row: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#E4DFD4', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowTitle: { fontWeight: '600', color: '#1E2A3A' },
  badge: { fontSize: 12, color: '#B23A2E', fontWeight: '600' },
});

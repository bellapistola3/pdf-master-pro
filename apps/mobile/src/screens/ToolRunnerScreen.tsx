import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { MOBILE_TOOLS } from '../api/toolsConfig';
import { runTool, pollJob, downloadUrlFor } from '../api/client';

type Stage = 'upload' | 'processing' | 'result' | 'error';

export default function ToolRunnerScreen({ route }: any) {
  const tool = MOBILE_TOOLS.find((t) => t.slug === route.params.slug)!;
  const [stage, setStage] = useState<Stage>('upload');
  const [pickedName, setPickedName] = useState<string | null>(null);
  const [pickedUri, setPickedUri] = useState<string | null>(null);
  const [pickedMime, setPickedMime] = useState<string>('application/pdf');
  const [fields, setFields] = useState<Record<string, string>>(
    Object.fromEntries((tool.extraFields || []).map((f) => [f.name, f.default || '']))
  );
  const [job, setJob] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  async function pickFile() {
    if (tool.isImage) {
      const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
      if (!res.canceled) {
        setPickedUri(res.assets[0].uri);
        setPickedName(res.assets[0].fileName || 'photo.jpg');
        setPickedMime('image/jpeg');
      }
    } else {
      const res = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
      if (res.assets?.[0]) {
        setPickedUri(res.assets[0].uri);
        setPickedName(res.assets[0].name);
        setPickedMime(res.assets[0].mimeType || 'application/pdf');
      }
    }
  }

  async function pickFromCamera() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return Alert.alert('Camera permission is required');
    const res = await ImagePicker.launchCameraAsync({ quality: 0.9 });
    if (!res.canceled) {
      setPickedUri(res.assets[0].uri);
      setPickedName('scan.jpg');
      setPickedMime('image/jpeg');
    }
  }

  async function handleProcess() {
    if (!pickedUri || !pickedName) return Alert.alert('Pick a file first');
    setStage('processing');
    try {
      const response = await runTool(tool.api, pickedUri, pickedName, pickedMime, fields, tool.fileField);
      if (response.status === 'completed' && !response.jobId) {
        // sync tools (compare/extract-data/ai) — show raw JSON result
        setJob({ status: 'completed', raw: response });
        setStage('result');
        return;
      }
      const finalJob = await pollJob(response.jobId, (j) => setJob(j));
      if (finalJob.status !== 'completed') {
        setErrorMsg(finalJob.errorMessage || 'Processing failed');
        setStage('error');
        return;
      }
      setJob(finalJob);
      setStage('result');
    } catch (err: any) {
      setErrorMsg(err.message);
      setStage('error');
    }
  }

  async function handleDownloadAndShare() {
    const url = downloadUrlFor(job);
    if (!url) return;
    const localPath = FileSystem.documentDirectory + `pdfmaster-${Date.now()}.pdf`;
    const { uri } = await FileSystem.downloadAsync(url, localPath);
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      Alert.alert('Downloaded', `Saved to ${uri}`);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{tool.name}</Text>

      {stage === 'upload' && (
        <View style={{ gap: 14 }}>
          <Pressable style={styles.dropzone} onPress={pickFile}>
            <Text style={styles.dropzoneText}>{pickedName ? `Selected: ${pickedName}` : 'Pick a file or photo'}</Text>
          </Pressable>
          {tool.isImage && (
            <Pressable style={styles.secondaryBtn} onPress={pickFromCamera}>
              <Text style={styles.secondaryBtnText}>Take a photo</Text>
            </Pressable>
          )}
          {(tool.extraFields || []).map((f) => (
            <View key={f.name}>
              <Text style={styles.label}>{f.label}</Text>
              <TextInput
                style={styles.input}
                value={fields[f.name]}
                onChangeText={(v) => setFields((s) => ({ ...s, [f.name]: v }))}
              />
            </View>
          ))}
          <Pressable style={styles.primaryBtn} onPress={handleProcess}>
            <Text style={styles.primaryBtnText}>Process</Text>
          </Pressable>
        </View>
      )}

      {stage === 'processing' && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2F6F6D" />
          <Text style={{ marginTop: 12, color: '#48566B' }}>{job?.status || 'Processing…'}</Text>
        </View>
      )}

      {stage === 'result' && (
        <View style={{ gap: 14 }}>
          <Text style={{ color: '#1E2A3A', fontWeight: '600' }}>Done!</Text>
          {job?.raw ? (
            <Text style={{ color: '#48566B' }}>{JSON.stringify(job.raw, null, 2)}</Text>
          ) : (
            <Pressable style={styles.primaryBtn} onPress={handleDownloadAndShare}>
              <Text style={styles.primaryBtnText}>Download & share</Text>
            </Pressable>
          )}
          <Pressable style={styles.secondaryBtn} onPress={() => { setStage('upload'); setPickedUri(null); setPickedName(null); }}>
            <Text style={styles.secondaryBtnText}>Process another file</Text>
          </Pressable>
        </View>
      )}

      {stage === 'error' && (
        <View style={{ gap: 14 }}>
          <Text style={{ color: '#B23A2E', fontWeight: '600' }}>Something went wrong</Text>
          <Text style={{ color: '#48566B' }}>{errorMsg}</Text>
          <Pressable style={styles.secondaryBtn} onPress={() => setStage('upload')}>
            <Text style={styles.secondaryBtnText}>Try again</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F5F0', padding: 20 },
  title: { fontSize: 22, fontWeight: '700', color: '#1E2A3A', marginBottom: 20 },
  dropzone: { borderWidth: 2, borderColor: '#E4DFD4', borderStyle: 'dashed', borderRadius: 16, padding: 24, alignItems: 'center' },
  dropzoneText: { color: '#48566B' },
  label: { color: '#1E2A3A', fontWeight: '600', marginBottom: 6 },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#E4DFD4' },
  primaryBtn: { backgroundColor: '#B23A2E', borderRadius: 999, padding: 16, alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
  secondaryBtn: { borderWidth: 1.5, borderColor: '#E4DFD4', borderRadius: 999, padding: 16, alignItems: 'center' },
  secondaryBtnText: { color: '#1E2A3A', fontWeight: '700' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

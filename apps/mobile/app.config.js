export default {
  expo: {
    name: 'PDF Master Pro',
    slug: 'pdf-master-pro',
    version: '0.1.0',
    orientation: 'portrait',
    scheme: 'pdfmasterpro',
    userInterfaceStyle: 'automatic',
    ios: { supportsTablet: true, bundleIdentifier: 'com.pdfmasterpro.app' },
    android: { package: 'com.pdfmasterpro.app' },
    extra: {
      // Same API the web app calls — override for production builds via EAS.
      apiBaseUrl: process.env.PDF_MASTER_API_BASE || 'http://localhost:4000/api',
    },
  },
};

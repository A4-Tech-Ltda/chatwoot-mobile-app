import { ConfigContext, ExpoConfig } from 'expo/config';

const appName = process.env.EXPO_PUBLIC_APP_NAME || 'Conversa com Agente';
const appSlug = process.env.EXPO_PUBLIC_APP_SLUG || 'conversa-com-agente-mobile';
const appScheme = process.env.EXPO_PUBLIC_APP_SCHEME || 'conversacomagente';
const associatedDomain =
  process.env.EXPO_PUBLIC_ASSOCIATED_DOMAIN || 'chat.conversacomagente.com.br';
const iosBundleIdentifier =
  process.env.EXPO_PUBLIC_IOS_BUNDLE_IDENTIFIER || 'br.com.conversacomagente.app';
const androidPackage = process.env.EXPO_PUBLIC_ANDROID_PACKAGE || 'br.com.conversacomagente.app';
const easOwner = process.env.EXPO_PUBLIC_EAS_OWNER || undefined;

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    name: appName,
    slug: appSlug,
    version: '4.5.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: false,
    scheme: appScheme,
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
      enableFullScreenImage_legacy: true,
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: iosBundleIdentifier,
      infoPlist: {
        NSCameraUsageDescription:
          'O Conversa com Agente precisa acessar a camera para enviar imagens e videos.',
        NSPhotoLibraryUsageDescription:
          'O Conversa com Agente precisa acessar sua biblioteca de fotos para enviar imagens.',
        NSMicrophoneUsageDescription:
          'O Conversa com Agente precisa acessar o microfone para gravar audio.',
        NSAppleMusicUsageDescription:
          'O Conversa com Agente nao usa Apple Music, mas uma API do sistema pode solicitar esta permissao.',
        UIBackgroundModes: ['fetch', 'remote-notification'],
        ITSAppUsesNonExemptEncryption: false,
      },
      // Please use the relative path to the google-services.json file
      googleServicesFile: process.env.EXPO_PUBLIC_IOS_GOOGLE_SERVICES_FILE,
      entitlements: { 'aps-environment': 'production' },
      associatedDomains: [`applinks:${associatedDomain}`],
    },
    android: {
      adaptiveIcon: { foregroundImage: './assets/adaptive-icon.png', backgroundColor: '#ffffff' },
      package: androidPackage,
      permissions: ['android.permission.CAMERA', 'android.permission.RECORD_AUDIO'],
      // Please use the relative path to the google-services.json file
      googleServicesFile: process.env.EXPO_PUBLIC_ANDROID_GOOGLE_SERVICES_FILE,
      intentFilters: [
        {
          action: 'VIEW',
          autoVerify: true,
          data: [
            {
              scheme: 'https',
              host: associatedDomain,
              pathPrefix: '/app/accounts/',
              pathPattern: '/*/conversations/*',
            },
          ],
          category: ['BROWSABLE', 'DEFAULT'],
        },
        {
          action: 'VIEW',
          data: [
            {
              scheme: appScheme,
            },
          ],
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
    },
    extra: {
      eas: {
        projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
        storybookEnabled: process.env.EXPO_STORYBOOK_ENABLED,
      },
    },
    ...(easOwner ? { owner: easOwner } : {}),
    plugins: [
      'expo-font',
      ['react-native-permissions', { iosPermissions: ['Camera', 'PhotoLibrary', 'MediaLibrary'] }],
      [
        '@sentry/react-native/expo',
        {
          url: 'https://sentry.io/',
          project: process.env.EXPO_PUBLIC_SENTRY_PROJECT_NAME,
          organization: process.env.EXPO_PUBLIC_SENTRY_ORG_NAME,
        },
      ],
      '@react-native-firebase/app',
      '@react-native-firebase/messaging',
      [
        'expo-build-properties',
        {
          // https://github.com/invertase/notifee/issues/808#issuecomment-2175934609
          android: {
            minSdkVersion: 24,
            compileSdkVersion: 35,
            targetSdkVersion: 35,
            enableProguardInReleaseBuilds: true,
          },
          ios: { useFrameworks: 'static' },
        },
      ],
      './with-ffmpeg-pod.js',
    ],
    androidNavigationBar: { backgroundColor: '#ffffff' },
  };
};

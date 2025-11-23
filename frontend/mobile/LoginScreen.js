import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { Magic } from 'magic-sdk';
import ReactNativeBiometrics from 'react-native-biometrics';

// CONFIGURATION
GoogleSignin.configure({
  webClientId: 'YOUR_GOOGLE_OAUTH_CLIENT_ID',
});
const magic = new Magic('YOUR_MAGIC_PUBLISHABLE_KEY');

// AUTHENTICATION HANDLERS
const handleGoogleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('Google Login Success:', userInfo);
    // Navigate to main app
  } catch (error) {
    console.error('Google Login Failed:', error.message);
  }
};

const handleMagicLink = async () => {
  try {
    const email = prompt('Enter email for magic link:');
    await magic.auth.loginWithMagicLink({ email });
    console.log('Magic link sent! Check your inbox.');
    // Navigate to main app
  } catch (error) {
    console.error('Magic Link Failed:', error.message);
  }
};

// MAIN COMPONENT
export default function LoginScreen() {
  const connector = useWalletConnect();

  const handleWeb3Login = () => {
    if (!connector.connected) {
      connector.connect();
    } else {
      console.log('Wallet Login Success:', connector.accounts[0]);
      // Navigate to main app
    }
  };

  const handleBiometricLogin = async () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const { available } = await rnBiometrics.isSensorAvailable();
    if (available) {
      const { success } = await rnBiometrics.simplePrompt({ 
        promptMessage: 'Confirm Biometric Login' 
      });
      if (success) {
        console.log('Biometric Login Success');
        // Navigate to main app
      }
    } else {
      console.log('Biometric Not Available');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Futuristic Social</Text>
      <Image source={require('./assets/logo.png')} style={styles.logo} />

      <TouchableOpacity style={styles.button} onPress={handleWeb3Login}>
        <Text style={styles.buttonText}>Sign in with Wallet (Web3)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleBiometricLogin}>
        <Text style={styles.buttonText}>Sign in with Face ID / Biometrics</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleMagicLink}>
        <Text style={styles.buttonText}>Sign in with Magic Email Link</Text>
      </TouchableOpacity>
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#181933', 
    padding: 16 
  },
  brand: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginBottom: 20 
  },
  logo: { 
    width: 80, 
    height: 80, 
    marginBottom: 25 
  },
  button: { 
    backgroundColor: '#914CE6', 
    padding: 15, 
    borderRadius: 30, 
    marginBottom: 18, 
    width: 280, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16 
  }
});

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS } from '../constants/theme';
import { Alert } from 'react-native';
import Constants from 'expo-constants';


export default function AdminLoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const SUPABASE_URL = Constants.expoConfig.extra.supabaseUrl;
  const SUPABASE_ANON_KEY = Constants.expoConfig.extra.supabaseAnonKey;

  const handleLogin = async () => {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
            email,
            password
        }),
    });
    const data = await res.json();

   if (res.ok) {
    navigation.replace('MainTab');
  } else {
    Alert.alert('Login Failed', data.error_description || 'Check your credentials');
  }
};

  return (
    <View style={styles.container}>
        <LinearGradient colors={['rgb(255, 166, 0)', 'rgba(255, 215, 0, 1)']} style={styles.banner}>
        <Image source={require('../assets/login-bg.png')} style={styles.bgImage} />
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.brand}>Fair Fare!</Text>
      </View>
      </LinearGradient>
    
      <View style={styles.loginInputContainer}>

      
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={hidePassword}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  banner: {
    borderBottomLeftRadius: 70,
    marginBottom: 30,
  },

  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 180,
  },

  bgImage: {
    position: 'absolute',
    width: '100%',
    borderRadius:20,
},
  title: {
    fontSize: 28,
    color: COLORS.white,
    fontWeight: '600',
  },

  brand: {
    fontSize: 48,
    color: COLORS.white,
    fontWeight: 'bold',
    fontFamily: FONTS.bold,
  },

  loginInputContainer: {
    padding: 30,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },

  passwordContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  passwordInput: {
    flex: 1,
    fontSize: 16,
  },

  loginButton: {
    backgroundColor: COLORS.yellow,
    height: 50,
    borderRadius: 10,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

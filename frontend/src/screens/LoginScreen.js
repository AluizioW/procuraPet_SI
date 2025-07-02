import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, SafeAreaView, KeyboardAvoidingView, Platform,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { API_CONFIG } from '../config';

const logo = require('../../assets/LOGO2.svg');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');   

  const navigation = useNavigation();
  const { login } = useAuth();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    return re.test(password);
  };
  
  const handleLogin = async () => {

    setEmailError('');
    setPasswordError('');

    if (!email) {
      Alert.alert('Atenção', 'Por favor, preencha seu e-mail e senha.');
      setEmailError('Por favor, insira um email válido.');
      return;
    }

    if (!senha) {
      Alert.alert('Atenção', 'Por favor, preencha sua senha.');
      setPasswordError('A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos (@$!%*?&).');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Por favor, insira um email válido.');
      return;
    }

    if (!validatePassword(senha)) {
      setPasswordError('A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos (@$!%*?&).');
      return;
    }

    setIsLoading(true);

    try {
      console.log('verificando...');
      const response = await api.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER_LOGIN}`, {
        email: email,
        senha: senha,
      });

      console.log('Resposta do servidor:');

      console.log(response);

      console.log('Login quase realizado!');

      const { token } = response.data;
      await login(token);
      navigation.navigate('Home'); // Navega para a tela inicial após o login bem-sucedido
      console.log('Login bem-sucedido!');

    } catch (error) {
      console.log('Erro ao fazer login:');
      console.error(error.response ? error.response.data : error.message);
      const errorMessage =
        error.response?.data?.message || 'Não foi possível fazer login. Verifique suas credenciais.';
      Alert.alert('Erro no Login', errorMessage);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>

        <Text style={styles.title}>Login</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="exemplo@email.com"
            placeholderTextColor="#aaa"
            returnKeyType="next"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            value={senha}
            onChangeText={(text) => {
              setSenha(text);
              setPasswordError('');
            }}
            secureTextEntry 
            placeholder="Digite sua senha"
            placeholderTextColor="#aaa"
            // returnKeyType="done"
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleLogin} 
            disabled={isLoading} 
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {  }}>
            <Text style={styles.forgotPasswordText}>
              Esqueceu a senha? <Text style={{fontWeight: 'bold'}}>Redefina aqui</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
              style={{marginTop: 10}} 
              onPress={() => navigation.navigate('Register')}
          >
              <Text style={styles.forgotPasswordText}>
                  Não possui conta? <Text style={{fontWeight: 'bold'}}>Cadastre-se</Text>
              </Text>
          </TouchableOpacity>

          
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f3eb',
  },
  keyboardView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 200,
    height: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#393a38',
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#f8faf6',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    backgroundColor: '#f3f8ed',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#66997b', 
    paddingVertical: 18,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    marginTop: 20,
    fontSize: 16,
    color: '#7aa68b',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginBottom: 15,
  },
});

export default LoginScreen;
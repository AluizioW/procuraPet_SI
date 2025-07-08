import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_CONFIG } from '../config';
import {TextInputMask} from 'react-native-masked-text';
import { Ionicons } from '@expo/vector-icons'; 

import api from '../services/api';

const RegisterScreen = () => {
  const [nomeUsuario, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [confirmarSenhaError, setConfirmarSenhaError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  

  const navigation = useNavigation();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    return re.test(password);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {

    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmarSenhaError('');

    // if (!nomeUsuario || !email || !senha) {
    if (!nomeUsuario && !email && !senha) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      setConfirmarSenhaError('Por favor, preencha todos os campos.');
      return;
    }

    if(!nomeUsuario) {
      Alert.alert('Atenção', 'Por favor, preencha seu nome completo.');
      setUsernameError('Por favor, insira seu nome completo.');
      return;
    }

    if (!email) {
      Alert.alert('Atenção', 'Por favor, preencha seu e-mail.');
      setEmailError('Por favor, insira um email válido.');
      return;
    } 

    if (!senha) {
      Alert.alert('Atenção', 'Por favor, preencha sua senha.');   
      setPasswordError('A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos (@$!%*?&).');
      return;
    }

    if (!confirmarSenha) {
      Alert.alert('Atenção', 'Por favor, confirme sua senha.');
      setConfirmarSenhaError('Por favor, confirme sua senha.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Por favor, insira um email válido.');
      return;
    }

    // Validar senha
    if (!validatePassword(senha)) {
      setPasswordError('A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos (@$!%*?&).');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não coincidem.');
      setPasswordError('As senhas não coincidem.');
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        nomeUsuario: nomeUsuario,
        email: email,
        senha: senha,
        // username: email.split('@')[0] + Math.floor(Math.random() * 100),
        // telefone: '00000000000', 
        // idEndereco: 123,
      };

      await api.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER_REGISTER}`, userData);

      Alert.alert(
        'Sucesso!',
        'Sua conta foi criada. Agora você pode fazer o login.'
      );
      
      navigation.navigate('Login');

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Não foi possível criar a conta. Tente novamente.';
      Alert.alert('Erro no Cadastro', errorMessage);
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
          <Image source={require('../../assets/LOGO2.png')} style={styles.logo} resizeMode="contain" />
        </View>

        <Text style={styles.title}>Cadastro</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            value={nomeUsuario}
            onChangeText={(text) => {
              setNome(text);
              setUsernameError('');
            }}
            autoCapitalize="words"
          />
          {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

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
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={senha}
            onChangeText={(text) => {
              setSenha(text);
              setPasswordError('');
            }}
            secureTextEntry={!showPassword}
            placeholder="Digite sua senha"
            placeholderTextColor="#aaa"
            underlineColorAndroid={'transparent'}
            // returnKeyType="done"
          />
          <TouchableOpacity 
              style={styles.eyeIcon} 
              onPress={toggleShowPassword}
            >
              <Ionicons 
                name={showPassword ? 'eye-off' : 'eye'} 
                size={24} 
                color="#7aa68b"
              />
          </TouchableOpacity>
          </View>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <Text style={styles.label}>Confimar Senha</Text>
          <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={confirmarSenha}
            onChangeText={(text) => {
              setConfirmarSenha(text);
              setPasswordError('');
            }}
            secureTextEntry={!showPassword}
            placeholder="Digite sua senha"
            placeholderTextColor="#aaa"
            underlineColorAndroid={'transparent'}
            // returnKeyType="done"
          />
          <TouchableOpacity 
              style={styles.eyeIcon} 
              onPress={toggleShowPassword}
            >
              <Ionicons 
                name={showPassword ? 'eye-off' : 'eye'} 
                size={24} 
                color="#7aa68b"
              />
          </TouchableOpacity>
          </View>
          {confirmarSenhaError ? <Text style={styles.errorText}>{confirmarSenhaError}</Text> : null}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleRegister} 
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Cadastrando...' : 'Cadastre-se'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.subText}>
              Já possui conta? <Text style={{fontWeight: 'bold'}}>Faça login</Text>
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
    color: '#010101', 
    alignSelf: 'flex-start', 
    marginLeft: '5%', 
  },
  formContainer: { 
    width: '100%', 
    backgroundColor: '#fbfcfa', 
    borderRadius: 20, 
    padding: 25, 
    elevation: 5, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 10, 
    shadowOffset: { 
      width: 0, 
      height: 5 }, 
    marginBottom: 20, 
    marginTop: 20
  },
  label: { 
    fontSize: 16, 
    color: '#555', 
    marginBottom: 8, 
  },
  input: { 
    width: '100%', 
    backgroundColor: '#f0f3eb', 
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
  subText: { 
    marginTop: 20, 
    fontSize: 16, 
    color: '#89b098', }
    ,
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f3f8ed',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10
  }
});

export default RegisterScreen;

import React, { useRef, useCallback } from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.png';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import api from '../../services/api';
import getValidationErros from '../../utis/GetvalidationErros';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { Container, Title, BacktoSigIn, BacktoSigInText } from './styles';

interface SignUpformdata {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);

  const handleSignUp = useCallback(
    async (data: SignUpformdata) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório!'),
          email: Yup.string()
            .required('E-mail obrigatório!')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Senha muito curta'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado com sucesso.',
          'Você já pode fazer login na aplicação.',
        );
        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }

        Alert.alert(
          'Erro no Cadastro',
          'Ocorreu um erro ao fazer longin, cheque as credenciais',
        );
      }
    },
    [navigation],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Faça seu Cadastro</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Usuário"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
                returnKeyType="next"
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="Email"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Criar conta
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BacktoSigIn onPress={() => navigation.navigate('SignIn')}>
        <Icon name="log-in" size={20} color="#fff" />
        <BacktoSigInText>Voltar para logon</BacktoSigInText>
      </BacktoSigIn>
    </>
  );
};

export default SignUp;

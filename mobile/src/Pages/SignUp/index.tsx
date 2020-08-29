import React, { useRef } from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import logoImg from '../../assets/logo.png';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { Container, Title, BacktoSigIn, BacktoSigInText } from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          enabled
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Faça seu Cadastro</Title>
            </View>
            <Form ref={formRef}>
              <Input name="User" icon="user" placeholder="User" />
              <Input name="Email" icon="mail" placeholder="Email" />
              <Input name="Senha" icon="lock" placeholder="Senha" />
              <Button onPress={() => formRef.current?.submitForm()}>
                Criar conta
              </Button>
            </Form>
          </Container>
        </KeyboardAvoidingView>
      </ScrollView>

      <BacktoSigIn onPress={() => navigation.navigate('SignIn')}>
        <Icon name="log-in" size={20} color="#fff" />
        <BacktoSigInText>Voltar para logon</BacktoSigInText>
      </BacktoSigIn>
    </>
  );
};

export default SignUp;

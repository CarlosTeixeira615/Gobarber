import React from 'react';
import { Image } from 'react-native';
import logoImg from '../../assets/logo.png';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Faça seu login</Title>
      <Input />
      <Input />
      <Button
        onPress={() => {
          console.log('newData');
        }}
      >
        Entrar
      </Button>
    </Container>
  );
};

export default SignIn;

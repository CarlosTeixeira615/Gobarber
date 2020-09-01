import React from 'react';
import { View } from 'react-native';
import Button from '../../Components/Button';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button onPress={signOut}>Deslogar</Button>
    </View>
  );
};

export default Dashboard;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../Pages/Dashboard';
import CreateAppointment from '../Pages/CreateAppointment';
import AppointmentCreate from '../Pages/AppointmentCreate';
import Profile from '../Pages/Profile';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="CreateAppointment" component={CreateAppointment} />
    <App.Screen name="AppointmentCreate" component={AppointmentCreate} />

    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
);

export default AppRoutes;

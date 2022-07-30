import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Map from '../pages/Map';

const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Map"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
};

export default Routes;

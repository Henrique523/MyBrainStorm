import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Main from '../pages/Main'

const { Navigator, Screen } = createStackNavigator()

const Routes: React.FC = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="Main" component={Main} />
  </Navigator>
)

export default Routes

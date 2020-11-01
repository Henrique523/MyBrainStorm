import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Main from '../pages/Main'
import NewIdea from '../pages/NewIdea'

const { Navigator, Screen } = createStackNavigator()

const Routes: React.FC = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="Main" component={Main} />
    <Screen name="NewIdea" component={NewIdea} />
  </Navigator>
)

export default Routes

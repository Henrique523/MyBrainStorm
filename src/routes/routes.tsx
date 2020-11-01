import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Main from '../pages/Main'
import NewIdea from '../pages/NewIdea'
import EditIdea from '../pages/EditIdea'

const { Navigator, Screen } = createStackNavigator()

const Routes: React.FC = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="Main" component={Main} />
    <Screen name="NewIdea" component={NewIdea} />
    <Screen name="EditIdea" component={EditIdea} />
  </Navigator>
)

export default Routes

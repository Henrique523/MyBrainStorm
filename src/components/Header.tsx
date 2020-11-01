import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { colors } from '../styles/colors'

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>MyBrainStorm</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 104,
    marginTop: 32,
    backgroundColor: colors.background,
  },
  header: {
    fontFamily: 'Pacifico_400Regular',
    fontSize: 36,
    color: colors.purplePrimary,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
})

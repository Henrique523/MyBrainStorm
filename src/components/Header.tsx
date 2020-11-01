import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

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
    backgroundColor: '#FCC60E',
  },
  header: {
    fontFamily: 'Pacifico_400Regular',
    fontSize: 36,
    color: '#581CB0',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
})

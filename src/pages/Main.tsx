import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import Header from '../components/Header'

export default function Main() {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.buttonNewIdea}>
        <RectButton style={styles.rectButtonIdea}>
          <Text style={styles.textButton}>Adicionar uma nova ideia</Text>
        </RectButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCC60E',
  },
  buttonNewIdea: {
    height: 70,
    width: '100%',
    borderRadius: 24,
  },
  rectButtonIdea: {
    marginHorizontal: 16,
    borderRadius: 24,
    backgroundColor: '#581CB0',
    borderColor: '#6803FC',
    borderWidth: 1,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8.3,
    elevation: 13,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontFamily: 'Pacifico_400Regular',
    color: '#fff',
    fontSize: 20,
    lineHeight: 35,
  },
})

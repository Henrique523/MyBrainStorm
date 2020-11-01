import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import Header from '../components/Header'

import { colors } from '../styles/colors'

export default function NewIdea() {
  const { goBack } = useNavigation()

  function saveAndBackToHome() {
    goBack()
  }

  return (
    <ScrollView style={styles.container}>
      <Header />

      <View style={styles.titleIdeaView}>
        <TextInput placeholder="Nomeie sua ideia" style={styles.titleIdeaTextInput} placeholderTextColor="#000" />
      </View>
      <View style={styles.descriptionIdeaView}>
        <TextInput
          placeholder="Descreva sua ideia"
          style={styles.descriptionIdeaTextInput}
          placeholderTextColor="#000"
          multiline
        />
      </View>

      <View style={styles.buttonSave}>
        <RectButton style={styles.rectButtonSave} onPress={saveAndBackToHome}>
          <Text style={styles.textButton}>Anotar</Text>
        </RectButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.background,
  },
  titleIdeaView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleIdeaTextInput: {
    height: 48,
    width: '90%',
    marginHorizontal: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderColor: '#000',
    borderWidth: 1,
    fontFamily: 'Pacifico_400Regular',
    fontSize: 16,
  },
  descriptionIdeaView: {
    marginTop: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionIdeaTextInput: {
    height: 240,
    width: '90%',
    marginHorizontal: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderColor: '#000',
    borderWidth: 1,
    fontFamily: 'Pacifico_400Regular',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  buttonSave: {
    width: '100%',
    borderRadius: 24,
    marginTop: 120,
  },
  rectButtonSave: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 24,
    backgroundColor: colors.purplePrimary,
    borderColor: colors.purlpleSecondary,
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
    color: colors.whiteText,
    fontSize: 20,
    lineHeight: 35,
  },
})

import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, Text } from 'react-native'
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as yup from 'yup'

import Header from '../components/Header'

import { colors } from '../styles/colors'

interface IdeaStorage {
  id: number
  ideaName: string
  ideaDescription: string
}

export default function NewIdea() {
  const [ideaName, setIdeaName] = useState<string>('')
  const [ideaDescription, setIdeaDescription] = useState<string>('')
  const [errorName, setErrorName] = useState<string>('')
  const [errorDescription, setErrorDescription] = useState<string>('')

  const { goBack } = useNavigation()

  async function saveAndBackToHome() {
    setErrorName('')
    setErrorDescription('')
    try {
      let schema = yup.object().shape({
        ideaName: yup.string().max(30, 'Limite: 30 caracteres').required('Nome Obrigatório').min(1, 'Nome Obrigatório'),
        ideaDescription: yup.string().required('Campo Obrigatório'),
      })
      await schema.validate({ ideaName, ideaDescription }, { abortEarly: true })

      const ideasStorage: any = await AsyncStorage.getItem('ideas')
      const ideas: IdeaStorage[] = JSON.parse(ideasStorage)

      let completeIdea: IdeaStorage
      if (!ideas || ideas.length === 0) {
        completeIdea = {
          id: 1,
          ideaName,
          ideaDescription,
        }
        let newArrayIdeas: IdeaStorage[] = [completeIdea]
        await AsyncStorage.setItem('ideas', JSON.stringify(newArrayIdeas))
        goBack()
      } else {
        completeIdea = {
          id: ideas[ideas.length - 1].id + 1,
          ideaName,
          ideaDescription,
        }
        ideas.push(completeIdea)
        await AsyncStorage.setItem('ideas', JSON.stringify(ideas))
        goBack()
      }
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        if (e.errors[0] === 'Limite: 30 caracteres' || e.errors[0] === 'Nome Obrigatório') {
          setErrorName(e.errors[0])
        } else {
          setErrorDescription(e.errors[0])
        }
      }
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Header />
      {errorName !== '' && (
        <View style={{ ...styles.titleIdeaView, marginBottom: 8 }}>
          <Text style={styles.errorText}>{errorName}</Text>
        </View>
      )}

      <View style={styles.titleIdeaView}>
        <TextInput
          placeholder="Nomeie sua ideia"
          style={styles.titleIdeaTextInput}
          placeholderTextColor="#000"
          value={ideaName}
          onChangeText={setIdeaName}
        />
      </View>

      {errorDescription !== '' && (
        <View style={{ ...styles.titleIdeaView, paddingTop: 24, marginBottom: -24 }}>
          <Text style={styles.errorText}>{errorDescription}</Text>
        </View>
      )}

      <View style={styles.descriptionIdeaView}>
        <TextInput
          placeholder="Descreva sua ideia"
          style={styles.descriptionIdeaTextInput}
          placeholderTextColor="#000"
          multiline
          value={ideaDescription}
          onChangeText={setIdeaDescription}
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
  errorText: {
    fontFamily: 'Pacifico_400Regular',
    color: colors.redPrimary,
    fontSize: 16,
  },
})

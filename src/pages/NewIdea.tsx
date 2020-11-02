import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, Text } from 'react-native'
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

  const { goBack } = useNavigation()

  async function saveAndBackToHome() {
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
  }

  return (
    <ScrollView style={styles.container}>
      <Header />

      <View style={styles.titleIdeaView}>
        <TextInput
          placeholder="Nomeie sua ideia"
          style={styles.titleIdeaTextInput}
          placeholderTextColor="#000"
          value={ideaName}
          onChangeText={setIdeaName}
        />
      </View>
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
})

import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, StyleSheet, Text } from 'react-native'
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Header from '../components/Header'

import { colors } from '../styles/colors'

interface IdeaParams {
  id: number
}

interface IdeaStorage {
  id: number
  ideaName: string
  ideaDescription: string
}

export default function NewIdea() {
  const { goBack } = useNavigation()
  const { params } = useRoute()

  const [ideaName, setIdeaName] = useState<string>('')
  const [ideaDescription, setIdeaDescription] = useState<string>('')
  const [idea, setIdea] = useState<IdeaStorage>()

  useEffect(() => {
    getIdeaData()
  }, [])

  async function getIdeaData() {
    const { id } = params as IdeaParams

    const ideasStorage: any = await AsyncStorage.getItem('ideas')
    const ideas: IdeaStorage[] = JSON.parse(ideasStorage)

    ideas.forEach((idea) => {
      if (idea.id === id) {
        setIdeaName(idea.ideaName)
        setIdeaDescription(idea.ideaDescription)
        setIdea(idea)
      }
    })
  }

  async function saveAndBackToHome() {
    const ideasStorage: any = await AsyncStorage.getItem('ideas')
    const ideas: IdeaStorage[] = JSON.parse(ideasStorage)

    ideas.forEach(async (ideaStorage, key) => {
      if (ideaStorage.id === idea?.id) {
        const updatedIdea: IdeaStorage = {
          id: ideaStorage.id,
          ideaName,
          ideaDescription,
        }
        ideas.splice(key, 1, updatedIdea)
        await AsyncStorage.setItem('ideas', JSON.stringify(ideas))
      }
    })

    goBack()
  }

  async function deleteAndBackToHome() {
    const ideasStorage: any = await AsyncStorage.getItem('ideas')
    const ideas: IdeaStorage[] = JSON.parse(ideasStorage)

    ideas.forEach(async (ideaStorage, key) => {
      if (ideaStorage.id === idea?.id) {
        ideas.splice(key, 1)
        await AsyncStorage.setItem('ideas', JSON.stringify(ideas))
      }
    })

    goBack()
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
          <Text style={styles.textButton}>Editar sua ideia</Text>
        </RectButton>
      </View>
      <View style={styles.buttonDelete}>
        <RectButton style={styles.rectButtonDelete} onPress={deleteAndBackToHome}>
          <Text style={styles.textButton}>Deletar</Text>
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
    marginTop: 40,
  },
  buttonDelete: {
    width: '100%',
    borderRadius: 24,
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
  rectButtonDelete: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 24,
    backgroundColor: colors.redPrimary,
    borderColor: colors.redSecondary,
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

import React, { useState } from 'react'
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Header from '../components/Header'

import { colors } from '../styles/colors'

import Nota from '../assets/Nota.png'

interface IdeaStorage {
  id: number
  ideaName: string
  ideaDescription: string
}

export default function Main() {
  const [ideas, setIdeas] = useState<IdeaStorage[]>([])
  const { navigate } = useNavigation()

  useFocusEffect(() => {
    getideas()
  })

  async function getideas() {
    const ideasStorage: any = await AsyncStorage.getItem('ideas')
    const ideasStorageArray = JSON.parse(ideasStorage)
    if (!ideasStorageArray || ideasStorageArray.length === 0) {
      setIdeas([])
    } else {
      setIdeas(ideasStorageArray)
    }
  }

  function navigateToNewIdea() {
    navigate('NewIdea')
  }

  function navigateToEditIdea(id: number) {
    navigate('EditIdea', { id })
  }

  async function handleDeleteIdea(id: number) {
    let newArrayIdeas: IdeaStorage[] = []
    if (ideas.length <= 1) {
      await AsyncStorage.setItem('ideas', JSON.stringify([]))
      setIdeas([])
    } else {
      ideas.forEach((idea, key) => {
        if (idea.id !== id) {
          newArrayIdeas.push(idea)
        }
      })
      setIdeas(newArrayIdeas)
      await AsyncStorage.setItem('ideas', JSON.stringify(newArrayIdeas))
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Header />

      <View style={styles.buttonNewIdea}>
        <RectButton style={styles.rectButtonIdea} onPress={navigateToNewIdea}>
          <Text style={styles.textButton}>Adicionar uma nova ideia</Text>
        </RectButton>
      </View>

      {ideas.length === 0 ? (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>Nenhuma ideia Registrada ainda</Text>
        </View>
      ) : (
        <View style={styles.stickyNotes}>
          {ideas.map((idea) => {
            return (
              <ImageBackground source={Nota} style={styles.stickyImage} key={idea.id}>
                <View style={styles.itemsSticky}>
                  <TouchableOpacity activeOpacity={0.6} onPress={() => navigateToEditIdea(idea.id)}>
                    <Text style={styles.titleIdeaText}>{idea.ideaName}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteIcon}
                    activeOpacity={0.6}
                    onPress={() => handleDeleteIdea(idea.id)}
                  >
                    <Feather name="x" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            )
          })}
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  buttonNewIdea: {
    height: 70,
    width: '100%',
    borderRadius: 24,
  },
  rectButtonIdea: {
    marginHorizontal: 16,
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
  stickyNotes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginTop: 8,
    alignItems: 'center',
  },
  stickyImage: {
    resizeMode: 'cover',
    flexDirection: 'column',
    alignItems: 'center',
    height: 140,
    width: 140,
    marginTop: 16,
  },
  itemsSticky: {
    height: 124,
    width: 140,
    justifyContent: 'space-between',
    marginVertical: 8,
    alignItems: 'center',
  },
  titleIdeaText: {
    fontFamily: 'Pacifico_400Regular',
    color: colors.whiteText,
    fontSize: 14,
    lineHeight: 25,
    textAlign: 'center',
  },
  deleteIcon: {
    alignSelf: 'flex-end',
    marginRight: 8,
    marginTop: -8,
  },
  noData: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  noDataText: {
    fontFamily: 'Pacifico_400Regular',
    color: '#000',
    fontSize: 22,
  },
})

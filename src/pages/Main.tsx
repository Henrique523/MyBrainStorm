import React from 'react'
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../styles/colors'

import Header from '../components/Header'

import Nota from '../assets/Nota.png'

export default function Main() {
  const { navigate } = useNavigation()

  function navigateToNewIdea() {
    navigate('NewIdea')
  }
  return (
    <ScrollView style={styles.container}>
      <Header />

      <View style={styles.buttonNewIdea}>
        <RectButton style={styles.rectButtonIdea} onPress={navigateToNewIdea}>
          <Text style={styles.textButton}>Adicionar uma nova ideia</Text>
        </RectButton>
      </View>

      <View style={styles.stickyNotes}>
        <ImageBackground source={Nota} style={styles.stickyImage}>
          <View style={styles.itemsSticky}>
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.titleIdeaText}>Ideia Genial</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteIcon} activeOpacity={0.6}>
              <Feather name="x" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
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
})

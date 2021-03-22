import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TakeNote from './screens/TakeNote';
import RoundedButton from './components/RoundedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';


const AppStack = createStackNavigator()


let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;
const MAIN_PADDING = 15;
const CARD_MARGIN = 5

const COLORS = {
  red: "#f5604c",
  orange: "#f28c27",
  yellow: "#f2d027",
  blue: "#6dc0ed",
  purple: "#d593ed",
  green: "#60e080"
}

function ActionButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ width: 60, backgroundColor: "black", height: 60, borderRadius: 20, justifyContent: 'center', position: 'absolute', bottom: 0, right: 0, margin: 20, shadowColor: 'black', shadowRadius: 10, shadowOpacity: 0.5, shadowOffset: { width: 0, height: 5 } }}>
      <Feather name="plus" color="white" size={30} style={{ alignSelf: 'center' }} />
    </TouchableOpacity>
  )
}


function NoteCardView({ title, date = "No date", backgroundColor = "#616161", type = "square", onPress = () => { } }) {

  let comp_height;
  let comp_width;
  const MAX_ALLOWED_WIDTH = device_width - (MAIN_PADDING * 3) - (CARD_MARGIN)
  let datePosition = 'left'

  if (type === "square") {
    comp_width = MAX_ALLOWED_WIDTH / 2
    comp_height = comp_width;
  } else if (type === "wide") {
    comp_height = MAX_ALLOWED_WIDTH / 2
    comp_width = MAX_ALLOWED_WIDTH + (CARD_MARGIN * 2)
    datePosition = 'right'
  } else if (type = "long") {

  }

  return (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor: backgroundColor, width: comp_width, height: comp_height, borderRadius: 15, padding: 12, margin: CARD_MARGIN, justifyContent: 'space-between' }}>
      <View style={{ flex: 10 }}>
        <Text ellipsizeMode='tail' lineBreakMode='tail' numberOfLines={4} style={{ fontSize: 24, fontWeight: '500' }}>{title}</Text>
      </View>
      <Text style={{ fontSize: 16, fontWeight: '300', flex: 2, textAlign: datePosition }}>{date}</Text>
    </TouchableOpacity>
  )

}

const TemplateNotes = () => (
  <>
    <NoteCardView backgroundColor={COLORS.red} title={"How to make your personal brand stand out"} date={"May 21, 2020"} />
    <NoteCardView backgroundColor={COLORS.purple} title={"School rep and the story"} />
    <NoteCardView backgroundColor={COLORS.orange} title={"Scenery and places to work in 2020"} type="wide" />
    <NoteCardView backgroundColor={COLORS.blue} title={"Being a Christian in 2020"} type="wide" />
    <NoteCardView backgroundColor={COLORS.purple} title={"What independence means to mesfafsasfhashfshafhs sahshasfh"} />
    <NoteCardView backgroundColor={COLORS.blue} title={"Being a Christian in 2020"} type="wide" />
    <NoteCardView backgroundColor={COLORS.purple} title={"What independence means to mesfafsasfhashfshafhs sahshasfh"} />
  </>
)

function NoteList(props) {

  const { navigation, route } = props
  const initalMount = useRef(true)
  const [allNotes, setAllNotes] = useState({ data: [] })
  const [canSearch, setCanSearch] = useState(false)
  const [searchWord, setSearchWord] = useState("")

  useEffect(() => {

    if (initalMount.current) {
      getAllStoredNotes()
      initalMount.current = false
    } else {
      // handle refershes here
    }

  }, [allNotes, initalMount, props])


  useEffect(() => {
    if (route?.params?.allNotes) {
      setAllNotes({ data: route.params?.allNotes })
    }
    return () => { console.log("All notes refreshed") }
  }, [route])

  const openNote = (data) => {
    navigation.navigate("Write", { ...data })
  }


  // implement on search

  const getAllStoredNotes = async () => {
    try {
      const value = await AsyncStorage.getItem('@notes')
      if (value !== null) {
        console.log(value)
        setAllNotes(prevState => ({ ...prevState, data: JSON.parse(value) }))
      }
    } catch (e) {
      // error reading value
      console.log("An error occured retriving data")
    }
  }

  return (
    <SafeAreaView style={{ height: device_height, backgroundColor: '#252525' }}>
      <View style={styles.container}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, position: 'absolute', zIndex: 500, width: device_width, paddingHorizontal: MAIN_PADDING }}>

          <View style={{ alignSelf: 'center', flex: 9 }}>
            {
              (canSearch)
                ?
                <TextInput
                  onChangeText={(searchWord) => setSearchWord(searchWord)}
                  placeholder={"Type note you are searching here"}
                  placeholderTextColor="#999999"
                  style={{ color: "white", fontSize: 20 }} />
                :
                <Text style={{ fontSize: 30, fontWeight: '600', color: 'white' }}>Notes</Text>
            }

          </View>

          <View style={{ flex: 1.3, alignContent: 'center', justifyContent: 'flex-end' }}>
            <RoundedButton onPress={() => { setCanSearch(!canSearch) }}>
              {
                (canSearch)
                  ?
                  <AntDesign name="close" size={24} color="white" />
                  :
                  <Feather name="search" size={24} color="white" />
              }
            </RoundedButton>
          </View>

        </View>

        <View style={{ flex: 1, marginVertical: 70 }}>
          <ScrollView>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', flex: 1 }}>
              {
                allNotes.data.map((value, idx) =>
                  <NoteCardView
                    onPress={() => openNote(value)}
                    key={`note${idx}`}
                    date={value.date}
                    title={value.title}
                    backgroundColor={(value.color) ? value.color : "#616161"}
                    type={((idx + 1) % 3 === 0) ? "wide" : "square"} />
                )
              }
            </View>
          </ScrollView>
        </View>


      </View>

      <ActionButton onPress={() => navigation.navigate("Write")} />
    </SafeAreaView>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName="Notes">
        <AppStack.Screen options={{ headerShown: false }} name="Notes" component={NoteList} />
        <AppStack.Screen options={{ headerShown: false }} name="Write" component={TakeNote} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#252525',
    paddingHorizontal: MAIN_PADDING,
    height: device_height,
  },
});

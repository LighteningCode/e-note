import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TakeNote from './screens/TakeNote';
import RoundedButton from './components/RoundedButton';


const AppStack = createStackNavigator()


let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;
const MAIN_PADDING = 15;
const CARD_MARGIN = 5

const COLORS = {
  red: "#FFAB91",
  orange: "#FFCC80",
  yellow: "#E6EE9B",
  blue: "#80DEEA",
  pink: "#CF93D9",
  green: "#80CBC4"
}

function ActionButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ width: 60, backgroundColor: "black", height: 60, borderRadius: 20, justifyContent: 'center', position: 'absolute', bottom: 0, right: 0, margin: 20, shadowColor: 'black', shadowRadius: 10, shadowOpacity: 0.5, shadowOffset: { width: 0, height: 5 } }}>
      <Feather name="plus" color="white" size={30} style={{ alignSelf: 'center' }} />
    </TouchableOpacity>
  )
}


function NoteCardView({ title, date = "No date", backgroundColor = "#616161", type = "square" }) {

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
    <View style={{ backgroundColor: backgroundColor, width: comp_width, height: comp_height, borderRadius: 15, padding: 12, margin: CARD_MARGIN, justifyContent: 'space-between' }}>
      <View style={{ flex: 10 }}>
        <Text ellipsizeMode='tail' lineBreakMode='tail' numberOfLines={4} style={{ fontSize: 24, fontWeight: '500' }}>{title}</Text>
      </View>
      <Text style={{ fontSize: 16, fontWeight: '300', flex: 2, textAlign: datePosition }}>{date}</Text>
    </View>
  )

}

function NoteList(props) {

  const { navigation } = props

  return (
    <SafeAreaView style={{ height: device_height, backgroundColor: '#252525' }}>
      <View style={styles.container}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, position: 'absolute', zIndex: 500, width: device_width, paddingHorizontal: MAIN_PADDING }}>

          <View style={{ alignSelf: 'center' }}>
            <Text style={{ fontSize: 30, fontWeight: '600', color: 'white' }}>Notes</Text>
          </View>

          <View>
            <RoundedButton>
              <Feather name="search" size={24} color="white" />
            </RoundedButton>
          </View>

        </View>

        <View style={{ flex: 1, marginVertical: 70 }}>
          <ScrollView style={{ backgroundColor: 'red' }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', flex: 1 }}>
              <NoteCardView backgroundColor={COLORS.red} title={"How to make your personal brand stand out"} date={"May 21, 2020"} />
              <NoteCardView backgroundColor={COLORS.pink} title={"School rep and the story"} />
              <NoteCardView backgroundColor={COLORS.orange} title={"Scenery and places to work in 2020"} type="wide" />
              <NoteCardView backgroundColor={COLORS.blue} title={"Being a Christian in 2020"} type="wide" />
              <NoteCardView backgroundColor={COLORS.pink} title={"What independence means to mesfafsasfhashfshafhs sahshasfh"} />
              <NoteCardView backgroundColor={COLORS.blue} title={"Being a Christian in 2020"} type="wide" />
              <NoteCardView backgroundColor={COLORS.pink} title={"What independence means to mesfafsasfhashfshafhs sahshasfh"} />
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

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';


let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;
const MAIN_PADDING = 30;
const CARD_MARGIN = 5

const COLORS = {
  red: "#FFAB91",
  orange: "#FFCC80",
  yellow: "#E6EE9B",
  blue: "#80DEEA",
  pink: "#CF93D9",
  green: "#80CBC4"
}

function RoundedButton({ children, onPress = () => { } }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.roundedButton}>
      {children}
    </TouchableOpacity>
  )
}

function NoteCardView({ title, date = "No date", backgroundColor = "#616161", type = "square" }) {

  let comp_height;
  let comp_width;
  const MAX_ALLOWED_WIDTH = device_width - (MAIN_PADDING * 2.5) - (CARD_MARGIN)


  if (type === "square") {
    comp_width = MAX_ALLOWED_WIDTH / 2
    comp_height = comp_width;
  } else if (type === "wide") {
    comp_height = MAX_ALLOWED_WIDTH / 2
    comp_width = MAX_ALLOWED_WIDTH
  } else if (type = "long") {

  }

  return (
    <View style={{ backgroundColor: backgroundColor, width: comp_width, height: comp_height, borderRadius: 15, padding: 12, margin: CARD_MARGIN, justifyContent: 'space-between' }}>
      <View style={{ flex: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: '500' }}>{title}</Text>
      </View>
      <Text style={{ fontSize: 16, fontWeight: '300', flex: 2 }}>{date}</Text>
    </View>
  )

}

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#252525' }}>
      <View style={styles.container}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>

          <View style={{ alignSelf: 'center' }}>
            <Text style={{ fontSize: 30, fontWeight: '600', color: 'white' }}>Notes</Text>
          </View>

          <View>
            <RoundedButton>
              <Feather name="search" size={24} color="white" />
            </RoundedButton>
          </View>

        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <NoteCardView backgroundColor={COLORS.red} title={"Hello from here awdgsdagdsgasg asdgsag awdgsadg dwagssgd sdag"} date={"May 21, 2020"} />
          <NoteCardView backgroundColor={COLORS.pink} title={"Hello from here"} />
          <NoteCardView backgroundColor={COLORS.orange} title={"Hello from here"} />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#252525',
    paddingHorizontal: MAIN_PADDING,
    flex: 1
  },
  roundedButton: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#3B3B3B"
  }
});

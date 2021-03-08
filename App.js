import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

function RoundedButton({ children, onPress = () => { } }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.roundedButton}>
      {children}
    </TouchableOpacity>
  )
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, marginTop: 20 }}>

        <View style={{ alignSelf: 'center' }}>
          <Text style={{ fontSize: 30, fontWeight: '600',color:'white' }}>Notes</Text>
        </View>

        <View>
          <RoundedButton>
            <Feather name="search" size={24} color="white" />
          </RoundedButton>
        </View>

      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#252525',
    flex: 1
  },
  roundedButton: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#3B3B3B"
  }
});

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';



export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingHorizontal: 50 }}>

        <View>
          <Text style={{fontSize: 30, fontWeight: '600'}}>Notes</Text>
        </View>

        <View>
          <Feather name="search" size={24} color="black" />
        </View>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

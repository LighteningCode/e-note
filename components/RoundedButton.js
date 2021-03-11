import React from 'react';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';


const styles = StyleSheet.create({
    roundedButton: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#3B3B3B"
    }
})



function RoundedButton({ children, onPress = () => { } }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.roundedButton}>
            {children}
        </TouchableOpacity>
    )
}


export default RoundedButton;
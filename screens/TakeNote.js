import React from 'react';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import RoundedButton from '../components/RoundedButton';


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

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#252525',
        paddingHorizontal: MAIN_PADDING,
        height: device_height
    },
    textbox_title: {
        fontSize: 28,
        fontWeight: '600',
        paddingTop: 7,
        color: "white"
    },
    textbox: {
        fontSize: 20,
        fontWeight: 'normal',
        paddingTop: 7,
        color: "white"
    }
});


function TakeNote(props) {

    const {navigation} = props

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#252525' }}>
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, position: 'absolute', zIndex: 500, width: device_width, paddingHorizontal: 30 }}>

                    <View style={{ alignSelf: 'center' }}>
                        <RoundedButton onPress={()=>navigation.goBack()}>
                            <Feather name="chevron-left" size={24} color="white" />
                        </RoundedButton>
                    </View>

                    <View>
                        <RoundedButton>
                            <Feather name="edit" size={24} color="white" />
                        </RoundedButton>
                    </View>

                </View>

                <ScrollView style={{ height: device_height, paddingTop: 70, flex: 1 }}>
                    <TextInput 
                    placeholder={"Type title here..."}
                    placeholderTextColor="#999999"
                    multiline={true} 
                    style={styles.textbox_title}
                    selectionColor="white"
                    />

                    <Text style={{color:'#6E6E6E', fontSize: 20, fontWeight: "200", marginVertical: 15}}>Date</Text>

                    <TextInput 
                    placeholder={"Whats on your mind..."}
                    placeholderTextColor="#999999"
                    multiline={true} 
                    style={styles.textbox}
                    selectionColor="white"
                    />
                </ScrollView>

            </View>

        </SafeAreaView>
    )
}


export default TakeNote;
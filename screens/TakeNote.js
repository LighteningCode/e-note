import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, FlatList, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, _Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import RoundedButton from '../components/RoundedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
        color: "white",
        paddingBottom: 20
    }
});

function TakeNote(props) {

    const { navigation, } = props

    const initalMount = useRef(true)
    const [date, setDate] = useState('')
    const [title, setTitle] = useState("")
    const [noteText, setNoteText] = useState("")
    const [allNotes, setAllNotes] = useState({ data: [] })


    useEffect(() => {
        if (initalMount.current) {
            const d = new Date();
            const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
            const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
            const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
            setDate(`${da}-${mo}-${ye}`)
            getAllStoredNotes()

            initalMount.current = false
        } else {
            // refresh
        }
    }, [title, date, noteText, initalMount])

    const getAllStoredNotes = async () => {
        try {
            const value = await AsyncStorage.getItem('@notes')
            if (value !== null) {
                // console.log(value)
                setAllNotes(prevState => ({ ...prevState, data: JSON.parse(value) }))
            }
        } catch (e) {
            // error reading value
            console.log("An error occured retriving data")
        }
    }


    const handleBackbutton = () => {

        // before goint back save the data 
        const data = {
            title: title,
            date: date,
            text: noteText
        }

        let _tempNotes = allNotes.data
        _tempNotes[_tempNotes.length] = data

        if (data.title !== '') {
            storeData("@notes", _tempNotes)
        }
        
        navigation.navigate("Notes", { allNotes: _tempNotes })
    }


    const storeData = async (key, value) => {

        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@notes', jsonValue)
        } catch (e) {
            // saving error
            console.log("An error occured while saving the data")
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#252525' }}>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }} >
                <View style={styles.container}>



                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginVertical: 20, position: 'absolute', zIndex: 500, width: device_width, paddingHorizontal: 30 }}>

                        <View style={{ alignSelf: 'center' }}>
                            <RoundedButton onPress={() => handleBackbutton()}>
                                <Feather name="chevron-left" size={24} color="white" />
                            </RoundedButton>
                        </View>

                        <View>
                            <RoundedButton>
                                <Feather name="edit" size={24} color="white" />
                            </RoundedButton>
                        </View>

                    </View>



                    <View style={{ paddingTop: 70, flex: 1 }}>
                        <TextInput
                            placeholder={"Type title here..."}
                            placeholderTextColor="#999999"
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                            multiline={true}
                            style={styles.textbox_title}
                            selectionColor="white"
                        />

                        <Text style={{ color: '#6E6E6E', fontSize: 20, fontWeight: "200", marginVertical: 15 }}>{date}</Text>

                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={{ flex: 1 }}
                        >
                            <View style={{ paddingBottom: 50 }}>
                                <TextInput
                                    placeholder={"Whats on your mind..."}
                                    placeholderTextColor="#999999"
                                    multiline={true}
                                    numberOfLines={10}
                                    value={noteText}
                                    onChangeText={(text) => setNoteText(text)}
                                    style={styles.textbox}
                                    selectionColor="white"
                                    scrollEnabled={true}
                                />
                            </View>


                        </KeyboardAvoidingView>

                    </View>

                </View>

            </TouchableWithoutFeedback>

        </SafeAreaView>

    )
}


export default TakeNote;
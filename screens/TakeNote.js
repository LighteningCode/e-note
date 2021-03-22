import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, FlatList, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, _Text, Modal, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import RoundedButton from '../components/RoundedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { useCallback } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';


let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;
const MAIN_PADDING = 30;
const CARD_MARGIN = 54

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
    },
    centeredView: {
        flex: 1,
        height: device_height,
        width: device_width,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: "rgba(0,0,0,0.5)",
        position: 'absolute',
        top: 0,
        left: 0
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    modalText: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold"
    },
    button: {
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: "#3B3B3B",
    }
});

function TakeNote(props) {

    const { navigation, route } = props

    const initalMount = useRef(true)
    const [date, setDate] = useState('')
    const [title, setTitle] = useState("")
    const [noteText, setNoteText] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const [allNotes, setAllNotes] = useState({ data: [] })

    const bottomSheetRef = useRef(null)



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

    useEffect(() => {
        if (route.params) {
            setTitle(route.params.title)
            setNoteText(route.params.text)
            console.log(route.params)
        }
        return () => { }
    }, [route])

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
        let _tempNotes = allNotes.data

        if (typeof route.params === "object") {

            const data = {
                id: route.params.id,
                title: title,
                date: date,
                text: noteText
            }

            _tempNotes[route.params.id] = data

            if (data.title !== '') {
                storeData("@notes", _tempNotes)
            }

            navigation.navigate("Notes", { allNotes: _tempNotes })
        }

        if (typeof route.params !== "object") {

            const data = {
                id: _tempNotes.length,
                title: title,
                date: date,
                text: noteText
            }

            if (data.title !== '') {
                _tempNotes[_tempNotes.length] = data
                storeData("@notes", _tempNotes)
            }

            navigation.navigate("Notes", { allNotes: _tempNotes })
        }
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

    const handleDelete = (id) => {

        let _tempNotes = allNotes.data

        let foundNoteIndex = _tempNotes.findIndex(item => item.id === id)

        if (foundNoteIndex >= 0) {
            _tempNotes[foundNoteIndex] = null

            const newNotes = _tempNotes.filter(x => x !== null)

            storeData("@notes", newNotes)

            navigation.navigate("Notes", { allNotes: newNotes })
        }

        setModalVisible(!modalVisible)
    }

    const CardPaletteColor = ({ color, active, onPress }) => {
        return (
            <TouchableOpacity style={{ width: 50, height: 50, backgroundColor: color, borderRadius: 50, borderWidth: (active) ? 3 : 0, borderColor: "rgba(61, 61, 61,0.5)" }}>
                <Text>&nbsp;</Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#252525' }}>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }} >
                <View style={styles.container}>

                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginVertical: 20, position: 'absolute', zIndex: 500, width: device_width, paddingHorizontal: 20 }}>

                        <View style={{ alignSelf: 'center' }}>
                            <RoundedButton onPress={() => handleBackbutton()}>
                                <Feather name="chevron-left" size={24} color="white" />
                            </RoundedButton>
                        </View>

                        <View style={{ flexDirection: 'row' }}>

                            <RoundedButton onPress={() => { bottomSheetRef.current.open() }} style={{ marginRight: 5 }}>
                                <Ionicons name="color-palette-sharp" size={24} color="white" />
                            </RoundedButton>

                            {
                                (route.params)
                                    ?
                                    <RoundedButton onPress={() => { setModalVisible(!modalVisible) }} style={{ backgroundColor: "red" }}>
                                        <Ionicons name="trash-bin" size={24} color="white" />
                                    </RoundedButton>
                                    :
                                    null
                            }

                        </View>

                    </View>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} activeOpacity={1} style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Are your sure you want to delete this note?</Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, width: 250 }}>
                                    <TouchableOpacity
                                        onPress={() => { handleDelete(route.params.id) }}
                                        style={{ ...styles.button, backgroundColor: "red" }}
                                        activeOpacity={0.8}>
                                        <Text style={{ color: 'white', fontSize: 18 }}>Yes</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.button}
                                        activeOpacity={0.8}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={{ color: 'white', fontSize: 18 }}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>



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

            <RBSheet
                ref={bottomSheetRef}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "#fff"
                    },
                    container: {
                        backgroundColor: "#383838",
                        paddingHorizontal: 15,
                        height: 200
                    }
                }}
            >
                <View>
                    <Text style={{ color: "white", textAlign: 'center', fontSize: 20 }}>Select a card color</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, flexWrap:'wrap' }}>
                    <CardPaletteColor color={COLORS.blue} active={true} />
                    <CardPaletteColor color={COLORS.green} />
                    <CardPaletteColor color={COLORS.orange} />
                    <CardPaletteColor color={COLORS.pink} />
                    <CardPaletteColor color={COLORS.red} />
                    <CardPaletteColor color={COLORS.yellow} />
                </View>

            </RBSheet>


        </SafeAreaView>

    )
}


export default TakeNote;
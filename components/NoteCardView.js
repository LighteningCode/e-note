import React, { useRef, useState, useEffect } from 'react';

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

export default NoteCardView;
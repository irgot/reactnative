import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

function filterDesc(desc) {
    if (desc.lengh < 25) {
        return desc
    }
    return `${desc.substring(0, 22)}...`
}
const Shoes = (props) => {

    return (
        <TouchableOpacity style={styles.container}>
            <Image
                source={props.img}
                style={styles.shoesImg}
            />
            <Text style={styles.shoesText}>
                {filterDesc(props.children)}
            </Text>
            <View style={{ opacity: 0.4 }}>
                <Text style={styles.shoesText} >
                    {props.cost}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default Shoes

const styles = StyleSheet.create({
    container: {
        paddingVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    shoesImg: {
        width: 175,
        height: 175
    },
    shoesText: {
        fontSize: 16
    }
})

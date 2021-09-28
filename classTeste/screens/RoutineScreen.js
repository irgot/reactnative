import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import RoutineItem from '../components/RoutineItem'
const dummyData = [
    {
        date: '28/09/2021',
        user: "Giovanna Amaral Mendonça",
        message: `Tenham uma ótima semana ❤  🍆 ou 🍌🔥
Beijos tia Gi e Bia 🌹`
    },
    {
        date: '27/09/2021',
        user: "Giovanna Amaral Mendonça"
    },
    {
        date: '26/09/2021',
        user: "Giovanna Amaral Mendonça"
    },
    {
        date: '25/09/2021',
        user: "Giovanna Amaral Mendonça"
    },
    {
        date: '24/09/2021',
        user: "Giovanna Amaral Mendonça"
    },

]
const RoutineScreen = () => {
    return (
        <View style={styles.container}>
            <Text>{dummyData[0].message}</Text>
            <FlatList
                ItemSeparatorComponent={() => (
                    <View style={{ height: 1, backgroundColor: "#cccccc" }}></View>
                )}
                data={dummyData}
                keyExtractor={(item) => item.date}
                renderItem={(item) => (
                    <RoutineItem />
                )}
            />
        </View>
    )
}

export default RoutineScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: "#ffffff"
    }
})

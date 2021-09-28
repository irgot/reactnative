import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const RoutineItem = () => {
    return (
        <View style={styles.container}>
            <Text>Imagem</Text>
            <View style={{ marginLeft: 10 }}>
                <Text>☕ Lanchou pela manhã</Text>
                <Text>🚽 Evacuou</Text>
                <Text>🍲 Almoçou </Text>
                <Text>🏃 Bem disposto</Text>
                <Text>🧃 Lanchou a tarde</Text>
                <Text>🍲 Jantou</Text>
            </View>
            <View style={{
                width: 0,
                flexGrow: 1,
                flex: 1,
                marginHorizontal: 10,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ flexShrink: 1 }} >Ocorreu tudo bem Horário do descanso: 12h30 á 13h00 Água a vontade</Text>
            </View>
        </View >
    )
}

export default RoutineItem

const styles = StyleSheet.create({
    container: {
        height: 200,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

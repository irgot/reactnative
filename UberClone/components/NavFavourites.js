import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import tw from "tailwind-react-native-classnames";

const data = [
    {
        id: "123",
        icon: "home",
        location: "Home",
        destination: "165 José Homero Roxo, São Paulo - SP"
    },
    {
        id: "456",
        icon: "briefcase",
        location: "Work",
        destination: "22540 Nações Unidas, São Paulo - SP"
    }
]

const NavFavourites = () => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
                <View style={[tw`bg-gray-200`, { height: 1 }]} />
            )}
            renderItem={({ item: { icon, location, destination } }) => (
                <TouchableOpacity style={tw`flex-row items-center p-5`}>
                    <Icon
                        name={icon}
                        style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        type="ionicon"
                        color="white"
                        size={18}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>{location}</Text>
                        <Text style={tw`text-gray-500`}>{destination}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavFavourites

const styles = StyleSheet.create({})

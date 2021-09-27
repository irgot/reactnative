import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { setDestination, setOrigin } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {
    const dispatch = useDispatch()
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    source={{
                        uri: "https://links.papareact.com/gzs"
                    }}
                    style={{ width: 100, height: 100, resizeMode: `contain` }}
                />

                <GooglePlacesAutocomplete
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                    placeholder="Where From?"
                    minLength={2}
                    enablePoweredByContainer={false}

                    onPress={(data, details = null) => {
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description
                        }))
                        dispatch(setDestination(null))
                    }}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18
                        }
                    }}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'pt-BR'
                    }}
                />
                <NavOptions />
                <NavFavourites />
            </View>

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: 'blue'
    }
})


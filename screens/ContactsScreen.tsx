import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ContactListItem from '../components/ContactListItem/ContactListItem';
import users from "../data/Users";

function ContactsScreen() {
    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                style={{ width: '100%' }}
                renderItem={({ item }) => <ContactListItem user={item} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    }
})
export default ContactsScreen

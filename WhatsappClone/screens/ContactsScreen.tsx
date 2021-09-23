import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ContactListItem from '../components/ContactListItem/ContactListItem';
// import users from "../data/Users";
import { API } from 'aws-amplify';
import { graphqlOperation } from 'aws-amplify';
import { listUsers } from '../src/graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { ListUsersQuery } from '../src/API';
import * as APIt from '../src/API';
import { User } from '../types';



function ContactsScreen() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = (await API.graphql(graphqlOperation(listUsers)))
                setUsers(userData.data.listUsers.items)

            } catch (e) {
                console.error(e);

            }
        }
        fetchUsers()

    }, [])
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

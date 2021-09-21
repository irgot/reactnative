import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import Amplify, { API, Auth, graphqlOperation } from 'aws-amplify'
import config from './src/aws-exports'
Amplify.configure(config)

import { withAuthenticator } from 'aws-amplify-react-native'
import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';



function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  useEffect(() => {
    const fetchUser = async () => {
      //get Authenticated user from Auth
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true })
      // console.log(userInfo)
      if (userInfo) {
        //get the user from Backend with the user SUB from Auth
        const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub }))
        console.log(userData);
        if (userData.data.getUSer) {
          console.log('User is already registered in database');
          return;
        }
        else {
          const newUser = {
            id: userInfo.attributes.sub,
            name: userInfo.username,
            imageUri: 'https://i.pravatar.cc/300',
            status: 'Hey, I am useing WhatsappC.'
          }
          await API.graphql(graphqlOperation(createUser, { input: newUser }))
        }
        //if there is no user in DB with the id, them create one
      }
    }
    fetchUser()
  }, [])
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}


export default withAuthenticator(App)
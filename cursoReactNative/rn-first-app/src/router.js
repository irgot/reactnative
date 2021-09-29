import React from 'react'


import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Detail"
                    component={Detail}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes
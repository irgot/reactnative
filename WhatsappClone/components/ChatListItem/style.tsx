import { StyleSheet } from 'react-native';



const styles = StyleSheet.create({
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 60,
        marginRight: 10
    },
    container: {
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        padding: 10
    },
    leftContainer: {
        flexDirection: 'row'
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16
    },
    lastMessage: {
        fontSize: 15,
        color: '#999',
        width: '100%'

    },
    time: {
        fontSize: 14,
        color: '#999'
    },
    midContainer: {
        justifyContent: 'space-around'
    }




})


export default styles;
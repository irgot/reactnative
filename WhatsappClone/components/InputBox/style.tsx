import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';




const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'flex-end'

    },
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 25,
        flex: 1,
        alignItems: 'flex-end'

    },
    buttonContainer: {
        backgroundColor: Colors.light.tint,
        borderRadius: 50,
        width: 50,
        height: 50,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,


    },
    textInput: {
        flex: 1,
        marginHorizontal: 10,


    },
    icon: {
        marginHorizontal: 3
    }

})

export default styles
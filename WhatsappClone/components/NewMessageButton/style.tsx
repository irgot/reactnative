import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';



const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.light.tint,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20

    }
})


export default styles
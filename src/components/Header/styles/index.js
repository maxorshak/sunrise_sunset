import { StyleSheet } from 'react-native'
import Colors from '../../../assets/Colors'

export const styles = StyleSheet.create({
    headerBackgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    headerText: {
        fontSize: 34,
        fontWeight: "bold",
        color: Colors.light,
        textAlign: "center",
        paddingVertical: 16,
        borderBottomWidth: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    headerAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        position: "absolute",
        right: 10,
        bottom: 10,
    },
})
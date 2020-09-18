import { StyleSheet } from 'react-native'
import Colors from '../../../assets/Colors'

export const styles = StyleSheet.create({
    footer: {
        paddingBottom: 32,
    },
    footerText: {
        fontSize: 14,
        fontWeight: "bold",
        color: Colors.light,
        textAlign: "center",
        paddingVertical: 16,
        borderBottomWidth: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    span: {
        color: Colors.orange,
    },
})
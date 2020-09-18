import React from 'react'
import { View, Text, Linking } from 'react-native'
import { styles } from './styles'

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Text
                style={styles.footerText}
                onPress={() => Linking.openURL('mailto: maxorshak@gmail.com')}
            >
                Developed by {<Text style={styles.span}>Maksym Orshak</Text>} © 2020
            </Text>
        </View>
    )
}

export default Footer;
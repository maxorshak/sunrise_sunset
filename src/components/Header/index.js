import React from 'react'
import { ImageBackground, Text, Linking, Image, TouchableWithoutFeedback } from 'react-native'
import { styles } from './styles'
import ImagePath from '../../assets/ImagePath'

const Header = () => {
    return (
        <ImageBackground
            source={ImagePath.banner}
            style={styles.headerBackgroundImage}
        >
            <Text style={styles.headerText}>Sunrise-Sunset</Text>
            <TouchableWithoutFeedback onPress={() => Linking.openURL('mailto: maxorshak@gmail.com')}>
                <Image style={styles.headerAvatar} source={ImagePath.avatar} />
            </TouchableWithoutFeedback>

        </ImageBackground>
    )
}

export default Header;
import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';
import Colors from '../../../assets/Colors'

const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    scrollView: {
        minHeight: windowHeight,
        backgroundColor: Colors.black,
    },
    body: {
        backgroundColor: Colors.black,
    },
    title: {
        paddingTop: 16,
        fontSize: 20,
        fontWeight: '600',
        color: Colors.light,
        textAlign: "center",
    },
    subtitle: {
        textAlign: "center",
        fontSize: 20,
        textTransform: "uppercase",
        fontWeight: "bold",
        color: Colors.orange,
    },
    sectionContainer: {
        marginTop: 16,
        paddingHorizontal: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: Colors.light,
        borderBottomWidth: 2,
    },
    sectionItem: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
    sectionDescription: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.lighter,
    },
    sectionTextInput: {
        height: 50,
        borderColor: Colors.orange,
        borderWidth: 2,
        borderRadius: 25,
        marginVertical: 16,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.orange,
        backgroundColor: Colors.light,
        marginHorizontal: 10,
    },
    sectionButton: {
        height: 50,
        elevation: 8,
        backgroundColor: Colors.orange,
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginHorizontal: 10,
    },
    sectionButtonText: {
        fontSize: 18,
        color: Colors.white,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
    }
})
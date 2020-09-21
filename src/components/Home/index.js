import React from 'react'
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,
    PermissionsAndroid,
    TextInput,
    Alert,
    Button,
} from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import axios from 'axios'
import { styles } from './styles'
import { API_KEY } from '../../assets/APIKey'
import ImagePath from '../../assets/ImagePath'
import Header from '../Header'
import Footer from '../Footer'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            locationPermission: this.getLocationPermission(),
            currentLocation: {
                show: false,
                city: "",
                country: "",
                lat: "",
                lng: "",
                sunrise: "",
                sunset: "",
                timezone: 0,
            },
            inputCity: {
                show: false,
                city: "",
                lat: "",
                lng: "",
                sunrise: "",
                sunset: "",
                timezone: 0,
            },
        }
    }

    componentDidMount() {
        if (this.state.locationPermission) {
            Geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                this.getInfoByLocation(lat, lng)
            },
                (error) => {
                    console.error(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
    }

    async getLocationPermission() {
        try {
            const granded = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Sunrise-Sunset App Location Permission',
                    'message': 'Sunrise-Sunset App needs access to your location'
                }
            )
            if (granded === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Location Permission Granted.")
                return (true)
            }
            else {
                console.error("Location Permission Not Granted.")
                Alert.alert("Geolocation Failed.")
                return (false)
            }
        } catch (err) {
            console.error(err)
        }
    }

    async getInfoByLocation(lat, lng) {
        try {
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${API_KEY}`)
            const data = await response.data
            const city = data.results[0].components.city
            const country = data.results[0].components.country
            const timezone = data.results[0].annotations.timezone.offset_sec / 3600
            const { sunrise, sunset } = await this.getSunriseSunset(lat, lng)
            this.setState({
                currentLocation: {
                    ...this.state.currentLocation,
                    show: true,
                    city,
                    country,
                    lat,
                    lng,
                    sunrise,
                    sunset,
                    timezone,
                }
            })
        } catch (e) {
            console.error(e)
            Alert.alert('Server is unreachable!')
        }
    }

    async getInfoByCity(city) {
        try {
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${API_KEY}`)
            const data = await response.data
            const lat = data.results[0].geometry.lat
            const lng = data.results[0].geometry.lng
            const timezone = data.results[0].annotations.timezone.offset_sec / 3600
            const { sunrise, sunset } = await this.getSunriseSunset(lat, lng)
            this.setState({
                inputCity: {
                    ...this.state.inputCity,
                    show: true,
                    lat,
                    lng,
                    sunrise,
                    sunset,
                    timezone,
                }
            })
        } catch (e) {
            console.error(e)
            Alert.alert('City is incorrect!')
        }
    }

    async getSunriseSunset(lat, lng) {
        try {
            const response = await axios.get(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`)
            const data = await response.data
            return ({ sunrise: data.results.sunrise, sunset: data.results.sunset })
        } catch (e) {
            console.error(e)
            Alert.alert('Server is unreachable!')
        }
    }

    onButtonPress() {
        if (this.state.inputCity.city === "") {
            Alert.alert('City field is empty!\nPlease enter some city!')
            return
        }
        this.getInfoByCity(this.state.inputCity.city.trim())
    }

    formatTimeToLocal(time, timezone) {
        let localTime
        switch (time.slice(time.length - 2)) {
            case "PM":
                localTime = +time.slice(0, time.search(':')) + timezone + 12 + time.slice(time.search(':'), time.length - 3)
                break;
            default://AM
                localTime = +time.slice(0, time.search(':')) + timezone + time.slice(time.search(':'), time.length - 3)
                break;
        }
        if (localTime.slice(0, localTime.search(':')) < 0) localTime = +localTime.slice(0, localTime.search(':')) + 24 + localTime.slice(localTime.search(':'))
        return localTime
    }

    render() {
        const { currentLocation } = this.state
        const { inputCity } = this.state
        console.log("currentLocation", currentLocation)
        console.log("inputCity", inputCity)
        return (
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                <Header />
                <View style={styles.body}>
                    <Text style={styles.title}>Information For Your Location:</Text>
                    {currentLocation.show ?
                        <>
                            <Text style={styles.subtitle}>{currentLocation.city && currentLocation.country && `${currentLocation.city}, ${currentLocation.country}`}</Text>
                            <View style={styles.sectionContainer}>
                                <View style={styles.sectionItem}>
                                    <Image source={ImagePath.sunrise} />
                                    <Text style={styles.sectionDescription}>{currentLocation.sunrise && `Sunrise: ${this.formatTimeToLocal(currentLocation.sunrise, currentLocation.timezone)}`}</Text>
                                </View>
                                <View style={styles.sectionItem}>
                                    <Image source={ImagePath.sunset} />
                                    <Text style={styles.sectionDescription}>{currentLocation.sunset && `Sunset: ${this.formatTimeToLocal(currentLocation.sunset, currentLocation.timezone)}`}</Text>
                                </View>
                            </View>
                        </>
                        : <>
                            <Text onPress={() => this.componentDidMount()} style={styles.subtitle}>Geolocation is unavailable!{"\n"}Please Turn GPS Location On!</Text>
                            <Button title="Retry" onPress={() => this.componentDidMount()} />
                        </>
                    }
                    <Text style={styles.title}>Information By Chosen City:</Text>
                    <TextInput
                        style={styles.sectionTextInput}
                        onChangeText={text => this.setState({ inputCity: { ...this.state.inputCity, city: text, show: false } })}
                        value={this.state.inputCity.city}
                        placeholder="Type city here..."
                    />
                    <TouchableOpacity
                        style={styles.sectionButton}
                        onPress={() => this.onButtonPress()}
                    >
                        <Text style={styles.sectionButtonText}>Search</Text>
                    </TouchableOpacity>
                    {this.state.inputCity.show &&
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionItem}>
                                <Image source={ImagePath.sunrise} />
                                <Text style={styles.sectionDescription}>{inputCity.sunrise && `Sunrise: ${this.formatTimeToLocal(inputCity.sunrise, inputCity.timezone)}`}</Text>
                            </View>
                            <View style={styles.sectionItem}>
                                <Image source={ImagePath.sunset} />
                                <Text style={styles.sectionDescription}>{inputCity.sunset && `Sunset: ${this.formatTimeToLocal(inputCity.sunset, inputCity.timezone)}`}</Text>
                            </View>
                        </View>
                    }
                </View>
                <Footer />
            </ScrollView>
        );
    }
}

export default Home;
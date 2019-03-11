import React, {Component} from 'react';
import MapView, {Marker} from 'react-native-maps'
import { PermissionsAndroid } from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            region: {
                latitude: 25.882004,
                longitude: 10.582748,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
        };
    }

    async componentDidMount() {
        await requestLocationPermission()
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922 * 1.5,
                longitudeDelta: 0.00421 * 1.5
            }
            this.setState({region: region})
        }, (error) => console.log(error));
    }

    render() {
        return (
            <MapView
                style={{flex: 1}}
                region={{
                    latitude: this.state.region && this.state.region.latitude ,
                    longitude: this.state.region &&  this.state.region.longitude ,
                    latitudeDelta: this.state.region && this.state.region.latitudeDelta ,
                    longitudeDelta: this.state.region && this.state.region.longitudeDelta
                }}
                showsUserLocation={true}
            >
                <Marker
                    coordinate={this.state.region}
                    title={"My Current location"}
                    description={"My Current location"}
                />
            </MapView>
        );
    }
}

export async function requestLocationPermission()
{
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Google Maps',
                'message': 'Google Maps App access to your location '
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location")
        } else {
            console.log("location permission denied")
            alert("Location permission denied");
        }
    } catch (err) {
        console.warn(err)
    }
}
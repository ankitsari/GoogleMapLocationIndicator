import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
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

    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            // Create the object to update this.state.mapRegion through the onRegionChange function
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922 * 1.5,
                longitudeDelta: 0.00421 * 1.5
            }
            //this.onRegionChange(region, region.latitude, region.longitude);
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

import { View, Alert, Text } from 'react-native'
import React, { Component } from 'react'
import MapView, { Marker, Polygon } from 'react-native-maps';
import { connect } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectOrigin } from '../redux/slices/navSlice';
import { createStackNavigator } from "@react-navigation/stack";
import NavigateCard from "../screens/NavigateCard";
import RideOptionCard from "../screens/RideOptionCard";
import MapViewDirections from 'react-native-maps-directions';
import { API_KEY } from "@env";
import { Image } from '@rneui/base';
import UberPng from "../assets/uber.256x256.png"

const Stack = createStackNavigator();

export class MapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullMap: false,
      location: null
    }

    this.origin = null;
    this.destination = null;
    this.MapViewRef;
  }

  componentDidMount() {
    if (this.props.nav.origin) {
      this.setState({ fullMap: false, location: this.props.nav.origin.location })
    } else if (this.props.route?.params) {
      this.setState({ ...this.state, fullMap: true })
    }
    // else {
    //   Alert.alert("Select", "please type your starting point in home screen", [{ style: "cancel" }])
    // }
  }

  componentDidUpdate() {
    this.origin = this.props.nav.origin;
    this.destination = this.props.nav.destination;

    if (this.origin && this.destination) {
      this.MapViewRef.fitToSuppliedMarkers(['origin', 'destination'],
        { edgePadding: { left: 50, right: 50, top: 50, bottom: 50 } });
    }
  }

  render() {
    return (
      this.state.fullMap ?
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.props.route.params.latitude,
            longitude: this.props.route.params.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={this.props.route.params}
            title={"title"}
            description={"description"}
          />
        </MapView>
        :
        <View style={tw`flex-1`}>
          <View style={tw`h-1/2`}>
            <MapView
              style={tw`h-full w-full`}
              region={{
                latitude: this.state.location?.lat || 46.8182,
                longitude: this.state.location?.lng || 8.2275,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              ref={ref => this.MapViewRef = ref}
            >
              {
                this.origin && this.destination &&
                <MapViewDirections
                  apikey={API_KEY}
                  origin={this.origin.description}
                  destination={this.destination.description}
                  strokeColor="black"
                  strokeWidth={4}
                />
              }

              {this.state.location &&
                <Marker
                  coordinate={{
                    latitude: this.state.location.lat,
                    longitude: this.state.location.lng,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}
                  title={this.origin?.description.split(",")[0] || ""}
                  description={this.origin?.description || ""}
                  identifier="origin"
                >
                  <Image source={UberPng} style={{ width: 20, height: 20 }} />

                </Marker>}

              {this.destination?.location &&
                <Marker
                  coordinate={{
                    latitude: this.destination.location.lat,
                    longitude: this.destination.location.lng
                  }}
                  title={this.destination.description.split(",")[0]}
                  description={this.destination.description}
                  identifier="destination"
                >
                  <Image source={UberPng} style={{ width: 20, height: 20 }} />
                </Marker>}
            </MapView>
          </View>
          <View style={tw`h-1/2`}>
            <Stack.Navigator initialRouteName="RideOptionCard" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="NavigateCard" component={NavigateCard} />
              <Stack.Screen name="RideOptionCard" component={RideOptionCard} />
            </Stack.Navigator>
          </View>
        </View>
    )
  }
}

export default connect(selectOrigin)(MapScreen);
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
  }

  tokyoRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  chibaRegion = {
    latitude: 35.6074,
    longitude: 140.1065,
    latitudeDelta: 0.01,
  }

  render() {
    return (
      this.state.fullMap ?
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.props.route.params.latitude,
            longitude: this.props.route.params.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
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
                longitude: this.state.location?.lng | 8.2275,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              {
                this.origin && this.destination &&
                <MapViewDirections
                  apikey={API_KEY}
                  mode="DRIVING"
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
                    longitude: this.state.location.lng
                  }}
                  title={"title"}
                  description={"description"}
                  identifier="destination"
                />}

              {this.destination?.location &&
                <Marker
                  coordinate={{
                    latitude: this.destination.location.lat,
                    longitude: this.destination.location.lng
                  }}
                  title={"description"}
                  description={this.destination.description}
                />}
            </MapView>
          </View>
          <View style={tw`h-1/2`}>
            <Stack.Navigator initialRouteName="Map" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="NavigateCard" component={NavigateCard} />
              <Stack.Screen name="RideOptionCard" component={RideOptionCard} />
            </Stack.Navigator>
          </View>
        </View>
    )
  }
}

export default connect(selectOrigin)(MapScreen);
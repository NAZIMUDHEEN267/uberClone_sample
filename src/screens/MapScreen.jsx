import { View, Alert } from 'react-native'
import React, { Component } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectOrigin } from '../redux/slices/navSlice';

export class MapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullMap: false,
      location: null
    }
  }

  componentDidMount() {
    if (this.props.nav.origin) {
      this.setState({ fullMap: false, location: this.props.nav.origin.location.location })
    } else if (this.props.route?.params) {
      this.setState({ ...this.state, fullMap: true })
    } else {
      Alert.alert("Select", "please type your starting point in home screen", [{ style: "cancel" }])
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
              initialRegion={{
                latitude: this.state.location?.lat || 46.8182,
                longitude: this.state.location?.lng | 8.2275,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              {this.state.location &&
                <Marker
                  coordinate={{
                    latitude: this.state.location.lat,
                    longitude: this.state.location.lng
                  }}
                  title={"Origin"}
                  description={this.props.nav.origin.description}
                  identifier={"origin"}
                  loadingEnabled={true}
                  loadingIndicatorColor="#666666"
                  loadingBackgroundColor="#eeeeee"
                  moveOnMarkerPress={true}
                  showsUserLocation={true}
                  showsCompass={true}
                  showsPointsOfInterest={false}
                  pinColor={"#000"}
                  provider="google"
                />}
            </MapView>
          </View>
          <View style={tw`h-1/2`}></View>
        </View>
    )
  }
}

export default connect(selectOrigin)(MapScreen);
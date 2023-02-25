import { Text, View } from 'react-native'
import React, { Component } from 'react'
import MapView, {Marker} from 'react-native-maps';

export class MapScreen extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <MapView
        style={{flex: 1}}
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
    )
  }
}

export default MapScreen
import { Text, View, SafeAreaView, Image } from 'react-native'
import React, { Component } from 'react';
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';
import MapView from "react-native-maps";

export class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-5`}>
          <Image
            style={{width: 100, height: 100, resizeMode: "contain"}}
            source={{ uri: "https://links.papareact.com/gzs" }} />

            <NavOptions {...this.props}/>
        </View>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </SafeAreaView>
    )
  }
}

export default Home
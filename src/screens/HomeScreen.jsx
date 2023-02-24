import { View, SafeAreaView, Image } from 'react-native'
import React, { Component } from 'react';
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';
import Location from '../components/Location';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { API_KEY } from "@env";

export class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-5`}>
          {/* image */}
          <Image
            style={{ width: 100, height: 100, resizeMode: "contain" }}
            source={{ uri: "https://links.papareact.com/gzs" }} />
          {/* places search input */}
          <GooglePlacesAutocomplete 
            styles={{
              container: {
                flex: 0
              },
              textInput: {
                fontSize: 18
              }
            }}
            query={{
              key: API_KEY,
              language: "en"
            }}
            onPress={(value, details = null) => {
              console.log(value)
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
            minLength={2}
            placeholder='Where From?'
            debounce={400}
            nearbyPlacesAPI='GooglePlacesSearch'
          />
          {/* Buttons */}
          <NavOptions {...this.props} />
          {/* Map */}
          <Location {...this.props}/>
        </View>
      </SafeAreaView>
    )
  }
}

export default Home
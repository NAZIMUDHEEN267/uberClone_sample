import { View, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { Component } from 'react';
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';
import Location from '../components/Location';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { connect } from "react-redux";
import { setOrigin, selectOrigin, setDestination } from '../redux/slices/navSlice';

export class Home extends Component {
  constructor(props) {
    super(props)

    this.props.changeOrigin();
  }
  
  render() {
    return (
      <ScrollView>
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
                key: "AIzaSyCuGCb09imbB3mLQJPkrpTSVZGD0HtM1Oo",
                language: "en"
              }}
              onPress={(data, details = null) => {
                this.props.changeOrigin({
                  location: details.geometry,
                  description: data.description
                });
                
                this.props.changeDispatch(null);
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
            <Location {...this.props} />
          </View>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

// dispatch method creator
function mapDispatchToProps(dispatch) {
  return {
    changeOrigin: (value) => dispatch(setOrigin(value)),
    changeDispatch: (value) => dispatch(setDestination(value))
  }
}

export default connect(selectOrigin, mapDispatchToProps)(Home)
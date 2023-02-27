import { View, SafeAreaView, Image, ScrollView, Text } from 'react-native'
import React, { Component } from 'react';
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';
import Location from '../components/Location';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { connect } from "react-redux";
import { setOrigin, selectOrigin, setDestination, setHistory } from '../redux/slices/navSlice';
import { API_KEY } from "@env";
import { Icon } from '@rneui/base';
import { TouchableOpacity } from 'react-native-gesture-handler';

export class Home extends Component {
  constructor(props) {
    super(props)

    this.props.changeOrigin();
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
            renderLeftButton={() => (
              <View style={{ alignItems: 'center', justifyContent: "center" }}>
                <Icon name='search' type='ionicon' size={26} style={{ marginLeft: 13 }} />
              </View>
            )}
            styles={{
              container: {
                flex: 0,
                backgroundColor: "rgba(0,0,0,.1)",
                borderRadius: 20,
              },
              textInput: {
                backgroundColor: "transparent",
                paddingLeft: 15,
                fontSize: 18
              },
            }}
            query={{
              key: API_KEY,
              language: "en"
            }}
            onPress={(data, details = null) => {
              this.props.changeOrigin({
                location: details.geometry.location,
                description: data.description
              });

              this.props.changeHistory({
                location: details.geometry.location,
                description: data.description
              })

              this.props.changeDestination(null);
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
            minLength={2}
            placeholder='Where From?'
            debounce={400}
            nearbyPlacesAPI='GooglePlacesSearch'
          />
          {/* history */}
          <ScrollView style={{ height: this.props.nav.searchHistory.length > 0 && this.props.nav.mapViewed.show ?  150 : 0, width: "100%", marginTop: 10 }}>
            {
              this.props.nav.mapViewed && this.props.nav.searchHistory.map((item, i) => {
                const values = item.description.split(",");

                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.changeOrigin(item);
                      this.props.navigation.navigate("MapScreen");
                    }}
                    key={i}
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-around",
                      borderBottomColor: "rgba(0,0,0,0.1)",
                      borderBottomWidth: 1,
                      paddingVertical: 13
                    }}
                  >
                    <Icon name='location-sharp' type='ionicon' size={15} backgroundColor="rgba(0,0,0,0.08)" style={{padding: 10, borderRadius: 25}}/>
                    <View style={{alignSelf: "flex-start"}}>
                      <Text style={{fontSize: 18, fontWeight: "600"}}>{values[0]}</Text>
                      <Text>{values.length > 0 ? values.slice(1).join("") : ""}</Text>
                    </View>
                    <Icon name='chevron-forward' type='ionicon' size={19} />
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>

          {/* Buttons */}
          <NavOptions {...this.props} />
          {/* Map */}
          <Location {...this.props} />
        </View>
      </SafeAreaView>
    )
  }
}

// dispatch method creator
function mapDispatchToProps(dispatch) {
  return {
    changeOrigin: (value) => dispatch(setOrigin(value)),
    changeDestination: (value) => dispatch(setDestination(value)),
    changeHistory: (value) => dispatch(setHistory(value))
  }
}

export default connect(selectOrigin, mapDispatchToProps)(Home)
import { Text, View, SafeAreaView, Image } from 'react-native'
import React, { Component } from 'react';
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';

export class Home extends Component {
  render() {
    return (
      <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-5`}>
          <Image
            style={{width: 100, height: 100, resizeMode: "contain"}}
            source={{ uri: "https://links.papareact.com/gzs" }} />

            <NavOptions />
        </View>
      </SafeAreaView>
    )
  }
}

export default Home
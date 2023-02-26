import { Text, View, VirtualizedList } from 'react-native'
import React, { Component } from 'react'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Icon, Image } from '@rneui/base'
import tw from 'tailwind-react-native-classnames'

export class RideOptionCard extends Component {

  constructor() {
    super();
    this.state = {};
  }

  data = [
    {
      id: "Uber-x-123",
      title: "UberX",
      multiplier: 1,
      image: "https://links.papareact.com/3pn"
    },
    {
      id: "Uber-xl-456",
      title: "Uber XL",
      multiplier: 1.2,
      image: "https://links.papareact.com/5w8"
    }, {
      id: "Uber-lux-789",
      title: "Uber LUX",
      multiplier: 1.75,
      image: "https://links.papareact.com/7pf"
    }
  ]


  render() {
    return (
      <View>
        <View className="flex-row items-center justify-center w-full px-3">
          <TouchableOpacity style={{ flex: .5, padding: 13, borderRadius: 25 }} onPress={() => this.props.navigation.navigate("NavigateCard")}>
            <Icon name='chevron-left' size={20} type="font-awesome" />
          </TouchableOpacity>
          <Text className="text-center py-5 text-xl" style={{ flex: 1 }}>Select a Ride</Text>
        </View>


        <View className="border-t border-gray-200 flex-shrink" >
          <FlatList
            data={this.data}
            ListFooterComponent={
              <TouchableOpacity style={tw`py-3 m-2 ${!this.state.item?.id ? "bg-gray-200" : "bg-black"}`} activeOpacity={.8}>
                <Text className="text-center text-white text-xl h-full">{`Selected ${this.state.item?.title || ""}`}</Text>
              </TouchableOpacity>
            }
            style={{height: "100%", width: "100%"}}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.setState({item})}
                style={tw`flex-row items-center justify-between px-10 ${item.id == this.state.item?.id && "bg-gray-200"}`}>
                <Image
                  style={{
                    width: 90,
                    height: 80,
                    resizeMode: "contain"
                  }}
                  source={{ uri: item.image }}
                />

                <View className="-ml-6">
                  <Text style={tw`text-lg font-semibold `}>{item.title}</Text>
                  <Text>Travel time</Text>
                </View>

                <Text className="text-xl text-black">${item.multiplier * 22}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    )
  }
}

export default RideOptionCard
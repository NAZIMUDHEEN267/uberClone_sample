import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react';
import { Icon } from '@rneui/themed';
import tw from "tailwind-react-native-classnames";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen"
  }, {
    id: "456",
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "OrderScreen"
  }
]
export class NavOptions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View className="mb-20">
        <FlatList
          data={data}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
              onPress={() => this.props.navigation.navigate(item.screen)}
            >
              <Image
                style={{ width: 120, height: 120, resizeMode: "contain" }}
                source={{ uri: item.image }} />
              <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
              <Icon
                style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                type='antdesign'
                name='arrowright'
                color={"white"} />
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}

export default NavOptions
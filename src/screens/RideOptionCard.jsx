import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from '@rneui/base'

export class RideOptionCard extends Component {
  render() {
    return (
      <View>
        <View className="flex-row items-center justify-center w-full p-3">
          <TouchableOpacity style={{ flex: .5, padding: 13, borderRadius: 25 }} onPress={() => this.props.navigation.navigate("NavigateCard")}>
            <Icon name='chevron-left' size={20} type="font-awesome"/>
          </TouchableOpacity>
          <Text className="text-center py-5 text-xl" style={{flex: 1}}>Select a Ride</Text>
        </View>


        <View className="border-t border-gray-200 flex-shrink" >
        </View>
      </View>
    )
  }
}

export default RideOptionCard
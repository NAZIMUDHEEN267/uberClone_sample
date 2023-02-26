import { Text, View, KeyboardAvoidingView } from 'react-native'
import React, { Component } from 'react'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { API_KEY } from "@env";
import { connect } from 'react-redux';
import { selectDestination, setDestination } from '../redux/slices/navSlice';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from '@rneui/themed';

export class NavigateCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='height' style={{ flex: 1 }} >
                <View style={tw`bg-white flex-1`}>
                    <Text style={tw`text-center p-5 text-xl`}>Good morning, Nazim</Text>
                    <View style={tw`border-t border-gray-200 flex-shrink`}>
                        <View>
                            <GooglePlacesAutocomplete
                                styles={{
                                    container: { flex: 0, backgroundColor: "#fff", paddingTop: 20 },
                                    textInput: { backgroundColor: "#DDDDFF", borderRadius: 0, fontSize: 18 },
                                    textInputContainer: { paddingHorizontal: 20, paddingBottom: 0 }
                                }}
                                fetchDetails={true}
                                enablePoweredByContainer={false}
                                placeholder='Where to?'
                                onPress={(data, details) => {
                                    this.props.changeDestination({
                                        location: details.geometry.location,
                                        description: data.description,
                                    });

                                    this.props.navigation.navigate("RideOptionCard");
                                }}
                                debounce={400}
                                nearbyPlacesAPI="GooglePlacesSearch"
                                query={{
                                    key: API_KEY,
                                    language: "en"
                                }}
                            />
                        </View>
                    </View>

                    <View style={tw`flex-row bg-white justify-evenly py-2 border-t border-gray-200`}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("RideOptionCard")}
                            style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full bg-black`}
                        >
                            <Icon
                                color={"white"}
                                name='car'
                                type='font-awesome'
                                size={16}
                            />
                            <Text className="text-center text-white">Rides</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full bg-gray-200`}>
                            <Icon
                                color={"black"}
                                name="fast-food-outline"
                                type="ionicon"
                                size={16}
                            />
                            <Text>Eats</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeDestination: (value) => dispatch(setDestination(value))
    }
}

export default connect(selectDestination, mapDispatchToProps)(NavigateCard);
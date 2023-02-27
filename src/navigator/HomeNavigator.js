import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import OrderScreen from "../screens/OrderScreen";
import MapScreen from "../screens/MapScreen";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

export default function HomeNavigator() {
    const { card } = useSelector(state => state.nav.mapViewed);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="MapScreen" component={MapScreen} options={({ navigation }) => ({
                headerShown: card,
                title: "",
                headerStyle: {backgroundColor: "transparent", elevation: 0, height: 100 },
                headerLeft: () => (
                    <TouchableOpacity
                        activeOpacity={.5}
                        style={{ width: 60, height: 60, borderRadius: 50, backgroundColor: "white", elevation: 5, marginLeft: 15, alignItems: "center", justifyContent: "center" }}
                        onPress={() => navigation.navigate("HomeScreen")}
                    >
                        <Icon type='antdesign'
                            name='arrowleft' size={26} />
                    </TouchableOpacity>
                )
            })} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
        </Stack.Navigator>
    )
}
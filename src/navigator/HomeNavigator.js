import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import OrderScreen from "../screens/OrderScreen";


const Stack = createStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="MapScreen" component={MapScreen} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
        </Stack.Navigator>
    )
}
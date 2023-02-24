import { NavigationContainer } from "@react-navigation/native";
import HomeNavigator from "./HomeNavigator";

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <HomeNavigator />
        </NavigationContainer>
    )
}
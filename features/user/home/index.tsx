import { useAuth } from "@/stores/auth";
import { Text, View } from "react-native";

export default function HomeScreen() {
    const { user } = useAuth();
    return (
        <View>
            <Text>HomeScreen {user?.displayName}</Text>
        </View>
    );
}
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function MenuAuthScreen() {
    return (
        <View className="w-full h-full bg-slate-800/25">
            <View className="w-full bg-white h-[250px] absolute bottom-0 p-6 rounded-t-3xl shadow-lg">
                <View className="items-center mb-8">
                    <Text className="text-2xl font-bold text-gray-800">Welcome</Text>
                    <Text className="text-gray-500 mt-2">Please login or create an account</Text>
                </View>
                
                <View className="space-y-4">
                    <TouchableOpacity 
                        className="bg-yellow-400 p-4 mb-4 rounded-xl shadow-sm flex-row items-center justify-center space-x-2"
                        onPress={() => router.push('/login')}
                    >
                        <Ionicons name="log-in-outline" size={24} color="white" />
                        <Text className="text-white text-center font-bold text-lg">Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        className="bg-gray-100 p-4 rounded-xl shadow-sm flex-row items-center justify-center space-x-2"
                        onPress={() => router.push('/register')}
                    >
                        <Ionicons name="person-add-outline" size={24} color="#1f2937" />
                        <Text className="text-gray-800 text-center font-bold text-lg">Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        className="mt-4 flex-row items-center justify-center space-x-1"
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back-outline" size={16} color="#9ca3af" />
                        <Text className="text-gray-400 text-center text-sm">Back to previous page</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
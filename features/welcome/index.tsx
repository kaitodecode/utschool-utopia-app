import { useAuth } from "@/stores/auth";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function WelcomeScreen() {

    const { user, init } = useAuth();

    useEffect(() => {
        init();
    }, []);

    useEffect(()=>{
        if(user){
            router.push("/user/home");
        }
    },[user])

    return (
        <View className="flex-1 bg-white justify-between p-6">
            
            <View className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 rounded-full opacity-80 blur-sm" />
            <View className="absolute top-0 left-0 w-24 h-24 bg-yellow-300 rounded-full opacity-60 blur-sm translate-x-4 translate-y-4" />
            
            <View className="absolute bottom-24 right-0 w-40 h-40 bg-yellow-400 rounded-full opacity-80 blur-sm" />
            <View className="absolute bottom-24 right-0 w-32 h-32 bg-yellow-300 rounded-full opacity-60 blur-sm translate-x-4 translate-y-4" />
            <View className="flex-1 items-center justify-center">
                <Image
                    source={require("../../assets/images/icon.png")}
                    className="w-[180px] h-[180px]"
                    resizeMode="contain"
                />
                <Text className="text-3xl font-bold mt-6 text-gray-800">Welcome</Text>
                <Text className="text-base text-gray-600 mt-2 text-center">
                    Start your journey with us today
                </Text>
            </View>
            
            <Pressable 
                className="bg-yellow-400 py-4 px-8 rounded-xl items-center mb-6 active:opacity-80"
                onPress={() => router.push("/menu")}
            >
                <Text className="text-white text-lg font-semibold">Get Started</Text>
            </Pressable>
        </View>
    )
}

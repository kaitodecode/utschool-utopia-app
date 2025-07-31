import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Story } from "../home";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function StoryDetailScreen() {
    const route = useRoute();
    const { id } = route.params as { id: string };
    const [story, setStory] = useState<Story | null>(null);
    useEffect(() => {
        const fetchStory = async () => {
            const response = await axios.get(`https://57217e99994f.ngrok-free.app/stories/${id}`);
            console.log(response)
            setStory(response.data.data);
        };
        fetchStory();
    }, []);
    return (
        <View className="flex-1 bg-slate-800/20">
            <Pressable 
                onPress={() => router.back()}
                className="absolute top-12 left-4 z-10 bg-white rounded-full p-2 shadow-md"
            >
                <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
            
            <ScrollView className="w-full h-full pt-32">
                <View className="w-full h-screen bg-white rounded-t-lg shadow-lg overflow-hidden">
                    <Image
                        source={{uri: story?.photo}}
                        className="w-full h-48 object-cover"
                        resizeMode="cover"
                    />
                    <View className="p-4">
                        <Text className="text-2xl font-bold text-gray-800 mb-2">
                            {story?.title}
                        </Text>
                        <Text className="text-gray-600 text-base">
                            {story?.content}
                        </Text>
                        <Pressable 
                        onPress={() => {
                            router.back();
                            router.push({
                                pathname: "/user/story/read",
                                params: { id: story?.id, title: story?.title, content: story?.content, photo: story?.photo }
                            });
                        }}
                            className="mt-4 bg-yellow-400 py-2 px-4 rounded-lg active:bg-yellow-600 flex-row items-center justify-center"
                        >
                            <Text className="text-white font-medium text-center mr-2">
                                Read More
                            </Text>
                            <Ionicons name="eye" size={20} color="white" />
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
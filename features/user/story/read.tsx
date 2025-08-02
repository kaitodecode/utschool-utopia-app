import { useAuth } from "@/stores/auth";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Story } from "../home";

export default function ReadScreen() {
    const route = useRoute();
    const { id } = route.params as { id: string };
    const [story, setStory] = useState<Story | null>(null);
    const {user} = useAuth();

    const markAsRead = async () => {
        if (!user?.email || !id) {
            console.error("Missing required fields: email or story_id");
            return;
        }

        try {
            const response = await axios.post(`https://77d468dee296.ngrok-free.app/reading`, {
                email: user.email,
                story_id: id,
                is_finish: false
            });

            if (!response.data) {
                throw new Error('No data received from server');
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    console.error("Reading endpoint not found. Please check the API URL");
                } else {
                    console.error("Error creating reading record:", error.response?.data?.message || error.message);
                }
            } else {
                console.error("Error updating reading status:", error);
            }
        }
    }

    useEffect(() => {
        const fetchStory = async () => {
            const response = await axios.get(`https://77d468dee296.ngrok-free.app/stories/${id}`);
            console.log(response)
            setStory(response.data.data);
        };
        markAsRead()
        fetchStory();
    }, []);
    return (
        <ScrollView className="w-full h-full bg-gray-100">
            <View className="w-full min-h-screen bg-white p-4">
                <Text className="text-2xl font-bold text-gray-800 mb-4">{story?.title}</Text>
                <Text className="text-base leading-relaxed text-gray-600 whitespace-pre-wrap">
                    {story?.content}
                </Text>
                <Pressable 
                    onPress={() => router.back()}
                    className="mt-8 bg-yellow-400 py-3 px-6 rounded-lg active:bg-yellow-600"
                >
                    <Text className="text-white font-medium text-center">Back</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}
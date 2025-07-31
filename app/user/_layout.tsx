import { Stack, useNavigation, useRouter, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";

const CustomTabBar = () => {
    const router = useRouter();
    const segments = useSegments();
    const currentRoute = segments[segments.length - 1] || 'home';

    const tabs = [
        {
            name: 'home',
            title: 'Home',
            icon: 'home-sharp',
            iconOutline: 'home'
        },
        {
            name: 'story',
            title: 'Story',
            icon: 'library-sharp',
            iconOutline: 'library'
        },
        {
            name: 'library',
            title: 'Library',
            icon: 'bookmarks-sharp',
            iconOutline: 'bookmarks'
        },
        {
            name: 'profile',
            title: 'Profile',
            icon: 'person-circle-sharp',
            iconOutline: 'person-circle'
        }
    ];
    const handleTabPress = (tabName: string) => {
        router.push(`/user/${tabName}` as any);
    };

    return (
        <View className="absolute bottom-2 left-0 right-0">
            <View className="bg-gray-800 mx-4 rounded-full shadow-2xl">
                <View className="flex-row justify-around items-center py-0 px-1">
                    {tabs.map((tab) => {
                        const isActive = currentRoute === tab.name || segments.some(segment => segment.startsWith(tab.name));
                        return (
                            <TouchableOpacity
                                key={tab.name}
                                onPress={() => handleTabPress(tab.name)}
                                className="flex-1 items-center py-2"
                            >
                                <View className={`p-3 min-w-[40px] items-center ${
                                    isActive ? 'bg-yellow-400 rounded-full' : 'bg-transparent'
                                }`}>
                                    <Ionicons 
                                        name={isActive ? tab.icon as any : tab.iconOutline as any} 
                                        size={15} 
                                        color={isActive ? '#ffffff' : '#facc15'} 
                                    />

                                {/* <Text className={`text-xs font-semibold mt-1 ${
                                    isActive ? 'text-white' : 'text-gray-400'
                                }`}>
                                    {tab.title}
                                </Text> */}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

export default function UserLayout() {
    return (
        <View className="flex-1 bg-white">
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="home/index" />
                <Stack.Screen name="story/index" />
                <Stack.Screen name="profile/index" />
                <Stack.Screen name="library/index" />
            </Stack>
            <CustomTabBar />
        </View>
    );
}
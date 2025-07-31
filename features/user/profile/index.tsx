import { useAuth } from "@/stores/auth";
import { router } from "expo-router";
import { Image, Text, View, TouchableOpacity, ScrollView } from "react-native";

export default function ProfileScreen() {
    const {user, logout} = useAuth();

    const handleLogout = async () => {
        try {
            logout();
            router.push('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <ScrollView 
            className="w-full bg-gray-100"
            contentContainerStyle={{
                minHeight: '100%',
                paddingBottom: 120
            }}
        >
            <View className="bg-slate-800 h-1/5 rounded-b-xl  relative pb-20">
                <View className="absolute -bottom-12 w-full flex items-center">
                    <View className="w-24 h-24 rounded-full bg-gray-300 border-4 border-white">
                        {user?.photoURL && (
                            <Image 
                                source={{ uri: user.photoURL }}
                                className="w-full h-full rounded-full"
                            />
                        )}
                    </View>
                </View>
            </View>
            
            <View className="mt-16 px-4">
                <Text className="text-xl font-bold text-center">{user?.displayName || 'Anonymous'}</Text>
                <Text className="text-gray-500 text-center">{user?.email}</Text>
                
                <View className="mt-6 p-4 bg-white rounded-xl">
                    <Text className="font-semibold mb-2">Account Details</Text>
                    <Text className="text-gray-600">Provider: {user?.providerData[0]?.providerId || 'None'}</Text>
                    <Text className="text-gray-600">Phone: {user?.phoneNumber || 'Not provided'}</Text>
                    <Text className="text-gray-600">Email Verified: {user?.emailVerified ? 'Yes' : 'No'}</Text>
                </View>

                <View className="mt-6 p-4 bg-white rounded-xl">
                    <Text className="font-semibold mb-2">App Info</Text>
                    <Text className="text-gray-600">App: {user?.appName}</Text>
                    <Text className="text-gray-600">Account Type: {user?.isAnonymous ? 'Anonymous' : 'Registered'}</Text>
                </View>

                <View className="mt-6 p-4 bg-white rounded-xl">
                    <Text className="font-semibold mb-2">Activity</Text>
                    <Text className="text-gray-600">
                        Created: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                    </Text>
                    <Text className="text-gray-600">
                        Last Login: {user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Unknown'}
                    </Text>
                </View>

                <TouchableOpacity 
                    onPress={handleLogout}
                    className="mt-6 p-4 bg-red-500 rounded-xl"
                >
                    <Text className="text-white text-center font-semibold">Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
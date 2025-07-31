import React from "react";
import { Image, Pressable, Text, TextInput, View, ScrollView, Alert } from "react-native";
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/stores/auth";

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser, user } = useAuth();


    useEffect(() => {
        if (user) {
            router.push("/user/home");
        }
    }, [user]);

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Login berhasil:", userCredential.user);
            setUser(userCredential.user);
            Alert.alert('Success', 'Login successful');
            router.push("/user/home");
        } catch (err: any) {
            Alert.alert('Error', err.message || 'Invalid email or password');
            setError(err.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-yellow-400">
            {/* Background Decorative Elements */}
            <View className="absolute top-0 right-0 w-32 h-32 bg-black rounded-full -mr-16 -mt-16" />
            <View className="absolute bottom-20 left-0 w-40 h-40 bg-black rounded-full -ml-20" />
            
            <ScrollView className="flex-1" contentContainerStyle={{flexGrow: 1}}>
                <View className="flex-1 justify-center items-center px-8 py-12">
                    {/* Main Card */}
                    <View className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl">
                        {/* Header */}
                        <View className="items-center mb-8">
                            <Image
                                source={require("../../assets/images/icon.png")}
                                className="w-[180px] h-[180px]"
                                resizeMode="contain"
                            />
                            <Text className="text-2xl font-bold text-gray-800 mb-2 -mt-10">UTOPIA</Text>
                            <Text className="text-sm text-gray-500 tracking-widest uppercase">PT United Tractors Tbk</Text>
                        </View>

                        {/* Welcome Section */}
                        {/* <View className="bg-orange-400 rounded-2xl p-6 mb-6">
                            <Text className="text-2xl font-bold text-white mb-2">Welcome</Text>
                            <Text className="text-orange-100 text-sm mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor
                            </Text>
                            <View className="flex-row space-x-3">
                                <Pressable 
                                    className="bg-black px-6 py-3 rounded-full flex-1"
                                    onPress={handleLogin}
                                    disabled={loading}
                                >
                                    <Text className="text-white text-center font-medium">
                                        {loading ? 'Signing In...' : 'Sign In'}
                                    </Text>
                                </Pressable>
                                <Pressable className="bg-white px-6 py-3 rounded-full flex-1">
                                    <Text className="text-gray-800 text-center font-medium">Sign Up</Text>
                                </Pressable>
                            </View>
                        </View> */}

                        {/* Login Form */}
                        <View className="space-y-4">
                            <TextInput
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                className="bg-gray-100 mb-4 px-4 py-4 rounded-xl text-base"
                            />
                            <TextInput
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                className="bg-gray-100 px-4 py-4 rounded-xl text-base"
                            />
                            
                            {error ? (
                                <Text className="text-red-500 mt-3 text-sm text-center">{error}</Text>
                            ) : null}
                            
                            <Pressable className="self-end">
                                <Text className="text-gray-500 text-sm mt-5">Forgot Password?</Text>
                            </Pressable>
                        </View>

                        {/* Sign In Button */}
                        <Pressable 
                            className={`mt-6 py-4 rounded-full ${
                                loading ? 'bg-gray-300' : 'bg-yellow-400 active:bg-yellow-600'
                            }`}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            <Text className="text-white text-center font-semibold text-lg">
                                {loading ? 'Signing In...' : 'Sign In'}
                            </Text>
                        </Pressable>

                        <View className="flex-row mt-10 items-center justify-center">
                            <Text className="text-gray-500 text-sm">Don't have an account?</Text>
                            <Pressable onPress={()=> router.push("/register")}>
                                <Text className="text-black text-sm ml-2">Sign Up</Text>
                            </Pressable>
                        </View>

                        {/* Social Login */}
                        {/* <View className="mt-6 space-y-3">
                            <Pressable className="flex-row items-center justify-between bg-gray-50 px-4 py-3 rounded-xl">
                                <View className="flex-row items-center">
                                    <MaterialCommunityIcons name="google" size={20} color="#4285f4" />
                                    <Text className="ml-3 text-gray-700">Continue with Google</Text>
                                </View>
                                <AntDesign name="arrowright" size={16} color="#666" />
                            </Pressable>
                            
                            <Pressable className="flex-row items-center justify-between bg-gray-50 px-4 py-3 rounded-xl">
                                <View className="flex-row items-center">
                                    <MaterialIcons name="facebook" size={20} color="#1877f2" />
                                    <Text className="ml-3 text-gray-700">Continue with Facebook</Text>
                                </View>
                                <AntDesign name="arrowright" size={16} color="#666" />
                            </Pressable>
                        </View> */}
                    </View>

                    {/* Bottom Explore */}
                    {/* <View className="flex-row items-center mt-8">
                        <Text className="text-black text-lg font-semibold mr-2">Explore</Text>
                        <MaterialIcons name="explore" size={24} color="#000" />
                    </View> */}
                </View>
            </ScrollView>
        </View>
    );
}

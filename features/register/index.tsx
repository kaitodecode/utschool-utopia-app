import { Image, Pressable, Text, TextInput, View, ScrollView, Alert } from "react-native";
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { useState } from "react";
import { router } from "expo-router";

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        setError('');
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Success', 'Registration successful');
            router.push("/login");
        } catch (err: any) {
            Alert.alert('Error', err.message || 'Registration failed');
            setError(err.message || 'Registration failed');
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

                        {/* Registration Form */}
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
                                className="bg-gray-100 mb-4 px-4 py-4 rounded-xl text-base"
                            />
                            <TextInput
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                                className="bg-gray-100 px-4 py-4 rounded-xl text-base"
                            />
                            
                            {error ? (
                                <Text className="text-red-500 text-sm text-center">{error}</Text>
                            ) : null}
                        </View>

                        {/* Sign Up Button */}
                        <Pressable 
                            className={`mt-6 py-4 rounded-full ${
                                loading ? 'bg-gray-300' : 'bg-yellow-400 active:bg-yellow-600'
                            }`}
                            onPress={handleRegister}
                            disabled={loading}
                        >
                            <Text className="text-white text-center font-semibold text-lg">
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </Text>
                        </Pressable>

                        <View className="flex-row mt-10 items-center justify-center">
                            <Text className="text-gray-500 text-sm">Already have an account?</Text>
                            <Pressable onPress={() => router.back()}>
                                <Text className="text-black text-sm ml-2">Sign In</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
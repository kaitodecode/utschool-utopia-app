import { Stack } from "expo-router";
import React from "react";

export default function StoryLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="read" />
            <Stack.Screen name="detail"
                options={{
                    title: 'Story Detail',
                    presentation: 'transparentModal',
                    animation: 'slide_from_bottom',
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
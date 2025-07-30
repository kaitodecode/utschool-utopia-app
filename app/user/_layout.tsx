import { Tabs } from "expo-router";
import React from "react";

export default function UserLayout() {
    return (
        <Tabs
            initialRouteName="home"
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                }}
            />
            <Tabs.Screen
                name="story"
                options={{
                    title: "Story",
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                }}
            />
        </Tabs>
    );
}
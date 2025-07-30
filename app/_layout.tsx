import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}

      initialRouteName="user"
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="user" />
    </Stack>
  );
}

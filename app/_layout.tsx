import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css"
export default function RootLayout() {
  return (
      <SafeAreaView
        className="flex-1"
      >
        <Stack
          screenOptions={{
            headerShown: false,
          }}

        >
          <Stack.Screen name="index" />
          <Stack.Screen name="menu"
            options={{
              presentation: 'containedTransparentModal',
              animation: 'slide_from_bottom',
              headerShown: false,
            }}
          />
          <Stack.Screen name="user" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
        </Stack>
      </SafeAreaView>
  );
}

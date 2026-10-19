
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Pressable, StyleSheet, View, type PressableProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,

        // Remove Android dark ripple effect
        tabBarButton: (props) => (
          <Pressable
            {...(props as PressableProps)}
            android_ripple={{ color: "transparent" }}
          />
        ),

        tabBarStyle: {
          height: 60 + (insets.bottom > 0 ? insets.bottom : 10),
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 6,
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 0,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
        },

        tabBarIconStyle: {
          marginTop: 0,
        },
      }}
    >
      {/* Budget */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Budget",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: colors.soft },
              ]}
            >
              <Ionicons
                name={focused ? "wallet" : "wallet-outline"}
                size={23}
                color={color}
              />
            </View>
          ),
        }}
      />

      {/* Categories */}
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: colors.soft },
              ]}
            >
              <Ionicons
                name={focused ? "shapes" : "shapes-outline"}
                size={23}
                color={color}
              />
            </View>
          ),
        }}
      />

      {/* Settings */}
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: colors.soft },
              ]}
            >
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={23}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 68,
    height: 32,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

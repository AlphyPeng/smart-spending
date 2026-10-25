import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoriesCreateHeader from "../../components/categories/CategoriesCreateHeader";
import CategoriesCreateAllocation from "../../components/categories/CategoriesCreateAllocation";
import { useTheme } from "../../context/ThemeContext";

const HIDE_DISTANCE = 12;
const SHOW_DISTANCE = 10;
const ANIMATION_DURATION = 200;

export default function CategoriesCreate() {
  const { colors } = useTheme();
  const [headerHeight, setHeaderHeight] = useState(0);

  const headerTranslateY = useSharedValue(0);
  const headerHeightValue = useSharedValue(0);
  const lastScrollY = useSharedValue(0);
  const downTravel = useSharedValue(0);
  const upTravel = useSharedValue(0);
  const isHeaderHidden = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const y = event.contentOffset.y;
      const delta = y - lastScrollY.value;
      const measuredHeight = headerHeightValue.value;

      lastScrollY.value = y;

      if (y <= 0) {
        downTravel.value = 0;
        upTravel.value = 0;

        if (isHeaderHidden.value) {
          isHeaderHidden.value = false;
          headerTranslateY.value = withTiming(0, {
            duration: ANIMATION_DURATION,
            easing: Easing.out(Easing.cubic),
          });
        }
        return;
      }

      if (delta > 0) {
        downTravel.value += delta;
        upTravel.value = 0;
      } else if (delta < 0) {
        upTravel.value -= delta;
        downTravel.value = 0;
      }

      if (measuredHeight <= 0) {
        return;
      }

      if (
        downTravel.value >= HIDE_DISTANCE &&
        y > measuredHeight &&
        !isHeaderHidden.value
      ) {
        isHeaderHidden.value = true;
        downTravel.value = 0;
        upTravel.value = 0;
        headerTranslateY.value = withTiming(-measuredHeight, {
          duration: ANIMATION_DURATION,
          easing: Easing.out(Easing.cubic),
        });
        return;
      }

      if (upTravel.value >= SHOW_DISTANCE && isHeaderHidden.value) {
        isHeaderHidden.value = false;
        downTravel.value = 0;
        upTravel.value = 0;
        headerTranslateY.value = withTiming(0, {
          duration: ANIMATION_DURATION,
          easing: Easing.out(Easing.cubic),
        });
      }
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerTranslateY.value }],
  }));

  return (
    <SafeAreaView
      className="flex-1 bg-slate-50 dark:bg-slate-950"
      edges={["top"]}
    >
      <View style={styles.screen}>
        <Animated.View
          onLayout={(event) => {
            const height = event.nativeEvent.layout.height;
            if (height > 0 && height !== headerHeight) {
              headerHeightValue.value = height;
              setHeaderHeight(height);
            }
          }}
          style={[
            styles.header,
            { backgroundColor: colors.background },
            headerAnimatedStyle,
          ]}
        >
          <CategoriesCreateHeader />
        </Animated.View>

        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          style={[styles.scroll, { marginTop: -headerHeight }]}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16,
            paddingTop: headerHeight + 16,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets
        >
          <CategoriesCreateAllocation />
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    overflow: "hidden",
  },
  header: {
    zIndex: 10,
  },
  scroll: {
    flex: 1,
  },
});

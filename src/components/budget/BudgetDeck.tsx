import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { useBudgets, type Budget } from "../../context/BudgetContext";
import { useTheme } from "../../context/ThemeContext";
import AddBudgetCard from "./AddBudgetCard";
import BudgetEmptyState from "./BudgetEmptyState";
import BudgetOverviewCard from "./BudgetOverviewCard";
import InlineBudgetForm from "./InlineBudgetForm";

type DeckItem =
  | { key: string; type: "budget"; budget: Budget }
  | { key: string; type: "add" };

type FormState = { mode: "create" } | { mode: "edit"; budget: Budget } | null;

const MAX_VISIBLE_RANKS = 3;

const ENTRANCE_START = { y: 20, scale: 0.96, opacity: 0.6 };

const LANDING_DURATION = 180;
const RETREAT_DURATION = 160;

interface DeckCardProps {
  rank: number;
  canPan: boolean;
  atStart: boolean;
  atEnd: boolean;
  onSwiped: (direction: 1 | -1) => void;
  onDragPhase: (phase: -1 | 1 | null) => void;
  dragX: SharedValue<number>;
  dragDir: SharedValue<number>;
  zIndex: number;
  cardHeight: number | null;
  onMeasure?: (height: number) => void;
  isAbsolute: boolean;
  animateEntrance?: boolean;
  children: ReactNode;
}

function DeckCard({
  rank,
  canPan,
  atStart,
  atEnd,
  onSwiped,
  onDragPhase,
  dragX,
  dragDir,
  zIndex,
  cardHeight,
  onMeasure,
  isAbsolute,
  animateEntrance = false,
  children,
}: DeckCardProps) {
  const { width } = useWindowDimensions();
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const committing = useSharedValue(false);
  const previousRankRef = useRef(rank);
  const isFirstRunRef = useRef(true);

  useEffect(() => {
    const previousRank = previousRankRef.current;
    previousRankRef.current = rank;

    if (isFirstRunRef.current) {
      isFirstRunRef.current = false;
      if (animateEntrance && rank === 0) {
        translateY.value = ENTRANCE_START.y;
        scale.value = ENTRANCE_START.scale;
        opacity.value = ENTRANCE_START.opacity;
        translateY.value = withTiming(0, { duration: 280 });
        scale.value = withTiming(1, { duration: 280 });
        opacity.value = withTiming(1, { duration: 280 });
      }
      return;
    }

    if (rank !== previousRank) {
      committing.value = false;
      dragX.value = 0;
      dragDir.value = 0;
    }
  }, [
    rank,
    animateEntrance,
    committing,
    dragX,
    dragDir,
    translateY,
    scale,
    opacity,
  ]);

  const handleSwiped = useCallback(
    (direction: 1 | -1) => {
      onSwiped(direction);
    },
    [onSwiped],
  );

  const pan = Gesture.Pan()
    .enabled(canPan)
    .activeOffsetX([-12, 12])
    .failOffsetY([-16, 16])
    .onUpdate((event) => {
      if (committing.value) {
        return;
      }

      const headingNext = event.translationX < 0;
      const blocked = headingNext ? atEnd : atStart;

      if (blocked) {
        return;
      }

      const direction: 1 | -1 = headingNext ? -1 : 1;

      if (dragDir.value !== direction) {
        dragDir.value = direction;
        runOnJS(onDragPhase)(direction === 1 ? 1 : null);
      }

      dragX.value = event.translationX;
    })
    .onEnd((event) => {
      if (committing.value) {
        return;
      }

      const passedThreshold =
        Math.abs(event.translationX) > width * 0.25 ||
        Math.abs(event.velocityX) > 600;

      const headingNext = event.translationX < 0;
      const blocked = headingNext ? atEnd : atStart;

      if (blocked || !passedThreshold) {
        if (dragX.value !== 0) {
          dragX.value = withTiming(
            0,
            { duration: RETREAT_DURATION },
            (finished) => {
              if (finished) {
                dragDir.value = 0;
                runOnJS(onDragPhase)(null);
              }
            },
          );
        }
        return;
      }

      const direction: 1 | -1 = headingNext ? -1 : 1;

      committing.value = true;
      dragX.value = withTiming(
        direction * width,
        { duration: LANDING_DURATION },
        (finished) => {
          if (finished) {
            runOnJS(handleSwiped)(direction);
          } else {
            committing.value = false;
            dragX.value = withTiming(
              0,
              { duration: RETREAT_DURATION },
              (retreatFinished) => {
                if (retreatFinished) {
                  dragDir.value = 0;
                  runOnJS(onDragPhase)(null);
                }
              },
            );
          }
        },
      );
    })
    .onFinalize((_event, success) => {
      if (success || committing.value) {
        return;
      }

      dragX.value = withTiming(
        0,
        { duration: RETREAT_DURATION },
        (finished) => {
          if (finished) {
            dragDir.value = 0;
            runOnJS(onDragPhase)(null);
          }
        },
      );
    });

  const animatedStyle = useAnimatedStyle(() => {
    let cardTranslateX = 0;

    if (rank === -1) {
      cardTranslateX =
        dragDir.value === 1
          ? Math.min(0, -width + Math.abs(dragX.value))
          : -width;
    } else if (dragDir.value === -1 && rank === 0) {
      cardTranslateX = Math.max(-width, dragX.value);
    }

    return {
      transform: [
        { translateX: cardTranslateX },
        { translateY: translateY.value },
        { scale: scale.value },
        {
          rotate: `${interpolate(
            cardTranslateX,
            [-width, 0, width],
            [-6, 0, 6],
          )}deg`,
        },
      ],
      opacity: opacity.value,
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          styles.deckCard,
          isAbsolute ? styles.deckCardAbsolute : null,
          cardHeight ? { height: cardHeight } : null,
          {
            zIndex,
            pointerEvents: rank === 0 ? "auto" : "none",
          },
          animatedStyle,
        ]}
        onLayout={
          onMeasure
            ? (event) => onMeasure(event.nativeEvent.layout.height)
            : undefined
        }
      >
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

export default function BudgetDeck() {
  const { budgets, isLoading } = useBudgets();
  const { colors } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardHeight, setCardHeight] = useState<number | null>(null);
  const [formState, setFormState] = useState<FormState>(null);
  const [dragPhase, setDragPhase] = useState<-1 | 1 | null>(null);

  const dragX = useSharedValue(0);
  const dragDir = useSharedValue(0);

  const items = useMemo<DeckItem[]>(
    () => [
      ...budgets.map((budget): DeckItem => ({
        key: `budget-${budget.id}`,
        type: "budget",
        budget,
      })),
      { key: "add-budget", type: "add" },
    ],
    [budgets],
  );
  const itemCount = items.length;

  const activeIndexRef = useRef(activeIndex);
  const itemsRef = useRef(items);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const lastFirstBudgetIdRef = useRef<number | null>(null);
  const hasInitializedRef = useRef(false);
  const [entranceBudgetId, setEntranceBudgetId] = useState<number | null>(null);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const firstBudgetId = budgets[0]?.id ?? null;

    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      lastFirstBudgetIdRef.current = firstBudgetId;
      return;
    }

    if (firstBudgetId !== lastFirstBudgetIdRef.current) {
      lastFirstBudgetIdRef.current = firstBudgetId;
      setEntranceBudgetId(firstBudgetId);
      setActiveIndex(0);
      return;
    }

    setActiveIndex((index) => Math.min(index, Math.max(itemCount - 1, 0)));
  }, [budgets, itemCount, isLoading]);

  const frontItem = items[activeIndex];
  const activeForm =
    formState === null ||
    (frontItem !== undefined &&
      (formState.mode === "create"
        ? frontItem.type === "add"
        : frontItem.type === "budget" &&
          frontItem.budget.id === formState.budget.id))
      ? formState
      : null;

  const handleSwiped = useCallback((direction: 1 | -1) => {
    const index = activeIndexRef.current;
    const currentItems = itemsRef.current;
    const nextIndex = Math.max(
      0,
      Math.min(currentItems.length - 1, index - direction),
    );
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    setDragPhase(null);
    setFormState(null);
  }, []);

  if (isLoading) {
    return (
      <View className="items-center justify-center py-16">
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (budgets.length === 0) {
    if (activeForm?.mode === "create") {
      return (
        <InlineBudgetForm
          mode="create"
          onCancel={() => setFormState(null)}
          onSaved={() => setFormState(null)}
        />
      );
    }
    return (
      <BudgetEmptyState onCreate={() => setFormState({ mode: "create" })} />
    );
  }

  const visibleRanks = Math.min(MAX_VISIBLE_RANKS, itemCount - activeIndex);
  const rankedCards = [
    ...(activeIndex > 0 ? [{ rank: -1, item: items[activeIndex - 1] }] : []),
    ...Array.from({ length: visibleRanks }, (_, rank) => ({
      rank,
      item: items[activeIndex + rank],
    })),
  ];
  const incomingRank = dragPhase === 1 ? -1 : null;
  const zIndexFor = (rank: number) => {
    if (incomingRank !== null && rank === incomingRank) {
      return MAX_VISIBLE_RANKS + 1;
    }
    return rank === -1 ? 0 : MAX_VISIBLE_RANKS - rank;
  };
  const atStart = activeIndex === 0;
  const atEnd = activeIndex === itemCount - 1;

  function renderCardContent(item: DeckItem, rank: number) {
    if (item.type === "add") {
      if (activeForm?.mode === "create" && rank === 0) {
        return (
          <InlineBudgetForm
            mode="create"
            onCancel={() => setFormState(null)}
            onSaved={() => setFormState(null)}
          />
        );
      }
      return <AddBudgetCard onPress={() => setFormState({ mode: "create" })} />;
    }

    if (
      activeForm?.mode === "edit" &&
      activeForm.budget.id === item.budget.id &&
      rank === 0
    ) {
      return (
        <InlineBudgetForm
          mode="edit"
          initialBudget={item.budget}
          onCancel={() => setFormState(null)}
          onSaved={() => setFormState(null)}
        />
      );
    }

    return (
      <BudgetOverviewCard
        budget={item.budget}
        onEdit={() => setFormState({ mode: "edit", budget: item.budget })}
      />
    );
  }

  return (
    <View>
      <View className="relative">
        {rankedCards
          .slice()
          .sort((a, b) => zIndexFor(a.rank) - zIndexFor(b.rank))
          .map(({ rank, item }) => (
            <DeckCard
              key={item.key}
              rank={rank}
              canPan={rank === 0 && activeForm === null}
              atStart={atStart}
              atEnd={atEnd}
              onSwiped={handleSwiped}
              onDragPhase={setDragPhase}
              dragX={dragX}
              dragDir={dragDir}
              zIndex={zIndexFor(rank)}
              cardHeight={cardHeight}
              onMeasure={
                item.type === "budget" && cardHeight === null
                  ? (height) => {
                      if (height > 0) {
                        setCardHeight(height);
                      }
                    }
                  : undefined
              }
              isAbsolute={rank !== 0}
              animateEntrance={
                item.type === "budget" && item.budget.id === entranceBudgetId
              }
            >
              {renderCardContent(item, rank)}
            </DeckCard>
          ))}
      </View>

      <View className="flex-row justify-center items-center mt-6">
        {items.map((item, index) => (
          <View
            key={item.key}
            className={
              index === activeIndex
                ? "w-6 h-2 rounded-full bg-primary-accent mx-1"
                : "w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 mx-1"
            }
          />
        ))}
      </View>

      <Text className="text-[11px] text-slate-400 dark:text-slate-500 font-medium text-center mt-2.5">
        I-swipe pakaliwa para sa susunod, pakanan para sa nauna
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  deckCard: {
    width: "100%",
  },
  deckCardAbsolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});

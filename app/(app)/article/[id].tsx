import { Typography } from "@/components/ui/Typography";
import { COLOR } from "@/constants/color";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { Fragment, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useMarkdown } from "react-native-marked";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Demo markdown content until the API is provided
  const markdown = useMemo(
    () =>
      `# Кофемашина vs джуниор\n\nЮмористический гайд-исповедь с лайфхаками, закулисными историями и мемами.\n\n---\n\n## Подготовка: Вода, зёрна и никакой магии\n\n### Шаг 1: Водные процедуры\n- Снимите резервуар (это слева, да, там где нарисована капля).\n- Налейте воды до отметки \'max\'.\n\nНельзя: газировку, чай, энергетики.\nМожно: слёзы недодеплоенных проектов.\n\n### Шаг 2: Кофейный алхимик\nОткройте контейнер и засыпьте свежие зёрна среднего обжаривания.\n\n## Включение: Как пережить «загрузку»\nНажмите кнопку питания. Время прогрева: ~2 минуты.\n\n## Чрезвычайные ситуации\n- Мигают все лампочки — перезапустите.\n- Зёрна закончились — найдите коллегу, который пьёт чай.\n\n---\n\n### Авторы\n- Максим Антонов — Тимлид\n- Анна Захарова — Дизайнер\n`,
    [],
  );

  const elements = useMarkdown(markdown, {});

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      {/* <AvatarHeaderScrollView
        contentContainerStyle={{ backgroundColor: "#F7F7F7" }}
        containerStyle={{ flex: 1 }}
        backgroundColor={"#F7F7F7"}
        showsVerticalScrollIndicator={false}
        renderHeader={() => (
          <View style={{ backgroundColor: "#FF9B34" }}>
            <View
              style={{ paddingHorizontal: 16, paddingVertical: 16, gap: 16 }}
            >
              <Typography variant="semi-bold" size={24} color="grey">
                Кофемашина vs джуниор
              </Typography>
              <Typography variant="medium" size={16} color="grey">
                Юмористический гайд-исповедь с лайфхаками, закулисными историями
                и мемами.
              </Typography>
            </View>
            <View
              style={{
                paddingTop: 16,
                height: 24,
                backgroundColor: "#F7F7F7",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
              }}
            />
          </View>
        )}
        renderHeaderBar={() => null}
      > */}
      <ScrollView style={{ backgroundColor: "#FF9B34" }}>
        <View style={{ backgroundColor: "#FF9B34" }}>
          <View style={{ paddingHorizontal: 16, paddingVertical: 16, gap: 16 }}>
            <Typography variant="semi-bold" size={24} color="grey">
              Кофемашина vs джуниор
            </Typography>
            <Typography variant="medium" size={16} color="grey">
              Юмористический гайд-исповедь с лайфхаками, закулисными историями и
              мемами.
            </Typography>
          </View>
          <View
            style={{
              paddingTop: 16,
              height: 24,
              backgroundColor: "#F7F7F7",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 24,
            backgroundColor: "#F7F7F7",
          }}
        >
          {elements.map((element, index) => (
            <Fragment key={`md_${index}`}>{element}</Fragment>
          ))}
        </View>
      </ScrollView>

      {/* </AvatarHeaderScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR.Background_Light },
});

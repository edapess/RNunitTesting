import { useCheckboxedStyles } from "@/components/Checkboxed/Checkboxed.styles";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FC } from "react";
import { Pressable, View } from "react-native";

type TCheckboxed = {
  selected: boolean;
  onPress: () => void;
  content: string;
  testID: string;
};

export const Checkboxed: FC<TCheckboxed> = ({
  selected,
  content,
  onPress,
  testID,
}) => {
  console.log("🚀 -> testID->", testID);
  const styles = useCheckboxedStyles();
  return (
    <ThemedView style={styles.container}>
      <Pressable testID={testID} onPress={onPress} style={styles.pressable}>
        <View style={[styles.checkBox, selected && styles.selectedCheckbox]} />
        <ThemedText style={styles.content}>{content}</ThemedText>
      </Pressable>
    </ThemedView>
  );
};

import { FC } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Pressable, View } from "react-native";
import { useCheckboxedStyles } from "@/components/Checkboxed/Checkboxed.styles";

type TCheckboxed = {
  selected: boolean;
  onPress: () => void;
  content: string;
};

export const Checkboxed: FC<TCheckboxed> = ({ selected, content, onPress }) => {
  const styles = useCheckboxedStyles();
  return (
    <ThemedView style={styles.container}>
      <Pressable onPress={onPress} style={styles.pressable}>
        <View style={[styles.checkBox, selected && styles.selectedCheckbox]} />
        <ThemedText style={styles.content}>{content}</ThemedText>
      </Pressable>
    </ThemedView>
  );
};

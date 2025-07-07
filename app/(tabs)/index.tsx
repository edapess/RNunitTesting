import {
  View
} from "react-native";


import { TodosList } from "../features";
import { useHomeScreenStyles } from "./styles";


export default function HomeScreen() {
const syles = useHomeScreenStyles()
  return (
    <View
      style={syles.container}
    >
     <TodosList />
    </View>
  );
}

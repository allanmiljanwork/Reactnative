import { Pressable, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

function Iconbutton({ icon, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      {typeof icon === "string" ? (
        <AntDesign name={icon} size={24} color={color} />
      ) : (
        icon
      )}
    </Pressable>
  );
}

export default Iconbutton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});

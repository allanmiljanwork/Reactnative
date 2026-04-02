import { View, StyleSheet, Button, Alert } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import { Colors } from "../../constants/colors";

function LocationPicker() {
  const [locationPerms, requestPerms] = useForegroundPermissions();

  async function verifyPermissions() {
    if (locationPerms.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPerms();

      return permissionResponse.granted;
    }

    if (locationPerms.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app.",
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPerms = await verifyPermissions();

    if (!hasPerms) {
      return;
    }

    const location = await getCurrentPositionAsync();
    console.log(location);
  }

  function pickOnMapHandler() {}

  return (
    <View>
      <View style={styles.mapPreview}></View>
      <View style={styles.actions}>
        <Button title="user location" onPress={getLocationHandler}>
          Locate User
        </Button>
        <Button title="map" onPress={pickOnMapHandler}>
          Pick on Map
        </Button>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

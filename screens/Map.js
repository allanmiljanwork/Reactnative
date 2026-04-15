import { useState, useCallback, useLayoutEffect } from "react";
import { StyleSheet, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";

function Map({ navigation }) {
  const [selectLocation, setSelectLocation] = useState();
  const region = {};

  function selectLocationHandler(event) {
    console.log(event);
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location (by tapping the screen) first!",
      );
      return;
    }

    navigation.navigate("addPlace", {
      pickedLat: selectLocation.lat,
      pickedLng: selectLocation.lng,
    });
  }, [navigation, selectLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <Button
          title="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectLocation.lat,
            longitude: selectLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

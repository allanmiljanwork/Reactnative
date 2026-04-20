import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
    };
  },
});

export default function App() {
  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("NOTIFICATION RECEIVED");
        console.log(notification);
        const userName = notification.request.content.data.userName;
        console.log(userName);
      },
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("NOTIFICATION RESPONSE RECEIVED");
        console.log(response);
        const userName = response.notification.request.content.data.userName;
        console.log(userName);
      },
    );

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  function scheduleNotificationHandler() {
    const d = Date.now();
    const date = d + 1000 * 5;

    Notifications.scheduleNotificationAsync({
      content: {
        title: "first notif",
        body: "body text",
        data: { userName: "Allan" },
      },
      trigger: {
        date: new Date(date),
        type: Notifications.SchedulableTriggerInputTypes.DATE,
      },
    });
  }

  return (
    <View style={styles.container}>
      <Button
        title="Schedule Notification"
        onPress={scheduleNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

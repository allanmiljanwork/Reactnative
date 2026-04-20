this section of React Native - The Practical Guide utilize a developement build of android env.

it uses Expo GO resources meaning you need to create an expo go account to access EAS.

after running eas build --platform android --profile development or expo start, you can send a scheduled notification, or a push notification when you hard code your token to see it working.

to send push notifications use "https://expo.dev/notifications"

note to send a push notification you need to access a REAL handheld device inorder to generate ExponentPushToken. Local notifications work on an emulator.

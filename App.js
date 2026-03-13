import { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameOver, setGameOver]  = useState(true);

  function pickNumberHandler(pickNumber) {
    setUserNumber(pickNumber);
    setGameOver(false);
  }

  function gameOverHandler() {
    setGameOver(true);
  }

  let screen = <StartGameScreen onConfirmNumber={pickNumberHandler} />;

  if (userNumber) {
    screen = (<GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  );
  }

  if (gameOver && userNumber) {
    screen = <GameOverScreen/>
  }

  return (
    <LinearGradient colors={['indigo', 'gold']} style={styles.rootScreen}>
      <ImageBackground source={require('./assets/images/dice.jpg')} resizeMode="cover" style={styles.rootScreen} imageStyle={styles.backgroundImage}>
      <SafeAreaView style={styles.rootScreen}>
        {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.35
  }
});

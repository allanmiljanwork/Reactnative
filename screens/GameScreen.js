import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

function generateRandomNum(min, max, exclude) {
    const randomNum = Math.floor(Math.random() * (max - min)) + min;

    if (randomNum === exclude) {
        return generateRandomNum(min, max, exclude);
    } else {
        return randomNum
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
    const initalGuess = generateRandomNum(1, 100, userNumber);

    const [currentGuess, setCurrentGuess] = useState(initalGuess);

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver();
        }
    }, [currentGuess, userNumber, onGameOver]);

    function nextGuessHandler(direction) {
        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'higher' && currentGuess > userNumber)
        ) {
            Alert.alert("Dont lie!", [
                { text: 'Oops', style: 'cancel' },
            ]);
            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        const newRandomNum = generateRandomNum(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRandomNum);
    }

    return (<View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View>
            <Text>High or low</Text>
            <View>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>+</PrimaryButton>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
            </View>
            <View>
            </View>
        </View>
    </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
});
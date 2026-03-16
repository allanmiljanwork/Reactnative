import { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text, FlatList } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogitem";


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
    const [guessRounds, setGuessRounds] = useState([initalGuess]);

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    function nextGuessHandler(direction) {
        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'higher' && currentGuess > userNumber)
        ) {
            Alert.alert("Dont lie!", [
                { InstructionText: 'Oops', style: 'cancel' },
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
        setGuessRounds(prevGuessRounds => [newRandomNum, ...prevGuessRounds]);
    }

    const guessRoundsLength = guessRounds.length;

    return (<View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
                        <AntDesign name="arrow-up" size={24} color="white" />
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <AntDesign name="arrow-down" size={24} color="white" />
                    </PrimaryButton>
                </View>
            </View>
            <View>
            </View>
        </Card>
        <View style={styles.listContainer}>
            <FlatList data={guessRounds}
                renderItem={(itemData) => (<GuessLogItem roundNumber={guessRoundsLength - itemData.index} guess={itemData.item} />)}
                keyExtractor={(item) => item}
            />
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
    instructionText: {
        marginBottom: 12,
    },
    buttonContainer: {
        flex: 1,
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
});
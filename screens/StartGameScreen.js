import { useState } from 'react';
import { TextInput, View, StyleSheet, Alert } from 'react-native';

import PrimaryButton from '../components/PrimaryButton';

function StartGameScreen() {
    const [enterNumber, setEnterNumber] = useState('');

    function numberInputHandler(enteredText) {
        setEnterNumber(enteredText);
    };

    function resetInputHandler() {
        setEnterNumber('');
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enterNumber);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            console.log('Invalid number entered:', enterNumber); Alert.alert('Invalid num', 'Num has to be between 1 and 99', [{
                text: 'Okay', style: 'destructive', onPress: resetInputHandler
            }]);
            return;
        }

        console.log('valid number');
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.numberInput} maxLength={2} keyboardType="number-pad" autoCapitalize='none' autoCorrect={false} onChange={numberInputHandler} value={enterNumber} />
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                </View>
            </View>
        </View>
    );
}

export default StartGameScreen;

const styles = StyleSheet.create(
    {
        inputContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
            marginTop: 100,
            marginHorizontal: 24,
            borderRadius: 8,
            backgroundColor: 'indigo',
            elevation: 4,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            shadowOpacity: 0.25,
        },
        numberInput: {
            width: 50,
            height: 50,
            fontSize: 32,
            borderBottomColor: 'yellow',
            borderBottomWidth: 2,
            color: 'yellow',
            marginVertical: 8,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        buttonsContainer: {
            flexDirection: 'row',
        },
        buttonContainer: {
            flex: 1
        }
    }
);
import { TextInput, View, StyleSheet } from 'react-native';

import PrimaryButton from '../components/PrimaryButton';

function StartGameScreen() {
    return (
        <View style={styles.inputContainer}>
            <TextInput /> Inputs

            <PrimaryButton>Reset</PrimaryButton>
        </View>
    );
}

export default StartGameScreen;

const styles = StyleSheet.create(
    {
        inputContainer: {
            padding: 16,
            marginTop: 100,
            marginHorizontal: 24,
            borderRadius: 8,
            backgroundColor: 'purple',
            elevation: 4,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            shadowOpacity: 0,25
        }
    }
);
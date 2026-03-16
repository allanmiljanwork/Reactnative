import { View, Text, StyleSheet, Dimensions } from "react-native";

function NumberContainer ({children}) {
    return (
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    );
}

export default NumberContainer;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: 'gold',
        padding: deviceWidth < 380 ? 12 : 14,
        margin: deviceWidth < 380 ? 12 : 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    numberText: {
        color: 'gold',
        fontSize: deviceWidth < 380 ? 28 : 36,
        fontFamily: 'open-sans-bold',
    }
});
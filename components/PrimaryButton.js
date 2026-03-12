import { View, Text, Pressable, StyleSheet } from 'react-native';

function PrimaryButton(props) {
    return (
        <Pressable>
        <View style={styles.container}>
            <Text>{props.children}</Text>
        </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'purple',
        borderRadius: 28,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 4,
        elevation: 2,    
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    }
});

export default PrimaryButton;
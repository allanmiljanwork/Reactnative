import { StyleSheet, View, Text, Pressable } from 'react-native';

function GoalItem(props) {
    return (
        <Pressable onPress={props.onDelete.bind(this, props.id)}>
        <View style={styles.goalInput}>
                        <Text style={styles.goalText}>{props.text}</Text>
                      </View>
                      </Pressable>
    );
}

export default GoalItem;

const styles = StyleSheet.create({
    goalInput: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },
  goalText: {
    color: 'white',
  }
});
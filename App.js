import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [ModalVisible, SetModal] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startGoalHandler() {
    SetModal(true);
  };

  function closeGoalHandler() {
    SetModal(false);
  };

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    closeGoalHandler();
  }

  function deleteGoal(id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id ==! id);
    });
  } 

  return (
    <View style={styles.appContainer}>
      <Button title="Add new Goal" color="purple" onPress={startGoalHandler} />
      <GoalInput visible={ModalVisible} onAddGoal={addGoalHandler} onCancel={closeGoalHandler} />
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => {
            return <GoalItem text={itemData.item.text} id={itemData.item.id} onDelete={deleteGoal} />;
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
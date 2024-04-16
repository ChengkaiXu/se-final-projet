import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), name: task, completed: false }]);
      setTask('');
    }
  };

  const toggleTaskCompletion = id => {
    setTasks(
        tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        )
    );
  };

  const renderItem = ({ item }) => (
      <TouchableOpacity
          style={[styles.taskItem, item.completed && styles.completedTask]}
          onPress={() => toggleTaskCompletion(item.id)}
      >
        <Text style={styles.taskText}>{item.name}</Text>
      </TouchableOpacity>
  );

  return (
      <View style={styles.container}>
        <TextInput
            style={styles.taskInput}
            placeholder="Add a new task"
            value={task}
            onChangeText={setTask}
            onSubmitEditing={handleAddTask}
        />
        <Button title="Add Task" onPress={handleAddTask} />

        <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  taskInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  taskItem: {
    padding: 10,
    marginTop: 10,
    backgroundColor: 'lightgrey',
    borderColor: 'black',
    borderWidth: 1,
  },
  completedTask: {
    backgroundColor: 'lightgreen',
  },
  taskText: {
    fontSize: 18,
  },
});

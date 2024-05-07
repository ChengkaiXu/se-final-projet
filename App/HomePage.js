import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';

const HomePage = ({ navigation }) => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        setCurrentDate(new Date());
    }, []);

    const handleAddTask = () => {
        if (task.trim()) {
            const dateKey = currentDate.toISOString().split('T')[0];
            const newTask = { id: Date.now().toString(), name: task, completed: false, date: dateKey };
            setTasks([...tasks, newTask]);
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
        <View style={styles.taskItem}>
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => toggleTaskCompletion(item.id)}
            >
                <Text style={styles.taskText}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.expandButton}
                onPress={() => navigation.navigate('TaskDetails', { taskId: item.id })}
            >
                <Text style={styles.expandButtonText}>Expand</Text>
            </TouchableOpacity>
        </View>
    );

    const adjustDay = (days) => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + days);
        setCurrentDate(newDate);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.dateHeader}>
                <TouchableOpacity style={styles.button} onPress={() => adjustDay(-1)}>
                    <Text style={styles.buttonText}>Previous Day</Text>
                </TouchableOpacity>
                <Text style={styles.dateHeader}>{currentDate.toDateString()}</Text>
                <TouchableOpacity style={styles.button} onPress={() => adjustDay(1)}>
                    <Text style={styles.buttonText}>Next Day</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.taskInput}
                placeholder="Add a new task"
                placeholderTextColor="#ccc"
                value={task}
                onChangeText={setTask}
                onSubmitEditing={handleAddTask}
            />
            <FlatList
                data={tasks.filter(task => task.date === currentDate.toISOString().split('T')[0])}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <View style={styles.tabBar}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Search')}>
                    <Text style={styles.buttonText}>Go to Search</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: 'black',
    },
    dateHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:'space-between',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
        fontFamily: 'Helvetica Neue',
        textAlign: 'center',
        paddingVertical: 10,
        backgroundColor: '#333',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '66%',
        alignSelf: 'center',
    },
    taskInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'white',
        backgroundColor: '#333333',
        fontFamily: 'Helvetica Neue',
        width: '66%',
        alignSelf: 'center',
    },
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 10,
        backgroundColor: '#222',
        borderColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
        fontFamily: 'Helvetica Neue',
        width: '66%',
        alignSelf: 'center',
    },
    taskText: {
        fontSize: 18,
        color: 'white',
        flex: 1,
        fontFamily: 'Helvetica Neue',
    },
    expandButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        fontFamily: 'Helvetica Neue',
    },
    expandButtonText: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Helvetica Neue',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
        fontFamily: 'Helvetica Neue',
        alignSelf: 'center',
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 10,
        fontFamily: 'Helvetica Neue',
        minWidth: 100,
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Helvetica Neue',
    }
});



export default HomePage;

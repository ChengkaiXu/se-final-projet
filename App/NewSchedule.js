import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {days} from './WeeklySchedule'
import {Input} from "react-native-elements";
import {useContext, useState} from "react";
import {SchedulesDispatchContext} from "../App";

export default function NewSchedule({ navigation }) {
    const [tasks, setTasks] = useState(Array(days.length).fill([]))
    const [name, setName] = useState('New Schedule')
    const dispatch = useContext(SchedulesDispatchContext);

    let addTask = (day, name) => {
        let newTasks = [...tasks];
        newTasks[day] = [...newTasks[day], {name: name}]
        setTasks(newTasks)
    }

    let create = () => {
        dispatch({
            type: 'add_schedule',
            schedule: {
                name: name,
                tasks: tasks
            }
        })
        navigation.goBack()
    }

    return (
        <ScrollView contentContainerStyle={styles.view}>
        <Input style={styles.input} value={name} onChangeText={setName} placeholder={"Schedule Name"}></Input>
        <TouchableOpacity style={styles.button} onPress={create}><Text>Create</Text></TouchableOpacity>
        {tasks.map((_, i) => <DaySchedule key={i} day={i} tasks={tasks[i]} addTask={(name) => addTask(i, name)}/>)}
    </ScrollView>);
}

const DaySchedule = ({ day, tasks, addTask }) => {
    const [task, setTask] = useState('')

    let add = () => {
        addTask(task);
        setTask('')
    }

    return (
        <View style={styles.container} >
            <Text style={styles.dayHeader}>{days[day]}</Text>
            <FlatList style={styles.list} data={tasks} renderItem={item => <Text style={styles.taskText} >• {item.item.name}</Text>}/>
            <Input style={styles.input} value={task} onChangeText={setTask} placeholder={"Add task..."} onSubmitEditing={add}></Input>
        </View>
    );
}


const styles = StyleSheet.create({
    view: {
        backgroundColor: '#000',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000',
    },
    dayHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#444',
    },
    list: {
        flexGrow: 0,
        maxHeight: 600,
        backgroundColor: '#222',
        borderColor: '#555',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        minHeight: 100,
    },
    taskText: {
        color: '#ccc',
        fontSize: 16,
        padding: 1,
        marginLeft: 10,
    },
    input: {
        color: '#fff',
        borderColor: '#555',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#333',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    }
});
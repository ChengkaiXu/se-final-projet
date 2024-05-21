import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
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
        <View>
        <Input value={name} onChangeText={setName} placeholder={"Schedule Name"}></Input>
        <TouchableOpacity style={styles.button} onPress={create}><Text>Create</Text></TouchableOpacity>
        {tasks.map((_, i) => <DaySchedule key={i} day={i} tasks={tasks[i]} addTask={(name) => addTask(i, name)}/>)}
    </View>);
}

const DaySchedule = ({ day, tasks, addTask }) => {
    const [task, setTask] = useState('')

    let add = () => {
        addTask(task);
        setTask('')
    }

    return (
        <View>
            <Text>{days[day]}</Text>
            <Input value={task} onChangeText={setTask} placeholder={"Add task..."} onSubmitEditing={add}></Input>
            <FlatList data={tasks} renderItem={item => <Text>{item.item.name}</Text>}/>
        </View>
    );
}


const styles= StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'black',
    },
    button: {
        backgroundColor: 'gray',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    }
});



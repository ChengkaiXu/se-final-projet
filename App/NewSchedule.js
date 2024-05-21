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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    scheduleContainer: {
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 10,
        backgroundColor: '#222',
        borderColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
        fontFamily: 'Helvetica Neue',
        alignSelf: 'center',
        width: 300
    },
    nameText: {
        fontSize: 24,
        color: 'white',
        flex: 1,
        fontFamily: 'Helvetica Neue',
    },
    taskText: {
        color: 'white',
        flex: 1,
    },
    header: {
        fontSize: 22,
        color: 'white',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        backgroundColor: '#333',
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        minWidth: 200,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    }
});



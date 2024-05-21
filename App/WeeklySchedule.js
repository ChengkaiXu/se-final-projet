import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Button, FlatList, TouchableOpacity} from 'react-native';
import {SchedulesContext, TasksDispatchContext} from "../App";

const WeeklySchedule = ({ navigation }) => {
    const schedules = useContext(SchedulesContext)

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Weekly Schedule</Text>
            <FlatList
                data={schedules}
                renderItem={(item) => <Schedule navigation={navigation} schedule={item.item}/>}
            keyExtractor={(index) => index}/>
            <Button title="New Schedule" onPress={() => navigation.navigate('NewSchedule')} />
        </View>
    );
};

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const Schedule = ({ navigation, schedule }) => {
    const dispatch = useContext(TasksDispatchContext);

    const useSchedule = () => {
        schedule.tasks.forEach((dayTasks, day) => {
           dayTasks.forEach(task => {
               let date = new Date();
               date.setDate(date.getDate() + day - date.getDay())
               dispatch({
                   type: 'add_task',
                   name: task.name,
                   date: date.toISOString().split('T')[0]
               })
           })
        })
        navigation.goBack()
    }

    return (
        <TouchableOpacity onPress={useSchedule}>
        <View style={styles.scheduleContainer}>
            <Text style={styles.nameText}>{schedule.name}</Text>
            {days.map((_, i) => <DayTasks schedule={schedule} day={i}/>)}
        </View>
        </TouchableOpacity>
    )
}

const DayTasks = ({schedule, day}) => {
    if (schedule.tasks[day].length < 1)
        return null;
    return <Text key={day} style={styles.taskText}>
        {days[day] + ": " + schedule.tasks[day].map(task => task.name).join(", ")}
    </Text>
}

const styles = StyleSheet.create({
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

export default WeeklySchedule;

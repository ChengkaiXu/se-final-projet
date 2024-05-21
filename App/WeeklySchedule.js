import React, {useContext} from 'react';
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
        backgroundColor: '#121212',
        padding: 20,
    },
    header: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scheduleContainer: {
        backgroundColor: '#1e1e1e',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
    nameText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500',
    },
    taskText: {
        fontSize: 16,
        color: '#ccc',
        paddingVertical: 2,
    },
    button: {
        backgroundColor: '#007AFF',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
    }
});

export default WeeklySchedule;

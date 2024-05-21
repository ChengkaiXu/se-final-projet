import React, {createContext, useReducer, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './App/HomePage'; // Make sure the path is correct
import SearchPage from './App/SearchPage'; // Make sure the path is correct
import WeeklySchedule from "./App/WeeklySchedule";
import NewSchedule from "./App/NewSchedule";

import {uuid} from "@supabase/supabase-js/src/lib/helpers";

const Stack = createNativeStackNavigator();

function tasksReducer(tasks, action) {
    switch (action.type) {
        case 'add_task': {
            return [...tasks, { id: uuid(), name: action.name, completed: false, date: action.date}]
        }
        case 'toggle_completion': {
            return tasks.map(task => task.id === action.task ? {...task, completed: !task.completed} : task)
        }
    }

    return tasks;
}

function schedulesReducer(schedules, action) {
    switch (action.type) {
        case 'add_schedule': {
            return [...schedules, action.schedule]
        }
    }
}

export default function App() {
    const [tasks, taskDispatch] = useReducer(tasksReducer, [])
    const [schedules, scheduleDispatch] = useReducer(schedulesReducer, [])

    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={taskDispatch}>
                <SchedulesContext.Provider value={schedules}>
                    <SchedulesDispatchContext.Provider value={scheduleDispatch}>
            <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="Search" component={SearchPage} />
                <Stack.Screen name="WeeklySchedule" component={WeeklySchedule} options={{ title: 'Weekly Schedule' }} />
                <Stack.Screen name="NewSchedule" component={NewSchedule} options={{ title: 'New Schedule' }}/>
            </Stack.Navigator>
        </NavigationContainer>
                    </SchedulesDispatchContext.Provider>
                </SchedulesContext.Provider>
        </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    );
}

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
export const SchedulesContext = createContext(null);
export const SchedulesDispatchContext = createContext(null);


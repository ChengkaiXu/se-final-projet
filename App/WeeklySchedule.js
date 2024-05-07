import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const WeeklySchedule = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create Your Weekly Schedule</Text>
            {

            }
            <Button title="Add to Calendar" onPress={() => console.log('Add logic to update calendar')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',  // Dark mode background color
    },
    header: {
        fontSize: 22,
        color: 'white',  // Text color for dark mode
        marginBottom: 20,
    },
    input: {
        width: '80%',
        backgroundColor: '#333',  // Darker input field
        color: 'white',  // Input text color for dark mode
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',  // Typical button color for interactivity
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        minWidth: 200,  // Ensuring the button is visibly wide enough
    },
    buttonText: {
        color: 'white',  // Button text color for contrast
        textAlign: 'center',
        fontSize: 16,
    }
});

export default WeeklySchedule;

import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SearchPage({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Type here to search..."
                placeholderTextColor="#ccc"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <Text style={styles.results}>Searching for: {searchQuery}</Text>
            <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'black',
    },
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        width: '66%',
        color: 'white',
        borderColor: 'gray',
        backgroundColor: '#333',
        position: "absolute",
        top: "20%",
    },
    results: {
        fontSize: 16,
        margin: 20,
        color: 'white',
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 10,
        position: "absolute",
        width: "66%",
        bottom: "20%",
        alignSelf: "center",
    },
    backButton: {
        alignSelf: 'center',
        marginTop: 50,
        width: '50%',
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
    }
});


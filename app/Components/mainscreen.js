import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Alert, FlatList, Keyboard, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TextInput,
    TouchableOpacity, View
} from 'react-native';
import colors from '../config/colors';
import Task from './task';

function Mainscreen(props) {
    const [textInput, setTextInput] = useState("")
    const [todos, setTodos] = useState([])

    useEffect(() => {
        getTodosFromThelocalstorage();
    }, [])

    useEffect(() => {
        saveToDeviceLocalStorage(todos);
    }, [todos])


    // Save all the task to the device:
    const saveToDeviceLocalStorage = async (todos) => {
        try {
            const stringifyTodos = JSON.stringify(todos)
            await AsyncStorage.setItem('todos', stringifyTodos)
        } catch (e) {
            console.log(e)
        }
    }
    // Add task to the list:
    const addTodo = () => {
        if (textInput == "") {
            Alert.alert("Blank Input", "Please write something")
        } else {
            const newTodo = {
                id: Math.random(),
                task: textInput,
                completed: false,
            };
            Keyboard.dismiss();
            setTodos([...todos, newTodo]);
            setTextInput('');
        }
    }

    const getTodosFromThelocalstorage = async () => {
        try {
            const todos = await AsyncStorage.getItem("todos");
            if (todos != null) {
                setTodos(JSON.parse(todos))
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Task can be marked complete:
    const markTodoComplete = (todoId) => {
        const newTodos = todos.map(item => {
            if (item.id == todoId) {
                return { ...item, completed: true }
            } return item
        });
        setTodos(newTodos)
    }

    // Delete single task from the list:
    const deleteTodo = (todoId) => {
        const newTodoLsit = todos.filter(item => item.id != todoId)
        setTodos(newTodoLsit)
    }

    // Clear all the task in one click:
    const clearAllTask = () => {
        Alert.alert("Confrim", "Clear all todos !!", [
            {
                text: "Yes",
                onPress: () => setTodos([]),
            },
            {
                text: "No"
            }
        ])

    }
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={colors.primaryBg}
            />
            <View style={styles.tasksWrapper}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.sectionTitle}>
                        Todays tasks
                    </Text>
                    <TouchableOpacity onPress={clearAllTask} style={styles.clearAllButton}>
                        <Text style={styles.clearAllButton}>Clear all</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.uIDateAndTime}>{new Date().toDateString()}</Text>
                <View style={styles.items}>
                    <FlatList
                        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                        showsVerticalScrollIndicator={false}
                        data={todos}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <Task
                                markTodoComplete={markTodoComplete}
                                todo={item}
                                deleteTodo={deleteTodo}
                            />}
                    />
                </View>
            </View>
            <KeyboardAvoidingView style={styles.writeTaskWrapper}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TextInput style={styles.taskInput}
                    placeholder={"Write a task"}
                    placeholderTextColor={colors.uiTextColor} value={textInput}
                    onChangeText={text => setTextInput(text)} />
                <TouchableOpacity onPress={addTodo}>
                    <View style={styles.taskAddWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBg,
    },
    tasksWrapper: {
        paddingTop: 60,
        paddingHorizontal: 20,
        fontSize: 20,
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
    },
    sectionTitle: {
        fontSize: 26,
        color: colors.uiTextColor,
        fontWeight: "bold",
    },
    clearAllButton: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.uiTextColor,
    },
    uIDateAndTime: {
        fontSize: 14,
        paddingHorizontal: 5,
        color: colors.uiTextColor,

    },
    items: {
        marginTop: 30,
        borderRadius: 10,
    },
    writeTaskWrapper: {
        position: "absolute",
        bottom: 30,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 20
    },
    taskInput: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: "#fff",
        borderRadius: 60,
        width: 250,
        color: colors.uiTextColor,
        backgroundColor: colors.taskInputBg,
    },
    taskAddWrapper: {
        width: 50,
        height: 50,
        backgroundColor: colors.taskAddBtnBg,
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    addText: {
        fontSize: 25,
        color: colors.taskAddtextColor
    },
});

export default Mainscreen;
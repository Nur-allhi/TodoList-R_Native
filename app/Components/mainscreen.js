import React, { useState } from 'react';
import {
    Alert, FlatList, Keyboard, KeyboardAvoidingView, Platform,
    StyleSheet, Text, TextInput,
    TouchableOpacity, View
} from 'react-native';
import colors from '../config/colors';
import Task from './task';

function Mainscreen(props) {
    // const [task, setTask] = useState();
    // const [taskItems, setTaskItems] = useState([])

    const [textInput, setTextInput] = useState("")
    const [todos, setTodos] = useState([])

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

    const markTodoComplete = (todoId) => {
        const newTodos = todos.map(item => {
            if (item.id == todoId) {
                return { ...item, completed: true }
            }
            return item
        });
        setTodos(newTodos)
    }

    const deleteTodo = (todoId) => {
        const newTodoLsit = todos.filter(item => item.id != todoId)
        setTodos(newTodoLsit)
    }

    return (
        <View style={styles.container}>
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>
                    Todays tasks
                </Text>
                <View style={styles.items}>
                    <FlatList
                        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                        showsVerticalScrollIndicator={false}
                        data={todos}
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
                    placeholder={"Write a task"} value={textInput}
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
        paddingTop: 80,
        paddingHorizontal: 20,
        fontSize: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    items: {
        marginTop: 30,
    },
    writeTaskWrapper: {
        position: "absolute",
        bottom: 30,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    taskInput: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: "#fff",
        borderRadius: 60,
        borderColor: "#C0C0C0",
        borderWidth: 1,
        width: 250,
    },
    taskAddWrapper: {
        width: 60,
        height: 60,
        backgroundColor: "#fff",
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    addText: {
        fontSize: 25,
    },
});

export default Mainscreen;
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../config/colors';
import Task from './task';

function Mainscreen(props) {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([])


    const handleAddTask = () => {
        Keyboard.dismiss();
        console.log("🚀 ~ file: mainscreen.js ~ line 8 ~ Mainscreen ~ task", task)
        setTaskItems([...taskItems, task])
        setTask(null);
    }


    const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1)
        setTaskItems(itemsCopy);
    }

    return (
        <View style={styles.container}>
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>
                    Todays tasks
                </Text>
                <View style={styles.items}>
                    {
                        taskItems.map((item, index) =>
                            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                                <Task text={item} />
                            </TouchableOpacity>

                        )
                    }
                </View>
            </View>
            <KeyboardAvoidingView style={styles.writeTaskWrapper}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TextInput style={styles.taskInput}
                    placeholder={"Write a task"} value={task}
                    onChangeText={text => setTask(text)} />
                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.taskAddWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
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
        fontSize: 30,
    },
});

export default Mainscreen;
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../config/colors';


function Task({ todo, markTodoComplete, deleteTodo }) {
    return (
        <View style={styles.item}>
            <TouchableOpacity style={styles.itemLeft} onPress={() => markTodoComplete(todo?.id)} >
                <View  style={styles.square}></View>
                <Text style={{ maxWidth: "80%", textDecorationLine: todo?.completed ? "line-through" : "none" }}>
                    {todo.task}
                    </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTodo(todo?.id)} style={styles.circular}></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: colors.itemBg,
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    square: {
        width: 26,
        height: 26,
        backgroundColor: colors.squareBg,
        opacity: 1,
        borderRadius: 5,
        marginRight: 15,
    },
    // itemtext:{
    //     maxWidth: "80%",
    // },
    circular: {
        width: 18,
        height: 18,
        backgroundColor: colors.circularBg,
        // borderWidth: 2,
        borderRadius: 5,
    },

});

export default Task;
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../config/colors';
import Task from './task';

function Mainscreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>
                    Todays tasks
                </Text>
                <View style={styles.items}>
                    <Task text={"Lorem ipsum dolor sit amet consectetur"} />
                    <Task text={"Task-2"} />
                </View>
                
            </View>
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
        marginTop:30,
    },
});

export default Mainscreen;
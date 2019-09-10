import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const CustomButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.button, props.style]}>
            <Text style={[styles.text, props.textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 14,
        color: '#FFFFFF',
    },
});

export default CustomButton;
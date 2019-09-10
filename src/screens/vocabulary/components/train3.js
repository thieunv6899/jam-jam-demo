import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class Tran3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemLeft: 0,
            itemRight: 0,
            listLeft: [],
            listRight: [],
            statusResult: 0,
        };
    }

    componentDidMount() {
        this.props.onRef(this)
        this.createDataList()
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    setItemLeft(id) {
        this.setState({ itemLeft: id })
        if (this.state.itemRight > 0) {
            this.checkResult(id,this.state.itemRight)
        }
    }
    setItemRight(id) {
        this.setState({ itemRight: id })
        if (this.state.itemLeft > 0) {
            this.checkResult(this.state.itemLeft, id)
        }
    }

    checkResult(left, right) {

        if (left == right) {
            this.setState({ statusResult: 1 })

            setTimeout(() => {
                this.setState({listLeft: this.state.listLeft.filter(function(o) { 
                    return o.Id !== left 
                })});
                this.setState({listRight: this.state.listRight.filter(function(o) { 
                    return o.Id !== right 
                })});
                this.setState({ statusResult: 0, itemLeft: 0, itemRight: 0 })

                if (!this.state.listLeft || this.state.listLeft.length == 0) {
                    alert('Hết')
                }
            }, 1200);
        } else {
            this.setState({ statusResult: 2 })
            setTimeout(() => {
                this.setState({ statusResult: 0, itemLeft: 0, itemRight: 0 })
            }, 1200)
        }
    }
    createDataList() {
        var left = this.props.flashcardLeft
        var right = this.props.flashcardRight
        this.setState({ listLeft: left, listRight: right })
    }

    _shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    selectItem = (item) => {
        this.setState({ boxSelect: styles.boxSelect });
    }

    render() {
        let listItemLeft = this.state.listLeft.map((item, i) => {
            return (
                <TouchableOpacity key={i} activeOpacity={0.75} style={styles.boxStyle} onPress={() => this.setItemLeft(item.Id)} >
                    <View style={[styles.itemDefault, (this.state.statusResult == 0 && this.state.itemLeft == item.Id) ? styles.itemSelected : (this.state.statusResult == 1 && this.state.itemLeft == item.Id) ? styles.itemCorrect : (this.state.statusResult == 2 && this.state.itemLeft == item.Id) ? styles.itemIncorrect : '']} >
                        <View style={styles.itemInfo}>
                            <Text style={styles.text}> {item.Word} </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        })
        let listItemRight = this.state.listRight.map((item, i) => {
            return (
                <TouchableOpacity key={i} activeOpacity={0.75} style={styles.boxStyle} onPress={() => this.setItemRight(item.Id)} >
                    <View style={[styles.itemDefault, (this.state.statusResult == 0 && this.state.itemRight == item.Id) ? styles.itemSelected : (this.state.statusResult == 1 && this.state.itemRight == item.Id) ? styles.itemCorrect : (this.state.statusResult == 2 && this.state.itemRight == item.Id) ? styles.itemIncorrect : '']} >
                        <View style={styles.itemInfo}>
                            <Text style={styles.text}> {item.Meaning} </Text>
                        </View>
                    </View>

                </TouchableOpacity>
            );
        })
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'stretch', }}>

                <View style={{ flexDirection: 'column', width: '48%' }}>
                    {listItemLeft}
                </View>
                <View style={{ flexDirection: 'column', width: '48%' }}>
                    {listItemRight}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    boxStyle: {
        width: '100%',
        minHeight: 20,
        paddingBottom: 15,
    },
    itemDefault: {
        width: '100%',
        minHeight: 25,
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 8,
        borderColor: 'lightgray',
    },
    itemSelected: {
        borderWidth: 2,
        borderColor: 'orange',
    },
    itemIncorrect: {
        borderWidth: 2,
        borderColor: 'red',
    },
    itemCorrect: {
        borderWidth: 2,
        borderColor: 'green',
    },
    itemInfo: {
        backgroundColor: '#FFF',
        width: '100%',
        alignItems: 'center',
        padding: 10,
    },
    text: {
        color: 'gray', fontSize: 19, alignItems: 'center'
    }
});
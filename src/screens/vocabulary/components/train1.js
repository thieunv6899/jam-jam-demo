import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image, Button } from 'react-native';

class Train1 extends React.Component {
    constructor() {
        super();
        this.state = {
            currentIndex: 0,
            currentSelect: 0,
            showResult: false,
            customFlashcardWord: [],
            itemCardWord: []
        };
    }

    componentDidMount() {
        this.props.onRef(this)
        this.createDataList()
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    createDataList() {
        var listFlashcardWord = [];
        this.props.flashcardWord.map(item => {
            var items = this.props.flashcardWord.filter(function (o) {
                return o.Word != item.Word;
            })
            var listRandom = this._shuffle(items).slice(0, 3)
            listRandom.push(item);
            listFlashcardWord.push(listRandom)
        });
        this.setState({ customFlashcardWord: listFlashcardWord, itemCardWord: this._shuffle(listFlashcardWord[0]) })
    }

    nextItem() {
        if (this.state.currentIndex + 1 < this.props.flashcardWord.length) {
            this.setState({ currentIndex: this.state.currentIndex + 1, itemCardWord: this.state.customFlashcardWord[this.state.currentIndex + 1] });
        }
    }

    selectItem(index) {
        this.setState({ currentSelect: index })
        //this.props.returnParent({checkResult: true,})
    }

    checkResult() {
        alert(this.state.customFlashcardWord[this.state.currentIndex].Id)
        var item = this.state.customFlashcardWord[this.state.currentIndex];
        if (this.state.currentSelect > -1) {
            this.setState({ showResult: true })
            // if (item.word == item.listRandom[this.currentSelect[this.currentIndex]].word) {
            //     this.$emit('playSound', 'playTrue')
            //     this._setButtons({ nextChild: true, trueResult: true })
            //     this.score++;
            // } else {
            //     this.$emit('playSound', 'playFalse')
            //     this._setButtons({ nextChild: true, wrongResult: true })
            // }
        }
        // if ((this.currentIndex + 1) == this.customFlashcardWord.length) {
        //     this._setButtons({ nextParent: true }, true)
        // }
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

    render() {
        let listItem = this.state.itemCardWord.map((item, i) => {
            return (
                <TouchableOpacity key={i} activeOpacity={0.75} style={styles.box} onPress={() => this.selectItem(item.Id)} >
                    <View style={[styles.itemDefault, ((!this.state.showResult && this.state.currentSelect == item.Id) ? styles.itemSelected : (this.state.showResult && this.state.customFlashcardWord[this.state.currentIndex].Id == item.Id) ? styles.itemCorrect : (this.state.showResult && this.state.currentSelect == item.Id && this.state.customFlashcardWord[this.state.currentIndex].Id != item.Id) ? styles.itemIncorrect : '')]} >
                        <View>
                            <Image style={styles.img} source={require('../../../Data/images/xedap.png')} />
                        </View>
                        <View style={styles.itInfo}>
                            <Text style={styles.text}> {item.Meaning} </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        })
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ height: 30, alignItems: 'center', padding: 15 }} >
                    <Text style={styles.text}>Lắng nghe từ và lựa chọn đáp án đúng</Text>
                </View>
                <View style={styles.audio}>
                    <TouchableOpacity onPress={() => this._audio()} >
                        <Image style={{ margin: 15, }} source={require('../../../Data/images/volume.png')} />
                    </TouchableOpacity>
                    <Button style={{ backgroundColor: '#febf20', height: 30, width: 60, borderRadius: 15 }}
                        title="Gợi ý"
                    />
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
                    {listItem}
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        box: {
            width: '48%',
            alignItems: 'center',
        },
        itemDefault: {
            width: '100%',
            height: 200,
            borderWidth: 1,
            marginBottom: 15,
            borderRadius: 5,
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
        img: {
            width: '100%',
            height: 135,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
        },
        itInfo: {
            backgroundColor: '#FFF',
            width: '100%',
            minHeight: 60,
            alignItems: 'center',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            paddingTop: 10,
            paddingTop: 10,
            borderTopColor: 'lightgray',
            borderTopWidth: 1
        },
        text: {
            color: 'gray', fontSize: 15, alignItems: 'center'
        },
        audio: {
            flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 10,
        }
    });

export default Train1;
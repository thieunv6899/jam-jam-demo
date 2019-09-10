import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableHighlight, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Mybutton from '../../components/CustomButton';
import Learn from './components/learn'
import Train1 from './components/train1'
import Train2 from './components/train2'
import Train3 from './components/train3'
import Database from '../../Connection/FlashCardDA';
import { ScrollView } from 'react-native-gesture-handler';

const db = new Database();
let buttons = {
    prevChild: false,
    nextChild: false,
    nextParent: false,
    studyAgain: false,
    checkResult: false,
    viewResult: false,
    trueResult: false,
    wrongResult: false,
    finish: false
};
export default class FlashCardWord extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            totalScore: 0,
            sumScore: 0,
            totalSumScore: 0,

            isLoading: true,
            WordListItems: [],

            listFlashcardword: [],

            index: 0,
            isFinal: false,
            isLearn: false,
            currentIndex: 0,
            indexSuccess: 0,
            button: null,
            showResult: false,
            WordListAnswer: []
        };
    }
    async componentDidMount() {
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
            this.getFlashCardWord()
        });
        this.setButtonParent({
            prevChild: true,
            nextChild: true,
            checkResult: false,
            viewResult: false,
            trueResult: false,
            wrongResult: false,
            studyAgain: false,
            finish: false
        });
    }
    getFlashCardWord() {
        const { navigation } = this.props;
        db.listWordByFlashCardId(navigation.getParam('Id')).then((data) => {

            this.setState({
                isLoading: false,
                //WordListItems: data,

                listFlashcardword: data,
            });
        }).catch((err) => {
            console.log(err);
            this.setState = {
                isLoading: false,
            }
        })
    }
    setButtonParent(obj) {
        buttons = Object.assign({}, this.state.button, obj);
    }
    nextChildItem = () => {
        if (this.state.currentIndex == 0) {
            this.learn.nextItem()
        } else {
            this.train2.nextItem()
        }

    }
    prevChildItem() {
        this.learn.prevItem()
    }

    submitCheck() {
        this.train2.checkResult()
    }
    submitViewResult() {

    }
    submitScore(score) {
        this.score = score;
    }

    enableCheckResult(obj) {
        
        this.state.score =  10;

    }

    _learn() {
        this.setState({ currentIndex: 2 });
        this.setButtonParent({
            prevChild: false,
            nextChild: true,
            checkResult: false,
            viewResult: false,
            trueResult: false,
            wrongResult: false,
            studyAgain: false,
            finish: false
        });
    }
    _audio() {
        // const callback = (error, sound) => {
        //     if (error) {
        //         Alert.alert('error', error.message);
        //         return;
        //     }
        //     sound.play(() => {
        //         sound.release();
        //     });
        // };
        // const sound = new Sound('../Data/audios/advertising.mp3', error => callback(error, sound));
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
        if (this.state.isLoading) {
            return (
                <View >
                    <ActivityIndicator size="large" color="#40a4ff" />
                </View>
            )
        } else {
            if (this.state.listFlashcardword.length == 0) {
                return (
                    <View>
                        <Text >{'Không có dữ liệu'}</Text>
                    </View>
                )
            } else {
                return (
                    <View style={styles.mainContainer}>
                        {this.state.currentIndex == 0 &&
                            <Learn onRef={ref => (this.learn = ref)} flashcardWord={this._shuffle(this.state.listFlashcardword)} />
                        }
                        {this.state.currentIndex == 1 &&
                            <ScrollView>
                                <Train1 onRef={ref => (this.train1 = ref)} flashcardWord={this._shuffle(this.state.listFlashcardword)} />
                            </ScrollView>
                        }
                        {this.state.currentIndex == 2 &&
                            <ScrollView>
                                <Train2 onRef={ref => (this.train2 = ref)} flashcardWord={this._shuffle(this.state.listFlashcardword)} returnParent = {this.enableCheckResult} />
                            </ScrollView>
                        }
                        {this.state.currentIndex == 3 &&
                            <ScrollView>
                                <Train3 onRef={ref => (this.train3 = ref)} flashcardLeft={this._shuffle(this.state.listFlashcardword.slice(0, 6))} flashcardRight={this.state.listFlashcardword.slice(0, 6)} />
                            </ScrollView>
                        }
                        <View style={styles.bottomView} >
                            <View style={{ width: '50%', left: 0, alignItems: 'center', flex: 1, flexDirection: 'row' }}>
                                {this.state.currentIndex == 0 &&
                                    <Button
                                        title="Luyện tập" buttonStyle={{
                                            borderRadius: 20,
                                            padding: 10,
                                            marginLeft: 10, height: 40,
                                            width: 120, backgroundColor: '#7ebc4c'
                                        }} onPress={() => this._learn()}
                                    />
                                }
                                {buttons.wrongResult &&
                                    <Button
                                        icon={
                                            <Icon
                                                name="times-circle"
                                                size={25}
                                            />
                                        }
                                        title='' buttonStyle={{
                                            backgroundColor: 'white'
                                        }}
                                    />
                                }
                                {buttons.trueResult &&
                                    <Button
                                        icon={
                                            <Icon
                                                name="check-circle"
                                                size={25}
                                            />
                                        }
                                        iconRight
                                        title='' buttonStyle={{
                                            backgroundColor: 'white'
                                        }}
                                    />
                                }
                            </View>
                            <View style={{ width: '50%', right: 0, alignItems: 'center', flex: 1, flexDirection: 'row', }}>
                                {buttons.prevChild &&
                                    <Button
                                        icon={
                                            <Icon
                                                name="angle-left"
                                                size={15}
                                                color="black"
                                            />
                                        }
                                        iconRight
                                        title='' buttonStyle={{
                                            borderRadius: 20,
                                            padding: 10,
                                            marginRight: 10, backgroundColor: 'white'
                                        }} onPress={() => this.prevChildItem()}
                                    />
                                }
                                {buttons.nextChild &&
                                    <Button
                                        icon={
                                            <Icon
                                                name="angle-right"
                                                size={15}
                                                color="white"
                                                style={{ marginLeft: 7 }}
                                            />
                                        }
                                        iconRight
                                        title='Tiếp theo' buttonStyle={{
                                            borderRadius: 20,
                                            padding: 10,
                                            marginRight: 10, height: 40,
                                            width: 120, backgroundColor: '#494559',
                                        }} onPress={() => this.nextChildItem()}
                                    />
                                }
                                {buttons.finish &&
                                    <Mybutton title='Hoàn thành' style={{
                                        borderRadius: 20,
                                        padding: 10,
                                        marginRight: 10,
                                        width: 120, backgroundColor: '#40a4ff',
                                    }} onPress={() => this.nextChildItem()} />
                                }
                                {buttons.checkResult &&
                                    <Mybutton title='Kiểm tra' style={{
                                        borderRadius: 20,
                                        padding: 10,
                                        marginRight: 10,
                                        width: 120, backgroundColor: '#40a4ff',
                                    }} onPress={() => this.submitCheck()} />
                                }
                                {buttons.viewResult &&
                                    <Mybutton title='Xem đáp án' style={{
                                        borderRadius: 20,
                                        padding: 10,
                                        marginRight: 10,
                                        width: 120, backgroundColor: '#40a4ff',
                                    }} onPress={() => this.submitViewResult()} />
                                }
                            </View>

                        </View>
                    </View>
                );
            }
        }
    }
}
const styles = StyleSheet.create(
    {
        mainContainer:
        {
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'lightgray',
            paddingTop: (Platform.OS === 'ios') ? 20 : 0
        },

        bottomView: {
            width: '100%',
            height: 60,
            backgroundColor: '#FFF',
            position: 'absolute',
            alignItems: 'stretch',
            bottom: 0,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
    });
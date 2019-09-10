import React from 'react'
import { View, StyleSheet, Image, TouchableHighlight, Text, ScrollView } from 'react-native';

class Learn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActiveFlip: false,
            currentIndex: 0,
        };
    }

    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }
    nextItem() {
        this.state.isActiveFlip = false;
        if (this.state.currentIndex + 1 < this.props.flashcardWord.length) {
            this.setState({ currentIndex: this.state.currentIndex + 1 });
        }
    }
    prevItem() {
        if (this.state.currentIndex > 0) {
            this.setState({ currentIndex: this.state.currentIndex - 1 });
        }
        //this._setButtons({ nextChild: true });
    }

    render() {
        return (
            <View style={styles.viewContent} >
                <View style={styles.item} >
                    <View style={styles.volume} >
                        <TouchableHighlight onPress={() => this._audio()} >
                            <Image style={{ margin: 15, }} source={require('../../../Data/images/volume.png')} />
                        </TouchableHighlight>
                    </View>
                    <View>
                        {this.state.currentIndex % 2 == 0 &&
                            <Image style={styles.imgStyle} source={require('../../../Data/images/xedap.png')} />
                        }
                        {this.state.currentIndex % 2 != 0 &&
                            <Image style={styles.imgStyle} source={require('../../../Data/images/xemay.png')} />
                        }
                    </View>
                    <View style={styles.itemInfo}>
                        <Text style={styles.text}>  {this.props.flashcardWord[this.state.currentIndex].Word} </Text>
                        <Text style={styles.text}>  {this.props.flashcardWord[this.state.currentIndex].Meaning} </Text>
                    </View>

                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create(
    {
        viewContent: {
            width: '80%',
            marginTop: 100,
            backgroundColor: '#FFF',
            alignContent: 'flex-start',
            borderWidth: 1,
            marginBottom: 15,
            borderRadius: 5,
            borderColor: 'lightgray',
        },
        item: {
            width: '100%',
            height: 300,
        },
        imgStyle: {
            width: '100%',
            height: 200,
            alignItems: 'flex-start',
            resizeMode: 'contain'
        },
        itemInfo: {
            backgroundColor: '#FFF',
            width: '100%',
            alignItems: 'center',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            paddingTop: 10,
            paddingBottom: 20,
            borderTopColor: 'lightgray',
            borderTopWidth: 1
        },
        text: {
            color: 'gray', fontSize: 19, alignItems: 'center'
        },
        volume: {
            backgroundColor: '#f4b00c', alignItems: 'center', top: -10, left: -10, borderRadius: 30, width: 60, height: 60
        }

    });
export default Learn;
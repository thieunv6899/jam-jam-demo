/*Home Screen With buttons to navigate to different options*/
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ProgressBarAndroid, ProgressViewIOS } from 'react-native';
import Database from '../Connection/Database';
const db = new Database();
const RNFS = require('react-native-fs');

export default class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        db.initDB();
        this.state = {
            isUpdate: false,
            dbUri: '',
            Progress_Value: 0.00,
        }
    }

    componentDidMount() {
        var target = `/data/user/0/com.jamjam/databases/Jamjam.db`;
        RNFS.exists(target).then(exists => {
            if (!exists) {
                this.setState({ isUpdate: true, dbUri: target })
            } else {
                this.props.navigation.navigate('HomeScreen')
            }
        });
    }

    downloadFileDB = () => {
        RNFS.downloadFile({
            fromUrl: "https://doc-08-c4-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/icuo534uva5hjt269gi1gsd6pbp8pr66/1568095200000/14976564385281534737/*/1eWhmDfuwISHC4ZY9LhdGNyvCR5TrIQ92?e=download",
            toFile: this.state.dbUri,
            background: true,
            discretionary: true,
            cacheable: true,
            begin: this._downloadFileBegin,
            progress: this._downloadFileProgress,
        })
            .promise.then(res => {
                console.log("res for saving file===", res);
                alert(res);
                this.props.navigation.navigate('HomeScreen')
            })
    }

    _downloadFileBegin = () => {
        alert("Download Begin");
        console.log("Download Begin");
    };

    _downloadFileProgress = (data) => {
        const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
        if (percentage < 100) {
            //this.setState({ Progress_Value: percentage })
         }
    };

    Start_Update = () => {
        this.downloadFileDB();
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                {this.state.isUpdate &&
                    <Text style={{ fontSize: 20, color: '#000' }}> Loading: {this.state.Progress_Value} %</Text>
                }
                {
                    (Platform.OS === 'android')
                        ?
                        (<ProgressBarAndroid styleAttr="Horizontal" progress={this.state.Progress_Value} indeterminate={false} />)
                        :
                        (<ProgressViewIOS progress={this.state.Progress_Value} />)

                }

                {this.state.isUpdate &&
                    <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={this.Start_Update}>
                        <Text style={styles.TextStyle}> Cập nhật dữ liệu </Text>
                    </TouchableOpacity>
                }


            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        MainContainer:
        {
            flex: 1,
            justifyContent: 'center',
            paddingTop: (Platform.OS === 'ios') ? 20 : 0,
            margin: 20
        },
        button: {

            width: '100%',
            backgroundColor: '#00BCD4',
            borderRadius: 5,
            padding: 10,
            marginTop: 10,
        },

        TextStyle: {
            color: '#fff',
            textAlign: 'center',
        }
    });
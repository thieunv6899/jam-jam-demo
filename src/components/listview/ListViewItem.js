import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    Text
} from 'react-native';
import { withNavigation } from 'react-navigation';

class ListViewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item // we pass item through props
        };
    }

    goToListViewItemDetail = () => {
        const { navigate } = this.props.navigation;
        navigate('FlashCardWord', { item: this.state.item });
    }

    render() {
        return (
            <TouchableOpacity style={styles.listViewItemContainer} onPress={this.goToListViewItemDetail}>
                <Image source={this.state.item.avatar} style={styles.avatar}/>
                <View style={styles.info}>
                    <Text style={styles.itemName}>{this.state.item.name}</Text>
                    <Text style={styles.text}>{this.state.item.count}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default withNavigation(ListViewItem);

const styles = StyleSheet.create({
    listViewItemContainer: {
        flexDirection: 'row',
        margin: 20
    },
    info: {
        justifyContent: 'center',
        marginLeft: 20
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    text: {
        fontSize: 20
    },
    itemName: {
        fontSize: 25,
        fontWeight: 'bold'
    }
});
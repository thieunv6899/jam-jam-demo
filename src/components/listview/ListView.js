import React, { Component } from 'react';
import {
    ScrollView
} from 'react-native';
import ListViewItem from './ListViewItem';

export default class ListView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items
        };
    }

    showListItems() {
        alert(this.state.items.length)
        let result;
        result = this.state.items.map((item,i) =>
            <ListViewItem item={item} key={i} />
        );

        return result;
    }

    render() {
        return (
            <ScrollView>
                {this.showListItems()}
            </ScrollView>
        )
    }
}
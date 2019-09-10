
import React from 'react';
import { Text, View } from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import WordDA from '../Connection/WordDA';

const db = new WordDA();

export default class SearchWord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_id: '',
      wordData: '',
    };
  }
  search = () => {
    const { input_id } = this.state;
    console.log(this.state.input_id);
    db.wordById(input_id).then((data) => {
      console.log(data);
      this.setState({
        wordData: data,
      });
    }).catch((err) => {
      console.log(err);
      alert('No user found');
      this.setState({
        wordData: '',
      });
    })
  };

  render() {
    return (
      <View>
        <Mytextinput
          placeholder="Nhập từ"
          onChangeText={input_id => this.setState({ input_id })}
          style={{ padding: 10 }}
        />
        <Mybutton
          title="Tìm kiếm"
          customClick={this.search.bind(this)}
        />
        {this.state.wordData &&
          <View style={{ marginLeft: 35, marginRight: 35, marginTop: 10 }}>

            <Text>Id: {this.state.wordData.Id}</Text>
            <Text>Word: {this.state.wordData.Word}</Text>
            <Text>Status: {this.state.wordData.Status}</Text>
            <Text>Mearning: {this.state.wordData.Mearning}</Text>
          </View>
        }
      </View>
    );
  }
}
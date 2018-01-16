/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component, PureComponent} from 'react';
import Swipeout from 'react-native-swipeout';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableHighlight,
  ScrollView
} from 'react-native';



class MyListItem extends React.Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      id: this.props.id,
      key: this.props.id
    }
  };


  _onTextChange = (event) => {
    this.setState({text: event.nativeEvent.text});

  }
  render() {
    let pHolder = 'Choose an Item';
    return (
      <View style={styles.rowContainer}>
        <TextInput
        style={styles.textInput}
        value={this.state.text}
        onChange = {this._onTextChange}
        placeholder={pHolder}
        ></TextInput>
        <TouchableHighlight>
          <Text>       </Text>
        </TouchableHighlight>
        </View>




    );
  }
}




export default class ListViewer extends React.Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'london',
      selected: false,
      message: '',
      initItems: [<MyListItem id='item1'/>],
      itemNumber: 1
    };
    this.renderRow = this.renderRow.bind(this);
    this._deleteRow=this._deleteRow.bind(this);
  };



  _deleteRow(item) {
    const index = this.state.initItems.map(task => task.props.id).indexOf(item.props.id);
    if (index > -1) {
      let newItems = this.state.initItems;
      newItems.splice(index, 1);
      this.setState({initItems: newItems});
  }

  }


  _keyExtractor = (item, index) => item.props.id;

renderRow({item}) {
  let swipeBtns = [{
        text: 'Delete',
        backgroundColor: 'red',
        onPress: () => { this._deleteRow(item) }
        }
      ];
return (<Swipeout right={swipeBtns}>
  {item}
  </Swipeout>);
};

_clickHandler = ()=> {
  let itemList = this.state.initItems.slice()
  let itemNo = this.state.itemNumber+1
  itemList.push(<MyListItem id={'item'+itemNo}/>);

  this.setState({initItems: itemList,
  itemNumber: itemNo});
}

  render() {
    return(
      <View style={styles.container}>
      <FlatList
      data={this.state.initItems}
      renderItem={this.renderRow}
      extraData={this.state}
      keyExtractor ={this._keyExtractor}


      />
      <Button
      title="Add Item"
      key="buttonAdder"
      onPress = {this._clickHandler}>
      </Button>
      </View>

    );
  };
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 50
  },
  textInput: {
    fontSize: 18,
    textAlign: 'center',
    flex: 4
  },
  extraSpace: {
    flex: 1
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    height: 44,
    backgroundColor: '#DDDDDD',
    borderColor: '#696969',
    borderRadius: 4,
    borderWidth: 0.5,
  }
})

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component, PureComponent} from 'react';


import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';

class MyListItem extends React.Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  };
  _onTextChange = (event) => {
    this.setState({text: event.nativeEvent.text});

  }
  render() {
    let pHolder = 'Choose an Item';
    return (

        <TextInput
        style={styles.item}
        value={this.state.text}
        onChange = {this._onTextChange}
        placeholder={pHolder}
        />

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
      initItems: [<MyListItem />],
    };
  };



  _renderItem = ({item}) => (
    <MyListItem
    id={item.id}
     title={item.key}
     />
  );


  _keyExtractor = (item, index) => item.id;

_clickHandler = ()=> {
  let itemList = this.state.initItems.slice()
  itemList.push(<MyListItem />);

  this.setState({initItems: itemList});
}

  render() {
    return(
      <View style={styles.container}>
      <ScrollView>
        {this.state.initItems}
        <Button
        title="Add Item"
        onPress = {this._clickHandler}>
        </Button>

      </ScrollView>

      </View>

    );
  };
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 50
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: 'center',
    backgroundColor: '#DDDDDD',
    borderColor: '#696969',
    borderRadius: 4,
    borderWidth: 0.5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
})

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
  ScrollView,
  AsyncStorage,
} from 'react-native';



class MyListItem extends React.Component<{}> {
  constructor(props) {
    super(props);
    const txtStart = '' || this.props.textInput
    this.state = {
      text: txtStart,
      id: this.props.id,
      key: this.props.id
    }
  };


  _accessText = () => {
    return this.props.onRef(this.state.text, this.props.id);
  };


  _onTextChange = (event) => {

    this.setState({
            text: event.nativeEvent.text
        }, () => {
            this._accessText();
        });


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
      initItems: [<MyListItem id='item1' onRef={this.onRefFunc}/>],
      itemNumber: 1
    };
    this.renderRow = this.renderRow.bind(this);
    this._deleteRow=this._deleteRow.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.loadData();
}

onRefFunc = (text, id) => {
        let newState = this.state;
        newState[id]=text;
        //this.setState(newState, () => {this.saveData()});
        this.setState(newState);
    }

componentDidMount = () => {
  //this.loadData();


}

async loadData() {
try{
    const item1 = await AsyncStorage.getItem('initItemsTextSave');
    const item2 = await AsyncStorage.getItem('initItemsIdSave');
    const item3 = await AsyncStorage.getItem('initItemsNumberSave');
    let newState = this.state;
    const new1 = JSON.parse(item1);
    const new2 = JSON.parse(item2);
    const new3 = parseInt(item3);
    let arr = [];
    for (i=0; i<new1.length; i++ ) {
      arr.push(<MyListItem id={new2[i]} textInput={new1[i]} onRef={this.onRefFunc} />);
      newState[new2[i]] = new1[i];

    }
    /*if (new1[(new1.length) != '']) {
      arr.push(<MyListItem id={(new3+1)} onRef={this.onRefFunc} />);
    }*/
    newState['itemNumber'] = new3+1;
    newState['initItems'] = arr;
    this.setState(newState);
  } catch(error) {
    console.log('No Data');
  }
    //let itemList = item2.map((txtItem, index) => <MyListItem id={txtItem} textInput={item1[index]} />);
  /*this.setState({initItems: itemList,
                itemNumber: item3});*/

}

  async saveData() {
      await AsyncStorage.setItem('initItemsTextSave', JSON.stringify(this.state.initItems.map(item => this.state[item.props.id])));
      //console.log(this.state.initItems.map(item => item.props.onRefFunc)); //.map(item => item._accessText));
      await AsyncStorage.setItem('initItemsIdSave', JSON.stringify(this.state.initItems.filter(item => this.state[item.props.id] != '').map(item => item.props.id)));
      await AsyncStorage.setItem('initItemsNumberSave', String(this.state.itemNumber));

   }



  _deleteRow(item) {
    const index = this.state.initItems.map(task => task.props.id).indexOf(item.props.id);
    if (index > -1) {
      let newItems = this.state.initItems;
      newItems.splice(index, 1);
      this.setState({initItems: newItems});
      //this.saveData();
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
  console.log("Click");
  let itemList = this.state.initItems.slice()
  let itemNo = this.state.itemNumber+1
  itemList.push(<MyListItem id={'item'+itemNo}  onRef={this.onRefFunc}/>);

  this.setState({initItems: itemList,
  itemNumber: itemNo});
  //this.saveData();

}




  render() {
    this.saveData();
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

import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, TextInput,Button } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import {Icon} from 'native-base';

export default class Myproject extends Component {
    
    static navigationOptions = {
        header: null,
    }

constructor(props) {
    
    super(props);

    this.array = [{
        title: 'Sports',
        roomID: 'roomID:1'
    },
    {
        title: 'Movie',
        roomID: 'roomID:2'
    },
    {
        title: 'Food',
        roomID: 'roomID:3'
    }
    ],

    this.state = {

        arrayHolder: [],
        textInput_Holder_Theme: '',
        textInput_Holder_ID: '',
        isAlertVisible: false,
        search: '',

    }
    _onPressChatroom = () => {
        this.props.navigation.navigate('Chatroom');
    }
    
}
submit(inputText){
    this.setState({isAlertVisible: false})
}

componentDidMount() {

    this.setState({ arrayHolder: [...this.array] })

}


joinData = () => {
// 여기에다 ROOMtitle 이냐 RoomID냐에 따라 push 를 다르게 지정 
        this.array.push({title : this.state.textInput_Holder_Theme,
                        roomID: this.state.textInput_Holder_ID});
    
        this.setState({ arrayHolder: [...this.array] })

}

FlatListItemSeparator = () => {
    return (
    <View
        style={{
            height: 1,
            width: "100%",
            backgroundColor: "#607D8B",
        }}
    />
    );
}


_onPressChatroom = () => {
        this.props.navigation.navigate('Chatroom');
    }

GetItem(item) {

    Alert.alert(item);

}


render() {
    return (

    <View style={styles.MainContainer}>
        <View style = {styles.header}></View>
        <TextInput
            placeholder="Enter Theme Here"
            onChangeText={data => this.setState({ textInput_Holder_Theme: data })}
            style={styles.textInputStyle}
            underlineColorAndroid='transparent'
        />
        <TextInput
            placeholder="Enter ID Here"
            onChangeText={data => this.setState({ textInput_Holder_ID: data })}
            style={styles.textInputStyle}
            underlineColorAndroid='transparent'
        />
        <DialogInput isDialogVisible = {this.state.isAlertVisible}
                title={"Create Chatroom"}
                message={"type title and roomID"}
                hintInput ={"title"}
                textInputProps
                submitInput={ (inputText) => {this.submit(inputText)} }
                closeDialog={ () =>this.setState({isAlertVisible:false})}>
        </DialogInput>


            <TouchableOpacity onPress={this.joinData} activeOpacity={0.7} style={styles.button} >
            <Text style={styles.buttonText}> Create Room </Text>
        </TouchableOpacity>

        <FlatList

            data={this.state.arrayHolder}

            width='85%'

            extraData={this.state.arrayHolder}

            keyExtractor = {(item, index) => String(index)}

            ItemSeparatorComponent={this.FlatListItemSeparator}

            renderItem={({ item }) => <Text style={styles.item} onPress={this._onPressChatroom} >#{item.title}{'\n'}#{item.roomID} </Text>}
        />
        <TouchableOpacity onPress={()=> this.setState({isAlertVisible:true})} 
        activeOpacity={0.7} 
        style={{backgroundColor: '#47C83E',width: 60, height: 50,marginBottom:40,marginLeft:"70%",justifyContent: 'center',alignItems:'center', borderRadius:60,borderWidth:1 }} >
        <Icon name='chatboxes' style={{color: '#FFF'}}/>
        </TouchableOpacity>
        
    
    </View>

    );
}
}

const styles = StyleSheet.create({

header: {
        flexDirection : "row",
        width:'100%',
        height:'8%',
        justifyContent: 'flex-end',
        paddingLeft: '4%',
        paddingBottom: '1.1%',
        backgroundColor: '#333',
    },
search: {
        justifyContent: 'center',
        alignItems : "stretch",
        paddingTop: 50,
        paddingLeft : 20,
        flexDirection: 'row',
        width:'100%',
        height:'20%',
        backgroundColor: '#333',
    },
    MainContainer : {
        justifyContent : 'center',
        alignItems : 'center',
        flex : 1,
        backgroundColor : '#333'
    },
    item : {
        flexDirection : 'row',
        borderWidth : 1, 
        borderColor : '#333',
        backgroundColor: '#fff',
        borderRadius: 7,
        padding : 10,
        fontSize : 18,
        height : 77,
    },
    textInputStyle:{

        textAlign : 'center',
        height: 40,
        width: '85%',
        borderWidth : 1, 
        borderColor : '#4CAF50',
        borderRadius: 7,
        marginTop : 12,
        color : '#fff',
    },
    button : {

        width : '85%',
        height: 40,
        padding : 10,
        backgroundColor : '#222',
        borderRadius : 8,
        marginTop: 10
    },
    buttonText : {
        color : '#fff',
        textAlign : 'center',
    },
});
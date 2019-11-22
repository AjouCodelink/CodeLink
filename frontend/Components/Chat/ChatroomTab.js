import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, TextInput, Platform, ToastAndroid } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail,Icon,Button,Fab, Spinner} from 'native-base';
import DialogInput from 'react-native-dialog-input';

import CreateChatroom from './Popup/CreateChatroom'
import SearchedChatrooms from './Popup/SearchedChatrooms'

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db');
export default class ChatroomTab extends Component {
    static navigationOptions = {
        header: null,
    }
    
    constructor(props) {
        super(props);
        this.token = '',
        this.email = '',
        this._id = '',
        this.array = [],
        this.state = {
            active : false,
            arrayHolder: [],
            searcharrayHolder: [],
            suggestArrayHolder:[],
            textInput_Holder_Theme: '',
            isAlertVisible: false,
            isSearchVisible: false,
            isSearchListVisible : false,
            search : '',
            createChatroomDisplay: 'none',
            searchChatroomDisplay: 'none',
            spinnerOpacity: 1,
        }
    }

    componentWillMount() {
        db.transaction( tx => {
            tx.executeSql(
                'SELECT * FROM token',
                [],
                (_, { rows: { _array }  }) => { 
                    this.token = _array[0].access_token;
                    this.email = _array[0].user_email;
                },
                (_,error) => console.error(error)
            )
        },(error) => console.error(error))
        this.crList_reload()
        this.setState({spinnerOpacity: 0});
        //this.getSuggestRoomList();
    }

    crList_reload = () => {
        this.state.arrayHolder.splice(0,100)
        db.transaction( tx => {
            tx.executeSql(
                'SELECT * FROM crList',
                [],
                (_, { rows: { _array }  }) => {
                    for(var i=0;i<_array.length;i++)
                    {
                        newItem = {
                            cr_name: _array[i].cr_name,
                            cr_id: _array[i].cr_id,
                            interest: {
                                section: _array[i].section,
                                group: _array[i]._group
                            },
                            memNum: _array[i].memNum,
                            lastMessage: _array[i].lastMessage,
                            lastTime: _array[i].lastTime,
                        }
                        this.setState({arrayHolder: [...this.state.arrayHolder, newItem]})
                    }
                },
                (_,error) => console.error(error)
            )
        },(error) => console.error(error))
    }

    insertArrayHolder = (cr_name, cr_id, interest) => {       // 새로운 방을 arrayholder이나 DB에 넣는 함수
        newItem = {
            cr_name: cr_name,
            cr_id: cr_id,
            interest: interest
        }
        db.transaction( tx => {
            tx.executeSql(
                'INSERT INTO crList (cr_id, cr_name, section, _group, memNum) VALUES (?,?,?,?,?);',
                [cr_id, cr_name, interest.section, interest.group, '?'],
                null,
                (_,error) => console.error(error)
            )
        },(error) => console.error(error));
        this.setState({arrayHolder: [...this.state.arrayHolder, newItem]})
    }


    createRoom = (new_cr_name) => { // 키워드를 입력하여 버튼을 누르면 서버에 방을 만들고 방 번호를 출력해줌.
        var url = 'http://101.101.160.185:3000/chatroom/creation/'+new_cr_name;
        fetch(url, {
            method: 'POST',
            headers: new Headers({
            'Content-Type' : 'application/json',
            'x-access-token': this.token
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => {
            this.insertArrayHolder(new_cr_name, responseJson.chatroom_id, responseJson.interest);
        })
    };

    exitChatRoom = (cr_id) => { // 방 나가기
        var url = 'http://101.101.160.185:3000/chatroom/exit/'+cr_id;
        fetch(url, {
            method: 'POST',
            headers: new Headers({
            'Content-Type' : 'application/json',
            'token' : 'token',
            'x-access-token': this.token
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => {
            this.setState(prevState => {
                const index = prevState.arrayHolder.findIndex(holder => holder.cr_id === cr_id);
                prevState.arrayHolder.splice(index, 1);
                return ({
                    arrayHolder: [...prevState.arrayHolder]
                })
            })
            db.transaction( tx => {
                tx.executeSql(
                    'DELETE FROM crList WHERE cr_id = ?);',
                    [cr_id],
                    null,
                    (_,error) => console.error(error)
                )
            },(error) => console.error(error));
        })

        //todo: 근데 arrayHolder만 건드려서 그런가 방이 추가하면 다시 돌아오는 버그가 있음ㅠ
        //나중에 유용하면 이용하시고 아니면 삭제해주세요ㅠ
        //서버와도 연동해서 방에서 나가기 구현해야함.
    }

    _longPressChatroom = (cr_id) => {  // 채팅방 꾹 누르면
        Alert.alert(
            'Exit?',
            'Press the OK button to exit the chat room.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => {
                    this.exitChatRoom(cr_id);
                }},
            ],
            {cancelable: false},
        );
    }
    _onPressChatroom = (item) => {
        this.props.navigation.navigate('Chatroom', {
            cr_name: item.cr_name,
            cr_id: item.cr_id,
            myEmail: this.email,
            crList_reload: this.crList_reload()
        });
    }

    FlatListItemSeparator = () => {
        return (
            <View style={{
                height: 1,
                width: "100%",
            }}/>
        );
    }

    suggestRoom(){
        Alert.alert("Room suggest Pressed");
    }

    searchBarShow(){
        this.setState({isSearchVisible: !this.state.isSearchVisible});
    }

    _onPressScarch(inputText){
        this.setState({isAlertVisible: false})
        this.createRoom(inputText);
    }

    searchRoomByKeyword(){
        this.textInput.clear()
        if (this.state.search ==  '') {
            ToastAndroid.show('Please input keyword.', ToastAndroid.SHORT)
            return
        }
        this.state.searcharrayHolder.splice(0,100)
        this.setState({spinnerOpacity: 1});
        var url = 'http://101.101.160.185:3000/chatroom/search/'+this.state.search;
        fetch(url, {
            method: 'GET',
            headers: new Headers({
            'Content-Type' : 'application/json',
            'token': 'token',
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => {
            for(var i=0;i<responseJson.length;i++)
            {
                newItem = {
                    cr_name: responseJson[i].name,
                    cr_id: responseJson[i]._id,
                    interest: responseJson[i].interest
                }
                this.setState({searcharrayHolder: [...this.state.searcharrayHolder, newItem]})
            }
            this.setState({
                searchChatroomDisplay: 'flex',
                spinnerOpacity: 0
            })
        })
    }

    GetItem(item) {
        Alert.alert(item);
    }

    _displayCreateCR = (display) => {
        this.setState({createChatroomDisplay: display})
    }

    _displaySearchCR = (display) => {
        this.setState({searchChatroomDisplay: display})
    }

    render() {
        {/*========헤더부분===========*/}
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                <Button light 
                style = {{width : "100%",height :"100%"}}>
                    <View style={styles.febContainer}>
                    </View>
                </Button>
                </View>
                {/*방생성 Dialog*/}
                <DialogInput
                    isDialogVisible = {this.state.isAlertVisible}
                    title={"Create Chatroom"}
                    message={"Type Theme"}
                    hintInput ={"Theme"}
                    submitInput={ (inputText) => { this._onPressScarch(inputText)}}
                    closeDialog={ (inputText) => {this.setState({isAlertVisible:false})}}/>
                {/*=========flatlist 부분===========*/}
                <View style ={{width: '100%', backgroundColor: '#00e600'}}>
                    <Text style = {{fontSize : 16, margin : 15,color :"#fff"}}>My Chatroom</Text>
                </View>
                <FlatList
                    data={this.state.arrayHolder}
                    width='100%'
                    extraData={this.state.arrayHolder}
                    keyExtractor = {(item, index) => String(index)}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({ item }) =>(
                        <ListItem avatar
                            activeOpacity={0.5}
                            onLongPress={() => this._longPressChatroom(item.cr_id)}
                            onPress={() => this._onPressChatroom(item)}
                            key={item.cr_id}>
                            <Left style={{justifyContent: 'center'}}>
                                <Thumbnail style={{width: 50, height: 45}} 
                                    source={{ uri: 'https://search4.kakaocdn.net/argon/600x0_65_wr/CPagPGu3ffd' }} />
                            </Left>
                            <Body>
                                <Text style={{fontSize: 16, fontWeight: 'bold',}}>{item.cr_name}</Text>
                                <Text style={{fontSize: 10, color: '#333'}}>  #{item.interest.section}  #{item.interest.group}</Text>
                                <Text style={{fontSize: 13}}>  {item.lastMessage!=null 
                                    ? (item.lastMessage)
                                    : ('No message')}
                                </Text>
                            </Body>
                            <Right style={{justifyContent: 'flex-end', alignItems:'flex-end'}}>
                                <Icon name='md-people' style={{marginBottom: 10, fontSize: 16, color: '#333'}}>
                                    <Text style={{fontSize: 14, color: '#333'}}> {item.memNum}</Text>
                                </Icon>
                                <Text style={{fontSize: 12}}>{item.lastTime!=null ?
                                    (item.lastTime.toString().substr(16, 5))
                                    :null}
                                </Text>
                            </Right>
                        </ListItem>
                    )}
                />
            <View style ={{width: '100%', backgroundColor: '#9cf'}}>
                <Text style = {{fontSize : 16, margin : 15,color :"#fff"}}>Chatroom Suggest</Text>
            </View>
            <List style ={{width: '100%'}}>
            <ListItem avatar>
            <Left>
                <Thumbnail
                style={{width: 50, height: 45}}  
                source={{ uri: 'https://search4.kakaocdn.net/argon/600x0_65_wr/CPagPGu3ffd' }} />
            </Left>
            <Body>
                <Text>Game-Overwatch</Text>
                <Text note>RyusungRyoung looks happy</Text>
            </Body>
            <Right>
                <Text note>3:43 pm</Text>
            </Right>
            </ListItem>
            </List>
                {/*=======아래 채팅방 추천 및 검색 창 팝업 부분=========*/}
                <View style={styles.febContainer}>
                
                </View>
                {
                    (this.state.isSearchVisible == true) ? (
                    <View style = {styles.searchBarConatiner}>
                        <TextInput
                            ref={input => { this.textInput = input }}
                            style={styles.searchBar}
                            onSubmitEditing={() => {this.searchRoomByKeyword();}}  // 엔터눌러도 입력되도록 함
                            placeholder="Search..."
                            value={this.state.search}
                            onChangeText={(search) => this.setState({search})}
                        />
                        <TouchableOpacity
                            style={styles.searchButton} 
                            onPress={()=>this.searchRoomByKeyword()}>
                            <Icon name='ios-search' style={{color: '#111'}}/>
                        </TouchableOpacity>
                    </View> 
                    ):(<View style = {styles.hide}></View>)
                } 
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{ }}
                        style={{ backgroundColor: '#5067FF' , width:  65,
                            height: 65,borderRadius: 70}}
                        position="bottomRight"
                        onPress={() => this.setState({ active: !this.state.active })}>
                        <Icon name="navigate" />

                        <Button   
                            onPress={() => this._displayCreateCR('flex')}
                            activeOpacity={0.7} 
                            style={styles.button_create} >
                        <Icon name='chatbubbles' style={{color: '#FFF'}}/>
                        </Button>

                        <Button   
                            onPress={()=> this.searchBarShow()} 
                            activeOpacity={0.7} 
                            style={styles.button_search} >
                        <Icon name='ios-search' style={{color: '#FFF'}}/>
                        </Button>

                        <Button  
                            onPress={()=> this.suggestRoom()} 
                            activeOpacity={0.7} 
                            style={styles.button_suggest}>
                        <Icon name='paw' style={{color: '#222'}}/>
                        </Button>
                </Fab>
                <CreateChatroom token={this.token} pushNewRoom={this.insertArrayHolder} displayChange={this._displayCreateCR} display={this.state.createChatroomDisplay}/>
                <SearchedChatrooms token={this.token} pushNewRoom={this.insertArrayHolder} array={this.state.searcharrayHolder} displayChange={this._displaySearchCR} display={this.state.searchChatroomDisplay}/>
                <Spinner size={80} style={{opacity: this.state.spinnerOpacity, flex: 4, position: "absolute", bottom: '43%'}}color='#999'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'flex-start',
        alignItems : 'center',
        backgroundColor : '#fff'
    },
    header: {
        flexDirection : "row",
        width:'100%',
        height: 24,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    hide : {
    },
    febContainer: {
        flex: 2,
        flexDirection : 'row',
        width: '100%',
        height: 50,
        marginTop: 20,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    button_search:{
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#33AAFF',
    },
    button_create: {
        width:  45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#44DD44',
    }, 
    button_suggest : {
        width:  45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: '#eeee33',
    },
    item : {
        flexDirection : 'row',
        padding : 10,
        justifyContent : 'flex-start',
        borderWidth : 1, 
        borderRadius: 7,
        borderColor : '#333',
        backgroundColor: '#fff',
    },
        Divider : {
        width: '100%',
        backgroundColor : '#BDBDBD',
    },
    thumbnail: {
        justifyContent : 'center',
        alignItems: 'center',

    },
    item_font : {
        fontSize : 16,
        marginLeft : 10,
    },
    textInputStyle:{
        width: '85%',
        height: 40,
        textAlign : 'center',
        color : '#fff',
        borderWidth : 1, 
        borderRadius: 7,
        borderColor : '#4CAF50',
        marginTop : 12,
    },
    searchBarConatiner: {
        position : 'absolute',
        flex: 3,
        flexDirection: 'row',
        width:'100%',
        justifyContent: 'center',
        alignItems : "stretch",
        marginTop: 40,
        paddingLeft: 15,
    },
    searchBar:{
        width: "75%",
        height: 40,
        fontSize:18,
        color: '#222',
        backgroundColor:'#eee',
        paddingLeft: 10,
        borderRadius: 5,
    },
    searchButton:{
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft :15,
        marginRight: 15,
        backgroundColor:'#eee',
    }
})

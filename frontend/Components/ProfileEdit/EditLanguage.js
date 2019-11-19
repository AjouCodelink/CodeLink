import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, } from 'native-base'

import LanguagePicker from '../SignUp/Language/LanguagePicker'

export default class EditLanguage extends Component {
    constructor(props){
        super(props)
    }

    state = {
        token: this.props.token,
        display: this.props.display,
        language: "NoValue"
    }

    interAdd = (newSection, newGroup, newKey) => {
        const pervInterests = this.state.interests;
        this.setState({
            interests: pervInterests.concat({section : newSection, group: newGroup, key: newKey})
        });
    }
    interRemove = (remKey) => {
        const pervInterests = this.state.interests;
        this.setState({
            interests: pervInterests.filter(inter => inter.key !== remKey)
        });
    }

    _onPressCancel = () => {
        this.popupClose()
    }

    _onPressAdmit = () => {
        console.log(this.state.language)
        this.popupClose()
    }

    popupClose = () => {
        this.props.displayChange('none');
    }

    languageChange = (value) => {
        this.setState({
            language: value
        })
    }

    render() {
        return (
            <View style={style.container}>
                <View style={[style.backGround, {display: this.props.display}]}>
                    <View style={style.content}>
                        <Text style={style.font_Title}>Edit Language</Text>
                        <View style={{height: 45, width: 250, margin:10}}>
                            <LanguagePicker valueChange={this.languageChange}/>
                        </View>
                        <View style={style.pickerContainer}>
                            <TouchableOpacity >
                                <Button onPress={() => this._onPressCancel()} style={{backgroundColor: '#bbb', width: 80, justifyContent: 'center', marginRight:20}}>
                                    <Text>Cancel</Text>
                                </Button>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Button onPress={() => this._onPressAdmit()} style={{backgroundColor: '#7f7', width: 80, justifyContent: 'center', marginLeft:20}}>
                                    <Text>Admit</Text>
                                </Button>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )   
    }
}

const style = StyleSheet.create({
    container: {
        flex: 3,
        width: '100%',
        height: '100%',
        position : 'absolute',
    },
    backGround: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    content: {
        width: 300,
        height: 300,
        borderRadius: 20,
        backgroundColor: '#444',
        justifyContent: 'center',
        alignItems: 'center',
    },
    font_Title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ddd',
        margin: 15,
    },
    pickerContainer: {
        flexDirection : 'row',
        margin: 35,
        justifyContent: 'center',
    },
})
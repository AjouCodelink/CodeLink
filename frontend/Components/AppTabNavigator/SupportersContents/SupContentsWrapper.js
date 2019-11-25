import React, { Component } from 'react';
import { Image, Text, StyleSheet, View , LinkingStyleSheet, TouchableOpacity, TouchableHighlight, ScrollView, Alert, Linking,FlatList} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body,Right } from 'native-base';
import SeoulData from './SeoulSup'
import AjouData from './AjouSup'

export default class AjouSup extends Component {
    constructor(props) {
    super(props);
    this.name = "CodeLink"
    this.state = {
        data : [

        ]
    };
    }
    Moreinfo(item) {
        Linking.openURL(item.HomepageURL);
        
    }
    ShowPoster(item){
        Linking.openURL(item.PosterImage);
    }
    Apply(item){
        var title = item.title.replace(/ /gi,"+")
        var url = "https://docs.google.com/forms/d/e/1FAIpQLSfYdRODBOXUfTrRLSI7tchXDRHI0g75dMYVcSAf23QZ0qvh5A/viewform?usp=pp_url&entry.865868214="+this.name+"&entry.607859849="+title
        Linking.openURL(url);
        
    }
    render() {
        return (
            <Container>
                <Content>
                    <FlatList
                        data = {this.state.data.concat(AjouData,SeoulData)}
                        keyExtractor = {(item,index)=>String(index)}
                        renderItem = {({item}) => {
                            return(
                                <Card style={{flex: 0, width: '99%',justifyContent: 'center'}}>
                                    <CardItem>
                                    <Left>
                                        <Thumbnail source={{uri: item.HeaderImage}} />
                                        <Body>
                                            <Text style={styles.font_title}>{item.title}</Text>
                                            <Text style={styles.font_date}>{item.Date}</Text>
                                        </Body>
                                    </Left>
                                    </CardItem>
                                    <CardItem>
                                    <Body>
                                        <TouchableOpacity style = {{width: '100%', height:350}} onPress={() => {this.ShowPoster(item)}}>
                                            <Image
                                            source={{uri: item.PosterImage}} style={{ width: "100%", height: null, flex: 1,resizeMode: 'contain',alignItems: 'center'}}/>
                                        </TouchableOpacity>
                                        <Text style = {{marginTop: 15}}>{item.description}</Text>
                                        <Text># {item.DueDay}</Text>
                                        <Text># {item.fee}</Text>
                                    </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Button transparent onPress={() => {this.Moreinfo(item)}}>
                                                <Text style ={styles.font_button}>  More info...  </Text>
                                            </Button>
                                        </Left>
                                        <Right>
                                            <Button transparent onPress={() => {this.Apply(item)}}>
                                                <Text style ={styles.font_button}>  Apply  </Text>
                                            </Button>
                                            
                                        </Right>
                                    </CardItem>
                                </Card>
                            )
                        }}/>
                </Content>
            </Container>
        );
    }
    }

const styles = StyleSheet.create({
    font_title: {
        fontWeight: 'bold',
        fontSize : 17,
    },
    font_date: {
        fontSize : 14,
        color: '#222'
    },
    font_main: {
        fontSize : 12,
    },
    font_button: {
        fontWeight: 'bold',
        color: '#20B2AA',
        fontSize : 16,
    },
}
);
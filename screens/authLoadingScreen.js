import React, { Component } from 'react';
import { ActivityIndicator,StatusBar } from "react-native";
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';

export default class AuthLoadingScreen extends Component {
    constructor(props){
        super(props);
        this._loadData();
    }
    render(){
        return(
        <View style={styles.container}>
            <ActivityIndicator/>
            <StatusBar barStyle='default'/>
        </View>
        );
    }
    _loadData = async()=>{
        const isLoggedIn = await AsyncStorage.getItem();
        this.props.navigation.navigate(isLoggedIn !== '1' ? 'routeHome' : 'routeLogin')
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:'#ddd',
        flex : 1,
        justifyContent: "center",
        alignItems : "center",
    },
})
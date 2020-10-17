import React,{Component} from 'react';
import { AsyncStorage, Button, ScrollView, StyleSheet, Text, View } from 'react-native';

export default class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(
            <View style={styles.container}>
                <Text>Coming Soon!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },
});

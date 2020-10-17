import React,{Component} from 'react';
import { AsyncStorage, Button, ScrollView, StyleSheet, Text, View } from 'react-native';

export default class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            userLogin   : '',
            password    : '',
        }
        this._retrieveData();
    }
    userLogout = async() => {
        try {
            await AsyncStorage.removeItem('session');
            this.props.navigation.navigate('routeLogin');
        }
        catch(error) {
            alert(error)
        }
    }
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('session');
            if (value !== null) {
                this.setState({session : value})
            }else{
                this.props.navigation.navigate('routeLogin');
            }
        } catch (error) {
            alert(error)
        }
    };
    render(){
        return(
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}}  style={styles.layout}>
                <Text>{this.state.session}</Text>         
                </ScrollView>
                <View style={styles.footer}>
                    <Button 
                        title='Sign Out' 
                        color='#28a428'
                        onPress={this.userLogout}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});

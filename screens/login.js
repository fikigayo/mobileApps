import React,{Component} from 'react';
import { AsyncStorage, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            userLogin   :   '',
            password    :   '',
            session     :   '',
        }
        this._retrieveData();
    }
    userLogin = () => {
        const {userLogin}        = this.state;
        const {password}        = this.state;
        
        fetch('http://att.vector41.org/attendance.php',{
                method : 'post',
                header:{
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                connection:'login',
                userLogin:userLogin,
                password:password,
            })
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            if(responseJson == 'error'){
                alert('Incorrect Username or Password');
            }else{
                    try {
                        (async()=>{
                            await AsyncStorage.setItem('session',responseJson);
                            this.props.navigation.navigate('routeHome');
                        })();
                    } catch (error) {
                        alert(error)
                    }
            }
        })
        .catch((error)=>{
            console.error(error);
        })
    }
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('session');
            if (value !== null) {
                this.setState({session : value})
                this.props.navigation.navigate('routeHome');
            }
        } catch (error) {
            alert(error)
        }
    };
    render(){
        return(
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}}  style={styles.layout}>
                    <TextInput 
                        placeholder="Username/Email" 
                        style={styles.input}
                        autoCapitalize='none'
                        onChangeText = {userLogin => this.setState({userLogin})}
                    />
                    <TextInput 
                        placeholder="Password"
                        style={styles.input} 
                        autoCapitalize='none'
                        secureTextEntry={true} 
                        onChangeText = {password => this.setState({password})}
                    />
                    <View style={styles.buttonContainer}>
                        <Button onPress={this.userLogin} title='Sign In' color='#28a428'/>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={()=>{this.props.navigation.replace('Registration')}}>
                        <Text style={styles.register}>Sign Up Here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:'#ddd',
        flex : 1,
        justifyContent: "center",
        alignItems : "center",
    },
    input : {
        paddingVertical:5,
        borderBottomColor:"#ccc",
        borderBottomWidth:1,
        width:"100%",
    },
    register: {
        color:'#28a428',
        fontWeight:'bold',
    },
    footer: {
        marginBottom:40,
        flexDirection:'row',
        display:'none'
    },
    layout: {
        width:'60%',
    },
    buttonContainer : {
        marginTop:20,
    },
})

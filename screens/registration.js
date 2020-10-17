import React,{Component} from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

    export default class RegistrationScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            username    :   '',
            email       :   '',
            password    :   '',
        }
    }
    userRegister = () => { 
        const {username}        = this.state;
        const {email}           = this.state;
        const {password}        = this.state;
        const {confirmPassword} = this.state;
        
        fetch('http://att.vector41.org/attendance.php',{
            method : 'post',
            header:{
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                connection:'register',
                username:username,
                email:email,
                password:password,
                confirmPassword:confirmPassword,
            })
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            alert(responseJson);
        })
        .catch((error)=>{
            console.error(error);
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}}  style={styles.layout}>
                    <TextInput 
                        placeholder="Username" 
                        style={styles.input}
                        onChangeText = {username => this.setState({username})}
                    />
                    <TextInput 
                        placeholder="Email"
                        style={styles.input} 
                        autoCapitalize='none'
                        onChangeText = {email => this.setState({email})}
                    />
                    <TextInput 
                        placeholder="Password"
                        style={styles.input} 
                        autoCapitalize='none'
                        secureTextEntry={true} 
                        onChangeText = {password => this.setState({password})}
                    />
                    <TextInput 
                        placeholder="Confirm Password"
                        style={styles.input} 
                        autoCapitalize='none'
                        secureTextEntry={true} 
                        onChangeText = {confirmPassword => this.setState({confirmPassword})}
                    />
                    <View style={styles.buttonContainer}>
                        <Button onPress={this.userRegister} title='Sign Up' color='#28a428'/>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={()=>{this.props.navigation.replace('Login')}}>
                        <Text style={styles.login}>Sign In Here</Text>
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
    login: {
        color:'#28a428',
        fontWeight:'bold',
    },
    footer: {
        marginBottom:40,
        flexDirection:'row',
    },
    layout: {
        width:'60%',
    },
    buttonContainer : {
        marginTop:50,
    },
})

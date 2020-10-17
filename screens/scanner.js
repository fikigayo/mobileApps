import React,{Component} from 'react';
import { AsyncStorage, Button, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';


const { width } = Dimensions.get('window');
const qrSize = width * 0.65;

export default class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            userLogin   : '',
            password    : '',
            qrSize      : Dimensions.get('window') * 0.7,
        }
        this._retrieveData();
        this.getPermissionsAsync();
    }
    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
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
        const { hasCameraPermission, scanned } = this.state;
        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return(
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={[StyleSheet.absoluteFill, styles.container]}
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                />
                <Text style={styles.description}>Scan your QR code</Text>
                <Image
                    style={styles.qr}
                    source={require('../assets/img/QR.png')}
                />
                {scanned && (
                    <Button
                        title={'Tap to Scan Again'}
                        onPress={() => this.setState({ scanned: false })}
                    />
                )}
            </View>
        )
    }
    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    description: {
        fontSize: width * 0.08,
        marginTop: '25%',
        textAlign: 'center',
        width: '70%',
        color: 'black',
    },
    qr: {
        marginTop: '15%',
        marginBottom: '20%',
        width: qrSize,
        height: qrSize,
    },
});

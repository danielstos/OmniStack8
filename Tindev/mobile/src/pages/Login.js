import React, { useState ,useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import api from '../services/api';


export default function Login({ navigation }) {
    const [user, setUser] = useState('');
   

useEffect(()=>{
AsyncStorage.getItem('user').then(user =>{
    if(user){
        navigation.navigate('Main',{user})
    }
})

},[]);

    async function handleLogin() {
        try {
            const response = await api.post('/devs', { username: user });
            const { _id } = response.data;
          await AsyncStorage.setItem('user',_id);
            navigation.navigate('Main', { user:_id });
        }
        catch(err) {
            console.error(err);
             alert( "usuario não cadastrado!!!");
        }
    }

    return (
        <View style={styles.contaneir}>
            <Image source={logo} />

            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite seu usuário no GitHub"
                placeholderTextColor='#999'
                style={styles.input}
                value={user}
                onChangeText={setUser}

            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    contaneir: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,

    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,

    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,

    },

});
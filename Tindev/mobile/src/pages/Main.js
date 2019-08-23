import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';
import api from '../services/api';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import itsamatch from '../assets/itsamatch.png'

export default function Main({ navigation}) {
    const id = navigation.getParam('user');
    const [users, setUsers] = useState([]);
const [macthDev, setMatchDev]=useState(null);
    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('./devs', {
                headers: {
                    user: id,
                }
            })
            setUsers(response.data);
        }
        loadUsers();
    }, [id]);

    useEffect(() => {

        const socket = io('http://192.168.0.106:3333', {
            query: { user: id } 
        });
        socket.on('macth', dev => {
            setMatchDev(dev);
        })
    }, [id]);

    async function handLeLike() {
        const[user,...rest] = users; 

        await api.post(`/devs/${user._id}/likes`, null, {
            headers: { user: id },
        })
        setUsers(rest);
    }

    async function handLeDisLike() {
        const[user,...rest] = users;
        await api.post(`/devs/${user._id}/dislikes`, null, {
            headers: { user: id },
        })
        setUsers(rest);
    }
    async function handleLougout() {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container} >
                   <TouchableOpacity onPress={handleLougout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>

            <View style={styles.cardsContainer}>
                {users.length === 0
                    ? <Text style={styles.empty}>Acabou:(</Text>
                    : (
                        users.map((user, index) => (
                            <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
                                <Image style={styles.avatar} source={{ uri: user.avatar }} />
                                <View style={styles.footer}>
                                    <Text style={styles.name}>{user.name}</Text>
                                    <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                                </View>
                            </View>
                        ))
                    )}

            </View>
      {users.length > 0 && (    
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={handLeDisLike}>
                    <Image source={dislike} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handLeLike}>
                    <Image source={like} />
                </TouchableOpacity>
            </View>
            )}
            {macthDev &&(
                <View style={styles.macthContainer}>
                    <Image style={styles.matchImage} source={itsamatch}/>
                    <Image style={styles.macthAvatar} source={{uri:macthDev.avatar}}/>
               <Text style={styles.matchName}>{macthDev.name}</Text>
               <Text style={styles.matchBio}>{macthDev.bio}</Text>
            
              <TouchableOpacity onPress={()=>setMatchDev(null)}>
              <Text style={styles.closeMacth}>FECHAR</Text>
              </TouchableOpacity >
                
                </View> 
            )}
        </SafeAreaView>
    );    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,

    },

    card: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    avatar: {
        flex: 1,
        height: 300,
    },
    footer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 2,
        lineHeight: 18,
    },
    logo: {
        marginTop: 30,
    },

    empty: {
        alignSelf: "center",
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold',
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },

    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
    },
    macthContainer:{
...StyleSheet.absoluteFillObject,
backgroundColor: 'rgba(0,0,0,0.8)',
justifyContent:'center',
alignItems:'center',

    },
    matchImage:{
height:60 ,
resizeMode:'contain'
    },
    macthAvatar:{
        width:160,
        height:160,
        borderRadius:80,
        borderWidth:5,
        borderColor:'#FFF',
        marginVertical:30,
    },
    matchName:{
        fontSize:26,
        fontWeight:'bold',
        color:'#FFF'
    },
    matchBio:{
        marginTop:10,
        fontSize:16,
        color:'rgba(255,255,255,0.8)',
        lineHeight:24,
        textAlign:'center',
        paddingHorizontal:30
    },
    closeMacth:{
        fontSize:16,
        color:'rgba(255,255,255,0.8)',
        textAlign:'center',
        marginTop:30,
        fontWeight:'bold',
    },
});

import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase';

const LoginScreen = () => {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    useEffect(() =>{
       const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                navigation.replace("Root") //Pantalla a la que quiere redirigir
            }
        })

        return unsubscribe;
    }, [])

    const handleSignUp = () => {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Registered with:', user.email);
          })
          .catch(error => alert(error.message))
      }

      const handleLogin = () =>{
          auth
           .signInWithEmailAndPassword(email,password)
           .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with:', user.email);
          })
          .catch(error => alert(error.message))
      }

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Correo"
                    value={email}
                    onChangeText = {text => setEmail(text) }
                    style= {styles.input}
                />
                <TextInput 
                    placeholder="Contraseña"
                    value={password}
                    onChangeText = {text => setPassword(text ) }
                    style= {styles.input}
                    secureTextEntry
                />

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}>
                    <Text style={styles.buttonText}>Iniciar Sesion</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={handleSignUp}
                style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    inputContainer:{
        width:'80%'
    },
    input:{
        backgroundColor: 'white',
        paddingHorizontal: 15, 
        paddingVertical:10,
        borderRadius: 10,
        marginTop:5
    },
    buttonContainer:{
        width:'60%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },
    button:{
        backgroundColor: '#0782F9',
        width:'100%',
        padding:15,
        borderRadius:10,
        alignItems:'center'
    },
    buttonOutline:{
        backgroundColor: 'white',        
        borderColor:'#0782F9',
        borderWidth:2
    },
    buttonText:{
        color:'white',
        fontWeight:'700',
        fontSize: 16
    },
    buttonOutlineText:{
        color:'#0782F9',
        fontWeight:'700',
        fontSize: 16       
    }
})

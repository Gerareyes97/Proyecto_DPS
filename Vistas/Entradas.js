import React, { useState } from 'react';
import { Text, Button, View, FlatList, StyleSheet, Modal, Image ,TouchableHighlight, TextInput} from 'react-native';
import { RectButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Value } from 'react-native-reanimated';

const Entradas = () => {

  
  const Productos =[{"Categoria": "Entrada", "Nombre": "Hamburguesa", "Descripcion": "Descripcion de hamburguesa Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","Precio": 5.00, "Imagen": require('../assets/Promo/Promo1.png') },
                    {"Categoria": "Entrada", "Nombre": "Alitas", "Descripcion": "Descripcion de alitas Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","Precio": 2.50, "Imagen": require('../assets/Promo/Promo2.png') },
                    {"Categoria": "Entrada", "Nombre": "Burrito", "Descripcion": "Descripcion del burrito Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","Precio": 3.00, "Imagen": require('../assets/Promo/Promo3.png') },
                    {"Categoria": "Entrada", "Nombre": "Sandwish", "Descripcion": "Descripcion de sandwish Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","Precio": 1.50, "Imagen": require('../assets/Promo/Promo4.png') },
                    {"Categoria": "Entrada", "Nombre": "Pizza", "Descripcion": "Descripcion de pizza Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","Precio": 7.00, "Imagen": require('../assets/Promo/Promo5.png') },
                    {"Categoria": "Entrada", "Nombre": "Ensalada", "Descripcion": "Descripcion de ensalada Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","Precio": 4.50, "Imagen": require('../assets/Promo/Promo6.png') }
                    ]


const ProdEntradas = Productos.filter((result) => result.Categoria.includes('Entrada'))

const [VerModal, setVerModal] = useState(false);
const [Combo, setCombo] = useState('');
const [DescCombo, setDescCombo] = useState('');
const [PrecioCombo, setPrecioCombo] = useState('');
const [imagenCombo, setImagenCombo] = useState('');
const [Cantidad, setCantidad] = useState(0);

function SeleccionCombo(resultado){
const ComboSelect = ProdEntradas.find((promo) => promo.Nombre === resultado)

setCombo(resultado)
setDescCombo(ComboSelect.Descripcion)
setPrecioCombo(ComboSelect.Precio)
setImagenCombo(ComboSelect.Imagen)
setVerModal(true)
}

function CerrarModal(){
setVerModal(false)
setCantidad(0)
}

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <ScrollView style={{ width: '90%', marginTop: 20}}>
          
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            {
              ProdEntradas.map((resultado) =>
              <View style={{flexBasis: '49%',}}>
                  <TouchableOpacity onPress={() => SeleccionCombo(resultado.Nombre)}>
                    <Image 
                      source={resultado.Imagen}
                      style={styles.ImagenProducto}>
                    </Image>
                    
                    <Text style={styles.TextoProducto}>{resultado.Descripcion}</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          </View>
        </ScrollView>



        
  <Modal
    visible= {VerModal}>
    <View style={styles.ViewModalSup}>
      <View style={styles.ViewModalInf}>

        <View style={styles.Encabezado}>
          <TouchableHighlight onPress={() => CerrarModal()}>
            <Image
              source={require('../assets/img/flecha.png')}
              style={styles.flechaAtras}
            />
          </TouchableHighlight>
        </View>

        <View>
          <Image
            source={imagenCombo}
            style={{width: 350, 
                    height: 250, 
                    alignSelf: 'center',
                    borderRadius: 15}}
          />

        <Text style={{fontSize: 50, fontWeight: 'bold', margin: 5}}>{Combo}</Text>

        <Text style={{fontSize: 20, 
                      width: '80%', 
                      marginLeft: 25}}>{DescCombo}</Text>

        <View style={{flexDirection: 'row', 
                      justifyContent: 'space-between',
                      marginLeft: 25,}}>

          <Text style={{fontSize: 40, 
                        fontWeight: 'bold', }}>${PrecioCombo}</Text>
          
          <View style={{flexDirection: 'row'}}>

            <Text style={{fontSize: 25, 
                          fontWeight: 'bold',
                          textAlignVertical: 'center',
                          marginTop: 5,
                          marginRight: 10}}>Cantidad</Text>

            <TextInput 
              style={{backgroundColor: '#b4eeb4', 
                      fontSize: 25, 
                      width: '35%', 
                      height: '75%', 
                      borderRadius: 15, 
                      marginTop: 10,
                      textAlign: 'center'}}
              keyboardType='numeric'
              onChangeText={(cant) => setCantidad(cant)}
            />
          </View>

        </View>

        <Text style={{fontSize: 40, fontWeight: 'bold', marginLeft: 25, color: '#17A05D', marginTop: 20}}>Total: ${parseFloat(PrecioCombo * Cantidad)}</Text>

        <Button title="Agregar al pedido"/>
        </View>
      </View>
    </View>
  </Modal>
      </View>
    );
  }


  const styles = StyleSheet.create({
    ImgCentrado:{
      alignContent: 'center',
      justifyContent: 'center'
    },
    ImagenProducto:{
      width: 180, 
      height: 150,
    },
    TextoProducto:{
      width: 175, 
      marginBottom: 70,
    },


    ViewModalSup:
    {   width: '100%',
        height: '100%',
        flex:1,
        backgroundColor: 'rgba(1,1,1,0.8)',
        justifyContent: 'center',
        alignItems:'center',
    },
    ViewModalInf:
    {
        height:'90%',
        width:'90%',
        backgroundColor: '#fff',
    },
    Encabezado:
    {
      height: 80,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    flechaAtras:
    {
      width: 50,
      height: 50,
      margin: 10,
    },

})

export default Entradas;


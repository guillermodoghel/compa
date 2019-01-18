
import React, { Component } from 'react';
import { Dimensions, StyleSheet, Image, TouchableOpacity, Platform, Vibration, Alert, AsyncStorage } from 'react-native';
import { Container, Header, Title, Button, Icon, View, Fab, Left, Right, Thumbnail, Toast, Linking, ListItem, List, Text, Spinner, Content, Card, CardItem, Body } from 'native-base';
import Geocoder from 'react-native-geocoder';
import SplashScreen from 'react-native-splash-screen';
import Permissions from 'react-native-permissions';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { RNCamera } from 'react-native-camera';
import openMap from 'react-native-open-maps';
import Modal from 'react-native-modal';
import styles from './styles';


const screen = Dimensions.get('window');

const googlemapskey = 'AIzaSyDh5JtMthz8pLVPer46P50w325hl26gqEo';


Geocoder.fallbackToGoogle(googlemapskey);

class Anatomy extends Component {
  constructor() {
    super();

    this.state = {
      step: 'init',
      loading: true,
      currentLat: 0.0,
      currentLong: 0.0,
      countryCode: 'ar',
      requestLocation: false,
      barcodeScan: false,
      productPage: false,
      configmodal: false,
      torchMode: 'off',
      cameraType: 'back',
    };
  }

  componentDidMount() {
    SplashScreen.hide();
    this.loadFlow();
  }

  loadFlow() {
    Permissions.check('location').then((response) => {
      if (response !== 'authorized') {
        this.setState({ loading: false });
        this.setState({ requestLocation: true });
      } else {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          fetch(`https://d3e6htiiul5ek9.cloudfront.net/prod/sucursales?lat=${coords.latitude}&lng=${coords.longitude}&limit=30&`).then((response) => {
            response.json().then((value) => {
              this.setState({
                currentLat: coords.latitude,
                currentLong: coords.longitude,
                loading: false,
                sucursales: value.sucursales,
              });
            });
          });
        },
         (error) => {
           if (false) {
             console.error(error);
           }
         },
         { enableHighAccuracy: Platform.OS !== 'android', timeout: 20000 }
       );
      }
    });
  }

  requestLocationPermisions() {
    Permissions.request('location').then((response) => {
      if (response === 'authorized') {
        this.loadFlow();
        this.setState({ requestLocation: false });
        this.setState({ loading: true });
      }
    });
  }

  toggleScaning() {
    this.setState({ barcodeScan: true });
  }
  backToStart() {
    this.setState({ barcodeScan: false });
  }

  mainScreen() {
    this.setState({ barcodeScan: false });
    this.setState({ productPage: false });
    this.setState({ loading: false });
  }
  onBarCodeRead(data, type) {
    Vibration.vibrate(500);
    // console.log('data', data);
    // console.log('type', type);
    this.setState({ barcodeScan: false });
    this.setState({ loading: true });
    const arraySucursales = [];
    for (let i = 0; i < this.state.sucursales.length; i++) {
      arraySucursales.push(
        `${this.state.sucursales[i].comercioId}-${
        this.state.sucursales[i].banderaId}-${
        this.state.sucursales[i].sucursalId}`);
    }
    fetch(`https://d3e6htiiul5ek9.cloudfront.net/prod/producto?limit=30&id_producto=${parseInt(data.data)}&array_sucursales=${arraySucursales}&limit=30&`).then((response) => {
      response.json().then((value) => {
        console.log(value);
        this.setState({ producto: value.producto });
        const productos = [];
        for (let i = 0; i < value.sucursales.length; i++) {
          if (!('message' in value.sucursales[i])) {
            productos.push(value.sucursales[i]);
          }
        }

        if (productos.length === 0) {
          this.mainScreen();
          Alert.alert('Producto no encontrado', 'El codigo escaneado no forma parte de preciosclaros.gob.ar');
        } else {
          this.setState({ productoPrecios: productos });
          this.setState({ barcodeScan: false });
          this.setState({ productPage: true });
          this.setState({ loading: false });
        }
      });
    });
  }

  render() {
    return (
      <Container>
      {
        this.state.loading ?
          <View style={{ backgroundColor: '#446342', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner color="#fff" />
          </View>
          : null
        }
        { this.state.requestLocation && !this.state.loading ?
          <View style={{ backgroundColor: '#446342',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center' }}>
            <Text style={{ fontSize: 100 }}>
              🛰
            </Text>
            <Text style={{ fontSize: 36, color: '#fff' }}>
              Habilita la localizacion
            </Text>
            <Text style={{ fontSize: 20, color: '#fff', padding: 20, justifyContent: 'center' }}>
              Necesitamos saber donde estas, para buscar los precios en los locales mas cercanos{'\n'}
            </Text>

            <Button onPress={this.quoteTrip} style={{ backgroundColor: 'teal', alignSelf: 'center', justifyContent: 'center', height: 60, width: 180, borderRadius: 200 }}>
              <Text
                style={{ fontSize: 25, paddingTop: 10 }}
                onPress={() => this.requestLocationPermisions()}
              >Habilitar</Text>
            </Button>
          </View>
          : null
        }
        {
          !this.state.loading && !this.state.requestLocation && !this.state.barcodeScan && !this.state.productPage ?

            <View style={{ position: 'relative',
              backgroundColor: '#446342',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%' }}>

              <Button onPress={this.quoteTrip} style={{ backgroundColor: 'green', alignSelf: 'center', justifyContent: 'center', height: 60, width: '80%', borderRadius: 200, margin: 20 }}>
                <FontAwesome style={{ color: '#fff', fontSize: 25 }}>{Icons.barcode}</FontAwesome>
                <Text
                  style={{ fontSize: 25, paddingTop: 10 }}
                  onPress={() => this.toggleScaning()}
                > Escanear Producto</Text>
              </Button>
            </View>
        : null}
        {
          !this.state.loading && !this.state.requestLocation && this.state.barcodeScan && !this.state.productPage ?
            <View style={{ flex: 1,
              flexDirection: 'column',
              backgroundColor: 'black' }}>
              <RNCamera
                ref={(ref) => {
                  this.camera = ref;
                }}
                style={{ flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center' }}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.off}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
                onBarCodeRead={(data, type) => this.onBarCodeRead(data, type)}
              />
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'flex-start' }}>
                <TouchableOpacity style={{ flex: 0,
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  padding: 5,
                  paddingHorizontal: 20,
                  alignSelf: 'center',
                  margin: 5 }}
                  onPress={this.backToStart.bind(this)}
                >
                  <Text style={{ fontSize: 24 }}> 🔙 </Text>
                </TouchableOpacity>
              </View>
            </View>
          : null}
          {
            !this.state.loading && !this.state.requestLocation && !this.state.barcodeScan && this.state.productPage ?
              <View style={{ flex: 1 }}>
              <Modal
                isVisible={this.state.configmodal}
                onBackdropPress={() => this.setState({ configmodal: false })}
                onSwipe={() => this.setState({ configmodal: false })}
                swipeDirection="up"
                animationIn="slideInDown"
                animationOut="slideOutUp"
                scrollOffset={0}
              >
                  <Content>
                    <Card >
                      <CardItem header style={styles.cardOptions}>
                        <Text style={{ color: '#fff' }}>¿Qué pasa si el precio en góndola no es el mismo que el de la web, o el producto que muestra la web no está en la góndola?</Text>
                      </CardItem>
                      <CardItem >
                        <Body>
                          <Text>Tené en cuenta que los precios son actualizados todos los días.
                          {'\n'}Si cuando llegás al comercio, el precio en la góndola no coincide con el que te informa Precios Claros para ese día, o bien no encontrás el producto informado,
                          {'\n'}podés informarlo en www.preciosclaros.gob.ar o llamar al 0800-666-1518</Text>
                        </Body>
                      </CardItem>
                    </Card>
                    <Card >
                      <CardItem header style={styles.cardOptions}>
                        <Text style={{ color: '#fff' }}>¿Qué pasa una vez ingresado el reclamo?</Text>
                      </CardItem>
                      <CardItem >
                        <Body>
                          <Text>La Dirección Nacional de Defensa del Consumidor interviene a través del área de fiscalización para verificar infracciones. En caso de constatarse que los datos enviados por los comercios y publicados en Precios Claros no son los que encontraste en el comercio, se aplican las sanciones que establecen las Leyes de Lealtad Comercial y de Defensa del consumidor.</Text>
                        </Body>
                      </CardItem>
                    </Card>
                    <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 20 }}>
                      <Button transparent onPress={() => this.setState({ configmodal: false })}>
                        <Icon name="arrow-up" style={{ color: '#a6b9cc', fontSize: 40 }} />
                      </Button>
                    </View>
                  </Content>
                </Modal>
              <Header style={{ backgroundColor: '#446342' }}
                androidStatusBarColor="#446342"
                iosBarStyle="light-content"
              >
               <Left>
                   <Button transparent onPress={() => this.mainScreen()}>
                     <Icon name="arrow-back" style={{ color: '#FFF' }} />
                   </Button>
               </Left>
               <Body>
                   <Title style={{ color: '#FFF' }}>Precios</Title>

               </Body>
               <Right>
                   <Button transparent onPress={() => this.setState({ configmodal: true })}>
                     <Icon name="help-circle" style={{ color: '#FFF' }} />
                   </Button>
               </Right>
             </Header>
              <ListItem thumbnail style={{ borderBottomWidth: 0 }}>
                <Left>
                  <Thumbnail style={{ width: 100, height: 100 }} square source={{ uri: `https://imagenes.preciosclaros.gob.ar/productos/${this.state.producto.id}.jpg` }} />
                </Left>
                <Body>
                  <Text>
                    {this.state.producto.nombre}{' \n🏷 '} {this.state.producto.marca}
                  </Text>
                    <Text numberOfLines={1} note>
                      {'📦 '} {this.state.producto.presentacion}
                    </Text>
                </Body>
              </ListItem>
                <List
                  style={{}}
                  dataArray={this.state.productoPrecios}
                  renderRow={data =>
                    <ListItem thumbnail style={{ borderBottomWidth: 0 }}>
                      <Left>
                        <Thumbnail square source={{ uri: `https://imagenes.preciosclaros.gob.ar/comercios/${data.comercioId}-${data.banderaId}.jpg` }} />
                      </Left>
                      <Body>
                        <Text>
                          {data.banderaDescripcion}
                        </Text>
                        {data.url !== '-' ?
                          <Text numberOfLines={1} note>
                            {'📍 '} {data.direccion}
                          </Text>
                        : null}
                      </Body>
                      <Right>
                      { this.state.producto.precioMin === data.preciosProducto.precioLista ?
                        <Text style={{ fontSize: 18, color: 'green', fontWeight: 'bold' }}>
                          {'$'}{data.preciosProducto.precioLista.toFixed(2)}
                        </Text>
                        :
                        <Text style={{ fontSize: 18 }}>
                          {'$'}{data.preciosProducto.precioLista.toFixed(2)}
                        </Text>
                      }

                      </Right>
                    </ListItem>
                  }
                />
              </View>
            : null
          }
      </Container>

    );
  }
}


export default Anatomy;

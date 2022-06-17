import { Image, Text, View, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, ToastAndroid, TextInput } from 'react-native'
import React, { Component } from 'react'
import CheckBox from '@react-native-community/checkbox';
import * as ImagePicker from 'react-native-image-picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { rb_unselected, rb_selected } from '../../assets/images'
import { connect } from 'react-redux'

class Histori extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gambar: '',
      hisimg: {
        0: {
          image: {
            name: '',
            type: '',
            uri: 'https://static.thenounproject.com/png/187803-200.png'
          },
        }
      },
      total: null,
      tat: 0,
      Musibah: '',
      Sakit: '',
      Histori: '',
      Opname: '',
      show: 0,
      checked: 0,
      count: 1,
      his: '',
      rf: [],
      itemSelected: '',
    }
  }
  takePic(index) {
    {
      ImagePicker.launchCamera(
        {
          noData: true,
          saveToPhotos: true,
          title: 'Select Photo',
          maxWidth: 300,
          maxHeight: 400,
          compressImageQuality: 0.5,
          storageOptions: {
            skipBackup: false,
            path: 'images',
          },
        },
        (response) => {
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            const source = {
              image: {
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type,
              }
              //   id: 0,
            };
            console.log('ini gambar = ', source);
            this.setState(prevState => {
              prevState.hisimg[index] = source
              //   prevState.tgl_lahir[index] != this.props.route.params.tgl_lahir[index] ? this.setState({tglmbuh : true}) : this.setState({tglmbuh : false});
              return {
                hisimg: prevState.hisimg
              }
            }, () => console.log(this.state.hisimg));
            this.setState({
              total: index,
              tat: index,
            });
            console.log('ini gambar = ', this.state.hisimg);
          }
        },
      );
    }
  }
  render() {
    var Histori = [
      { label: 'Sakit  ', value: 'Sakit' },
      { label: 'Musibah ', value: 'Musibah' }
    ];
    var Opname = [
      { label: 'Ya  ', value: 'Ya' },
      { label: 'Tidak', value: 'Tidak' }
    ];
    const inputbutton = [];
    for (let i = 0; i < this.state.count; i++) {
      <><View key={i}>
        <Text>{i + 1}.</Text>
        {/* <View style={style.radio}>
          {this.state.Histori.map((data, key) => {
            return (
              <View key={key}>
                {this.state.checked == key ?
                  <TouchableOpacity style={style.btn}>
                    <Image style={style.img} source={rb_selected} />
                    <Text>{data}</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={() => { this.setState({ checked: key }) }} style={style.btn}>
                    <Image style={style.img} source={rb_unselected} />
                    <Text>{data}</Text>
                  </TouchableOpacity>
                }
              </View>
            )
          })}
        </View> */}
      </View></>
    }
    var hisimg = [];
    for (let i = 0; i <= this.state.tat; i++) {
      hisimg.push(
        <Image
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
          source={this.state.hisimg[i].image}
        />
      )
    }
    return (
      <ScrollView contentContainer style={style.contentContainer} showsVerticalScrollIndicator={true}>
        {this.props.user.presensi === 'karyawan' ?
          <SafeAreaView >
            <View>
              <View style={{ backgroundColor: '#0EBEDF' }}>
                <Text style={style.title1}>Tambah Histori</Text>
              </View>

              <>
                <View>
                  {inputbutton}
                  <Text style={style.Label3}>Jenis Histori</Text>
                  <View style={style.radio}>
                    <RadioForm
                      radio_props={Histori}
                      onPress={(value) => { this.setState({ Histori: value }), ToastAndroid.show(value.toString(), ToastAndroid.SHORT) }}
                      initial={2}
                      buttonSize={10}
                      buttonOuterSize={20}
                      animation={true}
                      formHorizontal={true}
                    >
                    </RadioForm>

                  </View>
                  {this.state.Histori === 'Sakit' ?
                    <View>
                      <Text style={style.Label2}>Nama Penyakit</Text>
                      <TextInput
                        style={style.kotak2}
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                        placeholder="Nama Penyakit"
                        placeholderTextColor='#7e7e7e'
                      />
                      <Text style={style.Label3}>Di opname?</Text>
                      <View style={style.radio}>
                        <RadioForm
                          radio_props={Opname}
                          onPress={(value) => { this.setState({ Opname: value }), ToastAndroid.show(value.toString(), ToastAndroid.SHORT) }}
                          initial={2}
                          buttonSize={10}
                          buttonOuterSize={20}
                          animation={true}
                          formHorizontal={true}
                        >
                        </RadioForm>
                      </View>

                      {this.state.Opname === 'Ya' ?
                        <View>
                          <Text style={style.Label2}>Dirawat di:</Text>
                          <TextInput
                            style={style.kotak2}
                            onChangeText={text => this.setState({ text })}
                            value={this.state.text}
                            placeholder="Dirawat Di"
                            placeholderTextColor='#7e7e7e'
                          />
                        </View>
                        :
                        <View></View>
                      }
                    </View>
                    : this.state.Histori === "Musibah" ?
                      <View>
                        <Text style={style.Label2}>Nama Musibah</Text>
                        <TextInput
                          style={style.kotak2}
                          onChangeText={text => this.setState({ text })}
                          value={this.state.text}
                          placeholder="Nama Musibah"
                          placeholderTextColor='#7e7e7e'
                        />
                      </View>
                      :
                      <></>}

                </View>
              </>

              <View style={style.container}>
                <ScrollView horizontal={true}>
                  <>
                    {hisimg}
                  </>
                </ScrollView>
              </View>
              <TouchableOpacity
                style={style.item}
                onPress={() => this.takePic(this.state.total === null ? 0 : this.state.total + 1)}>
                <Text style={style.text}>Pilih Foto</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Anak_Binaan')} style={style.btnSimpanUn1} >
                  <Text style={{ fontWeight: 'bold' }}>Kembali</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Anak_Binaan', ToastAndroid.show('Data Telah Disimpan', ToastAndroid.SHORT))} style={style.btnSimpanDark} >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Kirim</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
          :
          <View />
        }

        {this.props.user.presensi === 'admin' ?
        <SafeAreaView style={{flex:1}}>
           <View style={{ backgroundColor: '#0EBEDF' }}>
           <Text style={style.title1}>Histori Anak Asuh</Text>
           </View>
           </SafeAreaView>
          :
          <View />
        }

      </ScrollView>


    )
  }
}
const style = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Label1: {
    flex: 1,
    fontSize: 12,
    padding: 5,
    color: '#000000',
    flexDirection: 'column',
  },
  Textinputcss: {
    color: '#7e7e7e',
    marginLeft: 30,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 12,
    height: 52,
    backgroundColor: '#fff',
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3,
  },
  Label2: {
    marginTop: 5,
    marginLeft: 25,
    padding: 5,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  kotak2: {
    color: '#000000',
    marginLeft: 30,
    marginRight: 10,
    borderRadius: 2,
    borderWidth: 0.1,
    fontSize: 12,
    height: 52,
    backgroundColor: '#7e7e7',
  },
  title1: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  item: {
    flex: 1,
    fontSize: 16,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 17,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3,
  },
  container: {
    marginTop: 40,
    marginLeft: 75,
    multiline: true,
    width: 250,
    height: 250,
    flex: 1,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: '#7e7e7e',
    elevation: 3,
  },
  btnSimpanDark: {
    width: '40%',
    fontWeight: 'bold',
    backgroundColor: '#87cefa',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    textAlign: 'center',
    justifyContent: 'center', alignItems: 'center'
  },
  btnSimpanUn1: {
    width: '40%',
    fontWeight: 'bold',
    backgroundColor: '#C6C6C6',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    justifyContent: 'center', alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  checkbox: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    marginLeft: 30,
    margin: 20,
  },
  Label3: {
    marginTop: 5,
    marginBottom: -25,
    marginLeft: 25,
    padding: 5,
    width: '100%',
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  radio: {
    flexDirection: 'row',
    marginLeft: 30,
    margin: 20,
    paddingRight: 10
  },
  img: {
    height: 20,
    width: 20
  },
  img: {
    height: 20,
    width: 20,
  },
  btn: {
    flexDirection: 'row'
  },
})
const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeUser: (data) => dispatch({ type: 'CHANGE/USER', payload: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Histori);
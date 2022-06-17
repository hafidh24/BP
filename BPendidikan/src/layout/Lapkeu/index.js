import {
  RefreshControl, Modal, Video, ToastAndroid, Alert, ScrollView,
  Text, View, StyleSheet, TextInput, TouchableOpacity, Image, FlatList,
  BackHandler, Dimensions,
} from 'react-native'
import React, { Component } from 'react'
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import {arrow } from '../../assets/images'

export class Lapkeu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      det: [],
      detak: [],


    }
  }
  componentDidMount() {
    this.GetDetAPi(),
      // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      // Firebase.initializeApp(this);
      // this.requestCameraPermission();
      console.log(this.props);
  }
  GetDetAPi() {
    fetch('https://kilauindonesia.org/datakilau/api/testo').then(res => {
      if (res.status === 200)
        return res.json()
    }).then(resdata => {
      console.log(resdata.data)
      this.setState({
        det: resdata.data,
        filter: resdata.DATA,
        refreshing: false,

      })
    })
  }

  onRefresh() {
    this.GetAnakAPi();
    this.setState({ refreshing: false });
  }
  render() {
    const { detak } = this.state
    return (
      <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>

        <View>
        <View style={{ backgroundColor: '#0EBEDF' }}>
            <Text style={style.title}>Laporan Keuangan</Text>
          </View>
          <Collapse>
            <CollapseHeader>
              <View style={style.coltom}>
                <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Laporan Keuangan Anak Asuh</Text>
                <Image source={arrow} style={{
                  padding: 10,
                  margin: 5,
                  height: 20,
                  width: 20,
                  position: 'absolute',
                  resizeMode: 'stretch',
                  alignItems: 'center',
                  right: 15,
                  top: 5,
                }}></Image>
              </View>
            </CollapseHeader>
            <CollapseBody>

              <View style={style.detail}>
                <Text> Rp.</Text>
              </View>
            </CollapseBody>
          </Collapse>

       <Collapse>
            <CollapseHeader>
              <View style={style.coltom}>
                <Text style={{ marginLeft: 25, color: '#7e7e7e', fontSize: 14, textAlign: 'center' }}>Laporan Keuangan lain-lain</Text>
                <Image source={arrow} style={{
                  padding: 10,
                  margin: 5,
                  height: 20,
                  width: 20,
                  position: 'absolute',
                  resizeMode: 'stretch',
                  alignItems: 'center',
                  right: 15,
                  top: 5,
                }}></Image>
              </View>
            </CollapseHeader>
            <CollapseBody>

              <View style={style.detail}>
                <Text> Rp.</Text>
              </View>
            </CollapseBody>
          </Collapse>

        </View>
      </ScrollView>
    )
  }
}

export default Lapkeu
const style = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  itemflat: {
    flex: 1,
    fontSize: 12,
    flexDirection: 'row',
    marginLeft: 20,
    padding: 10,
    backgroundColor: '#fff',
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
  Label1: {
    marginTop: 15,
    marginLeft: 15,
    textAlign: 'center',
    color: '#000000',
  },
  coltom: {
    width: '90%',
    marginLeft: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 16,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
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
})

{/* <FlatList
refreshControl={
  <RefreshControl
    refreshing={this.state.refreshing}
    onRefresh={() => this.onRefresh()}
  />
}
data={this.state.det}
renderItem={({ item }) => (
  
)}>
</FlatList> */}

// {/* <View >
//     <TouchableOpacity style={style.itemflat} onPress={() => { this.props.navigation.navigate('Detkeu'),this.setState({ detak: item}) }}>
//       {/* <View tyle={{ justifyContent: 'row', alignItems: 'center', alignContent: 'center' }} > */}
//       <Image source={{ uri: 'https://www.kilauindonesia.org/datakilau/gambarDonatur/' + item.gambar_donatur }} style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: 90, width: 90, borderRadius: 45, }} />
//       <View style={style.Label1}>
//         <Text>{item.nama} </Text>
//         <Text>{item.email}</Text>
//         {/* <Text>Mata Pelajaran</Text>
//           <Text>Tingkat</Text> */}
//         {/* <Text>{item.alamat}</Text> */}
//       </View>
//       {/* </View> */}
//     </TouchableOpacity>
//   </View> */}
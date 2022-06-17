import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { WebView } from 'react-native-webview';

class Web extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detbe:[],
      item:[],
      deskripsi: this.props.route.params.des, //this.props.route.params itu digunakan untuk 
                                             //beda halaman ketika mengirimkan di halaman lain
      
    }
  }
    render() {
      const { detbe } = this.state
      const { item } = this.state
        return (
            <WebView
            source={{uri: 'https://berbagibahagia.org/program/'+ this.state.deskripsi}}
            />
            )
          }
        }

export default Web
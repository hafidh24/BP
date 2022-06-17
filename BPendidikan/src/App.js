import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Router from './router';
import { Provider } from 'react-redux';
import { store } from './redux/store/index';

export default class App extends Component {
  render() {
    return (
    <Provider store={store}>
     <Router/>
    </Provider>
    )
  }
}

const styles = StyleSheet.create({})

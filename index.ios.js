/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} from 'react-native';

var Forecast = require('./Forecast');

const API_KEY = 'bbeb34ebf60ad50f7893e7440a1e2b0b';

var WeatherProject = React.createClass({
  getInitialState() {
    return {
      zip: '',
      forecast: {
        main: 'Clouds',
        description: 'few clouds',
        temp: 45.7,
      }
    };
  },
  _handleTextChange(event){
    var zip = event.nativeEvent.text;
    fetch('http://api.openweathermap.org/data/2.5/weather?q='
      + zip + '&units=metric&APPID=' + API_KEY)
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({
          forecast: {
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: responseJSON.main.temp
          }
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  },
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./img/flowers.png')} style={styles.backdrop}>
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>
                Current weather for
              </Text>
              <View style={styles.zipContainer}>
                <TextInput style={[styles.zipCode, styles.mainText]} returnKeyType='go' onSubmitEditing={this._handleTextChange} />
              </View>
            </View>
            <Forecast
              main={this.state.forecast.main}
              description={this.state.forecast.description}
              temp={this.state.forecast.temp}/>
          </View>
        </Image>
      </View>
    );
  }
});

const baseFontSize = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    borderColor: '#FFFFFF',
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column',
    width: null,
    height: null,
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: '#FF0000',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    padding: 30,
  },
  zipContainer: {
    flex: 1,
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
  zipCode: {
    // width: 100,
    height: baseFontSize,
  },
  mainText: {
    flex: 1,
    fontSize: baseFontSize,
    color: '#FFFFFF',
  }
});

AppRegistry.registerComponent('WeatherProject', () => WeatherProject);

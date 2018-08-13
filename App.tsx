/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { ConfigManager } from './ConfigManager';
import { ClockScreen } from './ClockScreen';
import { SettingsScreen } from './SettingsScreen';
import { AppReadyScreen } from './AppReadyScreen';


const App = createStackNavigator({
    AppReadyScreen: { screen: AppReadyScreen },
    ClockScreen: { screen: ClockScreen },
    SettingsScreen: { screen: SettingsScreen }
  });

export default App;
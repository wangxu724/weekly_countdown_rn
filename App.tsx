/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import { createSwitchNavigator } from 'react-navigation';

import { ConfigManager } from './src/ConfigManager';
import { ClockScreen } from './src/ClockScreen';
import { SettingsScreen } from './src/SettingsScreen';
import { AppReadyScreen } from './src/AppReadyScreen';


const App = createSwitchNavigator({
    AppReadyScreen: { screen: AppReadyScreen },
    ClockScreen: { screen: ClockScreen },
    SettingsScreen: { screen: SettingsScreen }
  });

export default App;
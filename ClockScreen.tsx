/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableWithoutFeedback, StatusBar} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import KeepAwake from 'react-native-keep-awake';

import { ConfigManager } from './ConfigManager';
import { Clock} from './Clock';
import { SettingsScreen } from './SettingsScreen';


type Props = {
    navigation: any,
};
export class ClockScreen extends Component<Props> {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <TouchableWithoutFeedback onLongPress={this.onLongPress}>
                <View style={styles.container}>
                    <StatusBar hidden={true}/>
                    <Clock> </Clock>
                    <KeepAwake></KeepAwake>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    onLongPress = () => {
        this.props.navigation.navigate('SettingsScreen', {});
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

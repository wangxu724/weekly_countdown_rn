/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, ToastAndroid, Text, View, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import KeepAwake from 'react-native-keep-awake';

import { Clock} from './Clock';
import { SettingsScreen } from './SettingsScreen';
import { getConfigManager } from './util';

type Props = {
    navigation: any,
};
export class ClockScreen extends Component<Props> {
    static navigationOptions = {
        header: null,
    };

    configManager = getConfigManager();

    render() {
        return (
            <TouchableWithoutFeedback onLongPress={this.onLongPress}>
                <View style={styles.container}>
                    <Clock> </Clock>
                    <KeepAwake></KeepAwake>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    onLongPress = () => {
        this.props.navigation.navigate('SettingsScreen', {});
    }

    componentDidMount() {
        if (this.configManager.getIsFirstTimeLaunch()) {
            ToastAndroid.show('Tips: Long press the screen to go to settings!', ToastAndroid.LONG);
            this.configManager.setIsFirstTimeLaunchAsync(false);
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    top:0,
    bottom:0,
    left:0,
    right:0,
    position: 'absolute',
    backgroundColor: '#FFC90E',
  }
});

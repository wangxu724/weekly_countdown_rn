import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { appReady } from './util';

import { ConfigManager } from './ConfigManager';

type Props = {
    navigation: any
};
export class AppReadyScreen extends Component<Props> {
    static navigationOptions = {
        header: null,
    };

    constructor(props: Props) {
        super(props);
        const { navigate } = this.props.navigation;
        appReady().then(() => {
            navigate('ClockScreen', {})
        });
    }

    render() {
        return (
            <View style={styles.container}>
            </View>
        );
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

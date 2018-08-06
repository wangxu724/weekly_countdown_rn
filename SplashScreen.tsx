import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { appReady } from './util';

import { ConfigManager } from './ConfigManager';

type Props = {
    navigation: any
};
export class SplashScreen extends Component<Props> {
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
            <View style={{backgroundColor: '#FFC90E'}}>
                {/* <Text>This is splash screen</Text> */}
            </View>
        );
    }
}

import React, {Component} from 'react';
import {Platform, StyleSheet, Animated, Easing, Image, Text, View, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { appReady } from './util';

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
            setTimeout(() => { navigate('ClockScreen', {}) }, 1500);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('./icon.png')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        top:0,
        bottom:0,
        left:0,
        right:0,
        position: 'absolute',
        backgroundColor: '#FFC90E',
      },
    image: {
        height: 150,
        width: 150,
    }
  });

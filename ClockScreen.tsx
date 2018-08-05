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
import { Clock} from './Clock';
import { Settings} from './Settings';


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
                    <Clock> </Clock>
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


const App = createStackNavigator({
    SplashScreen: { screen: SplashScreen },
    ClockScreen: { screen: Clock },
    SettingsScreen: { screen: Settings }
  });

export default App;
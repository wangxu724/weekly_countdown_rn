/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';

import { ConfigManager } from './ConfigManager';
import { Clock} from './Clock';
import { Settings} from './Settings';


enum Screen {
    ClockScreen = 0,
    SettingsScreen
}

type Props = {};
export default class App extends Component<Props> {
    state = {
        appReady: false,
        currentScreen: 0,
    }
    private configManager: ConfigManager;

    constructor(props: object) {
        super(props);
        this.configManager = new ConfigManager();
        this.configManager.initialize()
            .then(() => {
                this.setState({ appReady: true });
            });
    }

    render() {
        if (this.state.appReady) {
            return this.renderAppContent();
        } else {
            return this.renderSplashScreen();
        }
    }

    renderSplashScreen() {
        return (
            <View>
                <Text>This is splash screen</Text>
            </View>
        );
    }

    renderAppContent() {
        if(this.state.currentScreen == Screen.ClockScreen) {
            return (
                <TouchableWithoutFeedback onLongPress={this.onPress}>
                    <View style={styles.container}>
                        <Clock> </Clock>
                    </View>
                </TouchableWithoutFeedback>
            );
        } else {
            return (
                <TouchableWithoutFeedback onLongPress={this.onSettingsClose}>
                    <View style={styles.container}>
                        <Settings configManager={this.configManager}> </Settings>
                    </View>
                </TouchableWithoutFeedback>
            );
        }
    }

    onPress = () => {
        this.setState({ currentScreen: Screen.SettingsScreen });
    }

    onSettingsClose = () => {
        this.setState({ currentScreen: Screen.ClockScreen });
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

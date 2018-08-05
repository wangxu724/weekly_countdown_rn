import React, {Component} from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

import { ConfigManager } from './ConfigManager';


type Props = {
    configManager: ConfigManager
};

export class SettingsScreen extends Component<Props> {
    state = {
        theme: 'fake theme',
        clockFace: 'fake clockFace',
        weekStartDay: 'fake weekStartDay'
    };

    constructor(props: Props) {
        super(props);
        Promise.all([
            this.props.configManager.getTheme(),
            this.props.configManager.getClockFace(),
            this.props.configManager.getWeekStartDay()
        ]).then(([theme, clockFace, weekStartDay]) => {
            this.setState({
                theme: theme,
                clockFace: clockFace,
                weekStartDay: weekStartDay
            })
        })
    }

    render() {
      return (
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.titleStyle}>
                        Settings
                    </Text>
                </View>
                <Text>
                    Theme: {this.state.theme}{'\n'}
                    Clock face: {this.state.clockFace}{'\n'}
                    Week start day: {this.state.weekStartDay}{'\n'}
                </Text>
            </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFC90E',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        top:0,
        bottom:0,
        left:0,
        right:0,
        position: 'absolute'
    },
    headerView: {
        height: 60,
        backgroundColor: 'white'
    },
    titleStyle: {
        fontSize: 40
    }
});





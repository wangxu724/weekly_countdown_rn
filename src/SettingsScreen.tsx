import React, {Component} from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';

import { getConfigManager } from './util';


export enum Theme {
    NotAvailable = 0,
    Yellow,
    Beige,
}

type Props = {
};

export class SettingsScreen extends Component<Props> {
    static navigationOptions = {
        title: 'Settings',
    };

    state = {
        theme: Theme.Yellow,
        clockFace: '',
        weekStartDay: 1
    };

    configManager = getConfigManager();

    constructor(props: Props) {
        super(props);
        Promise.all([
            this.configManager.getTheme(),
            this.configManager.getClockFace(),
            this.configManager.getWeekStartDay()
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
                <View style={styles.setting}>
                    <Text style={styles.text}>Theme</Text>
                    <Picker
                        style={styles.picker}
                        prompt={'Choose a theme'}
                        selectedValue={this.state.theme}
                        onValueChange={this.onThemeSelected}>
                        <Picker.Item label="Yellow" value={Theme.Yellow} />
                        <Picker.Item label="Beige" value={Theme.Beige} />
                    </Picker>
                </View>

                {/* <View style={styles.setting}>
                    <Text style={styles.text}>Clock face</Text>
                    <Picker
                        style={styles.picker}
                        prompt={'Choose a clock face'}
                        selectedValue={this.state.clockFace}
                        onValueChange={this.onClockFaceSelected}>
                        <Picker.Item label="Text" value="text" />
                    </Picker>
                </View> */}

                <View style={styles.setting}>
                    <Text style={styles.text}>Week start on</Text>
                    <Picker
                        style={styles.picker}
                        prompt={'Choose a week start day'}
                        selectedValue={this.state.weekStartDay}
                        onValueChange={this.onWeekStartDaySelected}>
                        <Picker.Item label="Monday" value={1} />
                        <Picker.Item label="Tuesday" value={2} />
                        <Picker.Item label="Wednesday" value={3} />
                        <Picker.Item label="Thursday" value={4} />
                        <Picker.Item label="Friday" value={5} />
                        <Picker.Item label="Saturday" value={6} />
                        <Picker.Item label="Sunday" value={7} />
                    </Picker>
                </View>
            </View>
      );
    }

    onThemeSelected = (value: Theme, index: number) => {
        this.configManager.setTheme(value);
        this.setState({theme: value});
    }

    onClockFaceSelected = (value: any, index: number) => {
        this.configManager.setClockFace(value);
        this.setState({clockFace: value});
    }
    onWeekStartDaySelected = (value: number, index: number) => {
        this.configManager.setWeekStartDay(value);
        this.setState({weekStartDay: value});
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    setting: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderColor: '#DCDCDC',
        borderWidth: 0.2
    },
    text: {
        fontSize: 20,
        justifyContent: 'flex-start',
        padding: 10,
        flex: 1.5,
        borderRightColor: '#DCDCDC',
        borderRightWidth: 0.2
    },
    picker: {
        justifyContent: 'flex-end',
        flex: 1,
    }
});





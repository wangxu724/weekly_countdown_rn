import React, {Component} from 'react';
import {Text } from 'react-native';

import { ConfigManager } from './ConfigManager';


type Props = {
    configManager: ConfigManager
};

export class Settings extends Component<Props> {
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
          <Text>
                Theme: {this.state.theme}{'\n'}
                Clock face: {this.state.clockFace}{'\n'}
                Week start day: {this.state.weekStartDay}{'\n'}
            </Text>
      );
    }
}




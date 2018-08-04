import React, {Component} from 'react';
import {Text } from 'react-native';


type Props = {};

export class Clock extends Component<Props> {
    static navigationOptions = {
        title: 'Clock',
    };

    render() {
      return (
          <Text>Clock Time be shown here</Text>
      );
    }
}




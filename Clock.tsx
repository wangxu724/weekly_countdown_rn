import React, {Component} from 'react';
import {Text, StyleSheet, View } from 'react-native';

import { Bar } from 'react-native-progress';


const PASSED_DAY_COLOR = '#32CD32';
const CURRENT_DAY_COLOR = '#1E90FF'
const LEFT_DAY_COLOR = '#1E90FF';

type Props = {};

export class Clock extends Component<Props> {
    state = {
        nDay: 0,
        nHour: 0,
        nMinute: 0,
        nSecond: 0
    }

    constructor(props: Props) {
        super(props);
        setInterval(this.updateTime, 500);
    }
    render() {
        const day = ('0' + String(7 - this.state.nDay)).slice(-2);
        const hour = ('0' + String(23 - this.state.nHour)).slice(-2);
        const minute =('0' + String(59 - this.state.nMinute)).slice(-2);
        const second =('0' + String(59 - this.state.nSecond)).slice(-2);
        const flashStyle = this.state.nSecond%2 == 0
            ? styles.flash1
            : styles.flash2;

        return (
            <View style={styles.containerStyle}>
                <View style={styles.viewStyle}>
                    {this.renderAllProgressBar()}
                </View>

                <View style={styles.viewStyle}>
                    <Text style={styles.clockStyle}>{hour}</Text>
                    <Text style={flashStyle}> : </Text>
                    <Text style={styles.clockStyle}>{minute}</Text>
                </View>
            </View>
        );
    }

    updateTime = () => {
        const weekDayOffset = 0;
        const day = new Date();
        let nDay = day.getDay();
        nDay = nDay == 0 ? 7 : nDay;
        nDay = nDay - weekDayOffset;
        nDay = nDay <= 0 ? nDay + 7 : nDay;

        this.setState({
            nDay: nDay,
            nHour: day.getHours(),
            nMinute: day.getMinutes(),
            nSecond: day.getSeconds()
        });
    }

    renderAllProgressBar() {
        return [1,2,3,4,5,6,7].map(n => this.renderProgressBar(n));
    }

    renderProgressBar(id: number) {
        let progress = 0;
        if (id < this.state.nDay) {
            progress = 1;
        } else if (id === this.state.nDay) {
            progress = (this.state.nHour+1)/24;
        }

        return (
            <Bar
                style={{margin:1}}
                key={id}
                width={45}
                borderWidth={1}
                color={PASSED_DAY_COLOR}
                unfilledColor={LEFT_DAY_COLOR}
                borderColor={'black'}
                progress={progress}>
            </Bar>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#FFC90E',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        top:0,
        bottom:0,
        left:0,
        right:0,
        position: 'absolute'
    },
    viewStyle: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center'
    },
    clockStyle: {
        fontWeight: 'bold',
        fontSize: 100,
        color: 'black'
    },
    flash1: {
        fontWeight: 'bold',
        fontSize: 92,
        color: 'black',
        opacity: 1
    },
    flash2: {
        fontWeight: 'bold',
        fontSize: 92,
        color: 'black',
        opacity: 0.05
    }
  });


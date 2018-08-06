import React, {Component} from 'react';
import {Text, StyleSheet, View } from 'react-native';
import { Bar } from 'react-native-progress';

import { getConfigManager } from './util';

const PASSED_DAY_COLOR = '#32CD32';
const CURRENT_DAY_COLOR = '#1E90FF'
const LEFT_DAY_COLOR = '#1E90FF';

type Props = {};

export class Clock extends Component<Props> {
    static navigationOptions = {
        header: null,
    };

    state = {
        nDay: 0,
        nHour: 0,
        nMinute: 0,
        nSecond: 0
    }
    interval: number = 0;
    configManager = getConfigManager();

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this.interval = setInterval(this.updateTime, 500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const day = ('0' + String(7 - this.state.nDay)).slice(-2);
        const hour = ('0' + String(23 - this.state.nHour)).slice(-2);
        const minute =('0' + String(59 - this.state.nMinute)).slice(-2);
        const second =('0' + String(59 - this.state.nSecond)).slice(-2);
        const flashStyle = this.state.nSecond%2 == 0
            ? [styles.flashCommon, styles.flashShow]
            : [styles.flashCommon, styles.flashHide];

        return (
            <View style={[styles.containerCommon, getBackgroundColor(this.configManager.getTheme())]}>
                <View style={[styles.viewCommon, styles.viewSmallMargin]}>
                    {this.renderWeekProgressBar()}
                </View>

                <View style={[styles.viewCommon,styles.viewSmallMargin]}>
                    <Text style={styles.clockStyle}>{hour}</Text>
                    <Text style={flashStyle}> : </Text>
                    <Text style={styles.clockStyle}>{minute}</Text>
                </View>

                <View style={[styles.viewCommon, styles.viewLargeMargin]}>
                    {this.renderMinuteProgressBar()}
                </View>
            </View>
        );
    }

    updateTime = () => {
        const weekDayOffset = this.configManager.getWeekStartDay() - 1;
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

    renderWeekProgressBar() {
        return [1,2,3,4,5,6,7].map(n => this.renderWeekDayProgressBar(n));
    }

    renderWeekDayProgressBar(id: number) {
        let progress = 0;
        if (id < this.state.nDay) {
            progress = 1;
        } else if (id === this.state.nDay) {
            progress = (this.state.nHour+1)/24;
        }

        return (
            <Bar
                style={{margin:3}}
                key={id}
                width={45}
                height={10}
                borderWidth={1}
                color={PASSED_DAY_COLOR}
                unfilledColor={LEFT_DAY_COLOR}
                borderColor={'black'}
                progress={progress}>
            </Bar>
        );
    }

    renderMinuteProgressBar() {
        let progress = this.state.nSecond/60;
        return (
            <Bar
                width={340}
                height={5}
                borderWidth={1}
                color={PASSED_DAY_COLOR}
                unfilledColor={LEFT_DAY_COLOR}
                borderColor={'black'}
                progress={progress}>
            </Bar>
        );
    }
}

export function getBackgroundColor(theme: string): any {
    switch(theme) {
        case 'white':
            return styles.constainerWhite;
        case 'beige':
            return styles.constainerBeige;
        default:
            return styles.constainerYellow;
    }
}

const styles = StyleSheet.create({
    containerCommon: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        top:0,
        bottom:0,
        left:0,
        right:0,
        position: 'absolute'
    },
    constainerYellow: {
        backgroundColor: '#FFC90E',
    },
    constainerBeige: {
        backgroundColor: '#F5F5DC',
    },
    constainerWhite: {
        backgroundColor: 'white',
    },
    viewCommon: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    viewLargeMargin: {
        margin: 15,
    },
    viewSmallMargin: {
        margin: 25,
    },
    clockStyle: {
        fontWeight: 'bold',
        fontSize: 100,
        color: 'black'
    },
    flashCommon: {
        fontWeight: 'bold',
        fontSize: 92,
        color: 'black',
        opacity: 1
    },
    flashShow: {
        opacity: 1
    },
    flashHide: {
        opacity: 0.05
    }
});


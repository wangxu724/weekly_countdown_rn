import { AsyncStorage } from "react-native";
import { Theme } from './SettingsScreen';
import { toTheme } from './util';

const StoreKey_Theme = 'store_key_theme';
const StoreKey_ClockFace = 'store_key_clock_face';
const StoreKey_WeekStartDay = 'store_key_weeky_start_day';
const StoreKey_IsFirstTimeLaunch = 'store_key_is_first_time_launch';

export class ConfigManager {
    private theme = Theme.NotAvailable;
    private clockFace = '';
    private weekStartDay = 0;
    private isFirstTimeLaunch = true;

    initialize(): Promise<void> {
        return Promise.all([
            this.getThemeAsync(),
            this.getClockFaceAsync(),
            this.getWeekStartDayAsync(),
            this.getIsFirstTimeLaunchAsync(),
        ]).then(()=>{});
    }

    async getThemeAsync(): Promise<Theme> {
        if (this.theme === Theme.NotAvailable) {
            this.theme = toTheme(await this.getValue(StoreKey_Theme));
            this.theme = this.theme === Theme.NotAvailable ? Theme.Yellow : this.theme;
        }
        return this.theme;
    }

    async getClockFaceAsync(): Promise<string> {
        if (this.clockFace === '') {
            this.clockFace = await this.getValue(StoreKey_ClockFace);
        }
        return this.clockFace
    }

    async getWeekStartDayAsync(): Promise<number> {
        if (this.weekStartDay === 0) {
            this.weekStartDay = Number(await this.getValue(StoreKey_WeekStartDay));
            this.weekStartDay = this.weekStartDay === 0 ? 1 : this.weekStartDay;
        }
        return this.weekStartDay;
    }

    async getIsFirstTimeLaunchAsync(): Promise<boolean> {
        this.isFirstTimeLaunch = "true" === await this.getValue(StoreKey_IsFirstTimeLaunch);
        return this.isFirstTimeLaunch;
    }

    async setTheme(newTheme: Theme): Promise<void> {
        this.theme = newTheme;
        return this.setValue(StoreKey_Theme, String(newTheme));
    }

    async setClockFace(newClockFace: string): Promise<void> {
        this.clockFace = newClockFace;
        return this.setValue(StoreKey_ClockFace, newClockFace);
    }

    async setWeekStartDay(newStartDay: number): Promise<void> {
        this.weekStartDay = newStartDay;
        return this.setValue(StoreKey_WeekStartDay, String(newStartDay));
    }

    async setIsFirstTimeLaunchAsync(newValue: boolean): Promise<void> {
        this.isFirstTimeLaunch = newValue;
        return this.setValue(StoreKey_IsFirstTimeLaunch, String(newValue));
    }

    async getValue(key: string): Promise<string> {
        try {
            const value = await AsyncStorage.getItem(key);
            if (!!value) {
                return value
            } else {
                return '';
            }
        } catch (error) {
               return '';
        }
    }

    async setValue(key: string, newValue: string): Promise<void> {
        try {
            return await AsyncStorage.setItem(key, newValue || '');
        } catch (error) {
        }
    }

    getTheme(): Theme {
        return this.theme;
    }

    getClockFace(): string {
        return this.clockFace
    }

    getWeekStartDay(): number {
        return this.weekStartDay;
    }

    getIsFirstTimeLaunch(): boolean {
        return this.isFirstTimeLaunch;
    }
}
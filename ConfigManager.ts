import { AsyncStorage } from "react-native"

const StoreKey_Theme = 'store_key_theme';
const StoreKey_ClockFace = 'store_key_clock_face';
const StoreKey_WeekStartDay = 'store_key_weeky_start_day';

export class ConfigManager {
    private theme = '';
    private clockFace = '';
    private weekStartDay = '';

    initialize(): Promise<void> {
        return Promise.all([
            this.getTheme(),
            this.getClockFace(),
            this.getWeekStartDay()]).then(()=>{});
    }

    async getTheme(): Promise<string> {
        if (this.theme === '') {
            this.theme = await this.getValue(StoreKey_Theme);
        }
        return this.theme;
    }

    async getClockFace(): Promise<string> {
        if (this.clockFace === '') {
            this.clockFace = await this.getValue(StoreKey_ClockFace);
        }
        return this.clockFace
    }

    async getWeekStartDay(): Promise<string> {
        if (this.weekStartDay === '') {
            this.weekStartDay = await this.getValue(StoreKey_WeekStartDay);
        }
        return this.weekStartDay;
    }

    async setTheme(newTheme: string): Promise<void> {
        return this.setValue(StoreKey_Theme, newTheme);
    }

    async setClockFace(newClockFace: string): Promise<void> {
        return this.setValue(StoreKey_ClockFace, newClockFace);
    }

    async setWeekStartDay(newStartDay: string): Promise<void> {
        return this.setValue(StoreKey_WeekStartDay, newStartDay);
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
}
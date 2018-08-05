import { AsyncStorage } from "react-native"

const StoreKey_Theme = 'store_key_theme';
const StoreKey_ClockFace = 'store_key_clock_face';
const StoreKey_WeekStartDay = 'store_key_weeky_start_day';

export class ConfigManager {
    private theme = '';
    private clockFace = '';
    private weekStartDay = 0;

    initialize(): Promise<void> {
        return Promise.all([
            this.getThemeAsync(),
            this.getClockFaceAsync(),
            this.getWeekStartDayAsync()]).then(()=>{});
    }

    async getThemeAsync(): Promise<string> {
        if (this.theme === '') {
            this.theme = await this.getValue(StoreKey_Theme);
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
            this.weekStartDay = await Number(this.getValue(StoreKey_WeekStartDay));
            this.weekStartDay = !this.weekStartDay ? 1 : this.weekStartDay;
        }
        return this.weekStartDay;
    }

    async setTheme(newTheme: string): Promise<void> {
        this.theme = newTheme;
        return this.setValue(StoreKey_Theme, newTheme);
    }

    async setClockFace(newClockFace: string): Promise<void> {
        this.clockFace = newClockFace;
        return this.setValue(StoreKey_ClockFace, newClockFace);
    }

    async setWeekStartDay(newStartDay: number): Promise<void> {
        this.weekStartDay = newStartDay;
        return this.setValue(StoreKey_WeekStartDay, String(newStartDay));
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

    getTheme(): string {
        return this.theme;
    }

    getClockFace(): string {
        return this.clockFace
    }

    getWeekStartDay(): number {
        return this.weekStartDay;
    }
}
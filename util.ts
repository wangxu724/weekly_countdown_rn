import { ConfigManager } from './ConfigManager'
import { Theme } from './SettingsScreen';

let configManager: ConfigManager;

export function getConfigManager(): ConfigManager {
    if (!!configManager) {
        return configManager
    } else {
        configManager = new ConfigManager();
        return configManager;
    }
}

export function appReady(): Promise<void> {
    return getConfigManager().initialize();
}

export function getBackgroundColor(theme: Theme): any {
    switch(theme) {
        case Theme.Beige:
            return '#F5F5DC';
        default:
            return '#FFC90E';
    }
}

export function toTheme(value: string): Theme {
    switch(Number(value)) {
        case 1:
            return Theme.Yellow;
        case 2:
            return Theme.Beige;
        default:
            return Theme.NotAvailable;
    }
}
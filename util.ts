import { ConfigManager } from './ConfigManager'

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
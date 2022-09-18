const commonConfig = {
    version: "1.1.2",
    orientation: "portrait",
    icon: "./assets/appicon.png",
    splash: {
        image: "./assets/chameleon_splash.png",
        resizeMode: "contain",
        backgroundColor: "#00AAB7",
    },
    updates: {
        "fallbackToCacheTimeout": 0
    },
    assetBundlePatterns: [
        "**/*"
    ],
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/appicon_foreground.png",
            backgroundImage: "./assets/appicon_background.png"
        },
        useNextNotificationsApi: true,
        package: "leon.system.development.chameleon",
        versionCode: 11,
        config: {
            googleMaps: {
                apiKey: "AIzaSyDwo0wUn-BrRM80Fa-wbQZjaQwYw4sITes"
            },
        },
        googleServicesFile: "./google-services.json"
    },
    web: {
        favicon: "./assets/favicon.png"
    },
}

module.exports = () => {
    if (process.env.APP_ENV === 'staging') {
        return {
            ...commonConfig,
            name: "STG-chameLEON",
            slug: "STG-chameLEON",
            ios: {
                supportsTablet: false,
                bundleIdentifier: "leon.system.development.chameleon-stg",
                buildNumber: "1.0.10",
                config: {
                    googleMapsApiKey: "AIzaSyDwo0wUn-BrRM80Fa-wbQZjaQwYw4sITes"
                },
                infoPlist: {
                    NSPhotoLibraryUsageDescription: "写真をアップロードするにはフォトライブラリへのアクセスが必要です。"
                }
            },
        };
    }
    else if (process.env.APP_ENV === 'production') {
        return {
            ...commonConfig,
            name: "chameLEON",
            slug: "chameLEON",
            ios: {
                supportsTablet: false,
                bundleIdentifier: "leon.system.development.chameleon",
                buildNumber: "1.0.10",
                config: {
                    googleMapsApiKey: "AIzaSyDwo0wUn-BrRM80Fa-wbQZjaQwYw4sITes"
                },
                infoPlist: {
                    NSPhotoLibraryUsageDescription: "写真をアップロードするにはフォトライブラリへのアクセスが必要です。"
                }
            },
        };
    }
    else {
        return {
            ...commonConfig,
            name: "DEV-chameLEON",
            slug: "DEV-chameLEON",
            ios: {
                supportsTablet: false,
                bundleIdentifier: "leon.system.development.chameleon-dev",
                buildNumber: "1.0.10",
                config: {
                    googleMapsApiKey: "AIzaSyDwo0wUn-BrRM80Fa-wbQZjaQwYw4sITes"
                },
                infoPlist: {
                    NSPhotoLibraryUsageDescription: "写真をアップロードするにはフォトライブラリへのアクセスが必要です。"
                }
            },
        };
    }
};
import Constants from 'expo-constants'

const ENV = {
    dev: {
        apiUrl: 'https://dev-leon-chameleon.com/api1.0/',
    },
    staging: {
        apiUrl: 'https://stg-leon-chameleon.com/api1.0/',
    },
    prod: {
        apiUrl: 'http://leon-chameleon.com/api1.0/',
    },

};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    if (__DEV__) {
        return ENV.dev
    }
    else if (env === 'staging') {
        return ENV.staging
    }
    else if (env === 'prod') {
        return ENV.prod
    }
};

export default getEnvVars;
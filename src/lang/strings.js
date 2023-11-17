import { NativeModules } from 'react-native';

var strings = require('./pt-BR.json');

const deviceLanguage =
    Platform.OS === 'ios' 
    ? 
        NativeModules.SettingsManager.settings.AppleLanguages[0]
    : 
        NativeModules.I18nManager.localeIdentifier;

if(deviceLanguage.includes('en')){
    strings = require('./en.json');
}
else if(deviceLanguage.includes('es-PY')){
    strings = require('./es-PY.json');
}
else if(deviceLanguage.includes('es')){
    strings = require('./es.json');
}

export default strings;
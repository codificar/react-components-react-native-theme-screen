import Toast from 'react-native-root-toast';

/**
 * Show Toast to Android and iOS
 * @param {Toast Message} msg
 * @param {DURATION} duration
 */
 export function showToast(msg, duration = 3000) {
    if (typeof msg !== 'string') {
        if (typeof msg === null) 
            msg = '';
        else {
            msg = JSON.stringify(msg);
        }
    }
    Toast.show(msg, {
        duration: duration,
        position: Toast.positions.BOTTOM + 10,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });
}
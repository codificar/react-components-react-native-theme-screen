import axios from 'axios';

/**
 * Recupera os temas disponíveis
 * 
 * @param {String} url 
 * @returns 
 */
export function getThemes(url, token) {
    return axios.get(`${url}/api/application/themes`, {
        params: {
            token
        }
    });
}

/**
 * Salva a preferência do usuário
 * 
 * @param {String} url 
 * @param {Number} id 
 * @param {String} token 
 * @param {Number} theme_id 
 * @param {String} type 
 * @returns 
 */
export function saveUserTheme(url, id, token, theme_id, type, is_register) {
    return axios.post(`${url}/api/themes/save_user`, {
        user_id: id,
        id,
        token,
        theme_id,
        type,
        is_register
    });
}

/**
 * Salva a preferência do usuário
 * 
 * @param {String} url 
 * @param {Number} id 
 * @param {String} token 
 * @param {Number} theme_id 
 * @param {String} type 
 * @returns 
 */
 export function saveProviderTheme(url, id, token, theme_id, type, is_register) {
    return axios.post(`${url}/api/themes/save_provider`, {
        provider_id: id,
        id,
        token,
        theme_id,
        type,
        is_register
    });
}
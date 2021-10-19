import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Toolbar from '../components/ToolBar';
import { getThemes, saveUserTheme, saveProviderTheme } from '../services/api';
import Loader from '../components/Loader';
import { showToast } from '../services/util';
import Toast from 'react-native-root-toast';
import strings from '../lang/strings';

class ThemeSelectorScreen extends Component {
    constructor(props) {
        super(props);
        
        const { 
            url,
            is_register,
            type,
            id,
            token,
            navigateAfterConfirm
        } = this.props.navigation.state.params;
        
        this.state = {
            isLoading: false,
            message: strings.message,
            loadingColor: 'grey',
            url: url,
            is_register: is_register,
            type: type,
            id: id,
            token: token,
            menu_name: '',
            menu_frase: '',
            upload_url: '',
            themes: [],
            theme_id: null,
            navigateAfterConfirm: navigateAfterConfirm
        }
    }

    componentDidMount() {
        this.getThemes();
    }

    async getThemes() {
        try {
            this.setState({ isLoading: true });
            const { data } = await getThemes(this.state.url);

            let { menu_name, menu_frase, themes, url } = data;

            this.setState({
                menu_name,
                menu_frase,
                themes,
                upload_url: url,
                isLoading: false
            });
            
        } catch (error) {
            this.setState({ isLoading: false });
            console.log('getThemes', error);
        }
    }

    async saveTheme() {
        try {
            if (this.state.theme_id == null || this.state.theme_id == '') {
                return showToast(
                    strings.theme_required,
                    Toast.durations.SHORT,
                );
            }
            this.setState({ isLoading: true });

            const { data } = this.state.type == 'user' ?
                await saveUserTheme(
                    this.state.url,
                    this.state.id,
                    this.state.token,
                    this.state.theme_id,
                    this.state.type
                ) :
                await saveProviderTheme(
                    this.state.url,
                    this.state.id,
                    this.state.token,
                    this.state.theme_id,
                    this.state.type
                );

            if (data.success) {
                showToast(
                    strings.success,
                    Toast.durations.SHORT,
                );

                this.props.navigation.navigate(this.state.navigateAfterConfirm);
            }

            this.setState({ isLoading: false });
        } catch (error) {
            showToast(
                strings.error,
                Toast.durations.SHORT,
            );
            this.setState({ isLoading: false });
            console.log('saveTheme', error);
        }
    }

    selectTheme(theme_id) {
        this.setState({
            theme_id
        });

        showToast(
            strings.select,
            Toast.durations.SHORT,
        );
    }

    renderThemes() {
        let listThemes = this.state.themes.map(data => (
            <TouchableOpacity
                key={data.theme_id}
                style={styles.list_item}
                onPress={() => this.selectTheme(data.theme_id)}
            >
                <Image
                    style={styles.theme_logo}
                    source={{
                        uri: `${this.state.upload_url}/${data.app_image_icon}`,
                    }}
                />
            </TouchableOpacity>
        ));

        return listThemes;
    }

    render() {
        return (
            <View style={styles.container}>
                <Loader
                    loading={this.state.isLoading}
                    message={this.state.message}
                    loadingColor={this.state.loadingColor}
                />
                <View>
                    {
                        this.state.is_register == false &&
                        <View style={{ marginLeft: 25 }}>
                            <Toolbar onPress={() => this.props.navigation.goBack()}/>
                        </View>
                    }

                    <View style={{ marginLeft: 25, marginBottom: 25 }}>
                        <View>
                            <Text style={styles.menu_name}>{this.state.menu_name}</Text>
                        </View>
                        <View>
                            <Text style={styles.menu_frase}>{this.state.menu_frase}</Text>
                        </View>
                    </View>

                    <View style={styles.list_container}>
                        {this.renderThemes()}
                    </View>
                </View>

                <View style={styles.btn_content}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => this.saveTheme()}
                    >
                        <Text style={styles.btn_text}>{strings.confirm}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between'
    },
    menu_name: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4
    },
    menu_frase: {
        fontSize: 15,
        marginBottom: 4
    },
    list_container: {
        marginHorizontal: 25,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    list_item: {
        width: '30%',
        height: 90,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    theme_logo: {
        width: '90%',
        height: '90%'
    },
    btn_content: {
        marginHorizontal: 25,
        marginBottom: 25
    },
    btn: {
        width: '100%',
        borderRadius: 5,
        padding: 12,
        alignItems: 'center',
        backgroundColor: '#979797',
    },
    btn_text: {
        color: '#fff',
        fontWeight: 'bold'
    }
});

export default withNavigation(ThemeSelectorScreen);
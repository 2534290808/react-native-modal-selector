'use strict';

import React, {
    View,
    StyleSheet,
    Dimensions,
    Modal,
    Text,
    ScrollView,
    TouchableOpacity,
    Platform,
    PropTypes
} from 'react-native';

import styles from './style';
import BaseComponent from './BaseComponent';
import rebound from 'rebound';

let tag;
const {height, width} = Dimensions.get('window');
const Portal = require('react-native/Libraries/Portal/Portal.js');

const propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    initValue: PropTypes.string,
    selectStyle: PropTypes.object,
    optionStyle: PropTypes.object,
    optionTextStyle: PropTypes.object,
    sectionStyle: PropTypes.object,
    sectionTextStyle: PropTypes.object,
    cancelStyle: PropTypes.object,
    cancelTextStyle: PropTypes.object,
    overlayStyle: PropTypes.object,
    cancelText: PropTypes.string
}

const defaultProps = {
    data: [],
    onChange: ()=> {
    },
    initValue: 'Select me!',
    selectStyle: {},
    optionStyle: {},
    optionTextStyle: {},
    sectionStyle: {},
    sectionTextStyle: {},
    cancelStyle: {},
    cancelTextStyle: {},
    overlayStyle: {},
    cancelText: 'cancel'
}

export default class SpringSelector extends BaseComponent {

    constructor() {

        super();

        this._bind(
            'onChange',
            'open',
            'close'
        );

        this.state = {
            animated: true,
            modalVisible: false,
            transparent: false,
            selected: 'please select',
            selectStyle: {},
            optionStyle: {},
            cancelStyle: {},
            panelStyle: {},
            optionTextStyle: {},
            cancelTextStyle: {},
            overlayStyle: {},
            cancelText: 'cancel',
        };
    }

    componentDidMount() {

        if (this.props.initValue) {
            this.setState({selected: this.props.initValue});
        }
        if (this.props.cancelText) {
            this.setState({cancelText: this.props.cancelText});
        }
    }

    onChange(item) {
        this.props.onChange(item);
        this.setState({selected: item.label});
        this.close();
    }

    close() {
        if (Platform.OS == 'android') {
            Portal.closeModal(tag);
        } else {
            this.setState({
                modalVisible: false
            });
        }
    }

    open() {
        if (Platform.OS == 'android') {
            Portal.showModal(tag, this.renderOptionList());
        } else {
            this.setState({
                modalVisible: true
            });
        }
    }

    renderSection(section) {
        return (
            <View key={section.key} style={[styles.sectionStyle,this.state.sectionStyle]}>
                <Text style={[styles.sectionTextStyle,this.state.sectionTextStyle]}>{section.label}</Text>
            </View>
        );
    }

    renderOption(option) {
        return (
            <TouchableOpacity key={option.key} onPress={()=>this.onChange(option)}>
                <View style={[styles.optionStyle, this.state.optionStyle]}>
                    <Text style={[styles.optionTextStyle,this.props.optionTextStyle]}>{option.label}</Text>
                </View>
            </TouchableOpacity>)
    }

    renderOptionList() {
        var options = this.props.data.map((item) => {
            if (item.section) {
                return this.renderSection(item);
            } else {
                return this.renderOption(item);
            }
        });

        return (
            <View style={[styles.overlayStyle, this.props.overlayStyle]}>
                <View style={styles.optionContainer}>
                    <ScrollView>
                        <View style={{paddingHorizontal:10}}>
                            {options}
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.cancelContainer}>
                    <TouchableOpacity onPress={this.close}>
                        <View style={[styles.cancelStyle, this.props.cancelStyle]}>
                            <Text style={[styles.cancelTextStyle,this.props.cancelTextStyle]}>{this.state.cancelText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>);
    }

    componentWillMount() {
        if (Platform.OS === 'android')
            tag = Portal.allocateTag();
    }

    render() {

        let dp = null;
        if (Platform.OS == 'android') {

        } else {
            dp = (
                <Modal transparent={true} ref="modal" visible={this.state.modalVisible} animated={this.state.animated}>
                    {this.renderOptionList()}
                </Modal>);
        }

        return (
            <View>
                {dp}
                <TouchableOpacity onPress={this.open}>
                    <View style={[styles.selectStyle, this.props.selectStyle]}>
                        <Text style={[styles.selectTextStyle, this.props.selectTextStyle]}>{this.state.selected}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

SpringSelector.propTypes = propTypes;
SpringSelector.defaultProps = defaultProps;
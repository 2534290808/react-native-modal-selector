'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import {
    View,
    StyleSheet,
    Dimensions,
    Modal,
    Text,
    ScrollView,
    TouchableOpacity,
    Platform,
    ViewPropTypes
} from 'react-native';

import styles from './style';
import BaseComponent from './BaseComponent';

let componentIndex = 0;
let rnVersion = Number.parseFloat(require('react-native/package.json').version);

const propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    initValue: PropTypes.string,
    style: rnVersion >= 0.44 ? ViewPropTypes.style : View.propTypes.style,
    selectStyle: rnVersion >= 0.44 ? ViewPropTypes.style : View.propTypes.style,
    optionStyle: rnVersion >= 0.44 ? ViewPropTypes.style : View.propTypes.style,
    optionTextStyle: Text.propTypes.style,
    sectionStyle: rnVersion >= 0.44 ? ViewPropTypes.style : View.propTypes.style,
    sectionTextStyle: Text.propTypes.style,
    cancelStyle: rnVersion >= 0.44 ? ViewPropTypes.style : View.propTypes.style,
    cancelTextStyle: Text.propTypes.style,
    overlayStyle: rnVersion >= 0.44 ? ViewPropTypes.style : View.propTypes.style,
    cancelText: PropTypes.string,
    keyboardShouldPersistTaps: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

const defaultProps = {
    data: [],
    onChange: ()=> {},
    initValue: 'Select me!',
    style: {},
    selectStyle: {},
    optionStyle: {},
    optionTextStyle: {},
    sectionStyle: {},
    sectionTextStyle: {},
    cancelStyle: {},
    cancelTextStyle: {},
    overlayStyle: {},
    cancelText: 'cancel',
    keyboardShouldPersistTaps: 'always'
};

export default class ModalSelector extends BaseComponent {

    constructor() {

        super();

        this._bind(
            'onChange',
            'open',
            'close',
            'renderChildren'
        );

        this.state = {
            animationType: 'slide',
            modalVisible: false,
            transparent: false,
            selected: 'please select'
        };
    }

    componentDidMount() {
        this.setState({selected: this.props.initValue});
        this.setState({cancelText: this.props.cancelText});
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.initValue != this.props.initValue) {
        this.setState({selected: nextProps.initValue});
      }
    }

    onChange(item) {
        this.props.onChange(item);
        this.setState({selected: item.label});
        this.close();
    }

    close() {
      this.setState({
        modalVisible: false
      });
    }

    open() {
      this.setState({
        modalVisible: true
      });
    }

    renderSection(section) {
        return (
            <View key={section.key} style={[styles.sectionStyle,this.props.sectionStyle]}>
                <Text style={[styles.sectionTextStyle,this.props.sectionTextStyle]}>{section.label}</Text>
            </View>
        );
    }

    renderOption(option) {
        return (
            <TouchableOpacity key={option.key} onPress={()=>this.onChange(option)}>
                <View style={[styles.optionStyle, this.props.optionStyle]}>
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
            <View style={[styles.overlayStyle, this.props.overlayStyle]} key={'modalSelector'+(componentIndex++)}>
                <View style={styles.optionContainer}>
                    <ScrollView keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps}>
                        <View style={{paddingHorizontal:10}}>
                            {options}
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.cancelContainer}>
                    <TouchableOpacity onPress={this.close}>
                        <View style={[styles.cancelStyle, this.props.cancelStyle]}>
                            <Text style={[styles.cancelTextStyle,this.props.cancelTextStyle]}>{this.props.cancelText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>);
    }

    renderChildren() {

        if(this.props.children) {
            return this.props.children;
        }
        return (
            <View style={[styles.selectStyle, this.props.selectStyle]}>
                <Text style={[styles.selectTextStyle, this.props.selectTextStyle]}>{this.state.selected}</Text>
            </View>
        );
    }

    render() {

        const dp = (
          <Modal transparent={true} ref="modal" visible={this.state.modalVisible} onRequestClose={this.close} animationType={this.state.animationType}>
          {this.renderOptionList()}
          </Modal>
        );

        return (
            <View style={this.props.style}>
                {dp}
                <TouchableOpacity onPress={this.open}>
                    <View pointerEvents="none">
                        {this.renderChildren()}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

ModalSelector.propTypes = propTypes;
ModalSelector.defaultProps = defaultProps;

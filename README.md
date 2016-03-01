# react-native-modal-picker
A cross-platform (iOS / Android), selector/picker component for React Native that is highly customizable and supports sections.

## Demo

<img src="https://raw.githubusercontent.com/d-a-n/react-native-modal-picker/master/docs/demo.gif" />

## Install

```sh
npm i react-native-modal-picker --save
```

## Usage

Here is an overview of the component usage.

```jsx

import ModalPicker from 'react-native-modal-picker'

[..]

class SampleApp extends Component {
    render() {

        let index = 0;
        const data = [
            { key: index++, section: true, label: 'Fruits' },
            { key: index++, label: 'Red Apples' },
            { key: index++, label: 'Cherries' },
            { key: index++, label: 'Cranberries' },
            { key: index++, label: 'Pink Grapefruit' },
            { key: index++, label: 'Raspberries' },
            { key: index++, section: true, label: 'Vegetables' },
            { key: index++, label: 'Beets' },
            { key: index++, label: 'Red Peppers' },
            { key: index++, label: 'Radishes' },
            { key: index++, label: 'Radicchio' },
            { key: index++, label: 'Red Onions' },
            { key: index++, label: 'Red Potatoes' },
            { key: index++, label: 'Rhubarb' },
            { key: index++, label: 'Tomatoes' }
        ];

        return (
            <View style={{padding:40, flex:1}}>
                <ModalPicker
                    data={data}
                    initValue="Select something yummy!"
                    onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }}
                />
            </View>
        );
    }
}
```

## Props

* `data - []` required, array of objects with a unique key and label
* `onChange - function` optional, callback function, when the users has selected an option
* `initValue - string` optional, text that is initially shown on the button
* `cancelText - string` optional, text of the cancel button
* `selectStyle - object` optional, style definitions for the select element
* `selectStyle - object` optional, style definitions for the select element
* `optionStyle - object` optional, style definitions for the option element
* `optionTextStyle - object` optional, style definitions for the option text element
* `sectionStyle - object` optional, style definitions for the section element
* `sectionTextStyle - object` optional, style definitions for the select text element
* `cancelStyle - object` optional, style definitions for the cancel element
* `cancelTextStyle - object` optional, style definitions for the cancel text element
* `selectStyle - object` optional, style definitions for the select element
* `overlayStyle - object` optional, style definitions for the overly/background element
* `selectStyle - object` optional, style definitions for the select element

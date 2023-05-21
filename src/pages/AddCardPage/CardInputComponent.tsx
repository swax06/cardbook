import { Image, StyleSheet, View, TextInput as NativeTextInput } from 'react-native';
import React, { useState } from 'react';
import { IconButton, Text, TextInput, TextInputProps, Tooltip } from 'react-native-paper';
import creditCardProcessor from "../../lib/CardProcessorLib";
import { CreditCardProcessor } from '../../lib/CardProcessorLib/types/types';
import TextInputMask from 'react-native-text-input-mask';
import DropDown from 'react-native-paper-dropdown';
import { ICard, cardTypeValues } from '../../types/CardInterface';
import { useCardData } from './AddCardContext';
import { removeCardNumberSpaces } from '../../utils/utilFunctions';
import ColorPicker from '../../shared-components/ColorPicker';
import { useTheme } from '../../context/ThemeContext';
import { CARD_COLORS, CARD_COLORS_PAIRS } from '../../data/ColorDefinations';

interface IFormConfig {
    id: keyof ICard;
    label: string;
    textContentType: TextInputProps['textContentType'];
    inputMode?: TextInputProps['inputMode'];
    autoComplete?: TextInputProps['autoComplete'];
    keyboardType?: TextInputProps['keyboardType'];
    autoCapitalize?: TextInputProps['autoCapitalize'];
    maxLength?: TextInputProps['maxLength'];
    renderer?: (config: IFormConfig) => ((props: TextInputProps) => JSX.Element);
}

const CardInputComponent = () => {
    const { cardInput, updateCard } = useCardData();
    const [showDropdown, setShowDropdown] = useState(false);
    const [cardProcessor, setCardProcessor] = useState<CreditCardProcessor[]>(() => creditCardProcessor(removeCardNumberSpaces(cardInput.cardNumber)));
    const { theme } = useTheme();
    const textColor = theme.dark ? 'white' : 'black';

    const updateCardProcessor = (input: string) => {
        setCardProcessor(creditCardProcessor(removeCardNumberSpaces(input.trim())));
    };

    const cardNumberRenderer = (config: IFormConfig) => {
        return (props: TextInputProps) => (
            <View style={styles.innerContainer}>
                <TextInputMask
                    {...props}
                    onChangeText={(formatted, extracted) => {
                        updateCardProcessor(formatted);
                        updateCard({ [config.id]: formatted });
                    }}
                    style={{ ...styles.textMask, color: textColor }}
                    mask={cardProcessor[0]?.mask}
                />
                <Image
                    style={styles.logo}
                    source={cardProcessor[0].logoFilled}
                />
            </View>)
    };

    const expiryDateRenderer = (config: IFormConfig) => {
        return (props: TextInputProps) => (
            <TextInputMask
                {...props}
                onChangeText={(formatted, extracted) => updateCard({ [config.id]: formatted })}
                style={{ ...styles.textMask, color: textColor }}
                mask={'[00]{/}[00]'}
            />)
    };

    const cardPinRenderer = (config: IFormConfig) => {
        return (props: TextInputProps) => (
            <TextInputMask
                {...props}
                onChangeText={(formatted, extracted) => updateCard({ [config.id]: formatted })}
                style={{ ...styles.textMask, color: textColor }}
                mask={`[000000]`}
            />)
    };

    const securityCodeRenderer = (config: IFormConfig) => {
        return (props: TextInputProps) => (
            <TextInputMask
                {...props}
                onChangeText={(formatted, extracted) => updateCard({ [config.id]: formatted })}
                style={{ ...styles.textMask, color: textColor }}
                mask={`[${'0'.repeat(cardProcessor[0]?.code?.size ?? 4)}]`}
            />)
    };

    const tagsRenderer = (config: IFormConfig) => {
        return (props: TextInputProps) => (
            <View style={styles.innerContainer}>
                <NativeTextInput
                    {...props}
                    onChange={(text) => {
                        updateCard({ [config.id]: text });
                    }}
                    style={{ ...styles.textMask, color: textColor }}
                />
                <Tooltip title="Use ( , ) to split tags" enterTouchDelay={0} leaveTouchDelay={2000}>
                    <IconButton icon="information-outline" />
                </Tooltip>
            </View>)
    };

    const formConfig: IFormConfig[] = [
        {
            id: 'cardHolder',
            label: 'Card Holder',
            textContentType: 'name',
            inputMode: 'text',
            autoComplete: 'name',
            keyboardType: 'default',
            autoCapitalize: 'words'
        },
        {
            id: 'cardNumber',
            label: 'Card Number',
            textContentType: 'creditCardNumber',
            inputMode: 'tel',
            autoComplete: 'cc-number',
            keyboardType: 'default',
            renderer: cardNumberRenderer
        },
        {
            id: 'expiryDate',
            label: 'Expiry Date',
            textContentType: 'none',
            inputMode: 'tel',
            autoComplete: 'cc-exp',
            keyboardType: 'number-pad',
            renderer: expiryDateRenderer
        },
        {
            id: 'securityCode',
            label: 'Security Code',
            textContentType: 'password',
            inputMode: 'tel',
            autoComplete: 'cc-csc',
            keyboardType: 'number-pad',
            renderer: securityCodeRenderer
        },
        {
            id: 'cardPin',
            label: 'Card Pin',
            textContentType: 'password',
            inputMode: 'tel',
            autoComplete: 'off',
            keyboardType: 'number-pad',
            maxLength: 6,
            renderer: cardPinRenderer
        },
        {
            id: 'bankName',
            label: 'Bank Name',
            textContentType: 'none',
            inputMode: 'text',
            autoComplete: 'off',
            autoCapitalize: 'characters',
            keyboardType: 'default'
        },
        {
            id: 'cardName',
            label: 'Card Name',
            textContentType: 'none',
            inputMode: 'none',
            autoComplete: 'off',
            keyboardType: 'default',
            autoCapitalize: 'characters'
        },
        {
            id: 'tags',
            label: 'Tags',
            textContentType: 'none',
            inputMode: 'none',
            autoComplete: 'off',
            keyboardType: 'default',
            autoCapitalize: 'words',
            renderer: tagsRenderer
        },
    ];

    const JSXFormMap: { [key in keyof ICard]: any } = formConfig.reduce((prevValue: any, config: IFormConfig): any => {
        prevValue[config.id] = (<TextInput
            key={config.id}
            label={config.label}
            value={cardInput[config.id]}
            textContentType={config.textContentType}
            mode='outlined'
            inputMode={config.inputMode}
            autoComplete={config.autoComplete}
            keyboardType={config.keyboardType}
            autoCapitalize={config.autoCapitalize ?? 'none'}
            style={styles.textBox}
            onChangeText={(text) => updateCard({ [config.id]: text })}
            render={config.renderer?.(config)}
        />);
        return prevValue;
    }, {});

    JSXFormMap.cardType = (<DropDown
        label='Card Type'
        mode='outlined'
        value={cardInput.cardType}
        setValue={(value) => updateCard({ cardType: value })}
        list={cardTypeValues.map(x => ({ label: x, value: x }))}
        visible={showDropdown}
        showDropDown={() => setShowDropdown(true)}
        onDismiss={() => setShowDropdown(false)}
    />);

    return (
        <View>
            {JSXFormMap.cardHolder}
            {JSXFormMap.cardNumber}
            <View style={styles.row}>
                {JSXFormMap.expiryDate}
                {JSXFormMap.securityCode}
            </View>
            {JSXFormMap.bankName}
            {JSXFormMap.cardName}
            <View style={styles.row}>
                {JSXFormMap.cardPin}
                <View style={styles.textBox}>
                    {JSXFormMap.cardType}
                </View>
            </View>
            {JSXFormMap.tags}
            <Text style={styles.label} children={'Card Colors'} />
            <ColorPicker colorList={CARD_COLORS_PAIRS} initColor={cardInput.cardColor} style={{ borderRadius: 5, borderWidth: 1 }} onChangeColor={(x) => updateCard({ cardColor: x[0], cardTextColor: x[1] })} />
        </View>
    );
};

export default CardInputComponent;

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textMask: {
        flexGrow: 1,
        paddingHorizontal: 10,
        maxWidth: '85%'
    },
    cardTypeText: {
        paddingRight: 10,
        fontSize: 18
    },
    textBox: {
        marginVertical: 5,
        flexBasis: '49%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logo: {
        width: 35,
        height: 24,
        borderRadius: 5,
        resizeMode: 'stretch',
        marginHorizontal: 10
    },
    label: {
        paddingVertical: 10
    }
});
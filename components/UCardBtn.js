import React from 'react';
import { TouchableOpacity, Platform, Text, StyleSheet } from 'react-native';
import { white, orange } from '../utils/colors';

export default function UCardBtn({ text, onPress, disabled, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        Platform.OS === 'ios' ? styles.iosTextBtn : styles.androidTextBtn,
        disabled ? styles.disabled : '',
        style
      ]}
      disabled={disabled}
    >
      <Text style={styles.textBtnText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iosTextBtn: {
    backgroundColor: orange,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    width: 300
  },
  androidTextBtn: {
    backgroundColor: orange,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  disabled: {
    opacity: 0.2
  }
});

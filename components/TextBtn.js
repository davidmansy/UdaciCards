import React from 'react';
import { TouchableOpacity, Platform, Text, StyleSheet } from 'react-native';
import { white, orange } from '../utils/colors';

export default function TextBtn({ text, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={Platform.OS === 'ios' ? styles.iosTextBtn : styles.androidTextBtn}
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
    marginRight: 40
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
  }
});

import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { orange, darkBrown } from '../utils/colors';

export default function UCardTextInput({
  text,
  onChangeText,
  placeholder,
  style
}) {
  return (
    <TextInput
      style={[styles.input, style]}
      value={text}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#757575',
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: orange,
    color: darkBrown,
    fontSize: 22,
    height: 44,
    padding: 4,
    textAlign: 'center',
    width: 300
  }
});

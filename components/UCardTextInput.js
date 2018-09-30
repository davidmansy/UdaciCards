import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { orange, darkBrown } from '../utils/colors';

export default function UCardTextInput({
  text,
  onChangeText,
  style,
  ...props
}) {
  return (
    <TextInput
      style={[styles.input, style]}
      value={text}
      onChangeText={onChangeText}
      {...props}
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
    minHeight: 44,
    maxHeight: 132,
    padding: 4,
    textAlign: 'center',
    width: 300
  }
});

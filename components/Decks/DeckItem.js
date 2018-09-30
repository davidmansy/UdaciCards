import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity
} from 'react-native';
import { orange, darkBrown, lightBrown } from '../../utils/colors';
import { Ionicons } from '@expo/vector-icons';

export default function DeckItem({ goToDeckDetail, item }) {
  return (
    <TouchableOpacity
      onPress={() => {
        goToDeckDetail(item);
      }}
    >
      <View style={styles.deck}>
        <View>
          <Text style={styles.mainText}>{item.title}</Text>
          <Text style={styles.subText}>
            {item.questions.length
              ? `${item.questions.length} cards available to play a quiz`
              : `Please add a card to start a quiz`}
          </Text>
        </View>
        <View>
          <Ionicons
            name={
              Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forwardt'
            }
            size={30}
            color={orange}
            style={{ marginRight: 10 }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deck: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 6,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: orange
  },
  mainText: { fontSize: 22, color: darkBrown },
  subText: { fontSize: 14, color: lightBrown }
});

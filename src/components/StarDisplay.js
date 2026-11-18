import React from 'react';
import { StyleSheet, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function StarDisplay({ value }) {
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((numero) => (
        <FontAwesome
          key={numero}
          name={numero <= value ? 'star' : 'star-o'}
          size={15}
          color={numero <= value ? '#fbbf24' : '#9ca3af'}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
});

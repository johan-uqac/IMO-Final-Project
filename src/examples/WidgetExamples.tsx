import React from 'react'
import { Text, View } from 'react-native'
import BaseWidget from 'src/Widgets/BaseWidget'

export function SmallWidget() {
  return (
    <BaseWidget
      size='small'
      title='Base Widget'
      icon={{ uri: 'https://picsum.photos/200/300' }}
    >
      <Text>Blabla</Text>
    </BaseWidget>
  )
}

export function LineWidgets() {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <SmallWidget />
      <SmallWidget />
    </View>
  )
}

export function LargeWidget() {
  return (
    <BaseWidget
      size='large'
      title='Base Widget'
      icon={{ uri: 'https://picsum.photos/200/300' }}
    >
      <Text>Blabla</Text>
    </BaseWidget>
  )
}

import { BlurView } from '@react-native-community/blur'
import React from 'react'
import { Dimensions, Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'

type BaseWidgetProps = {
  children: React.ReactNode
  size: 'large' | 'small'
  title: string
  icon: ImageSourcePropType
}

export default function BaseWidget({ children, size, title, icon }: BaseWidgetProps) {
  const { width } = Dimensions.get('window')
  return (
    <BlurView
      blurType='light'
      blurAmount={10}
      style={{
        borderRadius: 10,
        width: size === 'large' ? '100%' : '48%',
        height: width * 0.48,
        padding: 5,
        marginTop: 24,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 6,
        }}
      >
        <Image
          source={icon}
          style={{ width: 16, height: 16, marginRight: 5 }}
        />
        <Text style={styles.widgetTitle}>{title.toUpperCase()}</Text>
      </View>
      {children}
    </BlurView>
  )
}

const styles = StyleSheet.create({
  widgetTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
})

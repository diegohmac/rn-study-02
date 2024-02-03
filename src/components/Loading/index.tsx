import { ActivityIndicator } from 'react-native'
import React from 'react'
import { Container } from './styles'

export default function Loading() {
  return (
    <Container>
        <ActivityIndicator />
    </Container>
  )
}
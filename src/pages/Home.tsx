import React, { useState, useEffect } from 'react'
import { Box, Heading, Flex, Image, Text } from '@chakra-ui/react'

function HomePage() {
  return (
      <Flex flexDirection={['column', 'column', 'column', 'row']}>
        <Flex alignItems="start" ml={[0, 0, 0, '-20%']}>
          
        </Flex>
        <Flex flexDirection="column" m={8}>
          <Flex alignItems="center" h={['auto', 'auto', 'auto', '32em']}>
            <Heading>
              Build your landing page with{' '}
              <Text color="brand.300" as="span">
                NextJs
              </Text>
              ,{' '}
              <Text color="brand.300" as="span">
                Chakra UI
              </Text>{' '}
              and{' '}
              <Text color="brand.300" as="span">
                TypeScript
              </Text>
            </Heading>
          </Flex>
        </Flex>
      </Flex>
  )
}
export default HomePage

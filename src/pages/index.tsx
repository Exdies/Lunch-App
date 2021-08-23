import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Code,
  Link as ChakraLink,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/client'

import { Hero } from '../components/Hero'
import { Main } from '../components/Main'
import { Footer } from '../components/Footer'

const renderFooter = (session: Session | null | undefined) => {
  if (!session || !session.user) return <Text>No estas ingresado</Text>

  const { image = '', name = '', email = '' } = session.user

  return (
    <VStack>
      <Text>
        Logged in as <Code>{name}</Code> - (<Code>{email}</Code>)
      </Text>
    </VStack>
  )
}

const Index: NextPage = () => {
  const [session] = useSession()
  return (
    <>
      <Hero />
      <Main>
        <Text>
          Aplicacion para poder unirse en los almuerzos de RokketLabs. Version
          en desarollo with <Code>Next.js</Code> + <Code>chakra-ui</Code> +{' '}
          <Code>typescript</Code>.
        </Text>
      </Main>
      <Footer>{renderFooter(session)}</Footer>
    </>
  )
}

export default Index

import { useForm } from 'react-hook-form'
import React from 'react'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  VStack,
  Center,
  Heading,
  useToast,
  Text,
  Flex,
  Button,
} from '@chakra-ui/react'
import axios from 'axios'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export default function RegisterForm() {
  const toast = useToast()

  type UserLogin = {
    email: string
    password: string
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Se requiere un email valido')
      .email('Se requiere un email'),
    password: Yup.string()
      .required('Ingrese una contraseña')
      .min(6, 'La contraseña requiere al menos 6 caracteres')
      .max(40, 'La contraseña no debe exceder los 40 caracteres'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserLogin>({
    resolver: yupResolver(validationSchema),
  })

  const checkUser = (values: UserLogin) => {
    axios
      .post('http://localhost:3001/user', values)
      .then((response) => {
        console.log(response)
        toast({
          title: 'Usuario registrado con exito',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      })
      .catch((error) => {
        console.log(error.response)
        toast({
          title: 'El mail registrado ya existe',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      })
  }

  return (
    <form onSubmit={handleSubmit(checkUser)}>
      <Flex height="100vh" justifyContent="center">
        <Center>
          <VStack>
            <Heading>
              Acceso usuarios
              <Text color="brand.300" as="span"></Text>
            </Heading>
            <FormControl
              isInvalid={!!errors?.email?.message}
              errortext={errors?.email?.message}>
              <FormLabel htmlFor="name">Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                {...register('email')}
              />
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors?.password?.message}
              errortext={errors?.password?.message}>
              <FormLabel htmlFor="name">Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="password"
                {...register('password')}
              />
              <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
            </FormControl>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
              disabled={!!errors.email || !!errors.password}>
              Ingresar
            </Button>
          </VStack>
        </Center>
      </Flex>
    </form>
  )
}

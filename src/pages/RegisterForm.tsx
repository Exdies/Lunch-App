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

  type UserSubmitForm = {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Es requerido el nombre'),
    lastName: Yup.string().required('Es requerido el apellido'),
    email: Yup.string()
      .required('Se requiere un email valido')
      .email('Se requiere un email'),
    password: Yup.string()
      .required('Ingrese una contraseña')
      .min(6, 'La contraseña requiere al menos 6 caracteres')
      .max(40, 'La contraseña no debe exceder los 40 caracteres'),
    /*     confirmPassword: Yup.string()
      .required('Se requiere confirmar la contraseña')
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no son iguales'), */
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
  })

  const addUser = (values: UserSubmitForm) => {
    axios
      .post('http://localhost:3001/signup', values)
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
    <form onSubmit={handleSubmit(addUser)}>
      <Flex height="100vh" justifyContent="center">
        <Center>
          <VStack>
            <Heading>
              Acceso a registro
              <Text color="brand.300" as="span"></Text>
            </Heading>
            <FormControl
              isInvalid={!!errors?.firstName?.message}
              errortext={errors?.firstName?.message}
              isRequired>
              <FormLabel htmlFor="name">Nombre</FormLabel>
              <Input
                id="firstName"
                placeholder="Nombre"
                {...register('firstName')}
              />
            </FormControl>
            <FormControl
              isInvalid={!!errors?.lastName?.message}
              errortext={errors?.lastName?.message}
              isRequired>
              <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
              <FormLabel htmlFor="name">Apellido</FormLabel>
              <Input
                id="lastName"
                placeholder="Apellido"
                {...register('lastName')}
              />
              <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors?.email?.message}
              errortext={errors?.email?.message}
              isRequired>
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
              errortext={errors?.password?.message}
              isRequired>
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
              disabled={
                !!errors.firstName ||
                !!errors.lastName ||
                !!errors.email ||
                !!errors.password
              }>
              Enviar
            </Button>
          </VStack>
        </Center>
      </Flex>
    </form>
  )
}

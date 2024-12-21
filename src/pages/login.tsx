// src/pages/login.tsx
import React, { useState } from 'react';
import {
  Box,
  Center,
  Flex,
  Button,
  Text,
  Image,
  Divider,
  useToast,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '@/context/AuthContext';
import { Input } from '@/components/input';
import { useTheme } from '@/context/themeContext';

const signInFormSchema = yup.object().shape({
  email: yup.string().required('Email required'),
  password: yup.string().required('Password required'),
});

interface SignInRequestData {
  email: string;
  password: string;
}

const userAuth = {
  email: process.env.NEXT_PUBLIC_USER,
  password: process.env.NEXT_PUBLIC_PASSWORD,
};

export default function Login() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { signIn } = useAuthContext();
  const { theme } = useTheme();
  const { register, handleSubmit, formState } = useForm<SignInRequestData>({
    resolver: yupResolver(signInFormSchema),
    defaultValues: userAuth,
  });

  async function handleSignIn(data: SignInRequestData) {
    setLoading(true);
    try {
      console.log('123');
      await signIn(data);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'An error occurred while signing in.',
        status: 'error',
        variant: 'solid',
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Flex alignItems="center" h="100vh" w="100vw" px="5vw">
      <Center gap={5} maxH="75vh" w="100%" mx="auto">
        <Center
          as="form"
          onSubmit={handleSubmit(handleSignIn)}
          w="40%"
          flexDir="column"
          h="auto"
        >
          <Center w="100%">
            <Image src={theme.logo} objectFit="cover" w="300px" />
          </Center>
          <Flex align="center" px="4rem" gap="2" mt="1rem" w="100%">
            <Divider />
            <Text
              whiteSpace="nowrap"
              fontSize="18px"
              fontFamily={theme.font}
              fontWeight="bold"
            >
              Login to your account
            </Text>
            <Divider />
          </Flex>
          <Box mt="3rem" w="60%">
            <Text
              fontWeight="bold"
              textAlign="left"
              mb="8px"
              fontFamily={theme.font}
              fontSize="0.875rem"
              color={theme.textGray}
            >
              Email Address
            </Text>
            <Input
              h="3rem"
              borderRadius="0.5rem"
              color={theme.inputColor}
              borderColor={theme.inputBorderColor}
              focusBorderColor={theme.mainColor}
              fontFamily={theme.font}
              fontSize="1rem"
              placeholder="demo@example.com"
              {...register('email')}
              error={formState?.errors?.email?.message}
            />
          </Box>
          <Box mt="1.5rem" w="60%">
            <Text
              fontWeight="bold"
              textAlign="left"
              mb="8px"
              fontFamily={theme.font}
              fontSize="0.875rem"
              color={theme.textGray}
            >
              Password
            </Text>
            <Input
              h="3rem"
              borderRadius="0.5rem"
              color={theme.inputColor}
              focusBorderColor={theme.mainColor}
              borderColor={theme.inputBorderColor}
              fontFamily={theme.font}
              fontSize="1rem"
              placeholder="**********"
              type="password"
              {...register('password')}
              error={formState?.errors?.password?.message}
            />
          </Box>
          <Box mt="2rem" w="60%">
            <Button
              bg={theme.mainColor}
              _hover={{
                bg: `${theme.mainColor}.darken(60%)`,
              }}
              fontFamily={theme.font}
              color="#ffffff"
              w="100%"
              type="submit"
              isLoading={loading}
            >
              Sign in
            </Button>
          </Box>
        </Center>
      </Center>
    </Flex>
  );
}

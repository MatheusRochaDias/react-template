import React, { useState } from 'react';

import {
  Box,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Image,
  Link as ChakraLink,
  Divider,
} from '@chakra-ui/react';
import { useGlobal } from '@/styles/base';

export default function Login() {
  const { mainColor, font, textGray, inputColor, inputBorderColor } =
    useGlobal();
  return (
    <Flex alignItems="center" h="100vh" w="100vw" px="5vw">
      <Flex gap={5} maxH="75vh">
        <Flex w="65%" borderRadius="5rem">
          <Image
            src="/background_login.jpg"
            borderRadius="1rem"
            objectFit="cover"
            w="100%"
          />
        </Flex>
        <Center w="33%" flexDir="column" h="auto">
          <Center w="100%">
            <Image src="/logo_white.png" objectFit="cover" w="204px" />
          </Center>
          <Flex align="center" px="4rem" gap="2" mt="4rem" w="100%">
            <Divider />
            <Text
              whiteSpace="nowrap"
              fontSize="18px"
              fontFamily="'poppins', sans-serif"
              fontWeight="bold"
            >
              Login to your account
            </Text>
            <Divider />
          </Flex>
          <Box mt="3rem" w="100%">
            <Text
              fontWeight="bold"
              textAlign="left"
              mb="8px"
              fontFamily="'poppins', sans-serif"
              fontSize="0.875rem"
              color={textGray}
            >
              Email Address
            </Text>
            <Input
              h="3rem"
              borderRadius="0.5rem"
              color={inputColor}
              borderColor={inputBorderColor}
              focusBorderColor={mainColor}
              fontFamily="'poppins', sans-serif"
              fontSize="1rem"
              placeholder="demo@example.com"
            />
          </Box>
          <Box mt="1.5rem" w="100%">
            <Text
              fontWeight="bold"
              textAlign="left"
              mb="8px"
              fontFamily="'poppins', sans-serif"
              fontSize="0.875rem"
              color={textGray}
            >
              Password
            </Text>
            <Input
              h="3rem"
              borderRadius="0.5rem"
              color={inputColor}
              focusBorderColor={mainColor}
              borderColor={inputBorderColor}
              fontFamily="'poppins', sans-serif"
              fontSize="1rem"
              placeholder="**********"
              type="password"
            />
          </Box>
          <Box mt="2rem" w="100%">
            <Button
              bg={mainColor}
              _hover={{
                bg: `${mainColor}.darken(60%)`,
              }}
              fontFamily={font}
              color="#ffffff"
              w="100%"
            >
              Sign me in
            </Button>
          </Box>
        </Center>
      </Flex>
    </Flex>
  );
}

import React, { forwardRef, ForwardRefRenderFunction, useState } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Flex,
  Box,
  Center,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import { Icon } from '@iconify/react';
// import { FieldError } from 'react-hook-form';

interface IInputProps extends ChakraInputProps {
  name: string;
  bgHover?: string;
  labelColor?: string;
  bgFocus?: string;
  bgPlaceholder?: string;
  label?: string;
  labelTextColor?: string;
  error?: any;
  seePasswordButtonColor?: string;
  search?: boolean;
  leftIcon?: string;
  color?: string;
  type_icon?: 'text' | 'icon';
  login?: boolean;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  {
    name,
    bgHover,
    bgFocus,
    bgPlaceholder,
    label,
    labelTextColor,
    labelColor,
    error = null,
    seePasswordButtonColor,
    search,
    color,
    leftIcon,
    login,
    type_icon = 'icon',
    ...rest
  },
  ref
) => {
  const [visible, setVisible] = useState(false);

  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel
          fontWeight="bold"
          htmlFor={name}
          color={color}
          // textTransform="capitalize"
          fontSize={{ base: '12px', md: '14px', lg: '14px' }}
        >
          {label}
        </FormLabel>
      )}
      <InputGroup {...rest}>
        {leftIcon && (
          <InputLeftElement
            zIndex={2}
            // pointerEvents="none"
            onClick={() => setVisible(!visible)}
            children={
              type_icon === 'text' ? (
                leftIcon
              ) : (
                <Icon icon={leftIcon as string} width={25} color="#ccc" />
              )
            }
          />
        )}
        <ChakraInput
          {...rest}
          name={name}
          id={name}
          fontSize={{ base: '12px', md: '14px', lg: '14px' }}
          // variant="filled"

          _hover={{
            bg: bgHover,
          }}
          _focus={{
            bg: bgFocus,
          }}
          _placeholder={{
            color: bgPlaceholder,
          }}
          ref={ref}
          type={
            rest.type === 'password'
              ? visible
                ? 'text'
                : 'password'
              : rest.type
          }
        />
        {rest.type === 'password' && (
          <Center position="absolute" right="10px" h="100%">
            <Icon
              width="20px"
              cursor="pointer"
              color={seePasswordButtonColor || '#cacaca'}
              onClick={() => setVisible((previous) => !previous)}
              icon={
                visible ? 'ant-design:eye-invisible-outlined' : 'akar-icons:eye'
              }
            />
          </Center>
        )}
        {search && (
          <Flex position="absolute" right="10px" top={error ? '53%' : '20%'}>
            <Icon width="20px" cursor="pointer" icon="ic:baseline-search" />
          </Flex>
        )}
      </InputGroup>
      {!!error && <FormErrorMessage mb="10px">{error}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);

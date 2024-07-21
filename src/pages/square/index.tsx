// src/pages/square.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  VStack,
  useToast,
  Flex,
  Tooltip,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Icon } from '@iconify/react';
import {
  createSquare,
  SquareData,
  useSquare,
} from '@/services/hooks/useSquare';
import { timezones } from '@/utils/timezone';

const squareSchema = yup.object().shape({
  nome: yup.string().required('Name is required'),
  prodToken: yup.string().required('Production Token is required'),
  prodApplication: yup.string().required('Production Application is required'),
  sandBoxToken: yup.string().required('Sandbox Token is required'),
  sandboxApplication: yup.string().required('Sandbox Application is required'),
  timezone: yup.string().required('Timezone is required'),
  webhook: yup.string().required('Webhook URL is required'),
});

const Square: React.FC = () => {
  const toast = useToast();
  const { register, handleSubmit, formState } = useForm<SquareData>({
    resolver: yupResolver(squareSchema),
  });
  const { data: square } = useSquare();

  console.log(square);

  const [loading, setLoading] = useState(false);
  async function handleCreateSquare(data: SquareData) {
    setLoading(true);
    try {
      await createSquare(data);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'An error occurred while createing square.',
        status: 'error',
        variant: 'solid',
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box bg="#f3f3f4">
      <Text fontSize="24px" fontWeight={100} mb="4">
        Square Accounts
      </Text>
      <Flex gap={5}>
        <Box boxShadow="xl" p="6" rounded="md" bg="white" w="25%">
          <VStack
            as="form"
            spacing="4"
            onSubmit={handleSubmit(handleCreateSquare)}
          >
            <Flex>
              <Text fontSize="14px" fontWeight={600}>
                Add Square App
              </Text>
            </Flex>
            <FormControl id="nome">
              <Flex alignItems="center" gap={2}>
                <Text fontSize="13px" fontWeight={700}>
                  Name
                </Text>
                <Tooltip hasArrow label="A name to identify the account">
                  <Icon icon="material-symbols:info-outline" />
                </Tooltip>
              </Flex>
              <Input mt="6px" size="sm" {...register('nome')} />
              <Text color="red.500">{formState.errors.nome?.message}</Text>
            </FormControl>

            <FormControl id="prodApplication">
              <Flex alignItems="center" gap={2}>
                <Text fontSize="13px" fontWeight={700}>
                  Production ID
                </Text>
                <Tooltip
                  hasArrow
                  label="Application ID (from Square Developer Dashboard)"
                >
                  <Icon icon="material-symbols:info-outline" />
                </Tooltip>
              </Flex>
              <Input mt="6px" size="sm" {...register('prodApplication')} />
              <Text color="red.500">
                {formState.errors.prodApplication?.message}
              </Text>
            </FormControl>

            <FormControl id="prodToken">
              <Flex alignItems="center" gap={2}>
                <Text fontSize="13px" fontWeight={700}>
                  Production Token
                </Text>
                <Tooltip
                  hasArrow
                  label="Access Token (from Square Developer Dashboard)"
                >
                  <Icon icon="material-symbols:info-outline" />
                </Tooltip>
              </Flex>
              <Input mt="6px" size="sm" {...register('prodToken')} />
              <Text color="red.500">{formState.errors.prodToken?.message}</Text>
            </FormControl>

            <FormControl id="sandboxApplication">
              <Flex alignItems="center" gap={2}>
                <Text fontSize="13px" fontWeight={700}>
                  Sandbox ID
                </Text>
                <Tooltip
                  hasArrow
                  label="Application ID (from Square Developer Dashboard)"
                >
                  <Icon icon="material-symbols:info-outline" />
                </Tooltip>
              </Flex>
              <Input mt="6px" size="sm" {...register('sandboxApplication')} />
              <Text color="red.500">
                {formState.errors.sandboxApplication?.message}
              </Text>
            </FormControl>

            <FormControl id="sandBoxToken">
              <Flex alignItems="center" gap={2}>
                <Text fontSize="13px" fontWeight={700}>
                  Sandbox Token
                </Text>
                <Tooltip
                  hasArrow
                  label="Access Token (from Square Developer Dashboard)"
                >
                  <Icon icon="material-symbols:info-outline" />
                </Tooltip>
              </Flex>
              <Input mt="6px" size="sm" {...register('sandBoxToken')} />
              <Text color="red.500">
                {formState.errors.sandBoxToken?.message}
              </Text>
            </FormControl>

            <FormControl id="timezone">
              <Flex alignItems="center" gap={2}>
                <Text fontSize="13px" fontWeight={700}>
                  Timezone
                </Text>
                <Tooltip
                  hasArrow
                  label="Default timezone to calculate schedules"
                >
                  <Icon icon="material-symbols:info-outline" />
                </Tooltip>
              </Flex>
              <Select mt="6px" size="sm" {...register('timezone')}>
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </Select>
              <Text color="red.500">{formState.errors.timezone?.message}</Text>
            </FormControl>

            <FormControl id="webhook">
              <Flex alignItems="center" gap={2}>
                <Text fontSize="13px" fontWeight={700}>
                  Webhook URL
                </Text>
                <Tooltip
                  hasArrow
                  label="Define the webhook url(from Square Developer Dashboard)"
                >
                  <Icon icon="material-symbols:info-outline" />
                </Tooltip>
              </Flex>
              <Input mt="6px" size="sm" {...register('webhook')} />
              <Text color="red.500">{formState.errors.webhook?.message}</Text>
            </FormControl>
            <Button type="submit" isLoading={loading} w="100%">
              Save
            </Button>
          </VStack>
        </Box>{' '}
        <Box boxShadow="xl" p="6" rounded="md" bg="white" w="75%">
          <Text fontSize="2xl" mb="4">
            Square Accounts
          </Text>
          <Table>
            <Thead>
              <Tr>
                <Th>Description</Th>
                <Th>Timezone</Th>
                <Th>Current Time</Th>
                <Th>Environment</Th>
                <Th>Locations</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Replace with actual data */}
              {mockData.map((item, idx) => (
                <Tr key={idx}>
                  <Td>{item.description}</Td>
                  <Td>{item.timezone}</Td>
                  <Td>{item.currentTime}</Td>
                  <Td>{item.environment}</Td>
                  <Td>{item.locations}</Td>
                  <Td>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
};

const mockData = [
  {
    description: 'Example',
    timezone: 'America/New_York',
    currentTime: 'Jul 21, 2024, 4:34 PM',
    environment: 'Production',
    locations: 1,
    webhook: 'https://example.com/hook/12',
  },
  // Add more mock data as needed
];

export default Square;

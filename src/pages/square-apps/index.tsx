/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
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
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Icon } from '@iconify/react';
import moment from 'moment-timezone';
import {
  createSquare,
  SquareData,
  useSquare,
  deleteSquare,
  updateSquare,
} from '@/services/hooks/useSquare';
import { timezones } from '@/utils/timezone';

const squareSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  prodToken: yup.string().required('Production Token is required'),
  prodApplication: yup.string().required('Production Application is required'),
  sandboxToken: yup.string().required('Sandbox Token is required'),
  sandboxApplication: yup.string().required('Sandbox Application is required'),
  timezone: yup.string().required('Timezone is required'),
  webhook: yup.string().required('Webhook URL is required'),
});

const Square: React.FC = () => {
  const toast = useToast();
  const { register, handleSubmit, setValue, formState, reset } =
    useForm<SquareData>({
      resolver: yupResolver(squareSchema),
    });
  const { data: squareData, isLoading, error, refetch } = useSquare();
  const [loading, setLoading] = useState(false);

  // Estado para gerenciar o modal de exclusão
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [selectedSquare, setSelectedSquare] = useState<SquareData | null>(null);

  // Estado para gerenciar o modal de edição
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const getCurrentTime = (timezone: string | undefined) => {
    if (!timezone || timezone.toLowerCase() === 'string') {
      return 'undefined';
    }

    try {
      return moment().tz(timezone).format('MMM D, YYYY, HH:mm:ss');
    } catch (err) {
      return 'undefined';
    }
  };

  const handleCreateSquare = async (data: SquareData) => {
    setLoading(true);
    try {
      await createSquare(data);
      toast({
        title: 'Success',
        description: 'Square app created successfully.',
        status: 'success',
        variant: 'solid',
        isClosable: true,
      });
      reset(); // Limpar os campos do formulário
      refetch(); // Atualizar a tabela
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: 'An error occurred while creating square.',
        status: 'error',
        variant: 'solid',
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSquare = async () => {
    if (!selectedSquare) return;

    setLoading(true);
    try {
      await deleteSquare(selectedSquare.franqueadoID);
      toast({
        title: 'Deleted',
        description: `Square account ${selectedSquare.name} deleted successfully.`,
        status: 'success',
        variant: 'solid',
        isClosable: true,
      });
      onDeleteClose();
      refetch(); // Atualizar a tabela
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: 'An error occurred while deleting the square account.',
        status: 'error',
        variant: 'solid',
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditSquare = async (data: SquareData) => {
    setLoading(true);
    try {
      await updateSquare(data.franqueadoID, data);
      toast({
        title: 'Updated',
        description: `Square account ${data.name} updated successfully.`,
        status: 'success',
        variant: 'solid',
        isClosable: true,
      });
      onEditClose();
      refetch(); // Atualizar a tabela
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: 'An error occurred while updating the square account.',
        status: 'error',
        variant: 'solid',
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (square: SquareData) => {
    setSelectedSquare(square);
    onDeleteOpen();
  };

  const openEditModal = (square: SquareData) => {
    setSelectedSquare(square);
    setValue('name', square.name);
    setValue('prodToken', square.prodToken);
    setValue('prodApplication', square.prodApplication);
    setValue('sandboxToken', square.sandboxToken);
    setValue('sandboxApplication', square.sandboxApplication);
    setValue('timezone', square.timezone);
    setValue('webhook', square.webhook);
    onEditOpen();
  };

  const closeDeleteModal = () => {
    setSelectedSquare(null);
    onDeleteClose();
  };

  const closeEditModal = () => {
    setSelectedSquare(null);
    onEditClose();
  };

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="1.125rem" fontWeight="500">
          Square Apps
        </Text>
        <Button
          bg="#7C8C2F"
          borderRadius=".35rem"
          padding=".5rem .85rem"
          _hover={{ bg: '#F2F3EB', color: '#1A1A1A' }}
          fontSize=".875rem"
          color="#fff"
          onClick={onAddOpen}
        >
          + Add Square App
        </Button>
      </Flex>{' '}
      <Flex gap={5}>
        {/* <Box p={4} boxShadow="lg" rounded="md" bg="white" w="25%">
          <VStack
            as="form"
            spacing="4"
            onSubmit={handleSubmit(handleCreateSquare)}
          >
            <Text fontSize="xl" fontWeight="bold">
              Add Square App
            </Text>
            <FormControl id="name">
              <Flex alignItems="center" gap={2}>
                <Text fontSize="sm" fontWeight="bold">
                  Name
                </Text>
                <Tooltip hasArrow label="A name to identify the account">
                  <Icon icon="material-symbols:info-outline" />
                </Tooltip>
              </Flex>
              <Input mt="2" size="sm" {...register('name')} />
              <Text color="red.500">{formState.errors.name?.message}</Text>
            </FormControl>

            <FormControl id="prodApplication">
              <Flex alignItems="center" gap={2}>
                <Text fontSize="sm" fontWeight="bold">
                  Production ID
                </Text>
                <Tooltip
                  hasArrow
                  label="Application ID (from Square Developer Dashboard)"
                >
                  <Icon icon="material-symbols:info-outline" />
                </Tooltip>
              </Flex>
              <Input mt="2" size="sm" {...register('prodApplication')} />
              <Text color="red.500">
                {formState.errors.prodApplication?.message}
              </Text>
            </FormControl>

            <FormControl id="prodToken">
              <Flex alignItems="center" gap={2}>
                <Text fontSize="sm" fontWeight="bold">
                  Production Token
                </Text>
                <Tooltip
                  hasArrow
                  label="Access Token (from Square Developer Dashboard)"
                >
                  <Icon icon="material-symbols:info-outline" />
                </Tooltip>
              </Flex>
              <Input mt="2" size="sm" {...register('prodToken')} />
              <Text color="red.500">{formState.errors.prodToken?.message}</Text>
            </FormControl>

            <FormControl id="sandboxApplication">
              <Flex alignItems="center" gap={2}>
                <Text fontSize="sm" fontWeight="bold">
                  Sandbox ID
                </Text>
                <Tooltip
                  hasArrow
                  label="Application ID (from Square Developer Dashboard)"
                >
                  <Icon icon="material-symbols:info-outline" />
                </Tooltip>
              </Flex>
              <Input mt="2" size="sm" {...register('sandboxApplication')} />
              <Text color="red.500">
                {formState.errors.sandboxApplication?.message}
              </Text>
            </FormControl>

            <FormControl id="sandboxToken">
              <Flex alignItems="center" gap={2}>
                <Text fontSize="sm" fontWeight="bold">
                  Sandbox Token
                </Text>
                <Tooltip
                  hasArrow
                  label="Access Token (from Square Developer Dashboard)"
                >
                  <Icon icon="material-symbols:info-outline" />
                </Tooltip>
              </Flex>
              <Input mt="2" size="sm" {...register('sandboxToken')} />
              <Text color="red.500">
                {formState.errors.sandboxToken?.message}
              </Text>
            </FormControl>

            <FormControl id="timezone">
              <Flex alignItems="center" gap={2}>
                <Text fontSize="sm" fontWeight="bold">
                  Timezone
                </Text>
                <Tooltip
                  hasArrow
                  label="Default timezone to calculate schedules"
                >
                  <Icon icon="material-symbols:info-outline" />
                </Tooltip>
              </Flex>
              <Select mt="2" size="sm" {...register('timezone')}>
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
                <Text fontSize="sm" fontWeight="bold">
                  Webhook URL
                </Text>
                <Tooltip
                  hasArrow
                  label="Define the webhook url(from Square Developer Dashboard)"
                >
                  <Icon icon="material-symbols:info-outline" />
                </Tooltip>
              </Flex>
              <Input mt="2" size="sm" {...register('webhook')} />
              <Text color="red.500">{formState.errors.webhook?.message}</Text>
            </FormControl>
            <Button type="submit" isLoading={loading} w="100%">
              Save
            </Button>
          </VStack>
        </Box> */}
        <Box p={4} boxShadow="lg" rounded="md" bg="white" w="100%">
          <Flex gap={1} alignItems="center" mb={4}>
            <Box bg="#7C8C2F" width="4px" height="22px" />
            <Text fontSize="14px" fontWeight="600">
              Square Conected Accounts
            </Text>
          </Flex>

          <Box overflowX="auto">
            {squareData && squareData.length > 0 ? (
              <Table
                variant="striped"
                colorScheme="gray"
                className="text-nowrap"
              >
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Timezone</Th>
                    <Th>Current Time</Th>
                    <Th>Locations</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {isLoading ? (
                    <Tr>
                      <Td colSpan={5} textAlign="center">
                        Loading...
                      </Td>
                    </Tr>
                  ) : error ? (
                    <Tr>
                      <Td colSpan={5} textAlign="center" color="red.500">
                        An error occurred while fetching data.
                      </Td>
                    </Tr>
                  ) : (
                    squareData?.map((item: any, idx: number) => (
                      <Tr key={idx}>
                        <Td>{item.name}</Td>
                        <Td>{item.timezone}</Td>
                        <Td>{getCurrentTime(item.timezone)}</Td>
                        <Td>{item._count.locations}</Td>
                        <Td>
                          <HStack spacing={2}>
                            <Button
                              size="sm"
                              colorScheme="green"
                              onClick={() => openEditModal(item)}
                            >
                              Sync Square
                            </Button>
                            <Button
                              size="sm"
                              colorScheme="blue"
                              onClick={() => openEditModal(item)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              colorScheme="red"
                              onClick={() => openDeleteModal(item)}
                            >
                              Delete
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            ) : (
              <Center h="100px" alignItems="center">
                <Text color="gray.500">
                  Register credentials to see them here.
                </Text>
              </Center>
            )}
          </Box>
          {/* <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>Name</Th>
                <Th>Timezone</Th>
                <Th>Current Time</Th>
                <Th>Locations</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading ? (
                <Tr>
                  <Td colSpan={5} textAlign="center">
                    Loading...
                  </Td>
                </Tr>
              ) : error ? (
                <Tr>
                  <Td colSpan={5} textAlign="center" color="red.500">
                    An error occurred while fetching data.
                  </Td>
                </Tr>
              ) : (
                squareData?.map((item: any, idx: number) => (
                  <Tr key={idx}>
                    <Td>{item.name}</Td>
                    <Td>{item.timezone}</Td>
                    <Td>{getCurrentTime(item.timezone)}</Td>
                    <Td>{item.restauranteCount}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          onClick={() => openEditModal(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => openDeleteModal(item)}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table> */}
        </Box>
      </Flex>
      <Modal isOpen={isAddOpen} onClose={onAddClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Square App</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              as="form"
              spacing="4"
              onSubmit={handleSubmit(handleCreateSquare)}
            >
              <FormControl id="name">
                <Flex alignItems="center" gap={2}>
                  <Text fontSize="sm" fontWeight="bold">
                    Name
                  </Text>
                  <Tooltip hasArrow label="A name to identify the account">
                    <Icon icon="material-symbols:info-outline" />
                  </Tooltip>
                </Flex>
                <Input mt="2" size="sm" {...register('name')} />
                <Text color="red.500">{formState.errors.name?.message}</Text>
              </FormControl>

              <FormControl id="prodApplication">
                <Flex alignItems="center" gap={2}>
                  <Text fontSize="sm" fontWeight="bold">
                    Production ID
                  </Text>
                  <Tooltip
                    hasArrow
                    label="Application ID (from Square Developer Dashboard)"
                  >
                    <Icon icon="material-symbols:info-outline" />
                  </Tooltip>
                </Flex>
                <Input mt="2" size="sm" {...register('prodApplication')} />
                <Text color="red.500">
                  {formState.errors.prodApplication?.message}
                </Text>
              </FormControl>

              <FormControl id="prodToken">
                <Flex alignItems="center" gap={2}>
                  <Text fontSize="sm" fontWeight="bold">
                    Production Token
                  </Text>
                  <Tooltip
                    hasArrow
                    label="Access Token (from Square Developer Dashboard)"
                  >
                    <Icon icon="material-symbols:info-outline" />
                  </Tooltip>
                </Flex>
                <Input mt="2" size="sm" {...register('prodToken')} />
                <Text color="red.500">
                  {formState.errors.prodToken?.message}
                </Text>
              </FormControl>

              <FormControl id="sandboxApplication">
                <Flex alignItems="center" gap={2}>
                  <Text fontSize="sm" fontWeight="bold">
                    Sandbox ID
                  </Text>
                  <Tooltip
                    hasArrow
                    label="Application ID (from Square Developer Dashboard)"
                  >
                    <Icon icon="material-symbols:info-outline" />
                  </Tooltip>
                </Flex>
                <Input mt="2" size="sm" {...register('sandboxApplication')} />
                <Text color="red.500">
                  {formState.errors.sandboxApplication?.message}
                </Text>
              </FormControl>

              <FormControl id="sandboxToken">
                <Flex alignItems="center" gap={2}>
                  <Text fontSize="sm" fontWeight="bold">
                    Sandbox Token
                  </Text>
                  <Tooltip
                    hasArrow
                    label="Access Token (from Square Developer Dashboard)"
                  >
                    <Icon icon="material-symbols:info-outline" />
                  </Tooltip>
                </Flex>
                <Input mt="2" size="sm" {...register('sandboxToken')} />
                <Text color="red.500">
                  {formState.errors.sandboxToken?.message}
                </Text>
              </FormControl>

              <FormControl id="timezone">
                <Flex alignItems="center" gap={2}>
                  <Text fontSize="sm" fontWeight="bold">
                    Timezone
                  </Text>
                  <Tooltip
                    hasArrow
                    label="Default timezone to calculate schedules"
                  >
                    <Icon icon="material-symbols:info-outline" />
                  </Tooltip>
                </Flex>
                <Select mt="2" size="sm" {...register('timezone')}>
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </Select>
                <Text color="red.500">
                  {formState.errors.timezone?.message}
                </Text>
              </FormControl>

              <FormControl id="webhook">
                <Flex alignItems="center" gap={2}>
                  <Text fontSize="sm" fontWeight="bold">
                    Webhook URL
                  </Text>
                  <Tooltip
                    hasArrow
                    label="Define the webhook url(from Square Developer Dashboard)"
                  >
                    <Icon icon="material-symbols:info-outline" />
                  </Tooltip>
                </Flex>
                <Input mt="2" size="sm" {...register('webhook')} />
                <Text color="red.500">{formState.errors.webhook?.message}</Text>
              </FormControl>

              <Button type="submit" isLoading={loading} w="100%" mb="8px">
                Save
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isDeleteOpen} onClose={closeDeleteModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Square Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete the Square account{' '}
            {selectedSquare?.name}? This action cannot be undone.
          </ModalBody>

          <ModalFooter mb="8px">
            <Button variant="ghost" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDeleteSquare}
              ml={3}
              isLoading={loading}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isEditOpen} onClose={closeEditModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Square Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              as="form"
              spacing="4"
              onSubmit={handleSubmit(handleEditSquare)}
            >
              <FormControl id="name">
                <Flex alignItems="center" gap={2}>
                  <Text fontSize="sm" fontWeight="bold">
                    Name
                  </Text>
                  <Tooltip hasArrow label="A name to identify the account">
                    <Icon icon="material-symbols:info-outline" />
                  </Tooltip>
                </Flex>
                <Input mt="2" size="sm" {...register('name')} />
              </FormControl>

              <FormControl id="prodApplication">
                <Flex alignItems="center" gap={2}>
                  <Text fontSize="sm" fontWeight="bold">
                    Production ID
                  </Text>
                  <Tooltip
                    hasArrow
                    label="Application ID (from Square Developer Dashboard)"
                  >
                    <Icon icon="material-symbols:info-outline" />
                  </Tooltip>
                </Flex>
                <Input mt="2" size="sm" {...register('prodApplication')} />
                <Text color="red.500">
                  {formState.errors.prodApplication?.message}
                </Text>
              </FormControl>

              <FormControl id="prodToken">
                <Flex alignItems="center" gap={2}>
                  <Text fontSize="sm" fontWeight="bold">
                    Production Token
                  </Text>
                  <Tooltip
                    hasArrow
                    label="Access Token (from Square Developer Dashboard)"
                  >
                    <Icon icon="material-symbols:info-outline" />
                  </Tooltip>
                </Flex>
                <Input mt="2" size="sm" {...register('prodToken')} />
                <Text color="red.500">
                  {formState.errors.prodToken?.message}
                </Text>
              </FormControl>

              <FormControl id="sandboxApplication">
                <Flex alignItems="center" gap={2}>
                  <Text fontSize="sm" fontWeight="bold">
                    Sandbox ID
                  </Text>
                  <Tooltip
                    hasArrow
                    label="Application ID (from Square Developer Dashboard)"
                  >
                    <Icon icon="material-symbols:info-outline" />
                  </Tooltip>
                </Flex>
                <Input mt="2" size="sm" {...register('sandboxApplication')} />
                <Text color="red.500">
                  {formState.errors.sandboxApplication?.message}
                </Text>
              </FormControl>

              <FormControl id="sandboxToken">
                <Flex alignItems="center" gap={2}>
                  <Text fontSize="sm" fontWeight="bold">
                    Sandbox Token
                  </Text>
                  <Tooltip
                    hasArrow
                    label="Access Token (from Square Developer Dashboard)"
                  >
                    <Icon icon="material-symbols:info-outline" />
                  </Tooltip>
                </Flex>
                <Input mt="2" size="sm" {...register('sandboxToken')} />
                <Text color="red.500">
                  {formState.errors.sandboxToken?.message}
                </Text>
              </FormControl>

              <FormControl id="timezone">
                <Flex alignItems="center" gap={2}>
                  <Text fontSize="sm" fontWeight="bold">
                    Timezone
                  </Text>
                  <Tooltip
                    hasArrow
                    label="Default timezone to calculate schedules"
                  >
                    <Icon icon="material-symbols:info-outline" />
                  </Tooltip>
                </Flex>
                <Select mt="2" size="sm" {...register('timezone')}>
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </Select>
                <Text color="red.500">
                  {formState.errors.timezone?.message}
                </Text>
              </FormControl>

              <FormControl id="webhook">
                <Flex alignItems="center" gap={2}>
                  <Text fontSize="sm" fontWeight="bold">
                    Webhook URL
                  </Text>
                  <Tooltip
                    hasArrow
                    label="Define the webhook url(from Square Developer Dashboard)"
                  >
                    <Icon icon="material-symbols:info-outline" />
                  </Tooltip>
                </Flex>
                <Input mt="2" size="sm" {...register('webhook')} />
                <Text color="red.500">{formState.errors.webhook?.message}</Text>
              </FormControl>

              <Button type="submit" isLoading={loading} w="100%" mb="8px">
                Save
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Square;

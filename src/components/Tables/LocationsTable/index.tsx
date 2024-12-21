// components/LocationsTable.tsx
import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  useToast,
  Text,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tag,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Switch,
  useDisclosure,
} from '@chakra-ui/react';
import { FaEllipsisV, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import {
  updateDataVisibilidade,
  updateOrdenacaoVisibilidade,
  useOrdenacaoVisibilidade,
} from '@/services/hooks/useOrdenacao';

const LocationsTable: React.FC = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    alternativeName: '',
    customLatitude: '',
    customLongitude: '',
    customPrepTime: '',
    visibilidade: false,
  });
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    data: ordenacao,
    isLoading,
    error,
    refetch,
  } = useOrdenacaoVisibilidade();

  useEffect(() => {
    if (ordenacao) {
      setLocations(ordenacao);
    }
  }, [ordenacao]);

  const handleArrowClick = async (
    currentIndex: number,
    targetIndex: number
  ) => {
    if (
      currentIndex >= 0 &&
      currentIndex < locations.length &&
      targetIndex >= 0 &&
      targetIndex < locations.length
    ) {
      const currentLocation = locations[currentIndex];
      const targetLocation = locations[targetIndex];

      const ordenacoes = [
        {
          restauranteID: currentLocation.ordenacaoVisibilidade.restauranteID,
          position: targetLocation.ordenacaoVisibilidade.position,
        },
        {
          restauranteID: targetLocation.ordenacaoVisibilidade.restauranteID,
          position: currentLocation.ordenacaoVisibilidade.position,
        },
      ];

      try {
        await updateOrdenacaoVisibilidade(ordenacoes);
        // Atualize as posições no estado local após a atualização da API
        refetch();
        toast({
          title: 'Sort updated successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (err: any) {
        toast({
          title: 'Error updating sorting',
          description: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleEditClick = (location: any) => {
    setSelectedLocation(location);
    setFormData({
      alternativeName: location.ordenacaoVisibilidade.alternativeName || '',
      customLatitude: location.ordenacaoVisibilidade.customLatitude || '',
      customLongitude: location.ordenacaoVisibilidade.customLongitude || '',
      customPrepTime: location.ordenacaoVisibilidade.customPrepTime || '',
      visibilidade: location.ordenacaoVisibilidade.visibilidade || false,
    });
    onOpen();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleFormSubmit = async () => {
    try {
      const updatedLocation = {
        ...selectedLocation,
        ordenacaoVisibilidade: {
          ...selectedLocation.ordenacaoVisibilidade,
          alternativeName: formData.alternativeName,
          customLatitude: formData.customLatitude,
          customLongitude: formData.customLongitude,
          customPrepTime: formData.customPrepTime,
          visibilidade: formData.visibilidade,
        },
      };
      await updateDataVisibilidade([updatedLocation.ordenacaoVisibilidade]);
      const updatedLocations = locations.map((location) =>
        location.restaurante.restauranteID ===
        updatedLocation.restaurante.restauranteID
          ? updatedLocation
          : location
      );
      setLocations(updatedLocations);
      toast({
        title: 'Dados atualizados com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      refetch();
      onClose();
    } catch (err: any) {
      toast({
        title: 'Erro ao atualizar dados',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      overflowX="auto"
      w="100%"
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow="sm"
    >
      <Table variant="simple" w="100%">
        <Thead bg="gray.50">
          <Tr>
            <Th>Name</Th>
            <Th>Address</Th>
            <Th>Map Pin</Th>
            <Th>Prep Time</Th>
            <Th>Visibility</Th>
            <Th>Status</Th>
            {/* <Th>Type</Th> */}
            <Th>Actions</Th>
            <Th>Reorder</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ordenacao &&
            ordenacao.map((location: any, idx: number) => (
              <Tr key={idx}>
                <Td>
                  <Text fontWeight="600" fontSize="0.9rem">
                    {location.restaurante.nome}
                  </Text>
                </Td>
                <Td>
                  <Flex alignItems="center" gap={3}>
                    <Text fontWeight="600" fontSize="0.9rem">
                      {location.restaurante.enderecoLinhaUm}
                    </Text>{' '}
                  </Flex>
                </Td>
                <Td>
                  <Button colorScheme="blue" variant="outline">
                    {location.restaurante.latitude},{' '}
                    {location.restaurante.longitude}
                  </Button>
                </Td>
                <Td>
                  <Text fontSize="0.875rem">
                    {location.ordenacaoVisibilidade.customPrepTime}
                  </Text>
                </Td>
                <Td>
                  <Tag
                    colorScheme={
                      location.ordenacaoVisibilidade.visibilidade
                        ? 'teal'
                        : 'gray'
                    }
                  >
                    {location.ordenacaoVisibilidade.visibilidade
                      ? 'Visible'
                      : 'Hide'}
                  </Tag>
                </Td>
                <Td>
                  <Tag
                    colorScheme={
                      location.restaurante.status === 'ACTIVE' ? 'green' : 'red'
                    }
                  >
                    {location.restaurante.status}
                  </Tag>
                </Td>
                {/* <Td>
                  <Tag
                    colorScheme={
                      location.restaurante.type === 'Physical'
                        ? 'blue'
                        : 'yellow'
                    }
                  >
                    {location.restaurante.type}
                  </Tag>
                </Td> */}
                <Td>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<FaEllipsisV />}
                      variant="outline"
                      onClick={() => handleEditClick(location)}
                    />
                  </Menu>
                </Td>
                <Td>
                  <HStack>
                    {idx > 0 && (
                      <IconButton
                        icon={<FaArrowUp />}
                        aria-label="Move Up"
                        onClick={() => handleArrowClick(idx, idx - 1)}
                      />
                    )}
                    {idx < ordenacao.length - 1 && (
                      <IconButton
                        icon={<FaArrowDown />}
                        aria-label="Move Down"
                        onClick={() => handleArrowClick(idx, idx + 1)}
                      />
                    )}
                  </HStack>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Localização</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Alternative Name</FormLabel>
              <Input
                name="alternativeName"
                value={formData.alternativeName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Custom Latitude</FormLabel>
              <Input
                name="customLatitude"
                value={formData.customLatitude}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Custom Longitude</FormLabel>
              <Input
                name="customLongitude"
                value={formData.customLongitude}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Custom Prep Time</FormLabel>
              <Input
                name="customPrepTime"
                value={formData.customPrepTime}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl display="flex" alignItems="center" mb={4}>
              <FormLabel mb="0">Visibility</FormLabel>
              <Switch
                name="visibilidade"
                isChecked={formData.visibilidade}
                onChange={handleSwitchChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleFormSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default LocationsTable;

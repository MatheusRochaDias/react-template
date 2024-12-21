// components/TaxesTable.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  VStack,
  Text,
  Flex,
} from '@chakra-ui/react';
import { syncMenuTaxes, useSquareTaxes } from '@/services/hooks/useTaxes';
import { useSquare } from '@/services/hooks/useSquare';

const TaxesTable: React.FC = () => {
  const { data: squareData, isLoading, error } = useSquare();
  const [selectedFranquias, setSelectedFranquias] = useState<number[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const handleSyncTaxes = async () => {
    try {
      for (const franquiaId of selectedFranquias) {
        await syncMenuTaxes(franquiaId);
      }
      toast({
        title: 'Menu taxes synchronized successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (err: any) {
      toast({
        title: 'Error synchronizing menu taxes',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedFranquias((prev) =>
      prev.includes(id)
        ? prev.filter((franquiaId) => franquiaId !== id)
        : [...prev, id]
    );
  };

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Synchronize Menu Taxes
        </Text>
        <Button colorScheme="blue" onClick={onOpen}>
          Sync Menu Taxes
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Franchises</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <Text>Loading...</Text>
            ) : error ? (
              <Text color="red.500">
                An error occurred while fetching data.
              </Text>
            ) : (
              <VStack align="start">
                {squareData?.map((franquia: any) => (
                  <Checkbox
                    key={franquia.franqueadoID}
                    isChecked={selectedFranquias.includes(
                      franquia.franqueadoID
                    )}
                    onChange={() => handleCheckboxChange(franquia.franqueadoID)}
                  >
                    {franquia.nome}
                  </Checkbox>
                ))}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSyncTaxes}>
              Sync
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

export default TaxesTable;

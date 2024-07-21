// src/components/ClientTable.tsx
import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  HStack,
  VStack,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import ClientData from '@/mocks/clients';
import { useGlobal } from '@/styles/base';

const ClientTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const filteredData = useMemo(() => {
    return ClientData.filter((client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const { mainColor, font, tableHeader } = useGlobal();

  return (
    <VStack spacing={4} align="stretch">
      <Box w="40%">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon
              icon="material-symbols:search"
              color={mainColor}
              width="1.2rem"
            />
          </InputLeftElement>
          <Input
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Box>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Billing Address</Th>
              <Th>Joined</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentData.map((client) => (
              <Tr key={client.id}>
                <Td>{client.name}</Td>
                <Td>{client.email}</Td>
                <Td>{client.phone}</Td>
                <Td>{client.billingAddress}</Td>
                <Td>{client.joined}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <HStack spacing={2} justify="center">
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => setCurrentPage(page)}
            variant={page === currentPage ? 'solid' : 'outline'}
          >
            {page}
          </Button>
        ))}
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </HStack>
    </VStack>
  );
};

export default ClientTable;

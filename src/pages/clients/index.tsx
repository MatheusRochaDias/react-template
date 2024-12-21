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
  Flex,
  IconButton,
  Tag,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Divider,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { FaEye } from 'react-icons/fa';
import ClientData from '@/mocks/clients';
import { useGlobal } from '@/styles/base';

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  billingAddress: string;
  joined: string;
  totalSpent: number;
  visits: number;
  frequentItems: { name: string; transactions: number }[];
  preferredLocations: string[];
};

const mockClientDetails: Client = {
  id: '1',
  name: 'Jayne Zugsmith',
  email: 'jayne.z@travelstore.com',
  phone: '123-456-7890',
  billingAddress: '123 Sample St, City, State',
  joined: 'September 29, 2021',
  totalSpent: 453.15,
  visits: 29,
  frequentItems: [
    { name: 'The Tahiti', transactions: 5 },
    { name: 'Classic Smoothie', transactions: 1 },
  ],
  preferredLocations: [
    'Acai Republic Newport Beach',
    'Acai Republic Laguna Niguel',
  ],
};

const ClientTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const itemsPerPage = 20;
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const { mainColor } = useGlobal();

  const handleViewDetails = (client: Client) => {
    setSelectedClient(client);
    onOpen();
  };

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" h="40px" mb={4}>
        <Text fontSize="1.125rem" fontWeight="500">
          Clients
        </Text>
      </Flex>
      <Box p={4} boxShadow="lg" rounded="md" bg="white" w="100%">
        <VStack spacing={4} align="stretch">
          <Flex justifyContent="space-between" width="100%" mb={4}>
            <Flex gap={1} alignItems="center" mb={4}>
              <Box bg="#7C8C2F" width="4px" height="22px" />
              <Text fontSize="14px" fontWeight="600">
                Clients List
              </Text>
            </Flex>
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
          </Flex>

          <Box overflowX="auto">
            <Table variant="striped" size="sm">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th>Billing Address</Th>
                  <Th>Joined</Th>
                  <Th>Details</Th>
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
                    <Td>
                      <IconButton
                        icon={<FaEye />}
                        aria-label="View details"
                        bg="transparent"
                        onClick={() => handleViewDetails(mockClientDetails)}
                      />
                    </Td>
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

          {/* Modal for client details */}
          <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {' '}
                <Flex gap={1} alignItems="center" mb={4}>
                  <Box bg="#7C8C2F" width="4px" height="22px" />
                  <Text fontSize="18px" fontWeight="600">
                    Client Profile
                  </Text>
                </Flex>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {selectedClient && (
                  <Box>
                    <Text fontWeight="bold" mb={2}>
                      Personal Information
                    </Text>
                    <Box mb={4}>
                      <Text>
                        <strong>Name:</strong> {selectedClient.name}
                      </Text>
                      <Text>
                        <strong>Email:</strong> {selectedClient.email}
                      </Text>
                      <Text>
                        <strong>Phone:</strong> {selectedClient.phone}
                      </Text>
                    </Box>

                    <Divider my={2} />

                    <Text fontWeight="bold" mb={2}>
                      Buyer Summary
                    </Text>
                    <Flex justifyContent="space-between" mb={4}>
                      <Box>
                        <Text color="gray.500">First Visit</Text>
                        <Text>{selectedClient.joined}</Text>
                      </Box>
                      <Box>
                        <Text color="gray.500">Total Spent</Text>
                        <Text>${selectedClient.totalSpent.toFixed(2)}</Text>
                      </Box>
                    </Flex>

                    <Divider my={2} />

                    <Text fontWeight="bold" mb={2}>
                      Frequent Items
                    </Text>
                    {selectedClient.frequentItems.map((item) => (
                      <Box key={item.name} mb={2}>
                        <Text fontWeight="bold">{item.name}</Text>
                        <Text fontSize="sm" color="gray.500">
                          {item.transactions} Transactions
                        </Text>
                      </Box>
                    ))}

                    <Divider my={2} />

                    <Text fontWeight="bold" mb={2}>
                      Preferred Locations
                    </Text>
                    {selectedClient.preferredLocations.map((location) => (
                      <Text key={location} color="gray.700">
                        • {location}
                      </Text>
                    ))}
                  </Box>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </VStack>
      </Box>
    </Box>
  );
};

export default ClientTable;

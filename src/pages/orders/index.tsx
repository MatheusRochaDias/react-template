import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  IconButton,
  Button,
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Divider,
  useDisclosure,
  Input,
  Select,
} from '@chakra-ui/react';
import { FaEye } from 'react-icons/fa';

// Dados mockados de pedidos
const mockOrders = Array.from({ length: 20 }, (_, i) => ({
  id: `#${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
  time: `${12 + (i % 6)}:${15 + i * 5}`,
  date: `2024-05-${27 - (i % 5)}`, // Formato de data ajustado para filtro
  location: ['Corona Eagle Glen', 'Laguna Niguel', 'Newport Beach'][i % 3],
  orderType: 'Standard',
  status: 'Accepted',
  guestName: ['Veronica Arellano', 'Evan Ryan', 'Chris Scott'][i % 3],
  subtotal: (Math.random() * 50).toFixed(2),
  offerValue: (Math.random() * 10).toFixed(2),
  giftCardValue: '0.00',
  tips: (Math.random() * 5).toFixed(2),
}));

const OrdersTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Estados para filtros
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Filtragem dos pedidos
  const filteredOrders = mockOrders.filter((order) => {
    const orderDate = new Date(order.date);
    const startDate = initialDate ? new Date(initialDate) : null;
    const endDate = finalDate ? new Date(finalDate) : null;
    const locationMatches = selectedLocation
      ? order.location === selectedLocation
      : true;

    return (
      (!startDate || orderDate >= startDate) &&
      (!endDate || orderDate <= endDate) &&
      locationMatches
    );
  });

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    onOpen();
  };

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" h="40px" mb={4}>
        <Text fontSize="1.125rem" fontWeight="500">
          Orders
        </Text>
      </Flex>

      <Box p={4} boxShadow="lg" rounded="md" bg="white" w="100%">
        <Flex justify="space-between" mb={4} alignItems="center">
          <Flex gap={1} alignItems="center">
            <Box bg="#7C8C2F" width="4px" height="22px" />
            <Text fontSize="14px" fontWeight="600">
              Orders List
            </Text>
          </Flex>
          <HStack>
            <Input
              type="date"
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
              placeholder="Initial Date"
              size="sm"
            />
            <Input
              type="date"
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
              placeholder="Final Date"
              size="sm"
            />
            <Select
              placeholder="Select Location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              size="sm"
            >
              <option value="Corona Eagle Glen">Corona Eagle Glen</option>
              <option value="Laguna Niguel">Laguna Niguel</option>
              <option value="Newport Beach">Newport Beach</option>
            </Select>
          </HStack>
        </Flex>
        <VStack spacing={4} align="stretch">
          <Box overflowX="auto">
            <Table variant="striped" size="sm">
              <Thead>
                <Tr>
                  <Th>Time</Th>
                  <Th>Order</Th>
                  <Th>Location</Th>
                  <Th>Order Type</Th>
                  <Th>Status</Th>
                  <Th>Guest Name</Th>
                  <Th>Subtotal</Th>
                  <Th>Offer Value</Th>
                  <Th>Gift Card Value</Th>
                  <Th>Tips</Th>
                  <Th>Details</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredOrders.map((order) => (
                  <Tr key={order.id}>
                    <Td>{order.time}</Td>
                    <Td color="red.500">{order.id}</Td>
                    <Td>{order.location}</Td>
                    <Td>{order.orderType}</Td>
                    <Td>{order.status}</Td>
                    <Td>{order.guestName}</Td>
                    <Td>${order.subtotal}</Td>
                    <Td>${order.offerValue}</Td>
                    <Td>${order.giftCardValue}</Td>
                    <Td>${order.tips}</Td>
                    <Td>
                      <IconButton
                        icon={<FaEye />}
                        aria-label="View details"
                        bg="transparent"
                        onClick={() => handleViewDetails(order)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Box>

      {/* Modal para detalhes do pedido */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Details {selectedOrder?.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedOrder && (
              <>
                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Order Summary
                  </Text>
                  <Box mb={4}>
                    <Text>
                      <strong>Location:</strong> {selectedOrder.location}
                    </Text>
                    <Text>
                      <strong>Date:</strong> {selectedOrder.date}
                    </Text>
                    <Text>
                      <strong>Time:</strong> {selectedOrder.time}
                    </Text>
                  </Box>

                  <Divider my={2} />

                  <Text fontWeight="bold" mb={2}>
                    Payment Summary
                  </Text>
                  <Flex justifyContent="space-between" mb={4}>
                    <Box>
                      <Text color="gray.500">Subtotal</Text>
                      <Text>${selectedOrder.subtotal}</Text>
                    </Box>
                    <Box>
                      <Text color="gray.500">Offer</Text>
                      <Text>${selectedOrder.offerValue}</Text>
                    </Box>
                    <Box>
                      <Text color="gray.500">Tips</Text>
                      <Text>${selectedOrder.tips}</Text>
                    </Box>
                  </Flex>

                  <Divider my={2} />

                  <Text fontWeight="bold" mb={2}>
                    Guest Information
                  </Text>
                  <Box>
                    <Text>
                      <strong>Name:</strong> {selectedOrder.guestName}
                    </Text>
                    <Text>
                      <strong>Status:</strong> {selectedOrder.status}
                    </Text>
                  </Box>
                </Box>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default OrdersTable;

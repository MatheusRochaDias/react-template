import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Button,
  VStack,
  HStack,
  Tag,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
} from '@chakra-ui/react';
import { FaThumbsUp, FaThumbsDown, FaReply } from 'react-icons/fa';

// Tipos para representar uma review e um produto com likes
type Review = {
  id: string;
  product: string;
  user: string;
  userLocation: string;
  date: string;
  content: string;
  status: 'New' | 'Approved' | 'Rejected';
};

type ProductLike = {
  id: string;
  name: string;
  likes: number;
};

// Mock de reviews e produtos com likes
const mockReviews: Review[] = [
  {
    id: '1',
    product: 'The São Paulo (Most Popular)',
    user: 'Damiana Marquez',
    userLocation: 'Torrance',
    date: '10/31/2024',
    content:
      'This bowl slaps. Amazing taste and when you add peanut butter, absolute perfection',
    status: 'New',
  },
  {
    id: '2',
    product: 'The Real Brazilian',
    user: 'Theodore Kim',
    userLocation: 'Newport Beach',
    date: '10/30/2024',
    content: 'Loved the texture and flavor!',
    status: 'Approved',
  },
  {
    id: '3',
    product: 'Coxinha com Catupiry',
    user: 'Mirella',
    userLocation: 'Chandler',
    date: '5/8/2024',
    content: 'Not a fan of the filling, too dry.',
    status: 'Rejected',
  },
];

const mockProductLikes: ProductLike[] = [
  { id: '1', name: 'The São Paulo', likes: 120 },
  { id: '2', name: 'The Real Brazilian', likes: 85 },
  { id: '3', name: 'Classic Smoothie', likes: 60 },
];

const ReviewManagement: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  const handleApprove = (id: string) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, status: 'Approved' } : review
      )
    );
  };

  const handleReject = (id: string) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, status: 'Rejected' } : review
      )
    );
  };

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" h="40px" mb={4}>
        <Text fontSize="1.125rem" fontWeight="500">
          Reviews
        </Text>
      </Flex>
      <Box p={4} boxShadow="lg" rounded="md" bg="white" w="100%">
        <Tabs variant="unstyled">
          <TabList w="100%">
            <Flex justify="space-between" w="100%" alignItems="center">
              <Flex gap={1} alignItems="center">
                <Box bg="#7C8C2F" width="4px" height="22px" />
                <Text fontSize="14px" fontWeight="600">
                  Item Review
                </Text>
              </Flex>
              <HStack spacing={4}>
                <Tab
                  _selected={{ color: '#7C8C2F', fontWeight: 'bold' }}
                  fontSize="14px"
                >
                  New Reviews
                </Tab>
                <Tab
                  _selected={{ color: '#7C8C2F', fontWeight: 'bold' }}
                  fontSize="14px"
                >
                  Approved
                </Tab>
                <Tab
                  _selected={{ color: '#7C8C2F', fontWeight: 'bold' }}
                  fontSize="14px"
                >
                  Rejected
                </Tab>
                <Tab
                  _selected={{ color: '#7C8C2F', fontWeight: 'bold' }}
                  fontSize="14px"
                >
                  Likes
                </Tab>
              </HStack>
            </Flex>
          </TabList>
          <TabPanels>
            {/* Aba de Novas Reviews */}
            <TabPanel>
              <VStack align="start" spacing={4} w="full">
                {reviews
                  .filter((review) => review.status === 'New')
                  .map((review) => (
                    <Box
                      key={review.id}
                      p={4}
                      bg="white"
                      borderRadius="md"
                      boxShadow="sm"
                      w="full"
                    >
                      <HStack justify="space-between">
                        <Text fontSize="md" fontWeight="bold">
                          {review.product}
                        </Text>
                        <Tag colorScheme="gray">New</Tag>
                      </HStack>
                      <Text fontSize="sm" color="gray.500">
                        {review.user} - {review.userLocation} - {review.date}
                      </Text>
                      <Text mt={2}>{review.content}</Text>
                      <HStack spacing={4} mt={4}>
                        <Button
                          size="sm"
                          colorScheme="red"
                          leftIcon={<FaThumbsDown />}
                          onClick={() => handleReject(review.id)}
                        >
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="green"
                          leftIcon={<FaThumbsUp />}
                          onClick={() => handleApprove(review.id)}
                        >
                          Approve
                        </Button>
                      </HStack>
                    </Box>
                  ))}
              </VStack>
            </TabPanel>

            {/* Aba de Reviews Aprovadas */}
            <TabPanel>
              <TableReviewList
                reviews={reviews.filter(
                  (review) => review.status === 'Approved'
                )}
                status="Approved"
              />
            </TabPanel>

            {/* Aba de Reviews Rejeitadas */}
            <TabPanel>
              <TableReviewList
                reviews={reviews.filter(
                  (review) => review.status === 'Rejected'
                )}
                status="Rejected"
              />
            </TabPanel>

            {/* Aba de Likes */}
            <TabPanel>
              <Box
                w="full"
                overflowX="auto"
                p={4}
                bg="white"
                borderRadius="md"
                boxShadow="sm"
              >
                <Text fontSize="lg" fontWeight="bold" mb={4}>
                  Product Likes
                </Text>
                <Table size="sm" variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Product</Th>
                      <Th>Likes</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {mockProductLikes.map((product) => (
                      <Tr key={product.id}>
                        <Td>{product.name}</Td>
                        <Td>
                          <Tag colorScheme="blue">{product.likes}</Tag>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

// Componente de listagem de reviews em tabela
const TableReviewList = ({
  reviews,
  status,
}: {
  reviews: Review[];
  status: string;
}) => {
  return (
    <Box
      w="full"
      overflowX="auto"
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow="sm"
    >
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        {status} Reviews
      </Text>
      <Table size="sm" variant="simple">
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th>User</Th>
            <Th>Submitted</Th>
            <Th>Location</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reviews.map((review) => (
            <Tr key={review.id}>
              <Td>{review.product}</Td>
              <Td>{review.user}</Td>
              <Td>{review.date}</Td>
              <Td>{review.userLocation}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ReviewManagement;

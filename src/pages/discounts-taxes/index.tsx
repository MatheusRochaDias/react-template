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
  Tag,
  Spinner,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useTaxes } from '@/services/hooks/useTaxes';

type Discount = {
  id: string;
  name: string;
  description: string;
  percentage: number;
  enabled: boolean;
  code: string;
};

const mockDiscounts: Discount[] = [
  {
    id: 'discount1',
    name: 'Black Friday',
    description: 'Discount for Black Friday',
    percentage: 15,
    code: 'BlackFriday',
    enabled: true,
  },
  {
    id: 'discount2',
    name: 'New Year Special',
    description: 'Special discount for New Year',
    percentage: 10,
    code: 'NewYear2023',
    enabled: false,
  },
  {
    id: 'discount3',
    name: 'Valentine’s Day',
    description: 'Special discount for Valentine’s Day',
    percentage: 20,
    code: 'Valentine2023',
    enabled: true,
  },
];

const DiscountsAndTaxes = () => {
  const [viewMode, setViewMode] = useState<'discounts' | 'taxes'>('taxes');
  const { data: taxes, isLoading } = useTaxes();

  const handleViewChange = (mode: 'discounts' | 'taxes') => {
    setViewMode(mode);
  };

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" h="40px" mb={4}>
        <Text fontSize="1.125rem" fontWeight="500">
          Discounts & Taxes
        </Text>
      </Flex>
      <Box p={4} boxShadow="lg" rounded="md" bg="white" w="100%">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Flex gap={1} alignItems="center">
            <Box bg="#7C8C2F" width="4px" height="22px" />
            <Text fontSize="14px" textTransform="capitalize" fontWeight="600">
              {viewMode === 'discounts' ? 'Discounts' : 'Taxes'}
            </Text>
          </Flex>
          <Flex gap={2}>
            <Button
              variant="outline"
              size="sm"
              colorScheme={viewMode === 'taxes' ? 'green' : 'gray'}
              onClick={() => handleViewChange('taxes')}
            >
              Taxes
            </Button>
            <Button
              variant="outline"
              size="sm"
              colorScheme={viewMode === 'discounts' ? 'green' : 'gray'}
              onClick={() => handleViewChange('discounts')}
            >
              Discounts
            </Button>
          </Flex>
        </Flex>

        {/* Render conditional content based on the viewMode state */}
        {viewMode === 'discounts' ? (
          <Box>
            <Table size="sm" variant="striped">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Description</Th>
                  <Th>Percentage</Th>
                  <Th>Code</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockDiscounts.map((discount: any, key: number) => (
                  <Tr key={key}>
                    <Td>{discount.name}</Td>
                    <Td>{discount.description}</Td>
                    <Td>{discount.percentage}%</Td>
                    <Td>{discount.code}</Td>
                    <Td>
                      <Tag colorScheme={discount.enabled ? 'green' : 'red'}>
                        {discount.enabled ? 'Enabled' : 'Disabled'}
                      </Tag>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        ) : (
          <Box>
            {isLoading ? (
              <Spinner size="sm" />
            ) : (
              <Table size="sm" variant="striped">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Percentage</Th>
                    <Th>Inclusion Type</Th>
                    <Th>Status</Th>
                    <Th>Restaurant</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {taxes?.map((tax: any, idx: number) => (
                    <Tr key={idx}>
                      <Td>{tax.name}</Td>
                      <Td>{tax.percentage}%</Td>
                      <Td>{tax.inclusionType}</Td>
                      <Td>
                        <Tag colorScheme={tax.enabled ? 'green' : 'red'}>
                          {tax.enabled ? 'Enabled' : 'Disabled'}
                        </Tag>
                      </Td>
                      <Td>{tax.restaurantName}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DiscountsAndTaxes;

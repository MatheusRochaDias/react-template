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
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Select,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useLocations } from '@/services/hooks/useLocations';
import { useMenu } from '@/services/hooks/useMenu';

type Variation = {
  id: number;
  name: string;
  priceAmount: string;
  currency: string;
  ordinal: number;
  pricingType: string;
};

type Item = {
  id: number;
  squareId: string;
  name: string;
  description?: string;
  isTaxable: boolean;
  visibility: string;
  presentAtAllLocations: boolean;
  position: number;
  imageUrls: string[];
  imageSquareIds: string[];
  categoryId: string;
  variations: Variation[];
};

type Category = {
  id: number;
  squareId: string;
  name: string;
  visibility: boolean;
  position: number;
  items: Item[];
};

type MenuData = {
  locationId: string;
  menuId: number;
  categories: Category[];
  taxes: any[];
};

const Menu = () => {
  const { data: locationsData, isLoading: loadingLocations } = useLocations();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'categories' | 'items'>(
    'categories'
  );
  const { data: menuData, isLoading: loadingMenu } = useMenu(
    selectedLocation || ''
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const locationId = event.target.value;
    setSelectedLocation(locationId);
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    onOpen();
  };

  const handleEditItem = (item: Item) => {
    setSelectedItem(item);
    onOpen();
  };

  const selectedLocationName =
    locationsData?.find(
      (location: { id: string }) => location.id === selectedLocation
    )?.name || 'Select Location';

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" h="40px" mb={4}>
        <Text fontSize="1.125rem" fontWeight="500">
          Menu
        </Text>
        {loadingLocations ? (
          <Spinner size="sm" />
        ) : (
          <Select
            placeholder="Select Location"
            onChange={handleLocationChange}
            width="200px"
          >
            {locationsData?.map((location: { id: string; name: string }) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </Select>
        )}
      </Flex>

      <Box p={4} boxShadow="lg" rounded="md" bg="white" w="100%">
        {selectedLocation ? (
          <>
            <Flex justify="space-between" mb={4}>
              <Flex gap={1} alignItems="center" mb={4}>
                <Box bg="#7C8C2F" width="4px" height="22px" />
                <Text fontSize="14px" fontWeight="600">
                  {selectedLocationName}
                </Text>
              </Flex>
              <Flex gap={2}>
                <Button
                  variant="outline"
                  size="sm"
                  colorScheme={viewMode === 'categories' ? 'green' : 'gray'}
                  onClick={() => setViewMode('categories')}
                >
                  Categories
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  colorScheme={viewMode === 'items' ? 'green' : 'gray'}
                  onClick={() => setViewMode('items')}
                >
                  Items
                </Button>
              </Flex>
            </Flex>
            {loadingMenu ? (
              <Text>Loading...</Text>
            ) : viewMode === 'categories' ? (
              <Table size="sm" variant="striped">
                <Thead>
                  <Tr>
                    <Th w="5%">Position</Th>
                    <Th>Category Name</Th>
                    <Th>Visibility</Th>
                    <Th>Item Count</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {menuData?.categories.map((category: Category) => (
                    <Tr key={category.id}>
                      <Td>{category.position}</Td>
                      <Td>{category.name}</Td>
                      <Td>
                        <Tag
                          colorScheme={category.visibility ? 'green' : 'red'}
                        >
                          {category.visibility ? 'Visible' : 'Hidden'}
                        </Tag>
                      </Td>
                      <Td>{category.items.length}</Td>
                      <Td>
                        <IconButton
                          icon={<EditIcon />}
                          onClick={() => handleEditCategory(category)}
                          aria-label="Edit category"
                          size="sm"
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              menuData?.categories.map((category: Category) => (
                <Box
                  key={category.id}
                  mb={4}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  boxShadow="sm"
                  bg="gray.50"
                >
                  {/* Category Header */}
                  <Text fontSize="lg" fontWeight="bold" mb={2}>
                    {category.name}
                  </Text>

                  {/* Item Table */}
                  <Table size="sm" variant="simple">
                    <Thead>
                      <Tr>
                        <Th w="20%">Item Name</Th>
                        <Th w="30%">Description</Th>
                        <Th>Price</Th>
                        <Th>Visibility</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {category.items.map((item: Item) => (
                        <Tr key={item.id}>
                          <Td>{item.name}</Td>
                          <Td>{item.description || '-'}</Td>
                          <Td>
                            {item.variations.map((variation) => (
                              <Text key={variation.id}>
                                {variation.name}: $
                                {(+variation.priceAmount / 100).toFixed(2)}
                              </Text>
                            ))}
                          </Td>
                          <Td>
                            <Tag
                              colorScheme={
                                item.visibility === 'PRIVATE' ? 'red' : 'green'
                              }
                            >
                              {item.visibility === 'PRIVATE'
                                ? 'Hidden'
                                : 'Visible'}
                            </Tag>
                          </Td>
                          <Td>
                            <IconButton
                              icon={<EditIcon />}
                              onClick={() => handleEditItem(item)}
                              aria-label="Edit item"
                              size="sm"
                            />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              ))
            )}
          </>
        ) : (
          <Flex justify="center" align="center" h="200px">
            <Text fontSize="lg" color="gray.500">
              Please select a location to view the menu.
            </Text>
          </Flex>
        )}
      </Box>

      {/* Modals for editing */}
      {selectedCategory && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Visibility</FormLabel>
                <Select
                  value={selectedCategory.visibility ? 'visible' : 'hidden'}
                  onChange={(e) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      visibility: e.target.value === 'visible',
                    })
                  }
                >
                  <option value="visible">Visible</option>
                  <option value="hidden">Hidden</option>
                </Select>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Position</FormLabel>
                <NumberInput
                  value={selectedCategory.position}
                  onChange={(valueString) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      position: parseInt(valueString, 10),
                    })
                  }
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Save
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {selectedItem && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Item</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Item Name</FormLabel>
                <Input
                  value={selectedItem.name}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      name: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  value={selectedItem.description || ''}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      description: e.target.value,
                    })
                  }
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Save
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Menu;

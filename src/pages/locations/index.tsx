import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
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
  NumberInput,
  NumberInputField,
  Select,
} from '@chakra-ui/react';
import {
  EditIcon,
  ViewIcon,
  CheckIcon,
  CloseIcon,
  InfoOutlineIcon,
} from '@chakra-ui/icons';
import { useState } from 'react';
import { useLocations } from '@/services/hooks/useLocations';

// Definindo o tipo correto para o Location
type Location = {
  id: string;
  name: string;
  alternativeName?: string;
  visibility: boolean;
  position: number;
  addressLine1: string;
  locality: string;
  administrativeDistrict: string;
  timezone: string;
  Franchisee: { name: string };
  businessHours: {
    periods: {
      dayOfWeek: string;
      startLocalTime: string;
      endLocalTime: string;
    }[];
  };
};

const Locations = () => {
  const { data: locationsData, isLoading, error, refetch } = useLocations();

  const handleToggleVisibility = (locationId: string, visibility: boolean) => {
    console.log(
      `Toggling visibility for location ${locationId} to ${visibility}`
    );
  };

  const handleEditLocation = (locationId: string, updatedData: any) => {
    console.log(`Editing location ${locationId} with data`, updatedData);
  };

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" h="40px" mb={4}>
        <Text fontSize="1.125rem" fontWeight="500">
          Locations
        </Text>
      </Flex>
      <Box p={4} boxShadow="lg" rounded="md" bg="white" w="100%">
        <Flex gap={1} alignItems="center" mb={4}>
          <Box bg="#7C8C2F" width="4px" height="22px" />
          <Text fontSize="14px" fontWeight="600">
            Restaurants
          </Text>
        </Flex>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <LocationsTable
            locations={locationsData}
            onToggleVisibility={handleToggleVisibility}
            onEditLocation={handleEditLocation}
          />
        )}
      </Box>
    </Box>
  );
};

export default Locations;

const LocationsTable = ({
  locations,
  onToggleVisibility,
  onEditLocation,
}: {
  locations: Location[];
  onToggleVisibility: (id: string, visibility: boolean) => void;
  onEditLocation: (id: string, data: any) => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  const handleEditClick = (location: Location) => {
    setSelectedLocation(location);
    onOpen(); // Abrir o modal de edição
  };

  return (
    <Box rounded="md" bg="white" w="100%">
      <Table size="sm" variant="striped">
        <Thead>
          <Tr>
            <Th>Location Name</Th>
            <Th>Visibility</Th>
            <Th>Address</Th>
            <Th>Timezone</Th>
            <Th>Franchisee</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {locations.map((location) => (
            <Tr key={location.id}>
              <Td>
                <Flex alignItems="center">{location.name}</Flex>
              </Td>
              <Td>
                <Tag colorScheme={location.visibility ? 'green' : 'red'}>
                  {location.visibility ? 'Visible' : 'Hidden'}
                </Tag>
              </Td>
              <Td>{`${location.addressLine1}, ${location.locality}, ${location.administrativeDistrict}`}</Td>
              <Td>
                <Flex alignItems="center">
                  {location.timezone}
                  <Tooltip
                    label={
                      <Box>
                        {location.businessHours.periods.map((period) => (
                          <Text key={period.dayOfWeek}>
                            {period.dayOfWeek}: {period.startLocalTime} -{' '}
                            {period.endLocalTime}
                          </Text>
                        ))}
                      </Box>
                    }
                  >
                    <IconButton
                      icon={<InfoOutlineIcon />}
                      aria-label="Business hours"
                      size="sm"
                      variant="ghost"
                    />
                  </Tooltip>
                </Flex>
              </Td>
              <Td>{location.Franchisee.name}</Td>
              <Td>
                {/* Toggle Visibility */}
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => handleEditClick(location)}
                  aria-label="Edit location"
                  size="sm"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal for editing location */}
      {selectedLocation && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Location</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Alternative Name</FormLabel>
                <Input
                  value={selectedLocation.alternativeName || ''}
                  onChange={(e) =>
                    setSelectedLocation({
                      ...selectedLocation,
                      alternativeName: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Position</FormLabel>
                <NumberInput
                  value={selectedLocation.position || 0}
                  onChange={(valueString) =>
                    setSelectedLocation({
                      ...selectedLocation,
                      position: Number(valueString),
                    })
                  }
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              {/* Select for Visibility */}
              <FormControl mb={4}>
                <FormLabel>Visibility</FormLabel>
                <Select
                  value={selectedLocation.visibility ? 'visible' : 'hidden'}
                  onChange={(e) =>
                    setSelectedLocation({
                      ...selectedLocation,
                      visibility: e.target.value === 'visible',
                    })
                  }
                >
                  <option value="visible">Visible</option>
                  <option value="hidden">Hidden</option>
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() =>
                  onEditLocation(selectedLocation.id, selectedLocation)
                }
              >
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

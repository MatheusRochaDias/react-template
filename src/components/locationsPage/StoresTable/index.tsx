// StoresTable.tsx
import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Icon } from '@iconify/react';
import { SortableItem } from '../../SortableItem';
// import storesData from '@/mocks/stores';
import { useGlobal } from '@/styles/base';

interface Store {
  name: string;
  alternativeName: string;
  isVisible: boolean;
  address: string;
  hour: Array<{
    day_of_week: string;
    start_local_time: string;
    end_local_time: string;
  }>;
  order: number;
}

const StoresTable: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const toast = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setStores((items) => {
        const oldIndex = items.findIndex((item) => item.name === active.id);
        const newIndex = items.findIndex((item) => item.name === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        toast({
          title: 'Order updated.',
          description: 'The store order has been successfully updated.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        return newItems;
      });
    }
  };

  const { mainColor, font, tableHeader } = useGlobal();

  const toggleVisibility = (name: string) => {
    setStores((prevStores) =>
      prevStores.map((store) =>
        store.name === name ? { ...store, isVisible: !store.isVisible } : store
      )
    );
    toast({
      title: 'Visibility updated.',
      description: 'The store visibility has been successfully updated.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={stores.map((store) => store.name)}
        strategy={verticalListSortingStrategy}
      >
        <Box
          overflowX="auto"
          w="100%"
          border="1px solid rgba(0, 0, 0, 0.3)"
          borderRadius=".5rem"
        >
          <Table variant="simple" w="100%">
            <Thead h="min-content">
              <Tr h="min-content">
                <Th
                  h="min-content"
                  fontFamily={font}
                  textTransform="capitalize"
                  fontWeight="600"
                  fontSize="0.875rem"
                  color={tableHeader}
                  letterSpacing="0.0313rem"
                  whiteSpace="nowrap"
                  padding="1.25rem 0.9375rem"
                >
                  Name
                </Th>
                <Th
                  h="min-content"
                  fontFamily={font}
                  textTransform="capitalize"
                  fontWeight="600"
                  fontSize="0.875rem"
                  color={tableHeader}
                  letterSpacing="0.0313rem"
                  whiteSpace="nowrap"
                  padding="1.25rem 0.9375rem"
                >
                  Alternative Name
                </Th>
                <Th
                  h="min-content"
                  fontFamily={font}
                  textTransform="capitalize"
                  fontWeight="600"
                  fontSize="0.875rem"
                  color={tableHeader}
                  letterSpacing="0.0313rem"
                  whiteSpace="nowrap"
                  padding="1.25rem 0.9375rem"
                >
                  Address
                </Th>
                <Th
                  h="min-content"
                  fontFamily={font}
                  textTransform="capitalize"
                  fontWeight="600"
                  fontSize="0.875rem"
                  color={tableHeader}
                  letterSpacing="0.0313rem"
                  whiteSpace="nowrap"
                  padding="1.25rem 0.9375rem"
                >
                  Work-Hours
                </Th>
                <Th
                  h="min-content"
                  fontFamily={font}
                  textTransform="capitalize"
                  fontWeight="600"
                  fontSize="0.875rem"
                  color={tableHeader}
                  letterSpacing="0.0313rem"
                  whiteSpace="nowrap"
                  padding="1.25rem 0.9375rem"
                >
                  Visibility
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {stores.map((store) => (
                <SortableItem key={store.name} id={store.name}>
                  <Td>
                    <Text fontFamily={font} fontWeight="600" fontSize="0.9rem">
                      {store.name}
                    </Text>
                  </Td>
                  <Td>
                    {' '}
                    <Text fontFamily={font} fontWeight="600" fontSize="0.9rem">
                      {store.alternativeName}
                    </Text>
                  </Td>
                  <Td padding="1.75rem 0.9375rem">
                    <Flex alignItems="center" gap={3}>
                      <Icon
                        icon="ri:map-pin-line"
                        color={mainColor}
                        width="1.2rem"
                      />
                      <Text fontFamily={font} fontSize="0.875rem">
                        {store.address}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        colorScheme="blue"
                        variant="outline"
                        as={Button}
                        px="2rem"
                      >
                        <Text fontFamily={font} fontSize="0.875rem">
                          View
                        </Text>
                      </MenuButton>
                      <MenuList>
                        {store.hour.map((hour, index) => (
                          <MenuItem key={index}>
                            <Text>
                              {`${hour.day_of_week}: ${hour.start_local_time} - ${hour.end_local_time}`}
                            </Text>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </Td>
                  <Td>
                    <Button
                      px="2rem"
                      colorScheme={store.isVisible ? 'green' : 'gray'}
                      variant={store.isVisible ? 'solid' : 'solid'}
                      onClick={() => toggleVisibility(store.name)}
                    >
                      <Text fontFamily={font} fontSize="0.875rem">
                        {store.isVisible ? 'Visible' : 'Hidden'}
                      </Text>
                    </Button>
                  </Td>
                </SortableItem>
              ))}
            </Tbody>
          </Table>
        </Box>
      </SortableContext>
    </DndContext>
  );
};
export default StoresTable;

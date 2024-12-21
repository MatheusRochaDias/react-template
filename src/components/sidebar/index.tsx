import React from 'react';
import {
  VStack,
  Box,
  Text,
  Icon,
  HStack,
  Spacer,
  Flex,
  Image,
} from '@chakra-ui/react';
import {
  FaHome,
  FaTh,
  FaMapMarkerAlt,
  FaUtensils,
  FaBoxes,
  FaList,
  FaLayerGroup,
  FaTags,
  FaUsers,
  FaShoppingCart,
  FaBullhorn,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  const items = [
    { icon: FaHome, label: 'Dashboard', path: '/' },
    { icon: FaTh, label: 'Square Apps', path: '/square-apps' },
    { icon: FaMapMarkerAlt, label: 'Locations', path: '/locations' },
    { icon: FaUtensils, label: 'Menu', path: '/menu' },
    // { icon: FaBoxes, label: 'Items', path: '/items' },
    // { icon: FaList, label: 'Categories', path: '/categories' },
    { icon: FaTags, label: 'Discounts & Taxes', path: '/discounts-taxes' },
    { icon: FaUsers, label: 'Clients', path: '/clients' },
    { icon: FaShoppingCart, label: 'Orders', path: '/orders' },
    { icon: FaBullhorn, label: 'Marketing', path: '/marketing' },
    { icon: FaLayerGroup, label: 'Reviews', path: '/review' },
    // { icon: FaCog, label: 'Settings', path: '/settings' },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Box h="100vh">
      <VStack
        align="start"
        bg="white"
        color="gray.700"
        height="100vh"
        width="250px"
        spacing={2}
        boxShadow="lg"
        fontFamily="'Inter', sans-serif"
      >
        <Box mb={4} p={4}>
          <Flex justify="space-between" alignItems="center" gap="4">
            <Image src="/logo.svg" objectFit="cover" w="50px" />
            <Text fontSize="xl" fontWeight="bold" color="black" mt="15px">
              Chef Online
            </Text>
          </Flex>
        </Box>
        <VStack
          maxH="80%"
          p={4}
          spacing={2}
          overflowY="auto"
          w="100%"
          sx={{
            /* Estilos para navegadores WebKit (Chrome, Safari) */
            '::-webkit-scrollbar': {
              width: '4px', // Largura da barra de rolagem
            },
            '::-webkit-scrollbar-thumb': {
              background: '#CBD5E0', // Cor da barra de rolagem
              borderRadius: '10px',
            },
            '::-webkit-scrollbar-thumb:hover': {
              background: '#A0AEC0', // Cor quando o mouse está em hover
            },
            '::-webkit-scrollbar-track': {
              background: '#F7FAFC', // Cor de fundo da barra de rolagem
            },
            '::-webkit-scrollbar-button': {
              display: 'none', // Remove as setas no Chrome/Safari
            },

            /* Estilos para Firefox */
            scrollbarWidth: 'thin', // Barra fina no Firefox
            scrollbarColor: '#CBD5E0 #F7FAFC', // Thumb e background da barra de rolagem
          }}
        >
          {items.map((item, index) => (
            <HStack
              key={item.label}
              align="center"
              p={2}
              width="100%"
              borderRadius="md"
              _hover={{
                bg: router.pathname !== item.path ? '#F2F3EB' : '#7C8C2F',
              }}
              cursor="pointer"
              bg={router.pathname === item.path ? '#7C8C2F' : 'transparent'}
              color={router.pathname === item.path ? 'white' : 'gray.700'}
              onClick={() => handleNavigation(item.path)}
            >
              <Icon
                as={item.icon}
                boxSize={4}
                color={router.pathname === item.path ? 'white' : 'gray.700'}
              />
              <Text fontSize="md">{item.label}</Text>
            </HStack>
          ))}
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <HStack
            align="center"
            p={2}
            width="100%"
            borderRadius="md"
            _hover={{ bg: 'gray.200' }}
            cursor="pointer"
            onClick={() => handleNavigation('/logout')}
          >
            <Icon as={FaSignOutAlt} boxSize={4} />
            <Text fontSize="md">Log out</Text>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;

import { Box, Collapse, Divider, Flex, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { SetStateAction, useState } from 'react';
import { useGlobal } from '@/styles/base';

const pages = [
  {
    head: 'Restaurants',
    icon: 'ic:sharp-store-mall-directory',
    subItem: [
      { title: 'Restaurants', link: '/restaurants' },
      { title: 'Access key', link: '/access-key' },
    ],
  },
  {
    head: 'Menu',
    icon: 'ion:restaurant',
    subItem: [
      { title: 'Menu', link: '/menu' },
      { title: 'Items', link: '/items' },
      { title: 'Category', link: '/category' },
      { title: 'Modifiers', link: '/modifiers' },
      { title: 'Reviews', link: '/reviews' },
    ],
  },
  {
    head: 'Clients',
    icon: 'clarity:user-line',
    subItem: [{ title: 'Clients', link: '/clients' }],
  },
  {
    head: 'Orders',
    icon: 'material-symbols:order-approve-rounded',
    subItem: [{ title: 'Orders', link: '/orders' }],
  },
];

export default function Sidebar() {
  const { mainColor, textGray, font } = useGlobal();
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleItem = (idx: any) => {
    if (expandedItem === idx) {
      setExpandedItem(null);
    } else {
      setExpandedItem(idx);
    }
  };
  return (
    <Box
      borderRight={`1px solid ${textGray}`}
      h="100vh"
      position="fixed"
      px="1.5rem"
      w="16vw"
    >
      <Box mt="2rem">
        <Text
          fontFamily={font}
          px=" 1.25rem"
          fontSize="0.800rem"
          pb="1rem"
          color={mainColor}
          fontWeight="bold"
        >
          Main Menu
        </Text>
        {pages.map((item, idx) => (
          <Box key={idx} transition="height 1s ease-in-out">
            {' '}
            <Flex
              alignItems="center"
              justify="space-between"
              cursor="pointer"
              onClick={() => toggleItem(idx)}
              _hover={{
                '.hover-text': { color: expandedItem !== idx && mainColor },
              }}
              bg={expandedItem === idx ? mainColor : 'transparent'}
              color={expandedItem === idx ? '#ffffff' : '#777777'}
              // transition="background-color 0.1s, color 1s"
              borderRadius="0.5rem"
              p="0.9rem 1.25rem"
            >
              <Flex gap={3}>
                <Icon
                  icon={item.icon}
                  color={expandedItem === idx ? '#ffffff' : '#96A0AF'}
                  width="1.5rem"
                />
                <Text
                  fontFamily={font}
                  color={expandedItem === idx ? '#ffffff' : '#777777'}
                  fontSize="1rem"
                  fontWeight={700}
                  className="hover-text"
                  // transition="color 0.5s ease"
                >
                  {item.head}
                </Text>
              </Flex>
              <Icon
                icon={
                  expandedItem === idx
                    ? 'ri:arrow-down-s-fill'
                    : 'ri:arrow-right-s-fill'
                }
                color={expandedItem === idx ? '#ffffff' : '#96A0AF'}
                width="1.5rem"
              />
            </Flex>
            {expandedItem === idx && (
              <Box
                ml="2rem"
                mt="0.5rem"
                transition="height 1s ease-in-out"
                maxHeight={expandedItem === idx ? 'auto' : '0'}
                overflowY="hidden"
              >
                {item.subItem.map((sub, subIdx) => (
                  <a href={sub.link} key={subIdx}>
                    <Flex
                      alignItems="center"
                      gap={3}
                      py="0.4rem"
                      w="100%"
                      _hover={{
                        '.hover-subtext': {
                          color: mainColor,
                        },
                        '.hover-subicon': {
                          width: '1.5rem',
                        },
                      }}
                    >
                      <Box
                        w="1rem"
                        transition="ease-in-out 0.3s"
                        className="hover-subicon"
                      >
                        <Icon
                          icon="pajamas:dash"
                          color={mainColor}
                          width="100%"
                        />
                      </Box>
                      <Text
                        fontFamily={font}
                        color="#777777"
                        fontSize="0.875rem"
                        fontWeight={600}
                        transition="ease-in-out 0.5s"
                        className="hover-subtext"
                      >
                        {sub.title}
                      </Text>
                    </Flex>
                  </a>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

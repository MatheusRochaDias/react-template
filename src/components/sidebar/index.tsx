import { Box, Flex, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@/context/themeContext';

const pages = [
  {
    head: 'Square',
    icon: 'tabler:id-badge',
    link: '/square',
  },
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
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const { theme } = useTheme();
  const router = useRouter();

  const toggleItem = (idx: number, item: any) => {
    if (item.subItem) {
      setExpandedItem(expandedItem === idx ? null : idx);
    } else {
      setExpandedItem(idx);
      router.push(item.link);
    }
  };

  useEffect(() => {
    const currentPage = pages.findIndex(
      (item) =>
        item.link === router.pathname ||
        (item.subItem &&
          item.subItem.some((sub) => sub.link === router.pathname))
    );
    setExpandedItem(currentPage);
  }, [router.pathname]);

  return (
    <Box h="100vh" position="fixed" w="13vw" bg={theme.mainColor}>
      <Box mt="2rem">
        <Text
          fontFamily={theme.font}
          fontSize="1.250rem"
          pb="1rem"
          color="#ffffff"
          fontWeight="bold"
          mx="1.5rem"
        >
          Main Menu
        </Text>
        {pages.map((item, idx) => (
          <Box key={idx} transition="height 1s ease-in-out">
            <Flex
              alignItems="center"
              justify="space-between"
              cursor="pointer"
              onClick={() => toggleItem(idx, item)}
              _hover={{
                '.hover-text': { color: expandedItem !== idx && '#ffffff' },
              }}
              bg={expandedItem === idx ? '#f3f3f4' : 'transparent'}
              color={expandedItem === idx ? '#000000' : '#777777'}
              w="100%"
              p="0.9rem 1.25rem"
            >
              <Flex gap={3}>
                <Icon
                  icon={item.icon}
                  color={expandedItem === idx ? '#000000' : '#96A0AF'}
                  width="1.5rem"
                />
                <Text
                  fontFamily={theme.font}
                  color={expandedItem === idx ? '#000000' : '#777777'}
                  fontSize="1rem"
                  fontWeight={700}
                  className="hover-text"
                >
                  {item.head}
                </Text>
              </Flex>
              {item.subItem && (
                <Icon
                  icon={
                    expandedItem === idx
                      ? 'ri:arrow-down-s-fill'
                      : 'ri:arrow-right-s-fill'
                  }
                  color={expandedItem === idx ? '#000000' : '#96A0AF'}
                  width="1.5rem"
                />
              )}
            </Flex>
            {expandedItem === idx && item.subItem && (
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
                          color: '#ffffff',
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
                          color="#ffffff"
                          width="100%"
                        />
                      </Box>
                      <Text
                        fontFamily={theme.font}
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

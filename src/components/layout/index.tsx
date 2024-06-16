import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../sidebar';
import Header from '../header';
import { useGlobal } from '@/styles/base';

interface layoutProps {
  children: ReactNode;
}
export default function Layout({ children }: layoutProps) {
  const { asPath } = useRouter();
  console.log(asPath === '');
  const checkRoute = ['/login'];
  const { mainColor, textGray, font } = useGlobal();
  return (
    <Box>
      {checkRoute.includes(asPath) ? (
        children
      ) : (
        <Box>
          <Header />
          <Box bg="#ffffff" mt="5.5rem">
            <Box
              bg={mainColor}
              h="1rem"
              position="fixed"
              width="100%"
              top="5.5rem"
            >
              <Box bg="#ffffff" h="100%" borderRadius="30px 30px 0px 0px" />
            </Box>
            <Flex mx="auto" bg="#ffffff">
              <Sidebar />
              <Box ml="16vw">
                <Box p="2rem">
                  <Box>{children}</Box>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      )}
    </Box>
  );
}

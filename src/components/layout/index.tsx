// src/components/layout.tsx
import { Box, Flex, Grid, Text, GridItem, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import Sidebar from '../sidebar';
import Header from '../header';
import { useGlobal } from '@/styles/base';
import { useTheme } from '@/context/themeContext';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { pathname } = router;
  const checkRoute = ['/login', '/404'];
  const { mainColor } = useGlobal();
  const cookies = parseCookies();
  const token = cookies['@food_token'];

  // Redirecionar para login se não autenticado e não na página de login
  if (!token && pathname !== '/login') {
    router.push('/login');
    return null;
  }

  const { theme } = useTheme();
  return (
    <Box>
      {checkRoute.includes(pathname) ? (
        children
      ) : (
        <Box>
          <Grid templateColumns="repeat(6, 1fr)" gap={4} bg="#F9FBFB">
            <GridItem
              colSpan={1}
              position="fixed"
              top="0"
              left="0"
              height="100vh"
              width="250px"
            >
              <Sidebar />
            </GridItem>
            <GridItem
              colSpan={5}
              ml="250px"
              h="100vh"
              w="100%"
              bg="#F9FBFB"
              width="calc(100%)"
            >
              <Box p={5}>{children}</Box>
            </GridItem>
          </Grid>
          {/* <Header /> */}
        </Box>
      )}
    </Box>
  );
}

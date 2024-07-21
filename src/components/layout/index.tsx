// src/components/layout.tsx
import { Box, Flex } from '@chakra-ui/react';
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
          <Header />
          <Box bg="#ffffff" mt="5.5rem">
            <Box
              bg={theme.mainColor}
              h="1rem"
              position="fixed"
              width="100%"
              top="5.5rem"
            >
              <Box bg="#f3f3f4" h="100%" borderRadius="30px 30px 0px 0px" />
            </Box>
            <Flex mx="auto" bg="#f3f3f4">
              <Sidebar />
              <Box ml="13vw" w="100%">
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

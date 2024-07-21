import { ChakraProvider, Flex, Spinner } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClientProvider } from 'react-query';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import { queryClient } from '@/services/queryClient';
import { useGlobal } from '@/styles/base';
import { AuthProvider } from '@/context/AuthContext';
import { authPageProps } from '@/utils/authPageProps';
import { ThemeProvider } from '@/context/themeContext';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { mainColor } = useGlobal();
  const protectedRoutes = ['/networks', '/restaurants'];
  const isProtectedRoute = protectedRoutes.includes(router.pathname);
  const [showChild, setShowChild] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowChild(true);
    }, 200);
  }, []);

  if (!showChild) {
    return (
      <Flex justify="center" align="center" h="90vh">
        <Spinner size="xs" w="50px" h="50px" color={mainColor} />
      </Flex>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <ThemeProvider>
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />{' '}
            </Layout>
          </AuthProvider>
        </ThemeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = authPageProps;

export default MyApp;

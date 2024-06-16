import { Flex, Image } from '@chakra-ui/react';
import { useGlobal } from '@/styles/base';

export default function Header() {
  const { mainColor, font } = useGlobal();
  return (
    <Flex
      justify="space-between"
      bg={mainColor}
      px="2vw"
      alignItems="center"
      h="5.5rem"
      position="fixed"
      top="0"
      width="100%"
      zIndex={1000}
    >
      <Flex w="16vw">
        <Image src="/logo_black.png" w="10vw" maxW="200px" h="min" />
      </Flex>
      <Flex>Sair</Flex>
    </Flex>
  );
}

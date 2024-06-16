import { Box } from '@chakra-ui/react';
import StoresTable from '@/components/locationsPage/StoresTable';

export default function Restaurants() {
  return (
    <Box>
      <Box overflow="hidden">
        <StoresTable />
      </Box>
    </Box>
  );
}

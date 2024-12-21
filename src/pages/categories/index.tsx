import { Box, Text } from '@chakra-ui/react';
import { useSquareCategories } from '@/services/hooks/useCategories';
import CategoriesTable from '@/components/Tables/CategoriesTable';

export default function Category() {
  const { data: squareTaxes } = useSquareCategories();
  console.log(squareTaxes);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Taxes
        </Text>
      </Box>
      <CategoriesTable />
    </Box>
  );
}

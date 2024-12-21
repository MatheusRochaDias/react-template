import React from 'react';
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Text,
  Flex,
  Progress,
} from '@chakra-ui/react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// Definindo o tipo das props para o StatBox
interface StatBoxProps {
  title: string;
  value: string | number;
  percentage: string;
  isPositive: boolean;
}

// Componente StatBox com tipagem
const StatBox: React.FC<StatBoxProps> = ({
  title,
  value,
  percentage,
  isPositive,
}) => (
  <Stat p="4" boxShadow="lg" borderRadius="md" bg="white">
    <StatLabel>{title}</StatLabel>
    <StatNumber>{value}</StatNumber>
    <StatHelpText>
      <StatArrow type={isPositive ? 'increase' : 'decrease'} />
      {percentage}
    </StatHelpText>
  </Stat>
);

// Configuração dos gráficos
const chartOptions: ApexOptions = {
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },
  yaxis: {
    title: {
      text: 'Earnings & Actions',
    },
  },
  colors: ['#38A169', '#2B6CB0'],
  grid: {
    strokeDashArray: 3,
  },
  legend: {
    show: true,
    position: 'top',
  },
};

const chartSeries = [
  {
    name: 'Earnings',
    data: [100, 300, 200, 400, 500, 200, 300, 400, 300, 500, 400, 300],
  },
  {
    name: 'Actions',
    data: [50, 200, 100, 300, 400, 150, 250, 300, 200, 400, 300, 200],
  },
];

export default function Category() {
  return (
    <Box p="6" bg="#f4f7f9">
      <Text fontSize="1.125rem" fontWeight="500">
        Dashboard
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={6}>
        <StatBox
          title="Website Traffic"
          value="91.6K"
          percentage="15%"
          isPositive
        />
        <StatBox
          title="Conversion Rate"
          value="15%"
          percentage="10%"
          isPositive={false}
        />
        <StatBox
          title="Session Duration"
          value="90 Sec"
          percentage="25%"
          isPositive
        />
        <StatBox
          title="Active Users"
          value="2,986"
          percentage="4%"
          isPositive
        />
      </SimpleGrid>

      <Box bg="white" p="6" borderRadius="md" boxShadow="lg">
        <Text fontSize="lg" mb="4">
          Earning Reports
        </Text>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={6}>
        <Box p="4" boxShadow="lg" borderRadius="md" bg="white">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="lg" fontWeight="bold">
              Earnings
            </Text>
            <Text fontSize="lg" color="gray.500">
              $545.69
            </Text>
          </Flex>
          <Progress value={70} size="sm" colorScheme="blue" mt={4} />
        </Box>
        <Box p="4" boxShadow="lg" borderRadius="md" bg="white">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="lg" fontWeight="bold">
              Profit
            </Text>
            <Text fontSize="lg" color="gray.500">
              $256.34
            </Text>
          </Flex>
          <Progress value={50} size="sm" colorScheme="green" mt={4} />
        </Box>
        <Box p="4" boxShadow="lg" borderRadius="md" bg="white">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="lg" fontWeight="bold">
              Expense
            </Text>
            <Text fontSize="lg" color="gray.500">
              $74.19
            </Text>
          </Flex>
          <Progress value={20} size="sm" colorScheme="red" mt={4} />
        </Box>
      </SimpleGrid>
    </Box>
  );
}

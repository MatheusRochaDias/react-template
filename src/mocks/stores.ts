interface Hour {
  day_of_week: string;
  start_local_time: string;
  end_local_time: string;
}

interface Store {
  name: string;
  alternativeName: string;
  isVisible: boolean;
  address: string;
  hour: Hour[];
  order: number;
}

const storesData: Store[] = [
  {
    name: 'New York',
    alternativeName: 'NYC',
    isVisible: false,
    address: '123 5th Ave, New York, NY 10001',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '09:00',
        end_local_time: '21:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '09:00',
        end_local_time: '21:00',
      },
    ],
    order: 1,
  },
  {
    name: 'Los Angeles',
    alternativeName: 'LA',
    isVisible: true,
    address: '456 Hollywood Blvd, Los Angeles, CA 90028',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '10:00',
        end_local_time: '22:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '10:00',
        end_local_time: '22:00',
      },
    ],
    order: 2,
  },
  {
    name: 'Chicago',
    alternativeName: 'Chi-town',
    isVisible: true,
    address: '789 Michigan Ave, Chicago, IL 60611',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '08:00',
        end_local_time: '20:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '08:00',
        end_local_time: '20:00',
      },
    ],
    order: 3,
  },
  {
    name: 'Houston',
    alternativeName: 'H-Town',
    isVisible: true,
    address: '101 Main St, Houston, TX 77002',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '07:00',
        end_local_time: '19:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '07:00',
        end_local_time: '19:00',
      },
    ],
    order: 4,
  },
  {
    name: 'Phoenix',
    alternativeName: 'PHX',
    isVisible: true,
    address: '202 Central Ave, Phoenix, AZ 85004',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '11:00',
        end_local_time: '23:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '11:00',
        end_local_time: '23:00',
      },
    ],
    order: 5,
  },
  // Adicione mais lojas até completar 20 elementos
  {
    name: 'Philadelphia',
    alternativeName: 'Philly',
    isVisible: true,
    address: '303 Market St, Philadelphia, PA 19106',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '09:00',
        end_local_time: '21:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '09:00',
        end_local_time: '21:00',
      },
    ],
    order: 6,
  },
  {
    name: 'San Antonio',
    alternativeName: 'SA',
    isVisible: true,
    address: '404 River Walk St, San Antonio, TX 78205',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '10:00',
        end_local_time: '22:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '10:00',
        end_local_time: '22:00',
      },
    ],
    order: 7,
  },
  {
    name: 'San Diego',
    alternativeName: 'SD',
    isVisible: true,
    address: '505 Beach St, San Diego, CA 92101',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '09:00',
        end_local_time: '21:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '09:00',
        end_local_time: '21:00',
      },
    ],
    order: 8,
  },
  {
    name: 'Dallas',
    alternativeName: 'Big D',
    isVisible: true,
    address: '606 Elm St, Dallas, TX 75201',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '08:00',
        end_local_time: '20:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '08:00',
        end_local_time: '20:00',
      },
    ],
    order: 9,
  },
  {
    name: 'San Jose',
    alternativeName: 'SJ',
    isVisible: true,
    address: '707 Market St, San Jose, CA 95113',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '07:00',
        end_local_time: '19:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '07:00',
        end_local_time: '19:00',
      },
    ],
    order: 10,
  },
  {
    name: 'Austin',
    alternativeName: 'ATX',
    isVisible: true,
    address: '808 Congress Ave, Austin, TX 78701',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '10:00',
        end_local_time: '22:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '10:00',
        end_local_time: '22:00',
      },
    ],
    order: 11,
  },
  {
    name: 'Jacksonville',
    alternativeName: 'Jax',
    isVisible: true,
    address: '909 Bay St, Jacksonville, FL 32202',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '09:00',
        end_local_time: '21:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '09:00',
        end_local_time: '21:00',
      },
    ],
    order: 12,
  },
  {
    name: 'Fort Worth',
    alternativeName: 'Cowtown',
    isVisible: true,
    address: '1010 Main St, Fort Worth, TX 76102',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '08:00',
        end_local_time: '20:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '08:00',
        end_local_time: '20:00',
      },
    ],
    order: 13,
  },
  {
    name: 'Columbus',
    alternativeName: 'Cbus',
    isVisible: true,
    address: '1111 High St, Columbus, OH 43201',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '07:00',
        end_local_time: '19:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '07:00',
        end_local_time: '19:00',
      },
    ],
    order: 14,
  },
  {
    name: 'Charlotte',
    alternativeName: 'Queen City',
    isVisible: true,
    address: '1212 Tryon St, Charlotte, NC 28202',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '10:00',
        end_local_time: '22:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '10:00',
        end_local_time: '22:00',
      },
    ],
    order: 15,
  },
  {
    name: 'San Francisco',
    alternativeName: 'SF',
    isVisible: true,
    address: '1313 Market St, San Francisco, CA 94103',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '09:00',
        end_local_time: '21:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '09:00',
        end_local_time: '21:00',
      },
    ],
    order: 16,
  },
  {
    name: 'Indianapolis',
    alternativeName: 'Indy',
    isVisible: true,
    address: '1414 Monument Cir, Indianapolis, IN 46204',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '08:00',
        end_local_time: '20:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '08:00',
        end_local_time: '20:00',
      },
    ],
    order: 17,
  },
  {
    name: 'Seattle',
    alternativeName: 'Emerald City',
    isVisible: true,
    address: '1515 Pike Pl, Seattle, WA 98101',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '07:00',
        end_local_time: '19:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '07:00',
        end_local_time: '19:00',
      },
    ],
    order: 18,
  },
  {
    name: 'Denver',
    alternativeName: 'Mile High City',
    isVisible: true,
    address: '1616 16th St, Denver, CO 80202',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '10:00',
        end_local_time: '22:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '10:00',
        end_local_time: '22:00',
      },
    ],
    order: 19,
  },
  {
    name: 'Washington',
    alternativeName: 'DC',
    isVisible: true,
    address: '1717 Pennsylvania Ave NW, Washington, DC 20006',
    hour: [
      {
        day_of_week: 'Monday',
        start_local_time: '09:00',
        end_local_time: '21:00',
      },
      {
        day_of_week: 'Tuesday',
        start_local_time: '09:00',
        end_local_time: '21:00',
      },
    ],
    order: 20,
  },
];

export default storesData;

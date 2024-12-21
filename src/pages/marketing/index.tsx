import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  Tag,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Checkbox,
  VStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Select,
  HStack,
} from '@chakra-ui/react';
import { ViewIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

// Tipos para representar uma campanha e um usuário para criação de audiências
type Campaign = {
  id: string;
  type: 'Email' | 'SMS';
  subject: string;
  content: string;
  date: string;
  status: 'Draft' | 'Scheduled' | 'Sent';
  location: string;
  audience: string;
};

type User = {
  id: string;
  name: string;
};

// Dados mockados para campanhas, usuários e segmentos
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    type: 'Email',
    subject: 'Holiday Season Sale',
    content: 'Get 50% off on all items!',
    date: '2023-12-18',
    status: 'Scheduled',
    location: 'All locations',
    audience: 'All subscribers',
  },
  {
    id: '2',
    type: 'SMS',
    subject: '',
    content: 'Reminder: New Year Sale starts tomorrow!',
    date: '2024-01-01',
    status: 'Sent',
    location: 'All locations',
    audience: 'VIP customers',
  },
];

const mockUsers: User[] = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Alice Johnson' },
  { id: '4', name: 'Bob Brown' },
];

const segmentsOptions = [
  'New followers',
  'Opened the last 2 emails',
  'Did not open last email',
  'No emails sent last 14 days',
];

const CampaignHistory: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const {
    isOpen: isAudienceOpen,
    onOpen: onAudienceOpen,
    onClose: onAudienceClose,
  } = useDisclosure();

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [campaignType, setCampaignType] = useState<'Email' | 'SMS'>('Email');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('All locations');
  const [audience, setAudience] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<string>('All followers');

  const handleViewCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    onOpen();
  };

  const handleSaveDraft = () => {
    const newCampaign: Campaign = {
      id: (campaigns.length + 1).toString(),
      type: campaignType,
      subject,
      content,
      date,
      status: 'Draft',
      location,
      audience: audience.join(', '),
    };
    setCampaigns([...campaigns, newCampaign]);
    onCreateClose();
  };

  const handleScheduleCampaign = () => {
    const newCampaign: Campaign = {
      id: (campaigns.length + 1).toString(),
      type: campaignType,
      subject,
      content,
      date,
      status: 'Scheduled',
      location,
      audience: audience.join(', '),
    };
    setCampaigns([...campaigns, newCampaign]);
    onCreateClose();
  };

  const handleSendNow = () => {
    const newCampaign: Campaign = {
      id: (campaigns.length + 1).toString(),
      type: campaignType,
      subject,
      content,
      date: new Date().toISOString(),
      status: 'Sent',
      location,
      audience: audience.join(', '),
    };
    setCampaigns([...campaigns, newCampaign]);
    onCreateClose();
  };

  const handleToggleUserSelection = (userId: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleSaveAudience = () => {
    alert(
      `Audience created with ${selectedUsers.length} users and selected segments.`
    );
    onAudienceClose();
  };

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" h="40px" mb={4}>
        <Text fontSize="1.125rem" fontWeight="500">
          Marketing
        </Text>
      </Flex>
      <Box p={4} boxShadow="lg" rounded="md" bg="white" w="100%">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Flex gap={1} alignItems="center">
            <Box bg="#7C8C2F" width="4px" height="22px" />
            <Text fontSize="14px" textTransform="capitalize" fontWeight="600">
              Campaign History
            </Text>
          </Flex>
          <Flex gap={2}>
            <Button
              variant="outline"
              size="sm"
              colorScheme="gray"
              onClick={onAudienceOpen}
            >
              Create Audience
            </Button>{' '}
            <Button
              variant="outline"
              size="sm"
              colorScheme="green"
              onClick={onCreateOpen}
            >
              Create Campaign
            </Button>
          </Flex>
        </Flex>
        <Table size="sm" variant="striped">
          <Thead>
            <Tr>
              <Th>Type</Th>
              <Th>Subject</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Location</Th>
              <Th>Audience</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {campaigns.map((campaign) => (
              <Tr key={campaign.id}>
                <Td>{campaign.type}</Td>
                <Td>{campaign.subject || 'N/A'}</Td>
                <Td>{campaign.date}</Td>
                <Td>
                  <Tag
                    colorScheme={
                      campaign.status === 'Sent'
                        ? 'green'
                        : campaign.status === 'Scheduled'
                        ? 'blue'
                        : 'gray'
                    }
                  >
                    {campaign.status}
                  </Tag>
                </Td>
                <Td>{campaign.location}</Td>
                <Td>{campaign.audience}</Td>
                <Td>
                  <IconButton
                    icon={<ViewIcon />}
                    aria-label="View campaign"
                    size="sm"
                    mr={2}
                    onClick={() => handleViewCampaign(campaign)}
                  />
                  <IconButton
                    icon={<EditIcon />}
                    aria-label="Edit campaign"
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="Delete campaign"
                    size="sm"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Modal de criação de audiência */}
      <Modal isOpen={isAudienceOpen} onClose={onAudienceClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Audience</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="start" spacing={4}>
              <Text fontWeight="bold">Select Users for the Audience</Text>
              <Box borderWidth="1px" borderRadius="md" p={4} w="100%">
                {mockUsers.map((user) => (
                  <Checkbox
                    key={user.id}
                    isChecked={selectedUsers.includes(user.id)}
                    onChange={() => handleToggleUserSelection(user.id)}
                  >
                    {user.name}
                  </Checkbox>
                ))}
              </Box>

              <Text fontWeight="bold" mt={4}>
                Select Audience Segments
              </Text>
              <Box borderWidth="1px" borderRadius="md" p={4} w="100%">
                {segmentsOptions.map((segment) => (
                  <Checkbox
                    key={segment}
                    isChecked={selectedSegments.includes(segment)}
                    onChange={() =>
                      setSelectedSegments((prev) =>
                        prev.includes(segment)
                          ? prev.filter((s) => s !== segment)
                          : [...prev, segment]
                      )
                    }
                  >
                    {segment}
                  </Checkbox>
                ))}
              </Box>

              <Text fontWeight="bold" mt={4}>
                Location
              </Text>
              <Select
                placeholder="Select location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="All followers">All followers</option>
                <option value="Location 1">Location 1</option>
                <option value="Location 2">Location 2</option>
              </Select>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveAudience}>
              Save Audience
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de criação de campanha */}
      <Modal isOpen={isCreateOpen} onClose={onCreateClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Campaign</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <RadioGroup
                onChange={(val) => setCampaignType(val as 'Email' | 'SMS')}
                value={campaignType}
              >
                <Stack direction="row">
                  <Radio value="Email">Email</Radio>
                  <Radio value="SMS">SMS</Radio>
                </Stack>
              </RadioGroup>
              {campaignType === 'Email' && (
                <Input
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              )}
              <Textarea
                placeholder={`Write your ${campaignType} content here`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Input
                type="datetime-local"
                placeholder="Select campaign date and time"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Select
                placeholder="Select location"
                onChange={(e) => setLocation(e.target.value)}
                mt={4}
              >
                <option value="All locations">All locations</option>
                <option value="Location 1">Location 1</option>
                <option value="Location 2">Location 2</option>
              </Select>
              <Text fontWeight="bold" mt={4}>
                Select Audience Segments
              </Text>
              <Select
                placeholder="Add Segment"
                onChange={(e) =>
                  setAudience((prev) => [...prev, e.target.value])
                }
              >
                <option value="All subscribers">All subscribers</option>
                <option value="VIP customers">VIP customers</option>
              </Select>
              <Flex wrap="wrap" gap={2} mt={2}>
                {audience.map((seg) => (
                  <Tag key={seg} colorScheme="blue">
                    {seg}
                  </Tag>
                ))}
              </Flex>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSaveDraft}>Save as Draft</Button>
            <Button colorScheme="blue" onClick={handleScheduleCampaign} ml={2}>
              Schedule
            </Button>
            <Button colorScheme="red" onClick={handleSendNow} ml={2}>
              Send Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CampaignHistory;

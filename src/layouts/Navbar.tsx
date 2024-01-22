import { IoSearch } from 'react-icons/io5';
import { FaBell } from 'react-icons/fa';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Center,
  Button,
  Text,
  Image,
} from '@chakra-ui/react';
import SearchBar from 'src/components/ui/SearchBar';
import NotificationButton from 'src/components/ui/NotificationButton';

export default function Navbar() {
  return (
    <Flex
      bg="#110834"
      color="#bcbcbc"
      w="100%"
      ml="1px"
      height="4rem"
      justify="center"
    >
      <Center w="100%">
        <SearchBar
          color="#898989"
          placeholder="Buscar..."
          ml={true ? 'auto' : 'unset'}
        />

        <Flex ml="auto">
          <NotificationButton haveNotifications={true} />

          <Flex margin="0 1rem">
            <Center>
              <Image
                src="/empty-profile-picture.webp"
                alt="profile-picture"
                h="32px"
                w="32px"
                borderRadius="50%"
              />
              <Box ml=".5rem">
                <Text fontSize="14px" fontWeight="500">
                  User Name
                </Text>
                <Text fontSize="12px" color="#A8A8A8">
                  Admin
                </Text>
              </Box>
            </Center>
          </Flex>
        </Flex>
      </Center>
    </Flex>
  );
}

import {
  Box,
  Center,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from '@chakra-ui/react';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { logout } from '../services/api/logout';
import { InputSearch } from './InputSearch';
import { PopoverNotification } from './PopoverNotification';

export function Navbar() {
  const toast = useToast();
  const path = usePathname();
  const auth = useAuthContext();
  const [searchFeature, setSearchFeature] = useState(false);

  useEffect(() => {
    setSearchFeature(!['/factory', '/users', '/partner-orders'].includes(path));
  }, [path]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      toast({ status: 'error', title: error.message });
    } finally {
      auth.logout();
    }
  };

  return (
    <Flex
      bg="#110834"
      color="#bcbcbc"
      height="4rem"
      justify="center"
      ml="1px"
      w="100%"
    >
      <Center w="100%">
        {searchFeature && (
          <InputSearch
            color="#898989"
            ml="auto"
            placeholder="Buscar..."
          />
        )}

        <Flex ml="auto">
          <PopoverNotification haveNotifications={true} />

          <Menu>
            <MenuButton>
              <Flex
                margin="0 1rem"
                minW="7rem"
              >
                <Center>
                  <Image
                    alt="profile-picture"
                    borderRadius="50%"
                    h="32px"
                    w="32px"
                    src={
                      auth.is === 'authenticated' && auth.user.user.avatar
                        ? auth.user.user.avatar
                        : '/empty-profile-picture.webp'
                    }
                  />
                  <Box ml=".5rem">
                    <Text
                      fontSize="14px"
                      fontWeight="500"
                    >
                      {auth.is === 'authenticated'
                        ? auth.user.user.name
                        : 'Usuário'}
                    </Text>
                    <Text
                      color="#A8A8A8"
                      fontSize="12px"
                    >
                      {auth.is === 'authenticated'
                        ? auth.user.user.type
                        : 'Tipo'}
                    </Text>
                  </Box>
                </Center>
              </Flex>
            </MenuButton>
            <MenuList color="var(--chakra-colors-chakra-body-text)">
              <MenuItem>Item 1</MenuItem>
              <MenuItem>Item 2</MenuItem>
              <MenuItem>Item 3</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Center>
    </Flex>
  );
}

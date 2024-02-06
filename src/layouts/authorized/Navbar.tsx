import {
  Box,
  Flex,
  Center,
  Text,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
  MenuDivider,
} from '@chakra-ui/react';
import InputSearch from 'src/components/ui/InputSearch';
import PopoverNotification from 'src/components/PopoverNotification';
import { useAuthContext } from 'src/contexts/AuthContext';

export default function Navbar() {
  const auth = useAuthContext();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      auth.logout();
      toast({ status: 'success', description: 'Logout efetuado com sucesso!' });
    } catch (err) {
      console.error(err);
      toast({ status: 'error', description: 'Erro ao efetuar logout!' });
    }
  };

  return (
    <Flex bg="#110834" color="#bcbcbc" w="100%" ml="1px" height="4rem" justify="center">
      <Center w="100%">
        <InputSearch color="#898989" placeholder="Buscar..." ml={true ? 'auto' : 'unset'} />

        <Flex ml="auto">
          <PopoverNotification haveNotifications={true} />

          <Menu>
            <MenuButton>
              <Flex margin="0 1rem" minW="7rem">
                <Center>
                  <Image
                    src={
                      auth.is === 'authenticated' && auth.user.user.avatar
                        ? auth.user.user.avatar
                        : '/empty-profile-picture.webp'
                    }
                    alt="profile-picture"
                    h="32px"
                    w="32px"
                    borderRadius="50%"
                  />
                  <Box ml=".5rem">
                    <Text fontSize="14px" fontWeight="500">
                      {auth.is === 'authenticated' ? auth.user.user.name : 'Usuário'}
                    </Text>
                    <Text fontSize="12px" color="#A8A8A8">
                      {auth.is === 'authenticated' ? auth.user.user.type : 'Tipo'}
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

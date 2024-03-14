'use client';

import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  Tooltip,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';

import { Fragment, useEffect, useRef, useState } from 'react';

import {
  MdArrowForwardIos,
  MdLogout,
  MdMenu,
  MdNotifications,
} from 'react-icons/md';

import { GlobalSearch } from '../../components/GlobalSearch';
import { Loading } from '../../components/Loading';
import { theme } from '../../configs/chakra';
import { Option, options } from '../../configs/sidebar';
import { useAuthContext } from '../../contexts/AuthContext';
import { useRouterContext } from '../../contexts/RouterContext';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { logout } from '../../services/api/logout';

const notifications = [
  {
    id: Math.random().toString(36).substring(2),
    read: false,
    subtitle: 'NF 203945 via XML',
    title: 'Nota Fiscal Importada',
  },
  {
    id: Math.random().toString(36).substring(2),
    read: true,
    subtitle: 'NF 203945 via XML',
    title: 'Nota Fiscal Importada',
  },
  {
    id: Math.random().toString(36).substring(2),
    read: true,
    subtitle: 'NF 203945 via XML',
    title: 'Nota Fiscal Importada',
  },
  {
    id: Math.random().toString(36).substring(2),
    read: true,
    subtitle: 'NF 203945 via XML',
    title: 'Nota Fiscal Importada',
  },
];

type PrivateTemplateProps = {
  children: React.ReactNode;
};

export default function PrivateTemplate({ children }: PrivateTemplateProps) {
  const toast = useToast();
  const auth = useAuthContext();
  const { pathname, ...router } = useRouterContext();
  const [loading, setLoading] = useState(false);

  const [menuOpen, setMenuOpen] = useSessionStorage({
    initialValue: false,
    key: 'PrivateTemplate.menuOpen',
  });

  const [accordionOpen, setAccordionOpen] = useSessionStorage({
    initialValue: options.map((o) => {
      if (!('items' in o)) return false;
      return o.items.some((i) => pathname.startsWith(i.path));
    }),

    key: 'PrivateTemplate.accordionOpen',

    transformValue: (value) => {
      if (value.length === options.length) return value;

      return options.map((o) => {
        if (!('items' in o)) return false;
        return o.items.some((i) => pathname.startsWith(i.path));
      });
    },
  });

  const sidebarRef = useRef<HTMLDivElement>(null);

  const [isLargerThanMd] = useMediaQuery(
    `(min-width: ${theme.breakpoints.md})`,
  );

  useEffect(() => {
    if (auth.is === 'unauthenticated') {
      router.push('/');
    }
  }, [auth.is, router]);

  const getNotificationsProps = (
    notification: (typeof notifications)[number],
  ) => {
    if (notification.read) return {};
    const description = 'Não foi possível marcar como lida';

    return {
      _hover: { bg: 'gray.100', cursor: 'pointer' },
      onClick: () => toast({ description, status: 'error' }),
      sx: { transitionDuration: '200ms' },
    };
  };

  const isMenuButtonActive = (option: (typeof options)[number]) =>
    'path' in option ? pathname.startsWith(option.path) : false;

  const handleMenuToggle = () => {
    if (menuOpen) setAccordionOpen(options.map(() => false));
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    setLoading(true);

    logout()
      .catch((e) => toast({ status: 'error', title: e.message }))
      .finally(() => auth.logout());
  };

  const handleMenuOptionClick = (option: Option, i: number) => () => {
    if ('path' in option) {
      router.push(option.path);
      return;
    }

    if ('items' in option && !menuOpen) {
      setMenuOpen(true);
      setAccordionOpen(options.map(() => false).toSpliced(i, 1, true));
      return;
    }

    if ('items' in option && menuOpen) {
      setAccordionOpen(accordionOpen.toSpliced(i, 1, !accordionOpen[i]));
      return;
    }

    throw new Error('unexpected condition');
  };

  if (auth.is !== 'authenticated') {
    return <Loading />;
  }

  if (loading) {
    return <Loading />;
  }

  /* eslint-disable prettier/prettier */
  return (
    <Flex direction="column">
      {/* START: Header */}
      <Flex align="center" bg="#110834" h="4.5rem" px="1.25rem">
        <IconButton
          _hover={{ bg: '#1D1242', color: '#1E93FF' }}
          aria-label={`${menuOpen ? 'Fechar' : 'Abrir'} menu`}
          color="white"
          icon={<Icon as={MdMenu} fontSize="2xl" />}
          size="lg"
          variant="ghost"
          onClick={handleMenuToggle}
        />
        <Image alt="petroplus logo" ml="1rem" mr="auto" src="/petroplus.png" w="8rem" />
        <GlobalSearch />
        <Box
          ml={{ md: 'auto' }}
          // eslint-disable-next-line canonical/sort-keys
          px={{ base: 2, md: 6 }}
        >
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <IconButton
                _hover={{ bg: '#1D1242', color: '#1E93FF' }}
                aria-label={`${menuOpen ? 'Fechar' : 'Abrir'} notificações`}
                color="white"
                size="lg"
                variant="ghost"
                icon={
                  <>
                    <Icon as={MdNotifications} fontSize="2xl" />
                    {notifications.some((notification) => !notification.read) && (
                      <Box
                        as="span"
                        bg="red.300"
                        border="2px solid"
                        borderColor="#110834"
                        borderRadius="50%"
                        display="block"
                        h="0.75rem"
                        position="absolute"
                        right={2}
                        top={2}
                        w="0.75rem"
                      />
                    )}
                  </>
                }
              />
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody px={0}>
                  {notifications.map((notification) => (
                    <Flex key={notification.id} px={4} py={5} {...getNotificationsProps(notification)}>
                      <Center>
                        <Avatar size="sm" />
                      </Center>
                      <Box flexGrow={1} ml={3}>
                        <Text fontSize="0.875rem" fontWeight={500} lineHeight="1rem">
                          {notification.title}
                        </Text>
                        <Text color="gray.500" fontSize="0.875rem" lineHeight="1rem">
                          {notification.subtitle}
                        </Text>
                      </Box>
                      {!notification.read && (
                        <Center mx={2}>
                          <Box bg="blue.500" borderRadius="50%" h="0.625rem" w="0.625rem" />
                        </Center>
                      )}
                    </Flex>
                  ))}
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        </Box>
        <Menu>
          <MenuButton
            _active={{ '& .chakra-avatar': { bg: '#1E93FF' }, bg: '#1D1242' }}
            _hover={{ '& .chakra-avatar': { bg: '#1E93FF' }, bg: '#1D1242' }}
            borderRadius="md"
            color="white"
            sx={{ '& .chakra-avatar': { transitionDuration: theme.transition.duration.normal } }}
          >
            <Flex align="center" h="3rem" px={2}>
              <Avatar size="sm" src={auth.user.user.avatar} />
              <Box display={{ base: 'none', md: 'block' }} ml={3}>
                <Text fontSize="0.875rem" lineHeight="1.125rem">
                  {auth.user.user.name}
                </Text>
                <Text color="gray.500" fontSize="0.875rem" lineHeight="1.125rem">
                  {auth.user.user.type}
                </Text>
              </Box>
            </Flex>
          </MenuButton>
          <Portal>
            <MenuList>
              {!isLargerThanMd && (
                <>
                  <MenuItem>{auth.user.user.name}</MenuItem>
                  <MenuItem>{auth.user.user.type}</MenuItem>
                </>
              )}
              <MenuItem
                color="red.500"
                icon={<Icon as={MdLogout} />}
                onClick={handleLogout}
              >
                Sair
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </Flex>
      {/* END: Header */}

      <Flex flexGrow={1}>
        {/* START: Sidebar */}
        <Flex ref={sidebarRef} bg="#110834" direction="column" px="1.25rem" py="0.75rem" sx={{ display: !isLargerThanMd && !menuOpen ? 'none' : 'flex' }}>
          {options.map((option, i) => (
            <Fragment key={option.id}>
              <Tooltip key={option.id} isDisabled={menuOpen} label={option.name} hasArrow>
                <Button
                  _active={{ bg: '#1D1242', color: '#1E93FF' }}
                  _hover={{ bg: '#1D1242', color: '#1E93FF' }}
                  color="white"
                  h="3.25rem"
                  iconSpacing={menuOpen ? 2 : 0}
                  isActive={isMenuButtonActive(option)}
                  justifyContent="flex-start"
                  leftIcon={<Icon as={option.icon} fontSize="2xl" />}
                  px={3}
                  rightIcon={menuOpen ? <Icon as={MdArrowForwardIos} color={'items' in option ? 'white' : 'transparent'} transform={`rotate(${accordionOpen[i] ? '-90deg' : '0deg'})`} /> : undefined}
                  variant="ghost"
                  onClick={handleMenuOptionClick(option, i)}
                >
                  {menuOpen && (
                    <Text as="span" display="inline-block" mr="auto">{option.name}</Text>
                  )}
                </Button>
              </Tooltip>
                {'items' in option && accordionOpen[i] && menuOpen && (
                <Flex direction="column" mt="0.25rem">
                  {option.items.map((item) => (
                    <Button
                      key={item.id}
                      _active={{ bg: '#1D1242', color: '#1E93FF' }}
                      _hover={{ bg: '#1D1242', color: '#1E93FF' }}
                      color="rgba(255, 255, 255, 0.6)"
                      fontWeight={400}
                      isActive={pathname.startsWith(item.path)}
                      justifyContent="flex-start"
                      variant="ghost"
                      onClick={() => router.push(item.path)}
                    >
                      {item.name}
                    </Button>
                  ))}
                </Flex>
              )}
            </Fragment>
          ))}
        </Flex>
        {/* END: Sidebar */}

        {/* START: Main */}
        <Box bg="gray.50" flexGrow={1} h={`max(calc(100dvh - 4.5rem), ${sidebarRef.current?.clientHeight ?? 0}px)`} overflow="auto">
          <Box minW={"375px" /* iPhone SE (smallest width in list of dimensions options in dev mode in chromium based browsers) */}>
            {children}
          </Box>
        </Box>
        {/* END: Main */}
      </Flex>
    </Flex>
  );
  /* eslint-enable prettier/prettier */
}

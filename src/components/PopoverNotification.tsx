import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  StackDivider,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import { FaBell } from 'react-icons/fa';

export type PopoverNotificationProps = {
  haveNotifications: boolean;
};

const notifications = [
  {
    avatar: '/empty-profile-picture.webp',
    isNew: true,
    message: 'NF 9128374612 via XML',
    title: 'Nota Fiscal Importada',
  },
  {
    avatar: '/empty-profile-picture.webp',
    isNew: true,
    message: 'NF 9128374612 via XML',
    title: 'Nota Fiscal Importada',
  },
  {
    avatar: '/empty-profile-picture.webp',
    isNew: true,
    message: 'NF 9128374612 via XML',
    title: 'Nota Fiscal Importada',
  },
];

export function PopoverNotification({
  haveNotifications,
}: PopoverNotificationProps) {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      <Popover
        isOpen={isOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          <Button
            colorScheme="white"
            variant="link"
            onClick={onToggle}
          >
            <Icon as={FaBell} />
            <Box
              bg="#b86560"
              border="1px solid #150f2e"
              borderRadius="50%"
              display={haveNotifications ? 'block' : 'none'}
              h="7px"
              left="-4px"
              position="relative"
              top="-7px"
              w="7px"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          mt="1.25rem"
          position="relative"
          w="17rem"
        >
          {/* <PopoverArrow
            shadow="none"
            className="scale-600"
            __css={{
              transform: 'rotate(45deg) scale(5)',
            }}
          /> */}
          <Box
            bg="inherit"
            borderRadius="5px"
            h="10rem"
            left="19.9%"
            position="absolute"
            top="0"
            transform="rotate(45deg)"
            w="10rem"
            zIndex="-3"
          />
          <PopoverBody>
            <VStack divider={<StackDivider borderColor="gray.200" />}>
              {notifications.map((notification, index) => (
                <Flex
                  key={index}
                  fontSize="14px"
                  h="5.5rem"
                >
                  <Center>
                    <Image
                      alt="avatar image"
                      borderRadius="50%"
                      h="28px"
                      mr="1.25rem"
                      src={notification.avatar ?? '/empty-profile-picture.webp'}
                      w="28px"
                    />
                    <Flex
                      direction="column"
                      position="relative"
                    >
                      <Text
                        color="#202020"
                        fontWeight="500"
                      >
                        {notification.title}
                      </Text>
                      <Text
                        color="#898989"
                        fontWeight="400"
                      >
                        {notification.message}
                      </Text>
                      <Box
                        bg="#1E93FF"
                        borderRadius="50%"
                        display={notification.isNew ? 'block' : 'none'}
                        h="9px"
                        position="absolute"
                        right="-18px"
                        top="50%"
                        w="9px"
                      />
                    </Flex>
                  </Center>
                </Flex>
              ))}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Box
        bg="rgba(0, 0, 0, .5)"
        display={isOpen ? 'block' : 'none'}
        height="calc(103vh - 1rem)"
        left="0"
        mt="-1rem"
        position="absolute"
        right="0"
        width="100vw"
        zIndex="9"
      />
    </>
  );
}

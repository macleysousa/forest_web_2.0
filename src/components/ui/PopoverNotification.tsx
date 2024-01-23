import {
  Box,
  Button,
  Flex,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  StackDivider,
  Text,
  VStack,
  Image,
  Center,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaBell } from 'react-icons/fa';

export interface PopoverNotificationProps {
  haveNotifications: boolean;
}

export default function PopoverNotification({
  haveNotifications,
}: PopoverNotificationProps) {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const [notifications, setNotifications] = useState([
    {
      avatar: '/empty-profile-picture.webp',
      message: 'NF 9128374612 via XML',
      title: 'Nota Fiscal Importada',
      isNew: true,
    },
    {
      avatar: '/empty-profile-picture.webp',
      message: 'NF 9128374612 via XML',
      title: 'Nota Fiscal Importada',
      isNew: true,
    },
    {
      avatar: '/empty-profile-picture.webp',
      message: 'NF 9128374612 via XML',
      title: 'Nota Fiscal Importada',
      isNew: true,
    },
  ]);

  return (
    <>
      <Popover isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>
          <Button colorScheme="white" variant="link" onClick={onToggle}>
            <Icon as={FaBell} />
            <Box
              h="7px"
              w="7px"
              bg="#b86560"
              borderRadius="50%"
              border="1px solid #150f2e"
              display={haveNotifications ? 'block' : 'none'}
              position="relative"
              top="-7px"
              left="-4px"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent w="17rem" mt="1.25rem" position="relative">
          {/* <PopoverArrow
            shadow="none"
            className="scale-600"
            __css={{
              transform: 'rotate(45deg) scale(5)',
            }}
          /> */}
          <Box
            transform="rotate(45deg)"
            top="0"
            left="19.9%"
            w="10rem"
            h="10rem"
            position="absolute"
            zIndex="-3"
            bg="inherit"
            borderRadius="5px"
          />
          <PopoverBody>
            <VStack divider={<StackDivider borderColor="gray.200" />}>
              {notifications.map((notification, index) => (
                <Flex key={index} fontSize="14px" h="5.5rem">
                  <Center>
                    <Image
                      src={notification.avatar ?? '/empty-profile-picture.webp'}
                      alt="avatar image"
                      h="28px"
                      w="28px"
                      borderRadius="50%"
                      mr="1.25rem"
                    />
                    <Flex position="relative" direction="column">
                      <Text color="#202020" fontWeight="500">
                        {notification.title}
                      </Text>
                      <Text color="#898989" fontWeight="400">
                        {notification.message}
                      </Text>
                      <Box
                        h="9px"
                        w="9px"
                        bg="#1E93FF"
                        borderRadius="50%"
                        display={notification.isNew ? 'block' : 'none'}
                        position="absolute"
                        right="-18px"
                        top="50%"
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
        display={isOpen ? 'block' : 'none'}
        width="100vw"
        height="calc(103vh - 1rem)"
        mt="-1rem"
        position="absolute"
        left="0"
        right="0"
        zIndex="9"
        bg="rgba(0, 0, 0, .5)"
      />
    </>
  );
}

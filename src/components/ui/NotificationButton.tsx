import { Box, Button, ButtonProps, Icon } from '@chakra-ui/react';
import { FaBell } from 'react-icons/fa';

export interface NotificationButtonProps {
  haveNotifications: boolean;
}

export default function NotificationButton({
  haveNotifications,
}: NotificationButtonProps) {
  return (
    <Button colorScheme="white" variant="link">
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
  );
}

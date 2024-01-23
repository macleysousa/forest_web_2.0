import { Text } from '@chakra-ui/react';
import Authorized from 'src/layouts/authorized/Authorized';

export default function Dashboard() {
  return (
    <Authorized>
      <Text>Dashboard</Text>
    </Authorized>
  );
}

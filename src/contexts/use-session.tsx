import { useContext } from 'react';

import { AuthContext, AuthContextType } from 'src/providers/auth.provider';

export const useSession = () => useContext<AuthContextType>(AuthContext);
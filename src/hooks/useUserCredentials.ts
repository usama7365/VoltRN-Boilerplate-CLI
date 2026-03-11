import { useCallback, useState } from 'react';

export function useUserCredentials() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const updatePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  return {
    email,
    password,
    updateEmail,
    updatePassword,
  };
}

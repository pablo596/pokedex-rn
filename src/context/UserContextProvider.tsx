import React, {useEffect} from 'react';
import {createContext, useMemo, useState} from 'react';
import {User} from '../interfaces/userInterfaces';
import {getData} from '../helpers/index';

const UserContext = createContext({
  userInfo: {} as User,
  isAuth: false,
  token: '',
});

interface Props {
  children: any;
}

const UserContextProvider = ({children}: Props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState<User>({} as User);
  const [token, setToken] = useState('');

  useEffect(() => {
    getData('@PokedexToken').then(v => {
      if (v !== '' && v !== null) {
        setIsAuth(true);
        getData('@PokedexUser').then(user => {
          setUserInfo(JSON.parse(user));
        });
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  const values = useMemo(
    () => ({
      isAuth,
      setIsAuth,
      userInfo,
      setUserInfo,
      token,
      setToken,
    }),
    [isAuth, userInfo, token],
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export {UserContextProvider, UserContext};

import { useState } from 'react';

// Custom react hook, jonka avulla käyttäjän kirjautumistiedot saadaan asetettua

export default function useToken() {

    // Etsii tokenin, jos mahdollista
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
  };
  const [token, setToken] = useState(getToken());

  // Tallentaa tokenin
  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  // Palauttaa objektin, jonka avulla voi tallentaa tokenin
  return {
    setToken: saveToken,
    token
  }
};
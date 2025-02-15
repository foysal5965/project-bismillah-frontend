import { authKey } from "@/constants/authKey";
import { decodedToken } from "@/utils/jwt/jwt";
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import { instance as axiosInstance } from '@/helpers/axios/axiosInstance';

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
    return setToLocalStorage(authKey, accessToken);
 };

 export const removeUser = () => {
    return removeFromLocalStorage(authKey);
 };
 export const getUserInfo = () => {
    const authToken = getFromLocalStorage(authKey);
    //   console.log(authToken);
    if (authToken) {
       const decodedData: any = decodedToken(authToken);
       return {
          ...decodedData,
          role: decodedData?.role?.toLowerCase(),
       };
    } else {
       return '';
    }
 };

 export const getNewAccessToken = async () => {
   return await axiosInstance({
      url: 'http://localhost:5000/api/v1/auth/refresh-token',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
   });
};
export const isLoggedIn = () => {
   const authToken = getFromLocalStorage(authKey);
   if (authToken) {
      return !!authToken;
   }
};
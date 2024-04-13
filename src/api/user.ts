import { authInstance } from '../axios';
import { AxiosError } from 'axios';
import { ErrorResponse } from 'react-router-dom';
import { UserInfo } from '@/interfaces/user/user.interface';
import { useMutation, useQuery } from '@tanstack/react-query';

const getUserInfo = async () => {
  const { data } = await authInstance.get('/users/my-info');
  return data;
};

export const useUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });
};

export const editUserInfo = async (userInfo: UserInfo) => {
  try {
    await authInstance.patch('/users/my-info', userInfo);
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return axiosError.response.data;
    }
    return '';
  }
};

export const checkPassWord = async (password: string) => {
  try {
    const response = await authInstance.post('users/check-myPassword', {
      password: password,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return axiosError.response.data;
    }
    return '';
  }
};

export const deleteUser = async () => {
  await authInstance.delete('users/my-info');
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      clearCookies();
      localStorage.clear();
      console.log('회원탈퇴 성공');
    },
    onError: (error) => {
      console.error('회원탈퇴 중 에러 발생: ', error);
    },
  });
};

function clearCookies() {
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  }
}

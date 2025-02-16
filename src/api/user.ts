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
    const response = await authInstance.get(
      `/users/check-myPassword?inputPassword=${password}`,
    );
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
  await authInstance.delete('/users/my-info');
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      clearCookies();
      localStorage.clear();
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

export const deletePhoto = async () => {
  await authInstance.delete('/profileImage');
};

export const useDeletePhoto = () => {
  return useMutation({
    mutationFn: deletePhoto,
  });
};

export const updatePhoto = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await authInstance.patch('/profileImage', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const useUpdatePhoto = () => {
  return useMutation({
    mutationFn: (file: File) => updatePhoto(file),
  });
};

export const checkDuplicateNickname = async (nickname: string) => {
  const response = await authInstance.get(
    `/users/check-nickname?nickname=${nickname}`,
  );
  return response.data;
};

import { authInstance } from '@/axios';
import {
  MessageForm,
  ReturnedMessageForm,
} from '@/interfaces/chat/chat.interface';
import { AxiosError } from 'axios';
import { ErrorResponse } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import { Cookies } from 'react-cookie';

export const getChatRooms = async () => {
  try {
    const response = await authInstance.get('/chat/rooms');
    return response.data;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const createRoom = async (userNickname: string): Promise<number> => {
  try {
    const response = await authInstance.post(
      `/chat/room?roomName=${userNickname}&type=PERSONAL`,
    );
    return response.data.roomId;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const searchChatRoom = async (keyword: string): Promise<any[]> => {
  try {
    const response = await authInstance.get(
      `/chat/room/found?roomName=${keyword}`,
    );
    return response.data;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const sendMessage = (
  roomId: number,
  client: Client | null,
  chatMessage: MessageForm,
) => {
  const accessToken = new Cookies().get('accessToken');

  if (!client?.connected) {
    console.error('WebSocket connection is not active.');
    return;
  }

  client.publish({
    destination: `/pub/chat/message/${roomId}`,
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(chatMessage),
  });
};

export const showChat = async ({
  pageParam,
  roomId,
}: {
  pageParam: number;
  roomId: number;
}): Promise<ReturnedMessageForm[]> => {
  const pageSize = 15;
  const pageNumber = pageParam;
  const startIndex = (pageNumber - 1) * pageSize;

  try {
    const response = await authInstance.get(
      `/chat/room/${roomId}/message?start=${startIndex}&size=${pageSize}`,
    );
    return response.data.content;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const editChat = async (content: string) => {
  try {
    const response = await authInstance.patch(`/chat/message`, content);
    return response.data;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const deleteChat = async () => {
  try {
    const response = await authInstance.delete(`/chat/message`);
    return response.data;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const searchUserByNickname = async (nickname: string) => {
  try {
    const response = await authInstance.get(
      `/users/search?nickname=${nickname}`,
    );
    return response.data;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

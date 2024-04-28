export enum MessageType {
  TALK = 'TALK',
  ENTER = 'ENTER',
}

export interface MessageForm {
  sender: string;
  message: string;
  userId: number;
  type: MessageType;
}

export interface ReturnedMessageForm {
  messageId: number;
  messageType: MessageType;
  roomId: number;
  userId: number;
  sender: string;
  message: string;
  createdMessageAt: string;
}

export interface ChatRoom {
  roomId: number;
  roomName: string;
}

export interface ChatRoomProps {
  $isSelected: boolean;
}

export interface User {
  id: number;
  nickname: string;
  imgUrl: string;
  rankName: string;
  district: string;
}

export interface NewChatRoom {
  chatMessage: string;
  chatRoomEnum: string;
  roomId: number;
  roomName: string;
  roomNumber: string;
  profileImageUrl: string;
  unreadCount: number;
}

export interface SSEState {
  message: string;
  hasNotifications: boolean;
  setHasNotifications: (hasNotifications: boolean) => void;
  notificationCount: number;
  setNotificationCount: (count: number) => void;
  addMessage: (newMessage: string) => void;
}

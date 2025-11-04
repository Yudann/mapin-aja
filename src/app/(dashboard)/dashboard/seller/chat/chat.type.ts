// app/chats/types/chat.ts
export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unreadCount?: number;
  isOnline?: boolean;
  lastSeen?: string;
}

export interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
  timestamp: Date;
  isRead?: boolean;
}

export interface ChatSession {
  id: string;
  participant: Chat;
  messages: Message[];
}
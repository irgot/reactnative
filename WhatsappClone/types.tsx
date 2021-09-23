/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ContactsScreen from './screens/ContactsScreen';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Camera: undefined;
  ChatRoom: { id: string | undefined, name: string | undefined };
  Contacts: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  // TabOne: undefined;
  // TabTwo: undefined;
  Camera: undefined;
  Chats: undefined;
  Status: undefined;
  Calls: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;


export type ChatRoom = {
  id?: string,
  users?: Array<User>,
  lastMessage: Message
}

export type User = {
  id: string,
  name: string
  imageUri?: string,
  status?: string

}

export type Message = {
  id?: string,
  content: string,
  createdAt?: string,
  user: User
}
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

class AuthStorage {
  namespace: string;

  constructor(namespace: string = 'auth') {
    this.namespace = namespace;
  }

  async getUser(): Promise<User | null> {
    const token = await AsyncStorage.getItem(`${this.namespace}:user`);
    if (!token) {
      return null;
    }
    return JSON.parse(token);
  }

  async setUser(user: User): Promise<void> {
    await AsyncStorage.setItem(`${this.namespace}:user`, JSON.stringify(user));
  }

  async removeUser(): Promise<void> {
    await AsyncStorage.removeItem(`${this.namespace}:user`);
  }
}

export default AuthStorage;
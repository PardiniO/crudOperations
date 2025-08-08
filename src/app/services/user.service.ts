import { Injectable } from '@angular/core';
import { iUsers } from "../interfaces/users";
import data  from "../../data/user.json";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: iUsers[] = [...data];

  getUsers(): iUsers[] {
    return this.users;
  }

  addUser(user: Omit<iUsers, 'id'>): void {
    const id = this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    this.users.push({ id, ...user });
  }

  updateUser(updatedUser: iUsers): void {
    const idx = this.users.findIndex(u => u.id === updatedUser.id);
    if (idx > -1) this.users[idx] = updatedUser;
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(u => u.id !== id);
  }

  constructor() { }
}

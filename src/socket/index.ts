import { log } from "console";
import { Socket } from "socket.io";

type user = {
  socketId: string;
  groupIds: Set<string>;
};

export class SocketServer {
  users: Map<string, user>;
  groups: Map<string, Set<string>>;

  constructor() {
    this.users = new Map();
    this.groups = new Map();
  }

  setUser(socketId: string, userId: string): void {
    this.users.set(userId, {
      socketId: socketId,
      groupIds: new Set(),
    });
  }

  addGroup(groupId: string, userId: string): void {
    const isPresent = this.groups.has(groupId);
    if (!isPresent) {
      this.groups.set(groupId, new Set<string>());
    }
    this.groups.get(groupId)?.add(userId);
    this.users.get(userId)?.groupIds.add(groupId);
  }

  removeUser(userId: string): boolean {
    const user = this.users.get(userId);
    if (!user) {
      return false;
    }

    user.groupIds.forEach((val) => {
      this.groups.get(val)?.delete(userId);
    });

    return this.users.delete(userId);
  }
}

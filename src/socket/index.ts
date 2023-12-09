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

  setUser(socketId: string, userId: string): boolean {
    if (this.users.has(userId)) {
      return false;
    }

    this.users.set(userId, {
      socketId: socketId,
      groupIds: new Set(),
    });

    return true;
  }

  setGroup(groupId: string, userId: string): void {
    const isPresent = this.groups.has(groupId);

    if (!isPresent) {
      this.groups.set(groupId, new Set<string>());
    }

    this.groups.get(groupId)?.add(userId);
    this.users.get(userId)?.groupIds.add(groupId);
  }

  removeUser(socketId: string): boolean {
    let userId: string | undefined;
    this.users.forEach((val, key) => {
      if (val.socketId === socketId) {
        userId = key;
      }
    });

    if (!userId) {
      return false;
    }

    this.users.get(userId)?.groupIds.forEach((val) => {
      if (userId) {
        this.groups.get(val)?.delete(userId);
      }
    });

    return this.users.delete(userId);
  }
}

// const temp = new SocketServer();
// temp.setUser("a", "1");
// temp.setUser("a", "2");
// temp.setUser("c", "3");
// temp.setUser("d", "4");
// temp.setGroup("g1", "1");
// temp.setGroup("g1", "2");
// temp.setGroup("g1", "3");
// temp.setGroup("g2", "3");
// temp.setGroup("g2", "4");
// temp.setGroup("g2", "4");
//
// temp.groups.forEach((val, key) => {
//   log("group name: ", key);
//   val.forEach((u) => {
//     log("user:", u);
//   });
// });
//
// temp.users.forEach((val, key) => {
//   log("user name: ", key);
//   val.groupIds.forEach((g) => {
//     log("group name:", g);
//   });
// });

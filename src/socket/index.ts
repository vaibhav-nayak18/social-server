import { log } from "console";
import { Socket } from "socket.io";

export class SocketServer {
  users: Map<string, string>;
  groups: Map<string, string[]>;

  constructor() {
    this.users = new Map();
    this.groups = new Map();
  }
}

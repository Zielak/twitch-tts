import { ChatClient } from "twitch-chat-client";
import { StaticAuthProvider } from "twitch-auth";
import { ApiClient } from "twitch";
import type { TwitchPrivateMessage } from "twitch-chat-client/lib/StandardCommands/TwitchPrivateMessage";

const clientId = "123abc";
const accessToken = "def456";
const authProvider = new StaticAuthProvider(clientId, accessToken);
const apiClient = new ApiClient({ authProvider });

const chatClient = new ChatClient(authProvider, { channels: ["darkviperau"] });

// listen to more events...
const messagesListener = chatClient.onMessage(
  async (
    channel: string,
    user: string,
    message: string,
    msg: TwitchPrivateMessage
  ) => {
    console.log(channel + "\t", user + ":", message);
  }
);

// later, when you don't need this command anymore:
// chatClient.removeListener(messagesListener);

chatClient.connect();

"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);

const ChatView = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit("loadAllChats");
    socket.on("allChats", (msgs) => setAllMessages(msgs));
    socket.on("newMessageForAdmin", (msg) =>
      setAllMessages((prev) => [msg, ...prev])
    );
    return () => {
      socket.off("allChats");
      socket.off("newMessageForAdmin");
    };
  }, []);

  const users = [...new Set(allMessages.map((m) => m.sessionId))];
  const userMessages = allMessages.filter((m) => m.sessionId === selectedUser);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const msg = { sessionId: selectedUser, text: text, isAdmin: true };
    socket.emit("adminChat", msg);
    setAllMessages((prev) => [msg, ...prev]);
    // socket.emit('adminChat', ({targetId, msgData}) )
    setText("");
  };

  return (
    <>
      <div className="basis-2/4 border-r overflow-y-auto ">
        <h2 className="p-4 text-xl font-semibold bg-neutral-800 text-neutral-200">
          Users
        </h2>
        <div className="p-2 space-y-2">
          {users.map((user) => {
            const lastMsg =
              allMessages.filter((m) => m.sessionId === user).slice(0)[0]
                ?.text || "";
            return (
              <div
                key={user}
                onClick={() => setSelectedUser(user)}
                className={`p-2 rounded cursor-pointer bg-neutral-100 ${
                  selectedUser === user ? "ring" : "hover:bg-primary-100"
                }`}
              >
                <div className="font-semibold">{user}</div>
                <div className="text-xs text-neutral-800 truncate">
                  {lastMsg}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="basis-2/4 flex flex-col border-r justify-between ">
        <div className="p-4 bg-neutral-800 text-neutral-200">
          <h2 className="text-lg font-semibold">
            {selectedUser ? `Chat with ${selectedUser}` : "Select a user"}
          </h2>
        </div>
        <div className="flex flex-col-reverse p-4 overflow-y-auto flex-1">
          {selectedUser &&
            userMessages.map((msg, i) => (
              <div
                key={i}
                className={`${
                  msg.isAdmin
                    ? "bg-primary-300 ml-auto"
                    : "bg-neutral-300 mr-auto"
                } mb-2 p-2  rounded-lg max-w-xl`}
              >
                <div className="text-xs text-neutral-600">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </div>
                <div>{msg.text}</div>
              </div>
            ))}
          {!selectedUser && (
            <p className="text-gray-600 text-center mt-20">
              Select a user to view their chat.
            </p>
          )}
        </div>
        {selectedUser && (
          <form onSubmit={sendMessage} className="p-4 border-t flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-lg p-2 bg-neutral-200 text-neutral-800"
            />
            <button className="bg-green-800 text-white px-4 rounded-lg">
              Send
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ChatView;

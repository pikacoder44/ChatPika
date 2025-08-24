// components/ChatWindow.tsx
import ReactMarkdown from "react-markdown";

const ChatWindow = ({ messages }) => {
  return (
    <div className="w-[60%] mx-auto h-200 flex flex-col gap-3 p-3 border rounded-md overflow-y-auto">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`px-4 py-2 rounded-xl max-w-[70%] break-words ${
              msg.role === "user"
                ? "bg-blue-500 text-white"
                : "bg-zinc-800 text-white"
            }`}
          >
            {msg.role === "user" ? "User" : "AI"}:{" "}
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;

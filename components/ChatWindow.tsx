import ReactMarkdown from "react-markdown";
import * as ScrollArea from "@radix-ui/react-scroll-area";
const ChatWindow = ({ messages }) => {
  return (

      <ScrollArea.Root className=" ScrollAreaRoot w-[100%] m-0 h-[850px] rounded-md overflow-hidden ">
        <ScrollArea.Viewport className="ScrollAreaViewport w-full h-full p-3 m-0">
          <div className="w-[80%] mx-auto  flex flex-col gap-3 p-3  rounded-md ">
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
                  
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea.Viewport>

        {/* Vertical Scrollbar */}
        <ScrollArea.Scrollbar
          orientation="vertical"
          className="ScrollAreaScrollbar flex select-none touch-none w-20  p-0.5 transition-colors duration-150 "
        >
          <ScrollArea.Thumb className="ScrollAreaThumb bg-gray-400 rounded-full hover:bg-blue-300"  />
        </ScrollArea.Scrollbar>

        <ScrollArea.Corner className="ScrollAreaCorner bg-blue-500" />
      </ScrollArea.Root>

  );
};

export default ChatWindow;

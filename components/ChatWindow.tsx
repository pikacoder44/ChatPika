import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// Import different themes - choose one you like:
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism"; // light mode
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useRef, useEffect } from "react";

const ChatWindow = ({ messages }) => {
  const scrollAreaRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <ScrollArea.Root
      ref={scrollAreaRef}
      className=" ScrollAreaRoot w-full m-0 h-full min-h-0 rounded-md overflow-hidden"
    >
      <ScrollArea.Viewport className="ScrollAreaViewport w-full h-full md:p-3 m-0 pb-28 sm:pb-4">
        <div className="md:w-[60%] w-full mx-auto flex flex-col gap-3 p-3 rounded-md ">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl md:max-w-[70%] my-1 max-w-[90%] break-words ${
                  msg.role === "user"
                    ? "dark:bg-blue-500 bg-blue-50 text-black dark:text-white shadow-[35px_23px_51px_-27px_rgba(0,_0,_0,_0.1)]"
                    : "dark:bg-zinc-800 bg-gray-200 dark:text-white text-black"
                }`}
              >
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          lineProps={{
                            style: {
                              wordBreak: "break-all",
                              whiteSpace: "pre-wrap",
                            },
                          }}
                          wrapLines={true}
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-md my-2"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          className="dark:bg-zinc-700 bg-gray-300 p-2 rounded text-sm font-mono"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    pre({ children, ...props }) {
                      return (
                        <pre
                          className="dark:bg-zinc-800 bg-gray-200 rounded-md p-2 my-2 overflow-x-auto"
                          {...props}
                        >
                          {children}
                        </pre>
                      );
                    },
                    p({ children, ...props }) {
                      return (
                        <p className="mb-2 last:mb-0" {...props}>
                          {children}
                        </p>
                      );
                    },
                    ul({ children, ...props }) {
                      return (
                        <ul
                          className="list-disc list-inside mb-2 space-y-1"
                          {...props}
                        >
                          {children}
                        </ul>
                      );
                    },
                    ol({ children, ...props }) {
                      return (
                        <ol
                          className="list-decimal list-inside mb-2 space-y-1"
                          {...props}
                        >
                          {children}
                        </ol>
                      );
                    },
                    li({ children, ...props }) {
                      return (
                        <li className="ml-2" {...props}>
                          {children}
                        </li>
                      );
                    },
                    blockquote({ children, ...props }) {
                      return (
                        <blockquote
                          className="border-l-4 border-zinc-600 pl-4 italic text-zinc-300 my-2"
                          {...props}
                        >
                          {children}
                        </blockquote>
                      );
                    },
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
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
        <ScrollArea.Thumb className="ScrollAreaThumb bg-gray-400 rounded-full hover:bg-blue-300" />
      </ScrollArea.Scrollbar>

      <ScrollArea.Corner className="ScrollAreaCorner bg-blue-500" />
    </ScrollArea.Root>
  );
};

export default ChatWindow;

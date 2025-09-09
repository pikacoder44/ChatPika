import React, { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { X, Loader } from "lucide-react";
interface SearchModalProps {
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true);
    const getChats = async () => {
      const response = await fetch("/api/chats", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        setChats(data);
        console.log(data);
      } else if (response.status === "401") {
        alert("Unauthorized");
        console.log("Unauthorized");
      }
      setLoading(false);
    };
    getChats();
  }, []);
  const openChat = async (id: string) => {
    try {
      setLoadingChat(id); // Start loading
      const response = await fetch(`/api/chats/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        router.push(`/chat/${id}`);
        setCurrentChat(id);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoadingChat(null); // Stop loading
    }
  };

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
      <div className="bg-white dark:bg-zinc-800 dark:text-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex w-full flex-row justify-between items-center p-2">
          <h2 className="text-xl mb-2 font-semibold">Search Chats</h2>
          <button
            onClick={onClose}
            className="text-gray-500 cursor-pointer  hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X strokeWidth={0.75} />
          </button>
        </div>
        {loading ? (
          <p className="animate-pulse">loading chats...</p>
        ) : (
          <Command>
            <CommandInput placeholder="Search your chats..." />
            <CommandList>
              <CommandGroup heading="Chats:">
                {chats.length > 0 ? (
                  chats.map((item) => (
                    <CommandItem key={item._id}>
                      <button
                        onClick={() => openChat(item._id)}
                        disabled={loadingChat === item._id}
                      >
                        {loadingChat === item._id ? (
                          <div className="flex flex-row gap-2">
                            <span className="truncate text-white">
                              {item.title}
                            </span>

                            <Loader
                              color="white"
                              strokeWidth={2}
                              className="h-4 w-4 animate-spin "
                            />
                          </div>
                        ) : (
                          <span className="truncate">{item.title}</span>
                        )}
                      </button>
                    </CommandItem>
                  ))
                ) : (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        )}
      </div>
    </div>
  );
};

export default SearchModal;

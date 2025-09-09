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
import { X } from "lucide-react";
interface SearchModalProps {
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
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
                      <p>{item.title}</p>
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

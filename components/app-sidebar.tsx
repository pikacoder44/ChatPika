"use client";
import { Home, Search, Plus, Loader } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useSWR, { mutate } from "swr";
import SearchModal from "./SearchModal";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
    isSearch: true,
  },
];

const fetcher = (...args) => fetch(...args).then((res) => res.json());

// Skeleton component for chat items
const ChatSkeleton = () => (
  <SidebarMenuItem>
    <SidebarMenuButton disabled>
      <Skeleton className="h-4 w-full" />
    </SidebarMenuButton>
  </SidebarMenuItem>
);

export function AppSidebar() {
  const router = useRouter();
  const params = useParams();
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [loadingChat, setLoadingChat] = useState<string | null>(null);
  const [receivedChats, setReceivedChats] = useState([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { data: chats, error, isLoading } = useSWR("/api/chats", fetcher);
  useEffect(() => {
    if (chats === undefined) {
      setReceivedChats([]);
      console.log("Chats are undefined");
    } else {
      setReceivedChats(chats);
      console.log("rec chat length: ", chats.length);
      console.log("TYPE: ", typeof chats);
    }
  }, [chats]);

  // Initialize currentChat from URL params
  useEffect(() => {
    if (params.chatId) {
      setCurrentChat(params.chatId as string);
    }
  }, [params.chatId]);

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

  // Create new chat
  const handleNewChat = async () => {
    try {
      // Fallback title if chats are undefined
      const chatCount = chats ? chats.length + 1 : 1;

      const response = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: `Chat ${chatCount}` }),
      });
      if (response.status === 401) {
        console.log("Unauthorized");
        return;
      }
      if (response.ok) {
        const chatData = await response.json();
        router.push(`/chat/${chatData._id}`);
        setCurrentChat(chatData._id);
        // Re-fetch chats after creating
        mutate("/api/chats");
      }
    } catch (error) {
      console.log("Failed to create chat:", error);
    }
  };

  // Handle search button click
  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  if (isLoading) {
    return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Tools</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton disabled>
                    <Plus />
                    <span>New Chat</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton disabled>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Chats</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Show 5 skeleton items while loading */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <ChatSkeleton key={index} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Tools</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleNewChat}>
                    <Plus />
                    <span>New Chat</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.isSearch ? (
                      <SidebarMenuButton onClick={handleSearchClick}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Chats</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {receivedChats.length > 0 ? (
                  Array.isArray(chats) &&
                  chats?.map((item) => (
                    <SidebarMenuItem key={item._id}>
                      <SidebarMenuButton
                        onClick={() => openChat(item._id)}
                        disabled={loadingChat === item._id}
                        className={
                          currentChat === item._id
                            ? "bg-zinc-700 text-white border border-zinc-800"
                            : loadingChat === item._id
                            ? "dark:bg-zinc-600/50  bg-zinc-900"
                            : ""
                        }
                      >
                        {loadingChat === item._id ? (
                          <>
                            <span className="truncate text-white">
                              {item.title}
                            </span>

                            <Loader
                              color="white"
                              strokeWidth={2}
                              className="h-4 w-4 animate-spin "
                            />
                          </>
                        ) : (
                          <span className="truncate">{item.title}</span>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                ) : (
                  <div className="m-2 p-2 flex text-center flex-col">
                    <div className="font-bold text-red-500">
                      Nothing received
                    </div>
                    <p className="font-semibold text-zinc-400">
                      Either there are no chats or you are logged out
                    </p>
                  </div>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {isSearchModalOpen && (
        <SearchModal onClose={() => setIsSearchModalOpen(false)} />
      )}
    </>
  );
}

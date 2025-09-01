"use client";
import { Home, Search, Plus } from "lucide-react";
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
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useSWR, { mutate } from "swr";

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
  },
];

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function AppSidebar() {
  const router = useRouter();
  const params = useParams();
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const { data: chats, error, isLoading } = useSWR("/api/chats", fetcher);

  // Initialize currentChat from URL params
  useEffect(() => {
    if (params.chatId) {
      setCurrentChat(params.chatId as string);
    }
  }, [params.chatId]);

  const openChat = async (id: string) => {
    try {
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
    }
  };

  // Create new chat
  const handleNewChat = async () => {
    try {
      const result = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: `Chat ${chats.length + 1}` }),
      });
      if (result.ok) {
        const chatData = await result.json();
        router.push(`/chat/${chatData._id}`);
        setCurrentChat(chatData._id);
        // Re-fetch chats after creating
        mutate("/api/chats");
      }
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  };

  if (isLoading) return <p className="p-4">Loading chats...</p>;
  if (error) return <p className="p-4 text-red-500">Failed to load chats</p>;

  return (
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
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
              {chats?.map((item) => (
                <SidebarMenuItem key={item._id}>
                  <SidebarMenuButton
                    onClick={() => openChat(item._id)}
                    className={
                      currentChat === item._id ? "bg-zinc-700 text-white border border-zinc-800" : ""
                    }
                  >
                    <span className="truncate">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

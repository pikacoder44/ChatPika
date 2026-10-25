"use client";

import { Home, Search, Plus, Loader, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import useSWR, { mutate } from "swr";
import SearchModal from "./SearchModal";
import { useUser, UserButton } from "@clerk/nextjs";
import { PikaMascotIcon } from "./Navbar";
import { motion } from "framer-motion";

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then((res) => res.json());

const ChatSkeleton = () => (
  <SidebarMenuItem>
    <SidebarMenuButton disabled className="h-8">
      <Skeleton className="h-3.5 w-full bg-zinc-200 dark:bg-white/5" />
    </SidebarMenuButton>
  </SidebarMenuItem>
);

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

export function AppSidebar() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const { user } = useUser();
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [loadingChat, setLoadingChat] = useState<string | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { data: chats, isLoading } = useSWR("/api/chats", fetcher);
  const chatList = Array.isArray(chats) ? chats : [];

  useEffect(() => {
    if (params.chatId) {
      setCurrentChat(params.chatId as string);
    } else {
      setCurrentChat(null);
    }
  }, [params.chatId, pathname]);

  const openChat = async (id: string) => {
    try {
      setLoadingChat(id);
      router.push(`/chat/${id}`);
      setCurrentChat(id);
    } catch (error) {
      console.error("Error opening chat:", error);
    } finally {
      setLoadingChat(null);
    }
  };

  const handleNewChat = async () => {
    try {
      const chatCount = chats ? chats.length + 1 : 1;
      const response = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: `Chat ${chatCount}` }),
      });

      if (response.ok) {
        const chatData = await response.json();
        router.push(`/chat/${chatData._id}`);
        setCurrentChat(chatData._id);
        mutate("/api/chats");
      }
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  };

  return (
    <>
      <Sidebar
        data-lenis-prevent
        className="w-64 bg-white dark:bg-[#12141D] border-r border-zinc-200 dark:border-white/10 flex flex-col justify-between h-screen text-zinc-900 dark:text-zinc-100 transition-colors duration-200"
      >
        <SidebarContent className="p-3 space-y-4">
          {/* Brand header */}
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="w-6 h-6 rounded-md bg-yellow-300 dark:bg-yellow-400/90 flex items-center justify-center shrink-0">
              <PikaMascotIcon className="w-4 h-4" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-zinc-900 dark:text-zinc-100">
              ChatPika
            </span>
          </div>

          {/* Tools Section */}
          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold px-2 mb-1.5">
              Tools
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {/* + New Chat CTA with tap animation */}
                <SidebarMenuItem>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNewChat}
                    className="w-full bg-zinc-100 hover:bg-zinc-200/80 dark:bg-[#1A1D27] dark:hover:bg-[#222634] text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-white/10 rounded-xl px-3 py-2 flex items-center justify-between text-xs font-semibold transition-all cursor-pointer shadow-2xs group"
                  >
                    <span className="flex items-center gap-2">
                      <Plus className="w-3.5 h-3.5 stroke-[2.5] text-amber-600 dark:text-yellow-300" />
                      <span>New Chat</span>
                    </span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono px-1 rounded bg-zinc-200/60 dark:bg-white/5">
                      ⌘N
                    </span>
                  </motion.button>
                </SidebarMenuItem>

                {/* Home link */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => router.push("/")}
                    className="w-full px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Search link */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setIsSearchModalOpen(true)}
                    className="w-full px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Search</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Chats Section with Staggered Entrance & layoutId Spring */}
          <SidebarGroup className="p-0 flex-1">
            <div className="flex items-center justify-between px-2 mb-1.5">
              <SidebarGroupLabel className="text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold p-0">
                Chats
              </SidebarGroupLabel>
              {chatList.length > 0 && (
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                  {chatList.length}
                </span>
              )}
            </div>

            <SidebarGroupContent>
              {isLoading ? (
                <SidebarMenu className="space-y-0.5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <ChatSkeleton key={i} />
                  ))}
                </SidebarMenu>
              ) : chatList.length > 0 ? (
                <motion.div
                  variants={listContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-0.5"
                >
                  {chatList.map((item: any) => {
                    const isActive = currentChat === item._id;
                    const isLoadingThis = loadingChat === item._id;

                    return (
                      <motion.div key={item._id} variants={itemVariants}>
                        <SidebarMenuItem className="relative">
                          <SidebarMenuButton
                            onClick={() => openChat(item._id)}
                            disabled={isLoadingThis}
                            className={`relative w-full px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left flex items-center justify-between cursor-pointer ${
                              isActive
                                ? "bg-zinc-200/80 dark:bg-[#1A1D27] text-zinc-950 dark:text-yellow-200 font-medium"
                                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5"
                            }`}
                          >
                            {/* Spring Layout Indicator */}
                            {isActive && (
                              <motion.div
                                layoutId="active-thread-indicator"
                                className="absolute left-0 top-1 bottom-1 w-1 bg-yellow-400 rounded-r"
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 25,
                                }}
                              />
                            )}

                            <span className="truncate flex-1 pl-1">
                              {item.title || "Untitled Chat"}
                            </span>
                            {isLoadingThis && (
                              <Loader className="h-3 w-3 animate-spin text-zinc-400" />
                            )}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <div className="px-2 py-4 text-center">
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    No chat threads yet.
                  </p>
                </div>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Bottom Profile Footer */}
        <SidebarFooter className="p-3 border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-[#12141D] transition-colors duration-200">
          <div className="flex items-center justify-between px-1 py-1">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="[&_.cl-userButtonTrigger]:!h-7 [&_.cl-userButtonTrigger]:!w-7 [&_.cl-userButtonAvatarBox]:!h-7 [&_.cl-userButtonAvatarBox]:!w-7">
                <UserButton />
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                  {user?.firstName ? user.firstName : user?.username || "PIKA"}
                </p>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">
                  {user?.primaryEmailAddress?.emailAddress || "Free Plan"}
                </p>
              </div>
            </div>

            <button
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
              title="Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </SidebarFooter>
      </Sidebar>

      {isSearchModalOpen && (
        <SearchModal onClose={() => setIsSearchModalOpen(false)} />
      )}
    </>
  );
}

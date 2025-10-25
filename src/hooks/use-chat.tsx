// hooks/use-chat.ts
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Message, Conversation } from "@/types/database";

export const useChat = (conversationId: string | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!conversationId) {
      setLoading(false);
      return;
    }

    fetchMessages();

    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload) => {
          const newMessage = payload.new as Message;

          // Get sender name for new message
          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("id", newMessage.sender_id)
            .single();

          setMessages((prev) => [
            ...prev,
            {
              ...newMessage,
              sender_name: profile?.full_name || "Unknown",
            },
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  const fetchMessages = async () => {
    if (!conversationId) return;

    try {
      const { data, error } = await supabase
        .from("messages")
        .select(
          `
          *,
          profiles:sender_id (full_name)
        `
        )
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      const messagesWithNames = data.map((msg: any) => ({
        ...msg,
        sender_name: msg.profiles?.full_name || "Unknown",
      }));

      setMessages(messagesWithNames);
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Gagal memuat pesan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content: string) => {
    if (!conversationId || !content.trim()) return;

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("User not authenticated");

      const { error } = await supabase.from("messages").insert({
        conversation_id: conversationId,
        sender_id: userData.user.id,
        content: content.trim(),
      });

      if (error) throw error;
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Gagal mengirim pesan",
        variant: "destructive",
      });
      throw error;
    }
  };

  return { messages, loading, sendMessage };
};

// Fungsi terpisah untuk create conversation (bukan hook)
const createConversation = async (umkmId: string): Promise<string> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("User not authenticated");

    // Check if conversation already exists
    const { data: existingConv, error: checkError } = await supabase
      .from("conversations")
      .select("id")
      .eq("umkm_id", umkmId)
      .eq("customer_id", userData.user.id)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 adalah error ketika tidak ada data ditemukan, yang diharapkan
      throw checkError;
    }

    if (existingConv) {
      return existingConv.id;
    }

    // Create new conversation
    const { data, error } = await supabase
      .from("conversations")
      .insert({
        umkm_id: umkmId,
        customer_id: userData.user.id,
      })
      .select()
      .single();

    if (error) throw error;

    toast({
      title: "Berhasil",
      description: "Percakapan baru dibuat",
    });

    return data.id;
  } catch (error: any) {
    console.error("Error creating conversation:", error);
    toast({
      title: "Error",
      description: "Gagal membuat percakapan",
      variant: "destructive",
    });
    throw error;
  }
};

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();

    const channel = supabase
      .channel("conversations-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchConversations = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("conversations")
        .select(
          `
          *,
          umkm:umkm_id (name, owner_id),
          profiles:customer_id (full_name)
        `
        )
        .or(
          `customer_id.eq.${userData.user.id},umkm.owner_id.eq.${userData.user.id}`
        )
        .order("updated_at", { ascending: false });

      if (error) throw error;

      const conversationsWithNames = data.map((conv: any) => ({
        ...conv,
        umkm_name: conv.umkm?.name || "Unknown UMKM",
        customer_name: conv.profiles?.full_name || "Unknown Customer",
      }));

      setConversations(conversationsWithNames);
    } catch (error: any) {
      console.error("Error fetching conversations:", error);
      toast({
        title: "Error",
        description: "Gagal memuat percakapan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    conversations,
    loading,
    refetch: fetchConversations,
    createConversation,
  };
};

// Export fungsi createConversation secara terpisah juga
export { createConversation };

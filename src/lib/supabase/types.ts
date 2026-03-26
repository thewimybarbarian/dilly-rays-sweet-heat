export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      menu_items: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          category: "mains" | "sides" | "drinks" | "sauces";
          image_url: string | null;
          heat_level: number;
          available: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price: number;
          category: "mains" | "sides" | "drinks" | "sauces";
          image_url?: string | null;
          heat_level?: number;
          available?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          category?: "mains" | "sides" | "drinks" | "sauces";
          image_url?: string | null;
          heat_level?: number;
          available?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          items: Json;
          total: number;
          status: "pending" | "confirmed" | "ready" | "picked_up";
          customer_name: string;
          customer_phone: string;
          pickup_time: string | null;
          stripe_session_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          items: Json;
          total: number;
          status?: "pending" | "confirmed" | "ready" | "picked_up";
          customer_name: string;
          customer_phone: string;
          pickup_time?: string | null;
          stripe_session_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          items?: Json;
          total?: number;
          status?: "pending" | "confirmed" | "ready" | "picked_up";
          customer_name?: string;
          customer_phone?: string;
          pickup_time?: string | null;
          stripe_session_id?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      locations: {
        Row: {
          id: string;
          name: string;
          address: string;
          date: string;
          start_time: string;
          end_time: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          address: string;
          date: string;
          start_time: string;
          end_time: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          address?: string;
          date?: string;
          start_time?: string;
          end_time?: string;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

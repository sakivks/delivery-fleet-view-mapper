export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          address: string | null;
          created_at: string;
          email: string | null;
          id: string;
          name: string;
          lat: number | null ; 
          long: number | null ;
          phone: string | null;
          updated_at: string;
        };
        Insert: {
          address?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          lat: number | null ; 
          long: number | null ;
          name: string;
          phone?: string | null;
          updated_at?: string;
        };
        Update: {
          address?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          lat: number | null ; 
          long: number | null ;
          name?: string;
          phone?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      drivers: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          license_number: string | null;
          name: string;
          phone: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: string;
          license_number?: string | null;
          name: string;
          phone?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          license_number?: string | null;
          name?: string;
          phone?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      order_trips: {
        Row: {
          completed_at: string | null;
          created_at: string;
          id: string;
          order_id: string;
          sequence_number: number;
          trip_id: string;
          updated_at: string;
        };
        Insert: {
          completed_at?: string | null;
          created_at?: string;
          id?: string;
          order_id: string;
          sequence_number: number;
          trip_id: string;
          updated_at?: string;
        };
        Update: {
          completed_at?: string | null;
          created_at?: string;
          id?: string;
          order_id?: string;
          sequence_number?: number;
          trip_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_trips_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_trips_trip_id_fkey";
            columns: ["trip_id"];
            isOneToOne: false;
            referencedRelation: "trips";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          created_at: string;
          customer_id: string;
          delivery_address: string;
          delivery_coordinates: unknown | null;
          description: string | null;
          id: string;
          pickup_address: string;
          pickup_coordinates: unknown | null;
          priority: number | null;
          requested_delivery_time: string | null;
          requested_pickup_time: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          customer_id: string;
          delivery_address: string;
          delivery_coordinates?: unknown | null;
          description?: string | null;
          id?: string;
          pickup_address: string;
          pickup_coordinates?: unknown | null;
          priority?: number | null;
          requested_delivery_time?: string | null;
          requested_pickup_time?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          customer_id?: string;
          delivery_address?: string;
          delivery_coordinates?: unknown | null;
          description?: string | null;
          id?: string;
          pickup_address?: string;
          pickup_coordinates?: unknown | null;
          priority?: number | null;
          requested_delivery_time?: string | null;
          requested_pickup_time?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          }
        ];
      };
      trips: {
        Row: {
          created_at: string;
          end_time: string | null;
          id: string;
          notes: string | null;
          start_time: string | null;
          status: Database["public"]["Enums"]["trip_status"];
          updated_at: string;
          vehicle_id: string;
        };
        Insert: {
          created_at?: string;
          end_time?: string | null;
          id?: string;
          notes?: string | null;
          start_time?: string | null;
          status?: Database["public"]["Enums"]["trip_status"];
          updated_at?: string;
          vehicle_id: string;
        };
        Update: {
          created_at?: string;
          end_time?: string | null;
          id?: string;
          notes?: string | null;
          start_time?: string | null;
          status?: Database["public"]["Enums"]["trip_status"];
          updated_at?: string;
          vehicle_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "trips_vehicle_id_fkey";
            columns: ["vehicle_id"];
            isOneToOne: false;
            referencedRelation: "vehicles";
            referencedColumns: ["id"];
          }
        ];
      };
      vehicles: {
        Row: {
          capacity: number | null;
          created_at: string;
          driver_id: string | null;
          id: string;
          license_plate: string | null;
          name: string;
          type: Database["public"]["Enums"]["vehicle_type"];
          updated_at: string;
        };
        Insert: {
          capacity?: number | null;
          created_at?: string;
          driver_id?: string | null;
          id?: string;
          license_plate?: string | null;
          name: string;
          type: Database["public"]["Enums"]["vehicle_type"];
          updated_at?: string;
        };
        Update: {
          capacity?: number | null;
          created_at?: string;
          driver_id?: string | null;
          id?: string;
          license_plate?: string | null;
          name?: string;
          type?: Database["public"]["Enums"]["vehicle_type"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "vehicles_driver_id_fkey";
            columns: ["driver_id"];
            isOneToOne: false;
            referencedRelation: "drivers";
            referencedColumns: ["id"];
          }
        ];
      };
      notification: {
        Row: {
          created_at: string;
          id: string;
          read: boolean;
          title: string;
          updated_at: string;
          message: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          read?: boolean;
          title: string;
          message?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          read?: boolean;
          title?: string;
          updated_at?: string;
          message?: string | null;
        };
      };
      planned_schedule: {
        Row: {
          created_at: string;
          id: string;
          event: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          event?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          event?: string | null;
        };
      };
      event_timeline: {
        Row: {
          created_at: string;
          id: string;
          event: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          event?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      trip_status:
        | "scheduled"
        | "active"
        | "paused"
        | "delayed"
        | "completed"
        | "cancelled"
        | "maintenance";
      vehicle_type: "truck" | "van" | "car" | "bicycle";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
      trip_status: [
        "scheduled",
        "active",
        "paused",
        "delayed",
        "completed",
        "cancelled",
        "maintenance",
      ],
      vehicle_type: ["truck", "van", "car", "bicycle"],
    },
  },
} as const;

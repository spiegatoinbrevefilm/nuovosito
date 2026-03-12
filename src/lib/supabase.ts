import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Work = {
  id: string;
  title: string;
  category: string;
  is_featured: boolean;
  cover_image_url: string;
  cover_image_caption: string;
  link_label: string;
  link_url: string;
  description_top: string;
  description_bottom: string;
  group_name: string; // e.g., 'galleria 3', 'sezione 1'
  created_at: string;
};

export type WorkImage = {
  id: string;
  work_id: string;
  image_url: string;
  display_order: number;
  created_at: string;
};

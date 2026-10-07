// Online database service (Supabase Postgres).
// Keys come from .env — never hardcode them in source.
import { createClient } from '@supabase/supabase-js';

const URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(URL, KEY);

export interface CloudProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const TABLE = 'products';

export async function getAllProducts(): Promise<CloudProduct[]> {
  const { data, error } = await supabase.from(TABLE).select('*').order('id', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function searchProducts(q: string): Promise<CloudProduct[]> {
  if (q.trim() === '') return getAllProducts();
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .ilike('name', `%${q}%`)
    .order('name', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function addProduct(name: string, category: string, price: number, stock: number) {
  const { error } = await supabase.from(TABLE).insert([{ name, category, price, stock }]);
  if (error) throw error;
}

export async function deleteProduct(id: number) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}

export async function changeStock(id: number, stock: number) {
  const { error } = await supabase.from(TABLE).update({ stock }).eq('id', id);
  if (error) throw error;
}

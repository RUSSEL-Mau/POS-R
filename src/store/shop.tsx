import React, { createContext, useContext, useMemo, useState } from 'react';

import { INITIAL_STOCK, PRODUCTS, StockItem } from '@/data/menu';

export interface CartLine { productId: string; qty: number; }
export interface Order {
  id: number; items: { name: string; qty: number; price: number }[];
  total: number; payment: string; date: string;
}
export interface AlertItem {
  id: string; icon: string; title: string; sub: string;
  badge: string; tone: 'low' | 'new' | 'ok' | 'info'; unread: boolean;
}

let orderSeq = 1026;

interface Shop {
  lines: CartLine[];
  addToCart: (id: string) => void;
  updateQty: (id: string, d: number) => void;
  clearCart: () => void;
  cartCount: number; cartTotal: number;
  orders: Order[];
  completeOrder: (payment: string, tendered: number) => Order;
  lastReceipt: Order | null;
  stock: StockItem[];
  lowStock: StockItem[];
  restock: (id: string, qty: number) => void;
  alerts: AlertItem[];
  markAllRead: () => void;
  unread: number;
}

const Ctx = createContext<Shop | null>(null);

const seedOrders: Order[] = [
  { id: 1023, items: [{ name: 'Americano', qty: 2, price: 95 }], total: 212.8, payment: 'Cash', date: 'Today 9:12 AM' },
  { id: 1024, items: [{ name: 'Spanish Latte', qty: 3, price: 150 }], total: 504, payment: 'GCash', date: 'Today 10:02 AM' },
  { id: 1025, items: [{ name: 'Cappuccino', qty: 2, price: 130 }], total: 291.2, payment: 'Card', date: 'Today 11:20 AM' },
];

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([
    { productId: 'spanish-latte', qty: 2 },
    { productId: 'americano', qty: 1 },
  ]);
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [stock, setStock] = useState<StockItem[]>(INITIAL_STOCK);
  const [lastReceipt, setLastReceipt] = useState<Order | null>(null);
  const [readAll, setReadAll] = useState(false);

  const addToCart = (id: string) =>
    setLines((p) => {
      const i = p.findIndex((l) => l.productId === id);
      if (i >= 0) return p.map((l, k) => (k === i ? { ...l, qty: l.qty + 1 } : l));
      return [...p, { productId: id, qty: 1 }];
    });
  const updateQty = (id: string, d: number) =>
    setLines((p) => p.map((l) => (l.productId === id ? { ...l, qty: l.qty + d } : l)).filter((l) => l.qty > 0));
  const clearCart = () => setLines([]);

  const { cartCount, cartTotal } = useMemo(() => {
    let c = 0, t = 0;
    for (const l of lines) {
      const p = PRODUCTS.find((x) => x.id === l.productId);
      if (!p) continue;
      c += l.qty;
      t += p.price * l.qty;
    }
    return { cartCount: c, cartTotal: Math.round(t * 100) / 100 };
  }, [lines]);

  const completeOrder = (payment: string, tendered: number) => {
    const items = lines.map((l) => {
      const p = PRODUCTS.find((x) => x.id === l.productId)!;
      return { name: p.name, qty: l.qty, price: p.price };
    });
    const sub = cartTotal;
    const total = Math.round(sub * 1.12 * 100) / 100;
    const receipt: Order = {
      id: orderSeq++, items, total, payment,
      date: new Date().toLocaleString(),
    };
    void tendered;
    setOrders((o) => [...o, receipt]);
    setLastReceipt(receipt);
    setLines([]);
    return receipt;
  };

  const restock = (id: string, qty: number) =>
    setStock((s) => s.map((i) => (i.id === id ? { ...i, stock: i.stock + qty } : i)));
  const lowStock = stock.filter((i) => i.stock <= i.lowAt);

  const latest = orders[orders.length - 1];
  const alerts: AlertItem[] = [
    { id: 'a1', icon: '!', title: 'Low stock: Oat milk', sub: '4 pcs left - restock soon - 10 min ago', badge: 'Low', tone: 'low', unread: !readAll },
    { id: 'a2', icon: '#', title: `New order #${latest?.id ?? 1025}`, sub: '2x Cappuccino - just arrived - 2 min ago', badge: 'New', tone: 'new', unread: !readAll },
    { id: 'a3', icon: 'P', title: 'Payment received', sub: `GCash ₱336.00 confirmed - 26 min ago`, badge: 'OK', tone: 'ok', unread: !readAll },
    { id: 'a4', icon: '!', title: 'Low stock: Croissant', sub: '6 pcs left - 1 hr ago', badge: 'Low', tone: 'low', unread: false },
  ];
  const unread = alerts.filter((a) => a.unread).length;

  const value: Shop = {
    lines, addToCart, updateQty, clearCart, cartCount, cartTotal,
    orders, completeOrder, lastReceipt, stock, lowStock, restock,
    alerts, markAllRead: () => setReadAll(true), unread,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useShop = () => useContext(Ctx)!;

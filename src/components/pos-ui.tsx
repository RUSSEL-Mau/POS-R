import { Ionicons } from '@expo/vector-icons';
import { useRouter, useSegments } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Kopag, Pad, peso, Radius, TONE } from '@/constants/pos';

export const isDesktop = (w: number) => w >= 1024;

export function Screen({ children, padded = true }: { children: React.ReactNode; padded?: boolean }) {
  const { width } = useWindowDimensions();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Kopag.latte }}
      contentContainerStyle={{ padding: padded ? Pad.md : 0, paddingBottom: 110, maxWidth: isDesktop(width) ? 1200 : undefined, width: '100%', alignSelf: 'center' }}>
      {children}
    </ScrollView>
  );
}

export function HeroCard({ title, sub, pill, onPress }: { title: string; sub: string; pill?: string; onPress?: () => void }) {
  return (
    <View style={s.hero}>
      <View style={{ flex: 1 }}>
        <Text style={s.heroH}>{title}</Text>
        <Text style={s.heroS}>{sub}</Text>
      </View>
      {pill ? (
        <TouchableOpacity style={s.heroPill} onPress={onPress}>
          <Text style={s.heroPillT}>{pill}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export function GreetHero() {
  const { width } = useWindowDimensions();
  void width;
  return (
    <View style={s.hero}>
      <View style={{ flex: 1 }}>
        <Text style={s.heroH}>Good morning, Russel</Text>
        <Text style={s.heroS}>87 orders today - ₱12,450 sales</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
          <View style={s.whiteBtn}><Text style={s.whiteBtnT}>+ New Order</Text></View>
          <View style={s.ghostBtn}><Text style={s.ghostBtnT}>Add Item</Text></View>
        </View>
      </View>
      <View style={s.logoBadge}><Text style={s.logoBadgeT}>☕</Text></View>
    </View>
  );
}

export function KpiCard({ label, value, dot }: { label: string; value: string; dot?: string }) {
  return (
    <View style={s.kpi}>
      <Text style={s.kpiL}>{label}</Text>
      <Text style={s.kpiV}>{value}</Text>
      <View style={[s.kpiDot, { backgroundColor: dot ?? Kopag.caramel }]} />
    </View>
  );
}

export function Badge({ label, tone }: { label: string; tone: keyof typeof TONE }) {
  const t = TONE[tone];
  return (
    <View style={[s.badge, { backgroundColor: t.bg }]}>
      <Text style={s.badgeT}>{label}</Text>
    </View>
  );
}

export function ProductCard({ name, price, img, badge, onAdd }: { name: string; price: number; img: any; badge?: string; onAdd: () => void }) {
  return (
    <View style={s.pcard}>
      <View>
        <Image source={img} style={s.pimg} />
        {badge ? (
          <View style={s.pchip}><Text style={s.pchipT}>{badge}</Text></View>
        ) : null}
      </View>
      <Text style={s.pname} numberOfLines={1}>{name}</Text>
      <Text style={s.pprice}>{peso(price)}</Text>
      <TouchableOpacity style={s.padd} onPress={onAdd}>
        <Text style={s.paddT}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export function QtyStepper({ qty, onDelta }: { qty: number; onDelta: (d: number) => void }) {
  return (
    <View style={s.step}>
      <TouchableOpacity style={s.stepB} onPress={() => onDelta(-1)}><Text style={s.stepT}>−</Text></TouchableOpacity>
      <Text style={s.stepQ}>{qty}</Text>
      <TouchableOpacity style={s.stepB} onPress={() => onDelta(1)}><Text style={s.stepT}>+</Text></TouchableOpacity>
    </View>
  );
}

export function AlertRow({ icon, title, sub, badge, tone, unread }: { icon?: string; title: string; sub: string; badge: string; tone: keyof typeof TONE; unread?: boolean }) {
  const t = TONE[tone];
  return (
    <View style={s.arow}>
      {icon ? (
        <View style={[s.atile, { backgroundColor: t.bg }]}>
          <Text style={s.atileT}>{icon === 'P' ? '₱' : icon}</Text>
        </View>
      ) : null}
      <View style={{ flex: 1 }}>
        <Text style={s.atitle} numberOfLines={1}>{title}</Text>
        <Text style={s.asub} numberOfLines={2}>{sub}</Text>
      </View>
      {unread ? <View style={s.dot} /> : null}
      <Badge label={badge} tone={tone} />
    </View>
  );
}

const TABS = [
  { route: '/', label: 'Home', icon: 'home' },
  { route: '/menu', label: 'Menu', icon: 'cafe' },
  { route: '/orders', label: 'Orders', icon: 'list' },
  { route: '/promo', label: 'Promo', icon: 'pricetag' },
  { route: '/alerts', label: 'Alerts', icon: 'notifications' },
  { route: '/profile', label: 'Profile', icon: 'person' },
] as const;

export function BottomNav() {
  const router = useRouter();
  const segments = useSegments();
  const current = '/' + (segments[segments.length - 1] ?? '');
  const active = current === '//' ? '/' : current;
  return (
    <View style={s.nav}>
      {TABS.map((t) => {
        const on = active === t.route || (t.route === '/' && (active === '/' || active === '/(tabs)' || active === '//'));
        return (
          <Pressable key={t.route} style={s.tab} onPress={() => router.navigate(t.route as any)}>
            <View style={[s.tbadge, { backgroundColor: on ? Kopag.caramel : Kopag.espresso }]}>
              <Ionicons name={t.icon as any} size={17} color="#fff" />
            </View>
            <Text style={[s.tlabel, on && { color: Kopag.caramel, fontWeight: '700' }]}>{t.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const SIDE = [
  { section: 'MENU' },
  { route: '/', label: 'Dashboard', icon: 'home' },
  { route: '/menu', label: 'POS', icon: 'cart' },
  { route: '/inventory', label: 'Inventory', icon: 'cube' },
  { route: '/reports', label: 'Reports', icon: 'bar-chart' },
  { section: 'STORE' },
  { route: '/orders', label: 'Orders', icon: 'list' },
  { route: '/promo', label: 'Promo', icon: 'pricetag' },
  { route: '/alerts', label: 'Alerts', icon: 'notifications' },
  { route: '/profile', label: 'Profile', icon: 'person' },
  { route: '/receipt', label: 'Receipt', icon: 'receipt' },
] as const;

export function Sidebar() {
  const router = useRouter();
  const segments = useSegments();
  const current = '/' + (segments[segments.length - 1] ?? '');
  return (
    <View style={s.side}>
      <View style={s.brandRow}>
        <View style={s.logoChip}><Text style={{ fontSize: 26 }}>☕</Text></View>
        <View>
          <Text style={s.brandT}>Ugpang</Text>
          <Text style={s.brandS}>BREW POS</Text>
        </View>
      </View>
      {SIDE.map((it: any, i: number) =>
        it.section ? (
          <Text key={i} style={s.secT}>{it.section}</Text>
        ) : (
          <TouchableOpacity
            key={it.route + it.label}
            style={[s.navItem, current === it.route && s.navSel]}
            onPress={() => router.navigate(it.route)}>
            <Ionicons name={it.icon} size={18} color="#fff" />
            <Text style={s.navItemT}>{it.label}</Text>
          </TouchableOpacity>
        ),
      )}
      <View style={s.staff}>
        <View style={s.avatar}><Text>👨‍💼</Text></View>
        <View>
          <Text style={s.staffN}>Russel</Text>
          <Text style={s.staffS}>Cashier - On shift</Text>
        </View>
      </View>
    </View>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimensions();
  if (!isDesktop(width)) {
    return (
      <View style={{ flex: 1, backgroundColor: Kopag.latte }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
          <View style={{ flex: 1 }}>{children}</View>
          <BottomNav />
        </SafeAreaView>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: Kopag.latte }}>
      <Sidebar />
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
}

const s = StyleSheet.create({
  hero: { backgroundColor: Kopag.espresso, borderRadius: Radius.lg, padding: Pad.md, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  heroH: { fontSize: 20, fontWeight: '700', color: '#fff' },
  heroS: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  heroPill: { backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 19, paddingVertical: 10, paddingHorizontal: 20 },
  heroPillT: { color: '#fff', fontSize: 13, fontWeight: '700' },
  whiteBtn: { backgroundColor: '#fff', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 14 },
  whiteBtnT: { color: Kopag.espresso, fontWeight: '700', fontSize: 12 },
  ghostBtn: { backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 14 },
  ghostBtnT: { color: '#fff', fontWeight: '600', fontSize: 12 },
  logoBadge: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  logoBadgeT: { fontSize: 30 },
  kpi: { backgroundColor: '#fff', borderRadius: Radius.lg, padding: Pad.md, borderWidth: 1, borderColor: Kopag.line, flex: 1, minWidth: 150 },
  kpiL: { fontSize: 12, color: Kopag.muted },
  kpiV: { fontSize: 22, fontWeight: '800', color: Kopag.espresso, marginTop: 4 },
  kpiDot: { width: 12, height: 12, borderRadius: 6, marginTop: 6 },
  badge: { minWidth: 64, paddingHorizontal: 12, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  badgeT: { color: '#fff', fontSize: 11, fontWeight: '700' },
  pcard: { backgroundColor: '#fff', borderRadius: Radius.lg, padding: 12, borderWidth: 1, borderColor: Kopag.line, flex: 1, minWidth: 150, maxWidth: 260 },
  pimg: { width: '100%', height: 110, borderRadius: Radius.md },
  pname: { fontSize: 13, fontWeight: '600', color: Kopag.espresso, marginTop: 8 },
  pprice: { fontSize: 13, fontWeight: '700', color: Kopag.espresso, marginTop: 2 },
  padd: { width: 32, height: 32, borderRadius: 16, backgroundColor: Kopag.caramel, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  paddT: { color: '#fff', fontSize: 18, fontWeight: '700', marginTop: -2 },
  pchip: { position: 'absolute', top: 8, left: 8, backgroundColor: Kopag.caramel, borderRadius: 10, paddingVertical: 3, paddingHorizontal: 8 },
  pchipT: { color: '#fff', fontSize: 10, fontWeight: '700' },
  step: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  stepB: { width: 28, height: 28, borderRadius: 14, backgroundColor: Kopag.latte, borderWidth: 1, borderColor: Kopag.line, alignItems: 'center', justifyContent: 'center' },
  stepT: { fontSize: 16, fontWeight: '700', color: Kopag.espresso },
  stepQ: { fontSize: 15, fontWeight: '700', color: Kopag.espresso, minWidth: 18, textAlign: 'center' },
  arow: { backgroundColor: '#fff', borderRadius: Radius.lg, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8, borderWidth: 1, borderColor: Kopag.line },
  atile: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  atileT: { fontSize: 20, fontWeight: '800', color: '#fff' },
  atitle: { fontSize: 15, fontWeight: '600', color: Kopag.espresso },
  asub: { fontSize: 13, color: Kopag.muted, marginTop: 2 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Kopag.danger, flexShrink: 0 },
  nav: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: Kopag.line, paddingTop: 8, paddingBottom: 14, paddingHorizontal: 4 },
  tab: { flex: 1, alignItems: 'center', gap: 3 },
  tbadge: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  tlabel: { fontSize: 10, color: Kopag.espresso },
  side: { width: 210, backgroundColor: Kopag.espresso, padding: 16, gap: 4 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  logoChip: { width: 48, height: 48, borderRadius: 14, backgroundColor: Kopag.caramel, alignItems: 'center', justifyContent: 'center' },
  brandT: { color: '#fff', fontSize: 18, fontWeight: '800' },
  brandS: { color: '#E8CDAA', fontSize: 10, fontWeight: '700' },
  secT: { color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: '700', marginTop: 10, marginLeft: 8 },
  navItem: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 12, paddingVertical: 11, paddingHorizontal: 12 },
  navSel: { backgroundColor: Kopag.caramel },
  navItemT: { color: '#fff', fontWeight: '600', fontSize: 13 },
  staff: { marginTop: 'auto', flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: 10 },
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: Kopag.latte, alignItems: 'center', justifyContent: 'center' },
  staffN: { color: '#fff', fontSize: 13, fontWeight: '700' },
  staffS: { color: 'rgba(255,255,255,0.65)', fontSize: 10 },
});

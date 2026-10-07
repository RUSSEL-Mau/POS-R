// Mobile/Dashboard + Web/Dashboard: greeting hero, KPI cards, top sellers, low stock, recent orders.
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { Badge, GreetHero, KpiCard, Screen } from '@/components/pos-ui';
import { Kopag, peso } from '@/constants/pos';
import { PRODUCTS } from '@/data/menu';
import { useShop } from '@/store/shop';

const TOP = [
  { id: 'spanish-latte', sold: 42, rank: '#1' },
  { id: 'americano', sold: 35, rank: '#2' },
  { id: 'cappuccino', sold: 28, rank: '#3' },
];

export default function Dashboard() {
  const { orders, lowStock } = useShop();
  const { width } = useWindowDimensions();
  const desktop = width >= 1024;
  const sales = orders.reduce((a, o) => a + o.total, 0);

  return (
    <Screen>
      <Text style={s.title}>{'Today\'s sales overview'}</Text>
      <GreetHero />
      <View style={[s.row, desktop && s.rowDesk]}>
        <KpiCard label="Today's Sales" value={peso(sales)} dot={Kopag.success} />
        <KpiCard label="Orders" value={String(orders.length)} dot={Kopag.caramel} />
        <KpiCard label="Avg ticket" value={peso(orders.length ? sales / orders.length : 0)} dot={Kopag.muted} />
        <KpiCard label="Low stock" value={`${lowStock.length} items`} dot={Kopag.danger} />
      </View>
      <Text style={s.h}>Top-selling drinks</Text>
      {TOP.map((t) => {
        const p = PRODUCTS.find((x) => x.id === t.id)!;
        return (
          <View key={t.id} style={s.line}>
            <Image source={p.img} style={s.thumb} />
            <View style={{ flex: 1 }}>
              <Text style={s.name}>{p.name}  <Text style={{ color: Kopag.caramel }}>{t.rank}</Text></Text>
              <Text style={s.mut}>{t.sold} sold</Text>
            </View>
          </View>
        );
      })}
      <Text style={s.h}>Low-stock alert</Text>
      {lowStock.length === 0 && <Text style={s.mut}>All stocked ✓</Text>}
      {lowStock.slice(0, 3).map((i) => (
        <View key={i.id} style={[s.line, { backgroundColor: '#FFEBEE' }]}>
          <Text style={[s.name, { flex: 1 }]}>⚠ {i.name} — {i.stock} {i.unit} left</Text>
          <Badge label="Low" tone="low" />
        </View>
      ))}
      <Text style={s.h}>Recent orders</Text>
      {[...orders].reverse().slice(0, 5).map((o) => (
        <View key={o.id} style={s.line}>
          <Text style={s.name}>#{o.id} • {o.payment} • {peso(o.total)}</Text>
        </View>
      ))}
    </Screen>
  );
}

const s = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '800', color: Kopag.espresso, marginBottom: 10 },
  row: { flexDirection: 'column', gap: 10, marginBottom: 4 },
  rowDesk: { flexDirection: 'row' },
  h: { fontSize: 15, fontWeight: '700', color: Kopag.espresso, marginTop: 14, marginBottom: 8 },
  line: { backgroundColor: Kopag.creamCard, borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  thumb: { width: 44, height: 44, borderRadius: 22 },
  name: { fontSize: 13, fontWeight: '600', color: Kopag.espresso },
  mut: { fontSize: 11, color: Kopag.muted },
});

// Mobile/Reports + Web/Reports: KPI strip, sales bars, best sellers, payment mix, insights.
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { KpiCard, Screen } from '@/components/pos-ui';
import { Kopag, peso } from '@/constants/pos';
import { useShop } from '@/store/shop';

const BARS = [40, 70, 55, 90, 65, 110, 85];

export default function Reports() {
  const { orders } = useShop();
  const { width } = useWindowDimensions();
  const desktop = width >= 1024;
  const sales = orders.reduce((a, o) => a + o.total, 0);
  const max = Math.max(...BARS);

  return (
    <Screen>
      <Text style={s.title}>Reports</Text>
      <Text style={s.sub}>Sales, items and payments at a glance</Text>
      <View style={[s.row, desktop && s.rowDesk]}>
        <KpiCard label="Revenue 7d" value="₱86.4k" />
        <KpiCard label="Orders" value="612" />
        <KpiCard label="Cash share" value="45%" />
      </View>
      <View style={s.card}>
        <Text style={s.h}>Revenue line chart</Text>
        <Text style={s.mut}>GCash 35% / Cash 45% / Card 20% • Best: Spanish Latte 42</Text>
        <View style={s.bars}>
          {BARS.map((h, i) => (
            <View key={i} style={[s.bar, { height: 40 + (h / max) * 100, backgroundColor: i === 5 ? Kopag.espresso : Kopag.caramel }]} />
          ))}
        </View>
      </View>
      <Text style={s.h}>Best sellers</Text>
      {[['Spanish Latte', 42, peso(5880)], ['Americano', 35, peso(3325)], ['Cappuccino', 28, peso(3360)]].map(([n, q, r]) => (
        <View key={n as string} style={s.line}>
          <Text style={s.name}>{n} — {q}</Text>
          <Text style={s.price}>{r}</Text>
        </View>
      ))}
      <View style={s.card}>
        <Text style={s.h}>Payment mix</Text>
        <Text style={s.mut}>Cash 45% • GCash 35% • Card 20%</Text>
      </View>
      <View style={[s.row, desktop && s.rowDesk]}>
        {[['Peak hour', 'Sat 2-4 PM - staff 2 baristas'], ['Slow mover', 'Green Tea - 3 sold - consider promo'], ['Waste alert', 'Milk waste up 8% - check portions']].map(([h, b]) => (
          <View key={h} style={[s.card, { flex: 1 }]}>
            <Text style={s.h}>{h}</Text>
            <Text style={s.mut}>{b}</Text>
            <TouchableOpacity style={s.view}><Text style={s.viewT}>View</Text></TouchableOpacity>
          </View>
        ))}
      </View>
      <Text style={s.live}>Live sales so far: {peso(sales)}</Text>
    </Screen>
  );
}

const s = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '800', color: Kopag.espresso },
  sub: { fontSize: 13, color: Kopag.muted, marginBottom: 10 },
  row: { flexDirection: 'column', gap: 10, marginBottom: 4 },
  rowDesk: { flexDirection: 'row' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginTop: 8, borderWidth: 1, borderColor: Kopag.line },
  h: { fontSize: 14, fontWeight: '700', color: Kopag.espresso },
  mut: { fontSize: 12, color: Kopag.muted, marginTop: 2 },
  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: 10, marginTop: 12, height: 150 },
  bar: { width: 30, borderRadius: 6 },
  line: { backgroundColor: '#fff', borderRadius: 12, padding: 12, flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, borderWidth: 1, borderColor: Kopag.line },
  name: { fontSize: 13, color: Kopag.espresso, fontWeight: '600' },
  price: { fontSize: 13, fontWeight: '700', color: Kopag.espresso },
  view: { backgroundColor: Kopag.caramel, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 20, alignSelf: 'flex-start', marginTop: 10 },
  viewT: { color: '#fff', fontWeight: '700', fontSize: 12 },
  live: { marginTop: 12, fontSize: 13, fontWeight: '700', color: Kopag.espresso },
});

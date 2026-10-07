// Mobile/Promo: active promos + voucher cards.
import { StyleSheet, Text, View } from 'react-native';

import { Badge, HeroCard, Screen } from '@/components/pos-ui';
import { Kopag } from '@/constants/pos';

const PROMOS = [
  { title: 'BOGO lattes all weekend', sub: 'Auto-applied at checkout', badge: 'Live', tone: 'ok' },
  { title: 'Free cookie over ₱155', sub: 'Progress bar in cart', badge: 'Live', tone: 'ok' },
  { title: 'Green Tea slow mover', sub: 'Consider 20% off - 3 sold', badge: 'Draft', tone: 'info' },
] as const;

export default function Promo() {
  return (
    <Screen>
      <HeroCard title="Promo" sub="Deals running in store" pill="2 live" />
      {PROMOS.map((p) => (
        <View key={p.title} style={s.row}>
          <View style={[s.tile, { backgroundColor: p.tone === 'ok' ? Kopag.caramel : Kopag.muted }]}>
            <Text style={s.tileT}>%</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{p.title}</Text>
            <Text style={s.mut}>{p.sub}</Text>
          </View>
          <Badge label={p.badge} tone={p.tone} />
        </View>
      ))}
    </Screen>
  );
}

const s = StyleSheet.create({
  row: { backgroundColor: '#fff', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8, borderWidth: 1, borderColor: Kopag.line },
  tile: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  tileT: { color: '#fff', fontSize: 20, fontWeight: '800' },
  name: { fontSize: 13, fontWeight: '700', color: Kopag.espresso },
  mut: { fontSize: 11, color: Kopag.muted },
});

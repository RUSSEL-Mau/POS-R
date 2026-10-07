// Mobile/Orders: order queue with status badges.
import { StyleSheet, Text, View } from 'react-native';

import { Badge, Screen } from '@/components/pos-ui';
import { Kopag, peso } from '@/constants/pos';
import { useShop } from '@/store/shop';

export default function Orders() {
  const { orders } = useShop();
  const rows = [...orders].reverse();
  return (
    <Screen>
      <Text style={s.title}>Orders</Text>
      <Text style={s.sub}>{rows.length} today • all channels</Text>
      {rows.map((o, i) => (
        <View key={o.id} style={s.row}>
          <View style={{ flex: 1 }}>
            <Text style={s.name}>#{o.id} • {o.items.map((x) => `${x.qty}x ${x.name}`).join(', ')}</Text>
            <Text style={s.mut}>{o.payment} • {o.date}</Text>
          </View>
          <Text style={s.price}>{peso(o.total)}</Text>
          <Badge label={i === 0 ? 'New' : i === 1 ? 'Pending' : 'Served'} tone={i === 0 ? 'new' : i === 1 ? 'info' : 'ok'} />
        </View>
      ))}
    </Screen>
  );
}

const s = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '800', color: Kopag.espresso },
  sub: { fontSize: 13, color: Kopag.muted, marginBottom: 10 },
  row: { backgroundColor: '#fff', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8, borderWidth: 1, borderColor: Kopag.line },
  name: { fontSize: 13, fontWeight: '600', color: Kopag.espresso },
  mut: { fontSize: 11, color: Kopag.muted },
  price: { fontSize: 13, fontWeight: '700', color: Kopag.espresso },
});

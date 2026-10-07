// Mobile/Receipt + Web/Receipt: paper, paid stamp, barcode strip, actions.
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Badge, Screen } from '@/components/pos-ui';
import { Kopag, peso } from '@/constants/pos';
import { useShop } from '@/store/shop';

export default function Receipt() {
  const router = useRouter();
  const { lastReceipt } = useShop();
  const r = lastReceipt ?? {
    id: 1024, items: [{ name: 'Spanish Latte M x2', qty: 2, price: 150 }, { name: 'Americano S x1', qty: 1, price: 95 }],
    total: 442.4, payment: 'Cash', date: 'Today',
  };
  const sub = r.items.reduce((a, i) => a + i.price * (i.qty > 2 ? 1 : 1), 0);

  return (
    <Screen>
      <View style={s.paper}>
        <View style={s.strip} />
        <View style={s.prow}>
          <Text style={s.brand}>KOPAG BREW</Text>
          <Badge label="PAID" tone="ok" />
        </View>
        <Text style={s.meta}>Order #{r.id} • Dine-in • {r.payment}</Text>
        {r.items.map((i, k) => (
          <View key={k} style={s.line}>
            <Text style={s.lt}>{i.name}</Text>
            <Text style={s.rp}>{peso(i.price * i.qty)}</Text>
          </View>
        ))}
        <View style={s.hl}>
          <Text style={s.lt}>Total</Text>
          <Text style={s.rp}>{peso(r.total)}</Text>
        </View>
        <Text style={s.thanks}>Thank you! Come again ☕</Text>
        <View style={s.okBadge}><Text style={s.okT}>✓</Text></View>
        <View style={s.barcode}>
          {Array.from({ length: 28 }).map((_, i) => (
            <View key={i} style={[s.bar, { width: i % 3 === 0 ? 4 : 2 }]} />
          ))}
        </View>
        <Text style={s.cap}>#{r.id} - Show at counter</Text>
        <Text style={s.sub2}>Subtotal base {peso(sub)}</Text>
      </View>
      <View style={s.actions}>
        <Text style={s.payLine}>Payment: {r.payment} received</Text>
        <TouchableOpacity style={s.dark} onPress={() => router.navigate('/menu')}>
          <Text style={s.darkT}>New Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.caramel} onPress={() => {}}>
          <Text style={s.caramelT}>Print / Share</Text>
        </TouchableOpacity>
        <Text style={s.fine}>BIR-registered - official receipts on request</Text>
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  paper: { backgroundColor: '#fff', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: Kopag.line, overflow: 'hidden' },
  strip: { backgroundColor: Kopag.caramel, height: 10, marginHorizontal: -20, marginTop: -20, marginBottom: 12 },
  prow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { fontSize: 18, fontWeight: '800', color: Kopag.espresso },
  meta: { fontSize: 12, color: Kopag.muted, marginVertical: 8 },
  line: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  lt: { fontSize: 13, color: Kopag.espresso },
  rp: { fontSize: 13, fontWeight: '600', color: Kopag.espresso },
  hl: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F9EFE3', borderRadius: 10, padding: 10, marginTop: 6 },
  thanks: { textAlign: 'center', color: Kopag.caramel, fontSize: 13, marginTop: 12 },
  okBadge: { width: 56, height: 56, borderRadius: 28, backgroundColor: Kopag.success, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 10 },
  okT: { color: '#fff', fontSize: 26, fontWeight: '800' },
  barcode: { flexDirection: 'row', gap: 3, justifyContent: 'center', marginTop: 14, height: 44, alignItems: 'stretch' },
  bar: { backgroundColor: Kopag.espresso },
  cap: { textAlign: 'center', fontSize: 11, color: Kopag.muted, marginTop: 6 },
  sub2: { textAlign: 'center', fontSize: 11, color: Kopag.muted },
  actions: { backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: Kopag.line, marginTop: 10, gap: 10 },
  payLine: { fontSize: 13, fontWeight: '600', color: Kopag.espresso },
  dark: { backgroundColor: Kopag.espresso, borderRadius: 12, padding: 14, alignItems: 'center' },
  darkT: { color: '#fff', fontWeight: '700' },
  caramel: { backgroundColor: Kopag.caramel, borderRadius: 12, padding: 14, alignItems: 'center' },
  caramelT: { color: '#fff', fontWeight: '700' },
  fine: { fontSize: 11, color: Kopag.muted, textAlign: 'center' },
});

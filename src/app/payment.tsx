// Mobile/Payment + tender chips, total band, complete order.
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Screen } from '@/components/pos-ui';
import { Kopag, peso } from '@/constants/pos';
import { useShop } from '@/store/shop';

const METHODS = ['Cash', 'GCash', 'Card'];

export default function Payment() {
  const router = useRouter();
  const { cartTotal, completeOrder } = useShop();
  const [method, setMethod] = useState('Cash');
  const [tendered, setTendered] = useState(300);
  const sub = cartTotal;
  const total = Math.round(sub * 1.12 * 100) / 100;
  const change = Math.max(0, Math.round((tendered - total) * 100) / 100);

  return (
    <Screen>
      <Text style={s.title}>Payment</Text>
      <Text style={s.sub}>Order #1024 • Dine-in • {method}</Text>
      {METHODS.map((m) => (
        <TouchableOpacity key={m} style={[s.method, method === m && s.methodSel]} onPress={() => setMethod(m)}>
          <Text style={[s.methodT, method === m && { color: '#fff', fontWeight: '700' }]}>{m}</Text>
          <Text style={{ color: method === m ? '#4CAF50' : Kopag.muted }}>{method === m ? '●' : '○'}</Text>
        </TouchableOpacity>
      ))}
      <View style={s.card}>
        <Text style={s.mut}>Amount tendered</Text>
        <Text style={s.big}>{peso(tendered)}</Text>
        <Text style={s.change}>Change: {peso(change)}</Text>
      </View>
      <View style={s.chips}>
        {[Math.round(total), 300, 500, 1000].map((a) => (
          <TouchableOpacity key={a} style={[s.chip, tendered === a && s.chipSel]} onPress={() => setTendered(a)}>
            <Text style={[s.chipT, tendered === a && { color: '#fff' }]}>{a === Math.round(total) ? 'Exact' : peso(a)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={s.band}>
        <Text style={s.bandT}>Total due  {peso(total)}</Text>
      </View>
      <TouchableOpacity
        style={s.go}
        onPress={() => { completeOrder(method, tendered); router.navigate('/receipt'); }}>
        <Text style={s.goT}>Complete Order</Text>
      </TouchableOpacity>
      <View style={s.lock}>
        <Text style={s.mut}>🔒 Payments are encrypted</Text>
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '800', color: Kopag.espresso },
  sub: { fontSize: 13, color: Kopag.muted, marginBottom: 10 },
  method: { backgroundColor: '#fff', borderRadius: 12, padding: 16, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, borderWidth: 1, borderColor: Kopag.line },
  methodSel: { backgroundColor: Kopag.espresso, borderColor: Kopag.espresso },
  methodT: { color: Kopag.espresso, fontWeight: '600' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: Kopag.line, marginTop: 4 },
  mut: { fontSize: 12, color: Kopag.muted },
  big: { fontSize: 26, fontWeight: '800', color: Kopag.espresso },
  change: { fontSize: 13, color: Kopag.success, fontWeight: '600' },
  chips: { flexDirection: 'row', gap: 8, marginVertical: 10 },
  chip: { flex: 1, backgroundColor: '#fff', borderRadius: 12, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: Kopag.line },
  chipSel: { backgroundColor: Kopag.espresso, borderColor: Kopag.espresso },
  chipT: { fontSize: 12, fontWeight: '700', color: Kopag.espresso },
  band: { backgroundColor: Kopag.espresso, borderRadius: 14, padding: 14, alignItems: 'center' },
  bandT: { color: '#fff', fontSize: 17, fontWeight: '800' },
  go: { backgroundColor: Kopag.success, borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 10 },
  goT: { color: '#fff', fontWeight: '800' },
  lock: { backgroundColor: Kopag.creamCard, borderRadius: 12, padding: 12, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: Kopag.line },
});

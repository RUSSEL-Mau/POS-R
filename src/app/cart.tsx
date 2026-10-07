// Mobile/Cart: line items, size/notes, totals, checkout.
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { QtyStepper, Screen } from '@/components/pos-ui';
import { Kopag, peso } from '@/constants/pos';
import { PRODUCTS } from '@/data/menu';
import { useShop } from '@/store/shop';

export default function Cart() {
  const router = useRouter();
  const { lines, updateQty, cartTotal } = useShop();
  const sub = cartTotal;
  const tax = Math.round(sub * 0.12 * 100) / 100;
  const total = Math.round((sub + tax) * 100) / 100;

  return (
    <Screen>
      <Text style={s.title}>Cart — Order #1024</Text>
      {lines.length === 0 && <Text style={s.mut}>No items yet. Add from Menu.</Text>}
      {lines.map((l) => {
        const p = PRODUCTS.find((x) => x.id === l.productId)!;
        return (
          <View key={l.productId} style={s.row}>
            <Image source={p.img} style={s.thumb} />
            <View style={{ flex: 1 }}>
              <Text style={s.name}>{p.name} M</Text>
              <Text style={s.mut}>Oat milk • Less ice</Text>
              <Text style={s.price}>{peso(p.price)}</Text>
            </View>
            <QtyStepper qty={l.qty} onDelta={(d) => updateQty(l.productId, d)} />
          </View>
        );
      })}
      <View style={s.card}>
        <Text style={s.mut}>Subtotal {peso(sub)}</Text>
        <Text style={s.mut}>VAT 12% {peso(tax)}</Text>
        <Text style={s.total}>Total {peso(total)}</Text>
      </View>
      <TouchableOpacity style={s.checkout} onPress={() => router.navigate('/payment')}>
        <Text style={s.checkoutT}>Proceed to Payment →</Text>
      </TouchableOpacity>
    </Screen>
  );
}

const s = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '800', color: Kopag.espresso, marginBottom: 10 },
  row: { backgroundColor: '#fff', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8, borderWidth: 1, borderColor: Kopag.line },
  thumb: { width: 48, height: 48, borderRadius: 24 },
  name: { fontSize: 13, fontWeight: '700', color: Kopag.espresso },
  mut: { fontSize: 11, color: Kopag.muted },
  price: { fontSize: 13, fontWeight: '700', color: Kopag.espresso },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: Kopag.line, gap: 4, marginTop: 4 },
  total: { fontSize: 16, fontWeight: '800', color: Kopag.espresso },
  checkout: { backgroundColor: Kopag.espresso, borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 12 },
  checkoutT: { color: '#fff', fontWeight: '800' },
});

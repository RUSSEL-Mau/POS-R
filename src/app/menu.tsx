// Mobile/Menu + Web/POS: search, category chips, product grid, sticky cart bar.
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { ProductCard, Screen } from '@/components/pos-ui';
import { Kopag, peso } from '@/constants/pos';
import { CATEGORIES, PRODUCTS } from '@/data/menu';
import { useShop } from '@/store/shop';

export default function Menu() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { addToCart, cartCount, cartTotal } = useShop();
  const [cat, setCat] = useState<string>('Espresso');
  const [q, setQ] = useState('');
  const cols = width >= 1024 ? 4 : width >= 700 ? 3 : 2;
  const list = PRODUCTS.filter(
    (p) => p.category === cat && p.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <Text style={s.title}>Ugpang Brew — Menu</Text>
        <TextInput style={s.search} placeholder="Search Americano..." value={q} onChangeText={setQ} />
        <View style={s.chips}>
          {CATEGORIES.map((c) => (
            <TouchableOpacity key={c} style={[s.chip, cat === c && s.chipSel]} onPress={() => setCat(c)}>
              <Text style={[s.chipT, cat === c && s.chipTSel]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {list.map((p) => (
            <View key={p.id} style={{ width: `${100 / cols - 3}%`, minWidth: 150 }}>
              <ProductCard name={p.name} price={p.price} img={p.img} badge={p.badge} onAdd={() => addToCart(p.id)} />
            </View>
          ))}
        </View>
        <Text style={s.more}>{list.length} items • scroll for more</Text>
      </Screen>
      {cartCount > 0 && (
        <TouchableOpacity style={s.bar} onPress={() => router.navigate('/cart')}>
          <Text style={s.barT}>{cartCount} items • {peso(cartTotal)}</Text>
          <Text style={s.barGo}>View Cart →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '800', color: Kopag.espresso },
  search: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginTop: 8, borderWidth: 1, borderColor: Kopag.line },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 10 },
  chip: { backgroundColor: '#fff', borderRadius: 18, paddingVertical: 8, paddingHorizontal: 14, borderWidth: 1, borderColor: Kopag.line },
  chipSel: { backgroundColor: Kopag.espresso, borderColor: Kopag.espresso },
  chipT: { fontSize: 12, color: Kopag.espresso },
  chipTSel: { color: '#fff', fontWeight: '700' },
  more: { fontSize: 11, color: Kopag.muted, marginTop: 10 },
  bar: { position: 'absolute', left: 16, right: 16, bottom: 16, backgroundColor: Kopag.espresso, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 10 },
  barT: { color: '#fff', fontWeight: '600', flex: 1 },
  barGo: { color: '#E8CDAA', fontWeight: '800' },
});

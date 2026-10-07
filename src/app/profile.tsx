// Mobile/Profile: staff card, shift stats, actions.
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { KpiCard, Screen } from '@/components/pos-ui';
import { Kopag } from '@/constants/pos';
import { useShop } from '@/store/shop';

export default function Profile() {
  const { orders } = useShop();
  return (
    <Screen>
      <View style={s.card}>
        <View style={s.avatar}><Text style={{ fontSize: 30 }}>👨‍💼</Text></View>
        <View>
          <Text style={s.name}>Russel</Text>
          <Text style={s.mut}>Cashier - On shift</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
        <KpiCard label="Orders served" value={String(orders.length)} />
        <KpiCard label="Drawer float" value="₱200" />
      </View>
      {['Drawer count', 'Print closing report', 'Sign out'].map((a) => (
        <TouchableOpacity key={a} style={s.row} onPress={() => {}}>
          <Text style={s.rowT}>{a}</Text>
        </TouchableOpacity>
      ))}
    </Screen>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: Kopag.espresso, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: Kopag.latte, alignItems: 'center', justifyContent: 'center' },
  name: { color: '#fff', fontSize: 18, fontWeight: '800' },
  mut: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  row: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginTop: 8, borderWidth: 1, borderColor: Kopag.line },
  rowT: { color: Kopag.espresso, fontWeight: '600', fontSize: 13 },
});

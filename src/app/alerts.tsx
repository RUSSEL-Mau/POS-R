// Mobile/Alerts + Web/Alerts: hero, today rows, earlier this week.
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AlertRow, HeroCard, Screen } from '@/components/pos-ui';
import { Kopag } from '@/constants/pos';
import { useShop } from '@/store/shop';

const EARLIER = [
  { title: 'Sugar syrup running low', sub: '9 bottles - order by Friday', badge: 'Info', tone: 'info' },
  { title: 'Drawer count done', sub: 'P200 float verified - Ana', badge: 'OK', tone: 'ok' },
  { title: 'New review 5 stars', sub: 'Best latte in Mati! - GCash user', badge: 'New', tone: 'new' },
] as const;

export default function Alerts() {
  const { alerts, unread, markAllRead } = useShop();
  return (
    <Screen>
      <HeroCard title="Alerts" sub="Stock, orders and payments" pill={unread > 0 ? `${unread} unread` : 'All caught up'} />
      <View style={s.controls}>
        {unread > 0 && (
          <TouchableOpacity style={s.mark} onPress={markAllRead}>
            <Text style={s.markT}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>
      {alerts.map((a) => (
        <AlertRow key={a.id} icon={a.icon} title={a.title} sub={a.sub} badge={a.badge} tone={a.tone} unread={a.unread} />
      ))}
      <Text style={s.sec}>Earlier this week</Text>
      {EARLIER.map((a) => (
        <AlertRow key={a.title} title={a.title} sub={a.sub} badge={a.badge} tone={a.tone} />
      ))}
    </Screen>
  );
}

const s = StyleSheet.create({
  controls: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 8 },
  mark: { backgroundColor: '#fff', borderRadius: 15, paddingVertical: 7, paddingHorizontal: 14, borderWidth: 1, borderColor: Kopag.line },
  markT: { color: Kopag.caramel, fontSize: 12, fontWeight: '700' },
  sec: { fontSize: 15, fontWeight: '700', color: Kopag.espresso, marginTop: 12, marginBottom: 8 },
});

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Shell } from '@/components/pos-ui';
import { ShopProvider } from '@/store/shop';

export default function RootLayout() {
  return (
    <ShopProvider>
      <StatusBar style="auto" />
      <Shell>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="menu" />
          <Stack.Screen name="orders" />
          <Stack.Screen name="promo" />
          <Stack.Screen name="alerts" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="cart" />
          <Stack.Screen name="payment" />
          <Stack.Screen name="receipt" />
          <Stack.Screen name="inventory" />
          <Stack.Screen name="reports" />
        </Stack>
      </Shell>
    </ShopProvider>
  );
}

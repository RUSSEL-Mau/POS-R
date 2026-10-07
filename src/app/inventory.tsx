// Mobile/Inventory — now backed by online Supabase Postgres.
// Same Figma look: search, filters, status tiles, summary chips.
import { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Badge } from '@/components/pos-ui';
import { Kopag, peso, TONE } from '@/constants/pos';
import { addProduct, changeStock, CloudProduct, deleteProduct, searchProducts } from '@/services/remote-db';

export default function Inventory() {
  const [products, setProducts] = useState<CloudProduct[]>([]);
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async (text = '') => {
    try {
      setError('');
      setProducts(await searchProducts(text));
    } catch (e: any) {
      setError(e?.message ?? 'Could not reach the online database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchProducts('').then(
      (rows) => {
        setProducts(rows);
        setLoading(false);
      },
      (e: any) => {
        setError(e?.message ?? 'Could not reach the online database.');
        setLoading(false);
      },
    );
  }, []);

  const low = (p: CloudProduct) => p.stock <= 8;
  const shown = products.filter((p) => (filter === 'All' ? true : filter === 'Low' ? low(p) : !low(p)));
  const lowCount = products.filter(low).length;

  const handleAdd = async () => {
    if (!name.trim() || !price || !stock) {
      Alert.alert('Validation Error', 'Please fill in all product fields.');
      return;
    }
    try {
      await addProduct(name.trim(), 'General', parseFloat(price), parseInt(stock, 10));
      setName('');
      setPrice('');
      setStock('');
      setModal(false);
      load(q);
    } catch (e: any) {
      Alert.alert('Save failed', e?.message ?? 'Check your connection.');
    }
  };

  const handleDelete = (id: number, prodName: string) => {
    Alert.alert('Delete Confirmation', `Remove ${prodName}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteProduct(id);
            load(q);
          } catch (e: any) {
            Alert.alert('Delete failed', e?.message ?? 'Check your connection.');
          }
        },
      },
    ]);
  };

  const bump = async (p: CloudProduct, d: number) => {
    try {
      await changeStock(p.id, Math.max(0, p.stock + d));
      load(q);
    } catch (e: any) {
      Alert.alert('Update failed', e?.message ?? 'Check your connection.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Kopag.latte }}>
      <View style={{ padding: 16, paddingBottom: 0 }}>
        <View style={s.headRow}>
          <Text style={s.title}>Inventory</Text>
          <TouchableOpacity style={s.addBtn} onPress={() => setModal(true)}>
            <Text style={s.addBtnT}>+ Add Item</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={s.search}
          placeholder="🔍 Search items by name..."
          value={q}
          onChangeText={(t) => { setQ(t); load(t); }}
        />
        <View style={s.frow}>
          {['All', 'Low', 'OK'].map((f) => (
            <TouchableOpacity key={f} style={[s.f, filter === f && s.fSel]} onPress={() => setFilter(f)}>
              <Text style={[s.fT, filter === f && { color: '#fff' }]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {!process.env.EXPO_PUBLIC_SUPABASE_URL && (
          <Text style={s.warn}>⚠ Paste your Supabase URL + anon key into .env, then reload.</Text>
        )}
        {!!error && <Text style={s.err}>{error}</Text>}
        {loading && <Text style={s.mut}>Loading from cloud…</Text>}
      </View>
      <FlatList
        data={shown}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 16, paddingTop: 8, paddingBottom: 110 }}
        ListEmptyComponent={
          !loading ? <Text style={s.empty}>No products found in the online database.</Text> : null
        }
        renderItem={({ item }) => (
          <View style={s.row}>
            <View style={[s.tile, { backgroundColor: low(item) ? TONE.low.bg : TONE.ok.bg }]}>
              <Text style={s.tileT}>📦</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.name}>{item.name}</Text>
              <Text style={s.mut}>{item.stock} pcs • {item.category}</Text>
            </View>
            <Text style={s.price}>{peso(item.price)}</Text>
            <Badge label={low(item) ? 'Low' : 'OK'} tone={low(item) ? 'low' : 'ok'} />
            <View style={s.qtyCol}>
              <TouchableOpacity style={s.qb} onPress={() => bump(item, 1)}>
                <Text style={s.qbT}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.qb} onPress={() => bump(item, -1)}>
                <Text style={s.qbT}>−</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={s.del} onPress={() => handleDelete(item.id, item.name)}>
              <Text style={s.delT}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={{ padding: 16, paddingTop: 0 }}>
        <View style={s.chips}>
          <View style={[s.chip, { backgroundColor: Kopag.espresso }]}><Text style={[s.chipT, { color: '#fff' }]}>{products.length} total</Text></View>
          <View style={[s.chip, { backgroundColor: TONE.low.soft }]}><Text style={[s.chipT, { color: TONE.low.fg }]}>{lowCount} low</Text></View>
          <View style={[s.chip, { backgroundColor: TONE.ok.soft }]}><Text style={[s.chipT, { color: TONE.ok.fg }]}>{products.length - lowCount} ok</Text></View>
        </View>
      </View>
      <Modal visible={modal} animationType="slide" transparent onRequestClose={() => setModal(false)}>
        <View style={s.overlay}>
          <View style={s.box}>
            <Text style={s.boxT}>New Product Entry</Text>
            <TextInput style={s.input} placeholder="Product Name" value={name} onChangeText={setName} />
            <TextInput style={s.input} placeholder="Price (PHP)" keyboardType="numeric" value={price} onChangeText={setPrice} />
            <TextInput style={s.input} placeholder="Initial Stock" keyboardType="numeric" value={stock} onChangeText={setStock} />
            <View style={s.btns}>
              <TouchableOpacity style={s.cancel} onPress={() => setModal(false)}>
                <Text style={s.cancelT}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.save} onPress={handleAdd}>
                <Text style={s.saveT}>Save Online</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  headRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '800', color: Kopag.espresso },
  addBtn: { backgroundColor: Kopag.espresso, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10 },
  addBtnT: { color: '#fff', fontWeight: '700', fontSize: 13 },
  search: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginTop: 8, borderWidth: 1, borderColor: Kopag.line },
  frow: { flexDirection: 'row', gap: 8, marginVertical: 10 },
  f: { backgroundColor: '#fff', borderRadius: 18, paddingVertical: 8, paddingHorizontal: 16, borderWidth: 1, borderColor: Kopag.line },
  fSel: { backgroundColor: Kopag.espresso, borderColor: Kopag.espresso },
  fT: { fontSize: 12, color: Kopag.espresso },
  warn: { color: '#B45309', fontSize: 12, marginBottom: 6 },
  err: { color: Kopag.danger, fontSize: 12, marginBottom: 6 },
  mut: { fontSize: 12, color: Kopag.muted },
  row: { backgroundColor: '#fff', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8, borderWidth: 1, borderColor: Kopag.line },
  tile: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tileT: { fontSize: 22 },
  name: { fontSize: 13, fontWeight: '700', color: Kopag.espresso },
  price: { fontSize: 13, fontWeight: '800', color: Kopag.espresso },
  qtyCol: { gap: 4 },
  qb: { backgroundColor: Kopag.latte, borderRadius: 8, width: 26, height: 24, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Kopag.line },
  qbT: { fontWeight: '800', color: Kopag.espresso, fontSize: 13 },
  del: { backgroundColor: '#FEE2E2', borderRadius: 8, paddingHorizontal: 9, paddingVertical: 8 },
  delT: { color: '#DC2626', fontWeight: '800', fontSize: 13 },
  empty: { textAlign: 'center', color: Kopag.muted, marginTop: 30 },
  chips: { flexDirection: 'row', gap: 8 },
  chip: { flex: 1, borderRadius: 18, paddingVertical: 10, alignItems: 'center' },
  chipT: { fontSize: 12, fontWeight: '700' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  box: { backgroundColor: '#fff', borderRadius: 16, padding: 20 },
  boxT: { fontSize: 18, fontWeight: '800', color: Kopag.espresso, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: Kopag.line, borderRadius: 10, padding: 10, marginBottom: 10, fontSize: 14 },
  btns: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 6 },
  cancel: { padding: 10 },
  cancelT: { fontWeight: '700', color: Kopag.muted },
  save: { backgroundColor: Kopag.espresso, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10 },
  saveT: { color: '#fff', fontWeight: '700' },
});

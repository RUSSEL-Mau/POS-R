// Product catalog — names match Figma Menu/Category frames.
export type Category = 'Espresso' | 'Cold Brew' | 'Tea' | 'Pastries' | 'Sandwiches' | 'Sides';

export interface Product {
  id: string;
  name: string;
  price: number;
  img: any;
  badge?: string;
  category: Category;
}

export const CATEGORIES: Category[] = ['Espresso', 'Cold Brew', 'Tea', 'Pastries', 'Sandwiches', 'Sides'];

const im = (n: string) => {
  switch (n) {
    case 'spanish-latte': return require('@/assets/products/spanish-latte.jpg');
    case 'americano': return require('@/assets/products/americano.jpg');
    case 'cappuccino': return require('@/assets/products/cappuccino.jpg');
    case 'croissant': return require('@/assets/products/croissant.jpg');
    case 'iced-mocha': return require('@/assets/products/iced-mocha.jpg');
    case 'matcha-latte': return require('@/assets/products/matcha-latte.jpg');
    case 'espresso': return require('@/assets/products/espresso.jpg');
    case 'cortado': return require('@/assets/products/cortado.jpg');
    case 'flat-white': return require('@/assets/products/flat-white.jpg');
    case 'macchiato': return require('@/assets/products/macchiato.jpg');
    case 'lungo': return require('@/assets/products/lungo.jpg');
    case 'classic-cold-brew': return require('@/assets/products/classic-cold-brew.jpg');
    case 'salted-cream': return require('@/assets/products/salted-cream.jpg');
    case 'vanilla-cold-brew': return require('@/assets/products/vanilla-cold-brew.jpg');
    case 'nitro': return require('@/assets/products/nitro.jpg');
    case 'caramel-cold-brew': return require('@/assets/products/caramel-cold-brew.jpg');
    case 'peach-tea': return require('@/assets/products/peach-tea.jpg');
    case 'jasmine-tea': return require('@/assets/products/jasmine-tea.jpg');
    case 'chai-latte': return require('@/assets/products/chai-latte.jpg');
    case 'black-tea': return require('@/assets/products/black-tea.jpg');
    case 'green-tea': return require('@/assets/products/green-tea.jpg');
    case 'ensaymada': return require('@/assets/products/ensaymada.jpg');
    case 'banana-bread': return require('@/assets/products/banana-bread.jpg');
    case 'cheesecake': return require('@/assets/products/cheesecake.jpg');
    case 'cinnamon-roll': return require('@/assets/products/cinnamon-roll.jpg');
    case 'cookies': return require('@/assets/products/cookies.jpg');
    case 'ham-cheese': return require('@/assets/products/ham-cheese.jpg');
    case 'tuna-melt': return require('@/assets/products/tuna-melt.jpg');
    case 'chicken-panini': return require('@/assets/products/chicken-panini.jpg');
    case 'egg-salad': return require('@/assets/products/egg-salad.jpg');
    case 'clubhouse': return require('@/assets/products/clubhouse.jpg');
    case 'grilled-cheese': return require('@/assets/products/grilled-cheese.jpg');
    case 'fries': return require('@/assets/products/fries.jpg');
    case 'mozza-sticks': return require('@/assets/products/mozza-sticks.jpg');
    case 'nachos': return require('@/assets/products/nachos.jpg');
    case 'salad-cup': return require('@/assets/products/salad-cup.jpg');
    case 'garlic-bread': return require('@/assets/products/garlic-bread.jpg');
    default: return require('@/assets/products/wedges.jpg');
  }
};

export const PRODUCTS: Product[] = [
  { id: 'spanish-latte', name: 'Spanish Latte', price: 140, img: im('spanish-latte'), badge: 'Bestseller', category: 'Espresso' },
  { id: 'americano', name: 'Americano', price: 95, img: im('americano'), badge: 'Hot', category: 'Espresso' },
  { id: 'cappuccino', name: 'Cappuccino', price: 120, img: im('cappuccino'), badge: 'Hot', category: 'Espresso' },
  { id: 'espresso', name: 'Espresso', price: 90, img: im('espresso'), category: 'Espresso' },
  { id: 'cortado', name: 'Cortado', price: 110, img: im('cortado'), category: 'Espresso' },
  { id: 'flat-white', name: 'Flat White', price: 125, img: im('flat-white'), category: 'Espresso' },
  { id: 'macchiato', name: 'Macchiato', price: 105, img: im('macchiato'), category: 'Espresso' },
  { id: 'lungo', name: 'Lungo', price: 100, img: im('lungo'), category: 'Espresso' },
  { id: 'classic-cold-brew', name: 'Classic Cold Brew', price: 130, img: im('classic-cold-brew'), category: 'Cold Brew' },
  { id: 'salted-cream', name: 'Salted Cream', price: 150, img: im('salted-cream'), badge: 'New', category: 'Cold Brew' },
  { id: 'vanilla-cold-brew', name: 'Vanilla Sweet Cream', price: 150, img: im('vanilla-cold-brew'), category: 'Cold Brew' },
  { id: 'nitro', name: 'Nitro Cold Brew', price: 155, img: im('nitro'), category: 'Cold Brew' },
  { id: 'caramel-cold-brew', name: 'Caramel Cold Brew', price: 150, img: im('caramel-cold-brew'), category: 'Cold Brew' },
  { id: 'iced-mocha', name: 'Iced Mocha', price: 135, img: im('iced-mocha'), badge: 'Iced', category: 'Cold Brew' },
  { id: 'matcha-latte', name: 'Matcha Latte', price: 150, img: im('matcha-latte'), badge: 'New', category: 'Tea' },
  { id: 'peach-tea', name: 'Peach Iced Tea', price: 110, img: im('peach-tea'), badge: 'Iced', category: 'Tea' },
  { id: 'jasmine-tea', name: 'Jasmine Tea', price: 95, img: im('jasmine-tea'), category: 'Tea' },
  { id: 'chai-latte', name: 'Chai Latte', price: 125, img: im('chai-latte'), category: 'Tea' },
  { id: 'black-tea', name: 'Black Tea', price: 85, img: im('black-tea'), category: 'Tea' },
  { id: 'green-tea', name: 'Green Tea', price: 85, img: im('green-tea'), category: 'Tea' },
  { id: 'croissant', name: 'Croissant', price: 85, img: im('croissant'), badge: 'Baked', category: 'Pastries' },
  { id: 'ensaymada', name: 'Ensaymada', price: 120, img: im('ensaymada'), badge: 'Iced', category: 'Pastries' },
  { id: 'banana-bread', name: 'Banana Bread', price: 140, img: im('banana-bread'), badge: 'New', category: 'Pastries' },
  { id: 'cheesecake', name: 'Cheesecake', price: 85, img: im('cheesecake'), badge: 'Hot', category: 'Pastries' },
  { id: 'cinnamon-roll', name: 'Cinnamon Roll', price: 135, img: im('cinnamon-roll'), badge: 'Iced', category: 'Pastries' },
  { id: 'cookies', name: 'Cookies', price: 150, img: im('cookies'), badge: 'New', category: 'Pastries' },
  { id: 'ham-cheese', name: 'Ham & Cheese', price: 120, img: im('ham-cheese'), category: 'Sandwiches' },
  { id: 'tuna-melt', name: 'Tuna Melt', price: 130, img: im('tuna-melt'), category: 'Sandwiches' },
  { id: 'chicken-panini', name: 'Chicken Panini', price: 145, img: im('chicken-panini'), category: 'Sandwiches' },
  { id: 'egg-salad', name: 'Egg Salad', price: 110, img: im('egg-salad'), category: 'Sandwiches' },
  { id: 'clubhouse', name: 'Clubhouse', price: 150, img: im('clubhouse'), badge: 'New', category: 'Sandwiches' },
  { id: 'grilled-cheese', name: 'Grilled Cheese', price: 115, img: im('grilled-cheese'), category: 'Sandwiches' },
  { id: 'fries', name: 'Fries', price: 75, img: im('fries'), category: 'Sides' },
  { id: 'mozza-sticks', name: 'Mozza Sticks', price: 120, img: im('mozza-sticks'), category: 'Sides' },
  { id: 'nachos', name: 'Nachos', price: 130, img: im('nachos'), category: 'Sides' },
  { id: 'salad-cup', name: 'Salad Cup', price: 90, img: im('salad-cup'), category: 'Sides' },
  { id: 'garlic-bread', name: 'Garlic Bread', price: 70, img: im('garlic-bread'), category: 'Sides' },
  { id: 'wedges', name: 'Wedges', price: 80, img: im('wedges'), category: 'Sides' },
];

export interface StockItem { id: string; name: string; stock: number; unit: string; lowAt: number; }

export const INITIAL_STOCK: StockItem[] = [
  { id: 'espresso-beans', name: 'Espresso beans', stock: 12, unit: 'kg', lowAt: 5 },
  { id: 'fresh-milk', name: 'Fresh milk', stock: 18, unit: 'L', lowAt: 8 },
  { id: 'oat-milk', name: 'Oat milk', stock: 4, unit: 'pcs', lowAt: 6 },
  { id: 'sugar-syrup', name: 'Sugar syrup', stock: 9, unit: 'btl', lowAt: 4 },
  { id: 'croissant', name: 'Croissant', stock: 6, unit: 'pcs', lowAt: 8 },
  { id: 'cheesecake', name: 'Cheesecake slices', stock: 10, unit: 'pcs', lowAt: 5 },
];

/**
 * 🍕 Zomato Order Builder
 *
 * Zomato jaisa order summary banana hai! Cart mein items hain (with quantity
 * aur addons), ek optional coupon code hai, aur tujhe final bill banana hai
 * with itemwise breakdown, taxes, delivery fee, aur discount.
 *
 * Rules:
 *   - cart is array of items:
 *     [{ name: "Butter Chicken", price: 350, qty: 2, addons: ["Extra Butter:50", "Naan:40"] }, ...]
 *   - Each addon string format: "AddonName:Price" (split by ":" to get price)
 *   - Per item total = (price + sum of addon prices) * qty
 *   - Calculate:
 *     - items: array of { name, qty, basePrice, addonTotal, itemTotal }
 *     - subtotal: sum of all itemTotals
 *     - deliveryFee: Rs 30 if subtotal < 500, Rs 15 if 500-999, FREE (0) if >= 1000
 *     - gst: 5% of subtotal, rounded to 2 decimal places parseFloat(val.toFixed(2))
 *     - discount: based on coupon (see below)
 *     - grandTotal: subtotal + deliveryFee + gst - discount (minimum 0, use Math.max)
 *     - Round grandTotal to 2 decimal places
 *
 *   Coupon codes (case-insensitive):
 *     - "FIRST50"  => 50% off subtotal, max Rs 150 (use Math.min)
 *     - "FLAT100"  => flat Rs 100 off
 *     - "FREESHIP" => delivery fee becomes 0 (discount = original delivery fee value)
 *     - null/undefined/invalid string => no discount (0)
 *
 *   - Items with qty <= 0 ko skip karo
 *   - Hint: Use map(), reduce(), filter(), split(), parseFloat(),
 *     toFixed(), Math.max(), Math.min(), toLowerCase()
 *
 * Validation:
 *   - Agar cart array nahi hai ya empty hai, return null
 *
 * @param {Array<{ name: string, price: number, qty: number, addons?: string[] }>} cart
 * @param {string} [coupon] - Optional coupon code
 * @returns {{ items: Array<{ name: string, qty: number, basePrice: number, addonTotal: number, itemTotal: number }>, subtotal: number, deliveryFee: number, gst: number, discount: number, grandTotal: number } | null}
 *
 * @example
 *   buildZomatoOrder([{ name: "Biryani", price: 300, qty: 1, addons: ["Raita:30"] }], "FLAT100")
 *   // subtotal: 330, deliveryFee: 30, gst: 16.5, discount: 100
 *   // grandTotal: 330 + 30 + 16.5 - 100 = 276.5
 *
 *   buildZomatoOrder([{ name: "Pizza", price: 500, qty: 2, addons: [] }], "FIRST50")
 *   // subtotal: 1000, deliveryFee: 0, gst: 50, discount: min(500, 150) = 150
 *   // grandTotal: 1000 + 0 + 50 - 150 = 900
 */
export function buildZomatoOrder(cart, coupon) {
  // Validation: Agar cart array nahi hai ya empty hai, return null
  if (!Array.isArray(cart) || cart.length === 0) return null;

  let items = [];

  // Calculate basePrice, addonTotal, itemTotal for each item in cart
  for (let item of cart) {
    if (item.qty <= 0) continue;

    let basePrice = item.price;

    let addonTotal = 0;
    if (item.addons && Array.isArray(item.addons)) {
      addonTotal = item.addons
        .map((e) => e.split(":"))
        .reduce((sum, [_, e]) => sum + Number(e), 0);
    }

    let itemTotal = (basePrice + addonTotal) * item.qty;
    items.push({
      name: item.name,
      qty: item.qty,
      basePrice,
      addonTotal,
      itemTotal,
    });
  }

  let subtotal = items.reduce((sum, price) => sum + price.itemTotal, 0);

  let deliveryFee = 0;

  if (subtotal >= 0 && subtotal < 500) deliveryFee = 30;
  else if (subtotal >= 500 && subtotal < 1000) deliveryFee = 15;

  let gst = Number(parseFloat((subtotal / 100) * 5).toFixed(2));

  let discount = 0;

  if (!coupon || typeof coupon !== "string" || coupon.trim == "") discount = 0;
  coupon = coupon?.toUpperCase();

  // Apply coupon discounts
  if (coupon == "FIRST50") {
    let amount = parseFloat((subtotal / 100) * 50);
    if (amount > 150) discount = 150;
    else discount = amount;
  } else if (coupon == "FLAT100") discount = 100;
  else if (coupon == "FREESHIP") {
    discount = deliveryFee;
    deliveryFee = 0;
  }

  let grandTotal = parseFloat(subtotal + deliveryFee + gst) - discount;

  if (grandTotal < 0) grandTotal = 0;

  return {
    items,
    subtotal,
    deliveryFee,
    gst,
    discount,
    grandTotal,
  };
}

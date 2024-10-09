import { useState } from 'react';
import { products } from './CatProduct';

export default function Product() {
  const [cart, setCart] = useState([]);
  const [shippingCost] = useState(100); // ค่าขนส่ง
  const [coupon, setCoupon] = useState(null); // เก็บคูปอง
  const [discount, setDiscount] = useState(0); // ส่วนลด

  // เพิ่มสินค้าไปยังตะกร้า
  function addToCart(prd) {
    const productInCart = cart.find((item) => item.id === prd.id);

    if (productInCart) {
      //เพิ่มจำนวน
      setCart(
        cart.map((item) =>
          item.id === prd.id ? { ...item, count: item.count + 1 } : item
        )
      );
    } else {
      // ไม่มีพิ่มเข้าไปใหม่
      setCart([...cart, { ...prd, count: 1 }]);
    }
  }

  // ลบออกจากตะกร้า
  function delToCart(prd_del) {
    setCart(cart.filter((product) => product.id !== prd_del.id));
  }

  // เพิ่มจำนวน
  function handleIncreaseClick(productId) {
    setCart(
      cart.map((product) =>
        product.id === productId ? { ...product, count: product.count + 1 } : product
      )
    );
  }

  // ลด
  function handleDecreaseClick(productId) {
    setCart(
      cart.map((product) =>
        product.id === productId && product.count > 1
          ? { ...product, count: product.count - 1 }
          : product
      )
    );
  }

  //ราคารวม
  function calculateTotalPrice() {
    let total = cart.reduce((total, product) => total + product.price * product.count, 0);
    total += shippingCost; // เพิ่มค่าขนส่ง

    // ถ้ามีคูปองส่วนลด
    if (coupon && coupon === 'INDYZA55+') {
      total = total * 0.75; // ลด 25% 
    }

    return total.toFixed(2);
  }

  // ตรวจสอบคูปองและตั้งค่าลด
  function applyCoupon(code) {
    if (code === 'INDYZA55+') {
      setCoupon(code);
      setDiscount(25); // ลด 25%
    } else {
      setCoupon(null);
      setDiscount(0);
    }
  }





  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <h1 className="text-6xl font-bold py-6">Cat Shop</h1>

        <div>
          <h1 className='text-3xl font-semibold py-4' >Shopping Cart</h1>
          {cart.map((product) => (
            <div key={product.id} className="group relative">
              <div className='text-xl font-semibold'>{product.name}</div>
              <div className='text-lg '>{product.price} THB</div>
              <div>
                <button onClick={() => handleIncreaseClick(product.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                </button>
                <b>{product.count}</b>
                <button onClick={() => handleDecreaseClick(product.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
                </button>
              </div>
              <div className="text-1xl font-bold text-rose-700">
                <button onClick={() => delToCart(product)}>
                  นำสินค้าออก
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h2 className='text-xl text-blue-700'>ใส่โค้ดคูปอง:</h2>
          <input type="text" className="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500" onChange={(e) => applyCoupon(e.target.value)} />
          {coupon && <p>คูปองถูกใช้:{coupon}</p>}
        </div>

        <div className="text-xl py-4">
          <h2 >ค่าขนส่ง: {shippingCost} THB</h2>
        </div>

        <div className="text-2xl font-bold text-rose-700">
          <h2>รวมราคา: {calculateTotalPrice()} THB</h2>
        </div>

        <h2 className='text-3xl font-bold py-3'>รายการสินค้า</h2>
        <h2 className='text-1xl font-bold py-3'>* click!! ที่ภาพเพื่อเลือกสินค้า *</h2> 
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <button onClick={() => addToCart(product)}>
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="w-64 h-64 object-cover object-center "
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700 flex justify-start">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0 " />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 flex justify-start">{product.color}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div >
  )
}
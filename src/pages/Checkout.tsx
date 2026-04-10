import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, MapPin, Clock, CreditCard, Wallet } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Checkout() {
  const { cart, getCartTotal, clearCart, user } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [selectedAddress, setSelectedAddress] = React.useState(user?.addresses[0]?.id || '');
  const [selectedSlot, setSelectedSlot] = React.useState('today-1');
  const [paymentMethod, setPaymentMethod] = React.useState('card');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + deliveryFee;

  React.useEffect(() => {
    if (cart.length === 0 && step !== 4) {
      navigate('/cart');
    }
  }, [cart.length, navigate, step]);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4);
      clearCart();
    }, 2000);
  };

  if (step === 4) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-gray-50 flex flex-col items-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Thank you for shopping with FreshMart. Your order #ORD-{Math.floor(Math.random() * 100000)} has been confirmed and will be delivered soon.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Checkout Flow */}
          <div className="flex-1 space-y-6">
            
            {/* 1. Delivery Address */}
            <div className={`bg-white rounded-2xl border ${step === 1 ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-200'} p-6 transition-all`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500'}`}>1</div>
                <h2 className="text-xl font-bold text-gray-900">Delivery Address</h2>
              </div>
              
              {step === 1 ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {user?.addresses.map(addr => (
                      <label 
                        key={addr.id}
                        className={`border rounded-xl p-4 cursor-pointer transition-colors ${selectedAddress === addr.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-200'}`}
                      >
                        <div className="flex items-start gap-3">
                          <input 
                            type="radio" 
                            name="address" 
                            value={addr.id}
                            checked={selectedAddress === addr.id}
                            onChange={(e) => setSelectedAddress(e.target.value)}
                            className="mt-1 text-green-600 focus:ring-green-500"
                          />
                          <div>
                            <div className="font-semibold text-gray-900 flex items-center gap-2">
                              {addr.label}
                              {selectedAddress === addr.id && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{addr.street}, {addr.city} {addr.zip}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                    <button className="border border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center text-gray-500 hover:text-green-600 hover:border-green-500 hover:bg-green-50 transition-colors h-full min-h-[100px]">
                      <MapPin className="w-6 h-6 mb-2" />
                      <span className="font-medium">Add New Address</span>
                    </button>
                  </div>
                  <button 
                    onClick={() => setStep(2)}
                    disabled={!selectedAddress}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50"
                  >
                    Continue to Delivery Slot
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center pl-11">
                  <p className="text-gray-600">
                    {user?.addresses.find(a => a.id === selectedAddress)?.street}, {user?.addresses.find(a => a.id === selectedAddress)?.city}
                  </p>
                  <button onClick={() => setStep(1)} className="text-green-600 font-medium hover:underline">Edit</button>
                </div>
              )}
            </div>

            {/* 2. Delivery Slot */}
            <div className={`bg-white rounded-2xl border ${step === 2 ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-200'} p-6 transition-all opacity-${step < 2 ? '50' : '100'}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500'}`}>2</div>
                <h2 className="text-xl font-bold text-gray-900">Delivery Slot</h2>
              </div>
              
              {step === 2 ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <label className={`border rounded-xl p-4 cursor-pointer transition-colors ${selectedSlot === 'today-1' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-200'}`}>
                      <div className="flex items-start gap-3">
                        <input type="radio" name="slot" value="today-1" checked={selectedSlot === 'today-1'} onChange={(e) => setSelectedSlot(e.target.value)} className="mt-1 text-green-600 focus:ring-green-500" />
                        <div>
                          <div className="font-semibold text-gray-900">Today, 30 Mins</div>
                          <p className="text-sm text-gray-600 mt-1">Express Delivery</p>
                        </div>
                      </div>
                    </label>
                    <label className={`border rounded-xl p-4 cursor-pointer transition-colors ${selectedSlot === 'today-2' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-200'}`}>
                      <div className="flex items-start gap-3">
                        <input type="radio" name="slot" value="today-2" checked={selectedSlot === 'today-2'} onChange={(e) => setSelectedSlot(e.target.value)} className="mt-1 text-green-600 focus:ring-green-500" />
                        <div>
                          <div className="font-semibold text-gray-900">Today, 6 PM - 8 PM</div>
                          <p className="text-sm text-gray-600 mt-1">Scheduled Delivery</p>
                        </div>
                      </div>
                    </label>
                  </div>
                  <button 
                    onClick={() => setStep(3)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              ) : step > 2 ? (
                <div className="flex justify-between items-center pl-11">
                  <p className="text-gray-600">
                    {selectedSlot === 'today-1' ? 'Today, Express (30 Mins)' : 'Today, 6 PM - 8 PM'}
                  </p>
                  <button onClick={() => setStep(2)} className="text-green-600 font-medium hover:underline">Edit</button>
                </div>
              ) : null}
            </div>

            {/* 3. Payment Method */}
            <div className={`bg-white rounded-2xl border ${step === 3 ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-200'} p-6 transition-all opacity-${step < 3 ? '50' : '100'}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 3 ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500'}`}>3</div>
                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
              </div>
              
              {step === 3 && (
                <div>
                  <div className="space-y-4 mb-8">
                    <label className={`block border rounded-xl p-4 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-200'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="text-green-600 focus:ring-green-500" />
                        <CreditCard className="w-5 h-5 text-gray-600" />
                        <span className="font-semibold text-gray-900">Credit / Debit Card</span>
                      </div>
                      {paymentMethod === 'card' && (
                        <div className="mt-4 pl-8 space-y-3">
                          <input type="text" placeholder="Card Number" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-green-500" />
                          <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="MM/YY" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-green-500" />
                            <input type="text" placeholder="CVC" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-green-500" />
                          </div>
                        </div>
                      )}
                    </label>
                    <label className={`block border rounded-xl p-4 cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-200'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={(e) => setPaymentMethod(e.target.value)} className="text-green-600 focus:ring-green-500" />
                        <Wallet className="w-5 h-5 text-gray-600" />
                        <span className="font-semibold text-gray-900">UPI / Wallets</span>
                      </div>
                    </label>
                    <label className={`block border rounded-xl p-4 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-200'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="text-green-600 focus:ring-green-500" />
                        <span className="font-semibold text-gray-900">Cash on Delivery</span>
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={item.product.id} className="flex justify-between items-start gap-4">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-contain" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3 mb-6 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-gray-900">
                    {deliveryFee === 0 ? <span className="text-green-600">Free</span> : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-gray-900 font-bold">Total</span>
                  <span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={step !== 3 || isProcessing}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

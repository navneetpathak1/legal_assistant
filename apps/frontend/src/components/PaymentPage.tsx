import React, { useState, useEffect } from 'react';
import { CreditCard, Check, Crown, ArrowLeft, QrCode } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setProUser } from '../store/slices/themeSlice';
import type { RootState } from '../store';

interface PaymentPageProps {
  onBack: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentPage: React.FC<PaymentPageProps> = ({ onBack }) => {
  const { lawyerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isDark } = useAppSelector((state: RootState) => state.theme);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'card'>('razorpay');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
    billingAddress: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleRazorpayPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Create order on backend
      const orderResponse = await fetch(
        lawyerId 
          ? `http://localhost:3003/api/v1/lawyers/create-order/${lawyerId}`
          : 'http://localhost:3003/api/v1/lawyers/create-order/1', // Default for pro upgrade
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error('Failed to create order');
      }

      const options = {
        key: 'rzp_test_your_key_id', // Replace with your Razorpay key
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'LegalAssist Pro',
        description: lawyerId ? 'Lawyer Consultation Payment' : 'Pro Subscription',
        order_id: orderData.orderId,
        theme: {
          color: isDark ? '#3b82f6' : '#2563eb'
        },
        handler: async (response: any) => {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch('http://localhost:3003/api/v1/lawyers/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              dispatch(setProUser(true));
              alert('Payment successful! Welcome to LegalAssist Pro!');
              navigate(lawyerId ? '/dashboard' : '/userDashboard');
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          contact: '9999999999'
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate card payment processing
    setTimeout(() => {
      setIsProcessing(false);
      dispatch(setProUser(true));
      alert('Payment successful! Welcome to LegalAssist Pro!');
      navigate(lawyerId ? '/dashboard' : '/userDashboard');
    }, 2000);
  };

  const proFeatures = [
    'Unlimited legal consultations',
    'Priority lawyer matching',
    'Advanced document analysis',
    'Contract template library',
    '24/7 premium support',
    'Legal research database access'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Upgrade to Legal Assist Pro</h1>
            <p className="text-gray-600 mt-1">Unlock premium features and get priority support</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Plan Details */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Crown size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Pro Plan</h2>
                  <p className="text-gray-600">Everything you need for legal success</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">$29</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Billed monthly, cancel anytime</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 mb-4">What's included:</h3>
                {proFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check size={12} className="text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* QR Code Payment */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Pay with QR</h3>
                <p className="text-gray-600 mb-6">Scan to pay instantly with your mobile wallet</p>
                
                {/* QR Code Placeholder */}
                <div className="w-48 h-48 mx-auto bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <QrCode size={64} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">QR Code</p>
                    <p className="text-xs text-gray-400">Scan with your phone</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mt-4">
                  Supports Apple Pay, Google Pay, and most mobile wallets
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Payment Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard size={24} className="text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Payment Details</h3>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Choose Payment Method</h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    paymentMethod === 'razorpay'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg font-semibold">Razorpay</div>
                    <div className="text-xs text-gray-500">UPI, Cards, Wallets</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg font-semibold">Card</div>
                    <div className="text-xs text-gray-500">Credit/Debit Card</div>
                  </div>
                </button>
              </div>
            </div>

            {paymentMethod === 'razorpay' ? (
              <div className="text-center py-8">
                <button
                  onClick={handleRazorpayPayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Crown size={20} />
                      Pay with Razorpay - ₹{lawyerId ? '1000' : '29'}
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  Secure payment powered by Razorpay
                </p>
              </div>
            ) : (
              <form onSubmit={handleCardPayment} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="john@example.com"
                  required
                />
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Card Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Billing Address
                </label>
                <input
                  type="text"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="123 Main St, City, State 12345"
                  required
                />
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  🔒 Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Crown size={20} />
                    Pay with Card - ₹{lawyerId ? '1000' : '29'}
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
                Cancel anytime from your account settings.
              </p>
            </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
// import React, { useState, useEffect } from 'react';
// import { CreditCard, Check, Crown, ArrowLeft } from 'lucide-react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { setProUser } from '../store/slices/themeSlice';
// import { addNotification } from '../store/slices/notificationSlice';
// import type { RootState } from '../store';
// import { API_CONFIG } from '../config/api';

// interface PaymentPageProps {
//   onBack: () => void;
// }

// interface UserData {
//   id: number;
//   name: string;
//   email: string;
//   phone?: string;
// }

// const PaymentPage: React.FC<PaymentPageProps> = ({ onBack }) => {
//   const { lawyerId } = useParams<{ lawyerId?: string }>();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   // Remove unused isDark variable
//   const { user } = useAppSelector((state: RootState) => state.auth);

//   const [formData, setFormData] = useState({
//     cardNumber: '',
//     cardName: '',
//     expiryDate: '',
//     cvv: '',
//     upiId: '',
//     address: ''
//   });
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [amount, setAmount] = useState<number | null>(lawyerId ? 100000 : 2900); // in paisa
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
//   const description = lawyerId 
//     ? `Payment for lawyer consultation with ID: ${lawyerId}`
//     : 'LegalAssist Pro Subscription';

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
//     dispatch(addNotification({
//       message,
//       type,
//       title: type.charAt(0).toUpperCase() + type.slice(1)
//     }));
//   };

//   // Fetch user data and payment details on component mount
//   useEffect(() => {
//     const fetchUserAndPaymentDetails = async () => {
//       try {
//         // In a real app, fetch user data from your backend
//         setUserData({
//           id: user?.id || 1,
//           name: user?.name || 'User Name',
//           email: user?.email || 'user@example.com',
//           phone: user?.phone || '9999999999'
//         });

//         // If it's a lawyer consultation, fetch lawyer details
//         if (lawyerId && lawyerId !== '1') {
//           const response = await fetch(`https://api.example.com/lawyers/${lawyerId}`);
//           const lawyer = await response.json();
//           if (lawyer) {
//             setAmount(lawyer.charge || 1000);
//             setDescription(`Consultation with ${lawyer.name}`);
//           }
//         } else {
//           // For pro subscription
//           setAmount(29900); // ₹299 in paise
//           setDescription('LegalAssist Pro Subscription');
//         }
//       } catch (error) {
//         console.error('Error fetching payment details:', error);
//         showNotification('Failed to load payment details', 'error');
//       }
//     };

//     fetchUserAndPaymentDetails();
//   }, [lawyerId, user]);

//   // Load Razorpay script
//   useEffect(() => {
//     const loadRazorpay = () => {
//       return new Promise((resolve) => {
//         const script = document.createElement('script');
//         script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//         script.async = true;
//         script.onload = () => resolve(true);
//         script.onerror = () => resolve(false);
//         document.body.appendChild(script);
//       });
//     };

//     loadRazorpay();
//   }, []);

//   const handleRazorpayPayment = async () => {
//     if (!userData || !amount) return;
    
//     setIsProcessing(true);
    
//     try {
//       const orderResponse = await fetch(
//         `${API_CONFIG.BASE_URL}/payments/create-order${lawyerId ? `/${lawyerId}` : ''}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           },
//           body: JSON.stringify({
//             amount: amount,
//             currency: 'INR',
//             receipt: `order_${Date.now()}`
//           })
//         }
//       );

//       if (!orderResponse.ok) {
//         throw new Error('Failed to create order');
//       }

//       const orderData = await orderResponse.json();

//       interface RazorpayOptions {
//         key: string;
//         amount: number;
//         currency: string;
//         name: string;
//         description: string;
//         order_id: string;
//         handler: (response: any) => void;
//         prefill: {
//           name: string;
//           email: string;
//           contact: string | undefined;
//         };
//         theme: {
//           color: string;
//         };
//         modal: {
//           ondismiss: () => void;
//         };
//       }

//       const options: RazorpayOptions = {
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_your_key_id',
//         amount: orderData.amount,
//         currency: orderData.currency || 'INR',
//         name: 'LegalAssist Pro',
//         description: description,
//         order_id: orderData.orderId,
//         handler: async (response: any) => {
//           try {
//             const verifyResponse = await fetch(`${API_CONFIG.BASE_URL}/payments/verify`, {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//               },
//               body: JSON.stringify({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature
//               })
//             });

//             const verifyData = await verifyResponse.json();

//             if (verifyData.success) {
//               dispatch(setProUser(true));
//               showNotification('Payment successful!', 'success');
//               navigate(lawyerId ? '/dashboard' : '/userDashboard');
//             } else {
//               throw new Error(verifyData.message || 'Payment verification failed');
//             }
//           } catch (error: any) {
//             console.error('Payment verification error:', error);
//             showNotification(error.message || 'Payment verification failed', 'error');
//           } finally {
//             setIsProcessing(false);
//           }
//         },
//         prefill: {
//           name: userData.name,
//           email: userData.email,
//           contact: userData.phone
//         },
//         theme: {
//           color: '#4F46E5'
//         },
//         modal: {
//           ondismiss: () => {
//             setIsProcessing(false);
//           }
//         }
//       };

//       const rzp = new (window as any).Razorpay(options);
//       rzp.open();
//     } catch (error: any) {
//       console.error('Payment error:', error);
//       showNotification(error.message || 'Payment failed. Please try again.', 'error');
//       setIsProcessing(false);
//     }
//   };

//   const handleCardPayment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsProcessing(true);
//     try {
//       // In a real implementation, you would process the card payment here
//       // For now, we'll simulate a successful payment
//       await new Promise(resolve => setTimeout(resolve, 1500));

//       dispatch(setProUser(true));
//       showNotification('Payment processed successfully!', 'success');
//       navigate(lawyerId ? '/dashboard' : '/userDashboard');
//     } catch (error) {
//       console.error('Payment error:', error);
//       showNotification('Payment failed. Please try again.', 'error');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const formatAmount = (amount: number | null): string => {
//     if (amount === null) return '₹0';
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(amount / 100);
//   };

//   const proFeatures = [
//     'Unlimited legal consultations',
//     'Priority lawyer matching',
//     'Advanced document analysis',
//     'Contract template library',
//     '24/7 premium support',
//     'Legal research database access'
//   ];

//   if (!userData || amount === null) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading payment details...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center gap-4 mb-8">
//           <button
//             onClick={onBack}
//             className="p-2 hover:bg-white/50 rounded-lg transition-colors"
//           >
//             <ArrowLeft size={24} className="text-gray-600" />
//           </button>
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">
//               {lawyerId ? 'Book Consultation' : 'Upgrade to Legal Assist Pro'}
//             </h1>
//             <p className="text-gray-600 mt-1">
//               {lawyerId ? 'Secure payment for your consultation' : 'Unlock premium features and get priority support'}
//             </p>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           <div className="space-y-6">
//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
//                   <Crown size={24} className="text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     {lawyerId ? 'Consultation' : 'Pro Plan'}
//                   </h2>
//                   <p className="text-gray-600">
//                     {lawyerId ? 'One-time consultation' : 'Everything you need for legal success'}
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-700">Amount</span>
//                   <span className="text-2xl font-bold text-gray-900">
//                     {formatAmount(amount)}
//                   </span>
//                 </div>

//                 {!lawyerId && (
//                   <div className="space-y-3">
//                     <h3 className="font-medium text-gray-900">What's included:</h3>
//                     {proFeatures.map((feature, index) => (
//                       <div key={index} className="flex items-center gap-3">
//                         <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
//                           <Check size={12} className="text-green-600" />
//                         </div>
//                         <span className="text-gray-700">{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <CreditCard size={32} className="text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">Need help?</h3>
//                 <p className="text-gray-600 mb-6">Our support team is here to help you</p>
//                 <button className="text-blue-600 hover:text-blue-700 font-medium">
//                   Contact Support
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
//             <div className="flex items-center gap-3 mb-6">
//               <CreditCard size={24} className="text-blue-600" />
//                   disabled={isProcessing}
//                   className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {isProcessing ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Processing...
//                     </>
//                   ) : (
//                     `Pay with Razorpay - ${formatAmount(amount)}`
//                   )}
//                 </button>
//                 <p className="text-xs text-gray-500 mt-3">
//                   Secure payment powered by Razorpay
//                 </p>
//               </div>
//             ) : (
//               <form onSubmit={handleCardPayment} className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Card Number
//                   </label>
//                   <input
//                     type="text"
//                     name="cardNumber"
//                     value={formData.cardNumber}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                     placeholder="1234 5678 9012 3456"
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Expiry Date
//                     </label>
//                     <input
//                       type="text"
//                       name="expiryDate"
//                       value={formData.expiryDate}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                       placeholder="MM/YY"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       CVV
//                     </label>
//                     <input
//                       type="text"
//                       name="cvv"
//                       value={formData.cvv}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                       placeholder="123"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Cardholder Name
//                   </label>
//                   <input
//                     type="text"
//                     name="cardName"
//                     value={formData.cardName}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                     placeholder="John Doe"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
//                     Billing Address
//                   </label>
//                   <input
//                     id="address"
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                     placeholder="123 Main St, City, State 12345"
//                     required
//                   />
//                 </div>

//                 <div className="mt-6">
//                   <button
//                     type="submit"
//                     disabled={isProcessing}
//                     className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {isProcessing ? (
//                       <>
//                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                         Processing...
//                       </>
//                     ) : (
//                       <>
//                         <Crown size={20} />
//                         {`Pay with Card - ${formatAmount(amount)}`}
//                       </>
//                 )}
//               </button>

//                 <p className="text-xs text-gray-500 text-center mt-4">
//                   By subscribing, you agree to our Terms of Service and Privacy Policy.
//                   Cancel anytime from your account settings.
//                 </p>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;
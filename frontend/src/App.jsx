import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCalendar, FaUser, FaBed, FaMapMarkerAlt, FaWifi, FaCar, FaSwimmingPool, 
         FaCoffee, FaConciergeBell, FaStar, FaGlassMartini, FaCocktail,
         FaCreditCard, FaKey, FaShieldAlt, FaHeart, FaShare, FaWhatsapp,
         FaFacebook, FaTwitter, FaInstagram, FaImages, FaArrowLeft, FaPhone,
         FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { MdAir, MdTv, MdKitchen, MdLocalLaundryService, MdSpa, MdRoomService,
         MdClose, MdCheck, MdEmail } from 'react-icons/md'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import "react-datepicker/dist/react-datepicker.css"
import './App.css'

function App() {
  const [checkIn, setCheckIn] = useState(new Date())
  const [checkOut, setCheckOut] = useState(new Date())
  const [guests, setGuests] = useState(1)
  const [rooms, setRooms] = useState(1)
  const [activeTab, setActiveTab] = useState('overview')
  const [isWishlist, setIsWishlist] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookingDetails, setBookingDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+91'
  })
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const hotelImages = [
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800"
  ]

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % hotelImages.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + hotelImages.length) % hotelImages.length)
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!showGalleryModal) return
      
      if (e.key === 'ArrowRight') {
        nextImage()
      } else if (e.key === 'ArrowLeft') {
        prevImage()
      } else if (e.key === 'Escape') {
        setShowGalleryModal(false)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showGalleryModal])

  const calculateNights = () => {
    const diffTime = Math.abs(checkOut - checkIn)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const calculateTotal = () => {
    const nights = calculateNights()
    const basePrice = 4999 * nights
    const cleaningFee = 499
    const serviceFee = 299
    const discount = 2098
    return {
      basePrice,
      cleaningFee,
      serviceFee,
      discount,
      total: basePrice + cleaningFee + serviceFee - discount
    }
  }

  const handleReserve = () => {
    if (!showBookingModal) {
      setShowBookingModal(true)
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setShowBookingModal(false)
      setShowConfirmation(true)
    }, 2000)
  }

  const amenities = [
    { icon: <FaWifi />, name: "High-speed WiFi" },
    { icon: <MdAir />, name: "Climate control" },
    { icon: <FaCar />, name: "Valet parking" },
    { icon: <FaSwimmingPool />, name: "Infinity pool" },
    { icon: <FaGlassMartini />, name: "Mini bar" },
    { icon: <MdTv />, name: "65\" Smart TV" },
    { icon: <MdKitchen />, name: "Kitchenette" },
    { icon: <FaConciergeBell />, name: "24/7 concierge" },
    { icon: <MdLocalLaundryService />, name: "Laundry service" },
    { icon: <MdSpa />, name: "Spa access" },
    { icon: <MdRoomService />, name: "Room service" },
    { icon: <FaCocktail />, name: "Lounge access" }
  ]

  const highlights = [
    { title: "Luxury Experience", description: "Premium amenities and personalized service" },
    { title: "Prime Location", description: "Heart of Tathwade, minutes from IT hubs" },
    { title: "Dining Excellence", description: "24/7 in-room dining and restaurant" },
    { title: "Business Ready", description: "High-speed internet and workspace" }
  ]

  const policies = [
    { icon: <FaCreditCard />, text: "Secure payments with all major cards accepted" },
    { icon: <FaKey />, text: "Digital check-in available 24/7" },
    { icon: <FaShieldAlt />, text: "Free cancellation up to 48 hours before check-in" }
  ]

  const shareOptions = [
    { icon: <FaWhatsapp className="text-green-500" />, name: "WhatsApp" },
    { icon: <FaFacebook className="text-blue-600" />, name: "Facebook" },
    { icon: <FaTwitter className="text-blue-400" />, name: "Twitter" },
    { icon: <FaInstagram className="text-pink-600" />, name: "Instagram" }
  ]

  return (
    <div className="min-h-screen bg-luxury-light">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="font-serif text-5xl text-luxury-dark mb-2">Luxurious Suite at Case de Silver</h1>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsWishlist(!isWishlist)}
                className="p-2 rounded-full bg-white shadow-md"
              >
                <FaHeart className={isWishlist ? "text-red-500" : "text-gray-400"} size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowShareModal(true)}
                className="p-2 rounded-full bg-white shadow-md"
              >
                <FaShare className="text-luxury-gold" size={20} />
              </motion.button>
            </div>
          </div>
          <div className="flex items-center gap-3 text-luxury-muted">
            <FaStar className="text-luxury-gold" />
            <span className="font-semibold">4.9</span>
            <span>·</span>
            <span className="underline cursor-pointer">284 reviews</span>
            <span>·</span>
            <FaMapMarkerAlt />
            <span>Tathwade, Pune, Maharashtra</span>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden mb-8 h-[500px] shadow-xl relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!4v1744213318362!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRE43N3pTVUE.!2m2!1d18.62283539903247!2d73.75837717264945!3f0!4f0!5f0.7820865974627469" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button 
                  onClick={() => setShowGalleryModal(true)}
                  className="bg-white px-6 py-3 rounded-lg font-semibold text-luxury-dark flex items-center gap-2"
                >
                  <FaImages />
                  View Gallery
                </button>
                <button className="bg-white px-6 py-3 rounded-lg font-semibold text-luxury-dark">
                  View 360° Tour
                </button>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex gap-4 border-b mb-6">
                {['overview', 'amenities', 'policies'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-2 capitalize font-medium transition-colors ${
                      activeTab === tab 
                        ? 'border-b-2 border-luxury-gold text-luxury-dark' 
                        : 'text-luxury-muted'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'overview' && (
                <>
                  <div className="border-b pb-8 mb-8">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-serif mb-2">Luxury Suite by Silver Group</h2>
                        <p className="text-luxury-muted">
                          {guests} guest{guests > 1 ? 's' : ''} · {rooms} bedroom{rooms > 1 ? 's' : ''} · 1 bath
                        </p>
                      </div>
                      <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtqlbS-7QfT4Y8Xs-4ba4fGN0aBRhnIJiAA&s" 
                        alt="Host" 
                        className="w-16 h-16 rounded-full border-2 border-luxury-gold"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
                      >
                        <h3 className="font-serif text-xl mb-2 text-luxury-dark">{highlight.title}</h3>
                        <p className="text-luxury-muted">{highlight.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'amenities' && (
                <div className="grid md:grid-cols-3 gap-4">
                  {amenities.map((amenity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="text-luxury-gold text-xl">{amenity.icon}</span>
                      <span className="text-luxury-muted">{amenity.name}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'policies' && (
                <div className="space-y-6">
                  {policies.map((policy, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
                    >
                      <span className="text-2xl text-luxury-gold">{policy.icon}</span>
                      <span className="text-luxury-muted">{policy.text}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-8 bg-white rounded-2xl border shadow-xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-3xl font-serif text-luxury-dark">₹4,999</span>
                  <span className="text-luxury-muted"> / night</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaStar className="text-luxury-gold" />
                  <span className="font-semibold">4.9</span>
                  <span className="text-luxury-muted">(284)</span>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden mb-4">
                <div className="grid grid-cols-2 border-b">
                  <div className="p-4 border-r">
                    <label className="block text-xs uppercase font-semibold text-luxury-muted">CHECK-IN</label>
                    <DatePicker
                      selected={checkIn}
                      onChange={date => setCheckIn(date)}
                      minDate={new Date()}
                      className="w-full border-none p-0 text-luxury-dark focus:ring-0"
                    />
                  </div>
                  <div className="p-4">
                    <label className="block text-xs uppercase font-semibold text-luxury-muted">CHECKOUT</label>
                    <DatePicker
                      selected={checkOut}
                      onChange={date => setCheckOut(date)}
                      minDate={checkIn}
                      className="w-full border-none p-0 text-luxury-dark focus:ring-0"
                    />
                  </div>
                </div>
                
                <div className="p-4">
                  <label className="block text-xs uppercase font-semibold text-luxury-muted mb-2">GUESTS</label>
                  <select 
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full border-none bg-transparent text-luxury-dark focus:ring-0"
                  >
                    {[1,2,3,4].map(num => (
                      <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReserve}
                disabled={isLoading}
                className="w-full bg-luxury-gold hover:bg-luxury-accent text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Reserve Now'}
              </motion.button>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-luxury-muted">
                  <span>₹4,999 x {calculateNights()} night{calculateNights() > 1 ? 's' : ''}</span>
                  <span>₹{calculateTotal().basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-luxury-muted">
                  <span>Cleaning fee</span>
                  <span>₹{calculateTotal().cleaningFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-luxury-muted">
                  <span>Service fee</span>
                  <span>₹{calculateTotal().serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{calculateTotal().discount.toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t flex justify-between font-semibold text-luxury-dark">
                  <span>Total</span>
                  <span>₹{calculateTotal().total.toLocaleString()}</span>
                </div>
              </div>

              <p className="mt-4 text-sm text-luxury-muted text-center">
                You won't be charged yet
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <Transition show={showGalleryModal} as={Fragment}>
        <Dialog onClose={() => setShowGalleryModal(false)} className="relative z-50">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/90" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl">
                <div className="relative">
                  <button
                    onClick={() => setShowGalleryModal(false)}
                    className="absolute top-4 right-4 text-white hover:text-luxury-gold z-10"
                  >
                    <MdClose size={24} />
                  </button>
                  
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                  >
                    <FaChevronLeft size={20} />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                  >
                    <FaChevronRight size={20} />
                  </button>

                  <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {activeImageIndex + 1} / {hotelImages.length}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImageIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      src={hotelImages[activeImageIndex]}
                      alt={`Gallery image ${activeImageIndex + 1}`}
                      className="w-full rounded-lg"
                    />
                  </AnimatePresence>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-2 rounded-full">
                    {hotelImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === activeImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition show={showShareModal} as={Fragment}>
        <Dialog onClose={() => setShowShareModal(false)} className="relative z-50">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white rounded-2xl p-6 w-full max-w-sm">
                <Dialog.Title className="text-xl font-serif mb-4">Share this property</Dialog.Title>
                <div className="grid grid-cols-2 gap-4">
                  {shareOptions.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50"
                    >
                      {option.icon}
                      <span>{option.name}</span>
                    </motion.button>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition show={showBookingModal} as={Fragment}>
        <Dialog onClose={() => setShowBookingModal(false)} className="relative z-50">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white rounded-2xl p-6 w-full max-w-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="text-luxury-muted hover:text-luxury-dark"
                  >
                    <FaArrowLeft size={20} />
                  </button>
                  <Dialog.Title className="text-2xl font-serif">Complete your booking</Dialog.Title>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-700 flex items-center gap-2">
                    <span className="text-xl">🎉</span>
                    Yay! you just saved ₹{calculateTotal().discount} on this booking!
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-4">Enter your details</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-luxury-muted mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={bookingDetails.fullName}
                            onChange={(e) => setBookingDetails({...bookingDetails, fullName: e.target.value})}
                            placeholder="Enter first and last name"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-luxury-muted mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={bookingDetails.email}
                            onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
                            placeholder="name@example.com"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-luxury-muted mb-1">
                            Mobile Number
                          </label>
                          <div className="flex gap-2">
                            <select
                              value={bookingDetails.countryCode}
                              onChange={(e) => setBookingDetails({...bookingDetails, countryCode: e.target.value})}
                              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                            >
                              <option value="+91">+91</option>
                              <option value="+1">+1</option>
                              <option value="+44">+44</option>
                            </select>
                            <input
                              type="tel"
                              value={bookingDetails.phone}
                              onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                              placeholder="Enter mobile number"
                              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Booking Summary</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm">
                        <FaCalendar className="text-luxury-gold" />
                        <div>
                          <p className="font-medium">{checkIn.toLocaleDateString()} - {checkOut.toLocaleDateString()}</p>
                          <p className="text-luxury-muted">{calculateNights()} night{calculateNights() > 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <FaUser className="text-luxury-gold" />
                        <div>
                          <p className="font-medium">{guests} Guest{guests > 1 ? 's' : ''}</p>
                          <p className="text-luxury-muted">Classic Room</p>
                        </div>
                      </div>
                      <div className="border-t pt-4 mt-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Room price</span>
                            <span>₹{calculateTotal().basePrice.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Cleaning fee</span>
                            <span>₹{calculateTotal().cleaningFee.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Service fee</span>
                            <span>₹{calculateTotal().serviceFee.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm text-green-600">
                            <span>Discount</span>
                            <span>-₹{calculateTotal().discount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between font-semibold pt-2 border-t">
                            <span>Total</span>
                            <span>₹{calculateTotal().total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReserve}
                    disabled={isLoading}
                    className="bg-luxury-gold hover:bg-luxury-accent text-white font-semibold py-3 px-8 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Processing...' : 'Confirm Booking'}
                  </motion.button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition show={showConfirmation} as={Fragment}>
        <Dialog onClose={() => setShowConfirmation(false)} className="relative z-50">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white rounded-2xl p-8 w-full max-w-md text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MdCheck className="text-green-500 text-3xl" />
                </div>
                <Dialog.Title className="text-2xl font-serif mb-2">Booking Confirmed!</Dialog.Title>
                <p className="text-luxury-muted mb-6">
                  Your reservation at Case de Silver has been confirmed. Check your email for details.
                </p>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="bg-luxury-gold hover:bg-luxury-accent text-white font-semibold py-3 px-6 rounded-lg transition-colors w-full"
                >
                  Done
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default App
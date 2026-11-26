export interface Vehicle {
  id: string;
  name: string;
  category: string; // Hatchback, Sedan, SUV, Luxury SUV, Force Urbania, Tempo Traveller, Mini Bus, Luxury Bus, Wedding Cars, Luxury Cars
  image: string;
  pricePerKm: number;
  pricePerDay: number;
  capacity: number;
  luggage: number;
  mileage: string;
  specifications: {
    ac: boolean;
    musicSystem: boolean;
    chargingPort: boolean;
    pushbackSeats: boolean;
    airbags: boolean;
    gps: boolean;
  };
  features: string[];
  availability: 'Available' | 'Booked' | 'Maintenance';
}

export interface VehicleCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  startingPrice: number;
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupLocation: string;
  dropLocation: string;
  journeyType: 'Local' | 'Outstation' | 'One Way' | 'Round Trip' | 'Airport Transfer';
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  vehicleId: string;
  vehicleName: string;
  vehicleCategory: string;
  passengers: number;
  luggage: number;
  specialRequirement?: string;
  couponCode?: string;
  discountAmount: number;
  totalFare: number;
  paymentOption: 'Cash' | 'UPI' | 'Card';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  bookingStatus: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  driverId?: string;
  driverName?: string;
  createdAt: string;
  gstNumber?: string;
  companyName?: string;
}

export interface TourPackage {
  id: string;
  title: string;
  duration: string; // e.g. "3 Days / 2 Nights"
  description: string;
  price: number;
  image: string;
  highlights: string[];
  itinerary: { day: number; title: string; description: string }[];
  locations: string[]; // Bhubaneswar, Puri, Konark, Chilika, etc.
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  rating: number;
  experienceYears: number;
  status: 'Available' | 'On Duty' | 'Leave';
  avatar: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
  videoUrl?: string; // simulation of review
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'vehicles' | 'odisha' | 'drone' | 'events';
  image: string;
  isVideo: boolean;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'Pending' | 'Resolved';
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  date: string;
  tags: string[];
}

export interface Offer {
  id: string;
  code: string;
  discountPercentage: number;
  description: string;
  validUntil: string;
  minBookingValue: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  createdAt: string;
  isRead: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Review {
  id: string;
  vehicleId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { BlogController } from '../controllers/blog.controller.js';
import { BookingController } from '../controllers/booking.controller.js';
import { PackageController } from '../controllers/package.controller.js';
import { GalleryController } from '../controllers/gallery.controller.js';
import { CallbackController } from '../controllers/callback.controller.js';
import { EnquiryController } from '../controllers/enquiry.controller.js';
import { FleetController } from '../controllers/fleet.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../config/multer.js';

const router = Router();

// --- AUTHENTICATION ---
router.post('/auth/login', AuthController.login);
router.get('/auth/verify', authenticateToken, AuthController.verify);
router.post('/auth/change-password', authenticateToken, AuthController.changePassword);

// --- VEHICLES ---
router.get('/vehicles', FleetController.getVehicles);
router.get('/vehicles/:id', FleetController.getVehicleById);
router.post('/vehicles', authenticateToken, FleetController.createVehicle);
router.put('/vehicles/:id', authenticateToken, FleetController.updateVehicle);
router.delete('/vehicles/:id', authenticateToken, FleetController.deleteVehicle);

// --- TOUR PACKAGES ---
router.get('/tour-packages', PackageController.getAll);
router.get('/tour-packages/:id', PackageController.getById);
router.post('/tour-packages', authenticateToken, PackageController.create);
router.put('/tour-packages/:id', authenticateToken, PackageController.update);
router.delete('/tour-packages/:id', authenticateToken, PackageController.delete);

// --- DRIVERS ---
router.get('/drivers', FleetController.getDrivers);
router.post('/drivers', authenticateToken, FleetController.createDriver);
router.put('/drivers/:id', authenticateToken, FleetController.updateDriver);
router.delete('/drivers/:id', authenticateToken, FleetController.deleteDriver);

// --- TESTIMONIALS ---
router.get('/testimonials', FleetController.getTestimonials);
router.post('/testimonials', FleetController.createTestimonial);

// --- GALLERY ---
router.get('/gallery', GalleryController.getAll);
router.post('/gallery', authenticateToken, GalleryController.create);
router.post('/gallery/upload', authenticateToken, upload.single('image'), GalleryController.uploadFile);
router.delete('/gallery/:id', authenticateToken, GalleryController.delete);

// --- BLOGS ---
router.get('/blogs', BlogController.getAll);
router.get('/blogs/:slug', BlogController.getBySlug);
router.post('/blogs', authenticateToken, BlogController.create);
router.put('/blogs/:id', authenticateToken, BlogController.update);
router.delete('/blogs/:id', authenticateToken, BlogController.delete);

// --- OFFERS ---
router.get('/offers', FleetController.getOffers);
router.post('/offers', authenticateToken, FleetController.createOffer);
router.delete('/offers/:id', authenticateToken, FleetController.deleteOffer);

// --- FAQS ---
router.get('/faqs', FleetController.getFAQs);
router.post('/faqs', authenticateToken, FleetController.createFAQ);
router.delete('/faqs/:id', authenticateToken, FleetController.deleteFAQ);

// --- BOOKINGS ---
router.post('/bookings', BookingController.create);
router.get('/bookings', authenticateToken, BookingController.getAll);
router.put('/bookings/:id', authenticateToken, BookingController.update);

// --- ENQUIRIES ---
router.post('/enquiries', EnquiryController.create);
router.get('/enquiries', authenticateToken, EnquiryController.getAll);
router.put('/enquiries/:id', authenticateToken, EnquiryController.updateStatus);

// --- CALLBACK REQUESTS ---
router.post('/callback', CallbackController.create);
router.get('/callback', authenticateToken, CallbackController.getAll);
router.put('/callback/:id', authenticateToken, CallbackController.updateStatus);

// --- NOTIFICATIONS ---
router.get('/notifications', authenticateToken, FleetController.getNotifications);
router.post('/notifications/read', authenticateToken, FleetController.markNotificationsAsRead);

// --- REVIEWS ---
router.get('/reviews', FleetController.getReviews);
router.post('/reviews', FleetController.createReview);

export default router;

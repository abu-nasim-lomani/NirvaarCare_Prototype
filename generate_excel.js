const XLSX = require('xlsx');

const wb = XLSX.utils.book_new();

// ─── HELPERS ────────────────────────────────────────────────
function addSheet(wb, name, data) {
  const ws = XLSX.utils.aoa_to_sheet(data);

  // Column widths: auto-fit roughly
  const colWidths = data[0].map((_, ci) => ({
    wch: Math.max(...data.map(r => (r[ci] ? String(r[ci]).length : 10)), 12)
  }));
  ws['!cols'] = colWidths;

  XLSX.utils.book_append_sheet(wb, ws, name);
}

// ═══════════════════════════════════════════════════════════
// SHEET 1 — FEATURES
// ═══════════════════════════════════════════════════════════
const features = [
  ['Feature ID', 'Category', 'Feature Name (EN)', 'Feature Name (BN)', 'Description', 'User Role(s)', 'Priority', 'Status'],

  // Public
  ['F01', '🌐 Public', 'Hero Landing', 'হিরো ল্যান্ডিং', 'Emotional hero image + dual CTA buttons', 'All', 'High', 'Planned'],
  ['F02', '🌐 Public', 'Service Showcase', 'সার্ভিস শোকেস', '6 interactive service cards with hover detail', 'All', 'High', 'Planned'],
  ['F03', '🌐 Public', 'How It Works', 'কীভাবে কাজ করে', '3-step animated guide', 'All', 'High', 'Planned'],
  ['F04', '🌐 Public', 'Trust Badges', 'ট্রাস্ট ব্যাজ', 'Verified, 24/7, Insured, Govt Registered badges', 'All', 'High', 'Planned'],
  ['F05', '🌐 Public', 'Testimonials Slider', 'রিভিউ স্লাইডার', 'Auto-play client review slider with pause on hover', 'All', 'Medium', 'Planned'],
  ['F06', '🌐 Public', 'Pricing Table', 'প্রাইসিং টেবিল', '3-column package comparison table', 'All', 'High', 'Planned'],
  ['F07', '🌐 Public', 'Package Quiz', 'প্যাকেজ কুইজ', '"Which plan suits me?" guided 3-question quiz', 'All', 'Medium', 'Planned'],
  ['F08', '🌐 Public', 'Contact Form', 'যোগাযোগ ফর্ম', 'Name, phone, message submission form', 'All', 'Medium', 'Planned'],
  ['F09', '🌐 Public', 'Google Map Embed', 'গুগল ম্যাপ', 'Office location via Google Maps iframe', 'All', 'Low', 'Planned'],
  ['F10', '🌐 Public', 'WhatsApp Chat', 'WhatsApp চ্যাট', 'Direct WhatsApp chat button', 'All', 'High', 'Planned'],
  ['F11', '🌐 Public', 'Team Profiles', 'টিম প্রোফাইল', 'Doctor, nurse, psychologist profile grid', 'All', 'Medium', 'Planned'],

  // Auth
  ['F12', '🔐 Auth', 'OTP Login', 'OTP লগইন', 'Phone → OTP → Role selection flow', 'All', 'Critical', 'Planned'],
  ['F13', '🔐 Auth', 'Onboarding Wizard', 'অনবোর্ডিং উইজার্ড', '4-step new user guided setup', 'Customer / Caregiver', 'High', 'Planned'],
  ['F14', '🔐 Auth', 'Role Detection', 'রোল ডিটেকশন', 'Redirect to correct portal based on role', 'All', 'Critical', 'Planned'],

  // Customer
  ['F15', '👨‍👩‍👧 Customer', 'Live Order Tracking', 'লাইভ অর্ডার ট্র্যাকিং', 'In Transit → Reached → Completed timeline', 'Customer', 'High', 'Planned'],
  ['F16', '👨‍👩‍👧 Customer', 'Quick Rebook', 'কুইক রি-বুক', 'One-click re-order of previous services', 'Customer', 'Medium', 'Planned'],
  ['F17', '👨‍👩‍👧 Customer', 'NRB Time Widget', 'NRB টাইম উইজেট', 'Show Bangladesh + local timezone simultaneously', 'Customer', 'Medium', 'Planned'],
  ['F18', '👨‍👩‍👧 Customer', 'SOS Full Flow', 'SOS পুরো ফ্লো', '4-step emergency help modal with ETA', 'Customer / Public', 'Critical', 'Planned'],
  ['F19', '👨‍👩‍👧 Customer', 'Family Profiles', 'পারিবারিক প্রোফাইল', 'Separate health profiles for parents/family', 'Customer', 'High', 'Planned'],
  ['F20', '👨‍👩‍👧 Customer', 'Medical Vault', 'মেডিকেল ভল্ট', 'Folder-based secure document storage', 'Customer', 'High', 'Planned'],
  ['F21', '👨‍👩‍👧 Customer', 'Vault Share Link', 'ভল্ট শেয়ার লিংক', 'Time-limited shareable link for doctors', 'Customer', 'Medium', 'Planned'],
  ['F22', '👨‍👩‍👧 Customer', 'Booking Wizard', 'বুকিং উইজার্ড', '3-step: Service → Time/Location → Payment', 'Customer', 'Critical', 'Planned'],
  ['F23', '👨‍👩‍👧 Customer', 'Medicine Rx Upload', 'প্রেসক্রিপশন আপলোড', 'Upload prescription to order medicines', 'Customer', 'High', 'Planned'],
  ['F24', '👨‍👩‍👧 Customer', 'Telemedicine Toggle', 'টেলিমেডিসিন টগল', 'Choose in-person or online consultation', 'Customer', 'High', 'Planned'],
  ['F25', '👨‍👩‍👧 Customer', 'Companion Browse', 'সঙ্গী ব্রাউজ', 'Find companion by hobbies, language, personality', 'Customer', 'Medium', 'Planned'],
  ['F26', '👨‍👩‍👧 Customer', 'Subscription Management', 'সাবস্ক্রিপশন ম্যানেজমেন্ট', 'Pause / Cancel / Upgrade plan', 'Customer', 'High', 'Planned'],
  ['F27', '👨‍👩‍👧 Customer', 'Payment History', 'পেমেন্ট হিস্ট্রি', 'Invoice download and payment records', 'Customer', 'Medium', 'Planned'],
  ['F28', '👨‍👩‍👧 Customer', 'NRB Settings', 'NRB সেটিংস', 'Timezone selection, Family Sharing (Premium)', 'Customer', 'Medium', 'Planned'],
  ['F29', '👨‍👩‍👧 Customer', 'Rating & Review', 'রেটিং ও রিভিউ', '5-star rating popup after service completion', 'Customer', 'High', 'Planned'],

  // Caregiver
  ['F30', '🏥 Caregiver', 'Task Accept/Reject', 'টাস্ক Accept/Reject', 'New request card with accept or reject', 'Caregiver', 'Critical', 'Planned'],
  ['F31', '🏥 Caregiver', 'Duty Timer', 'ডিউটি টাইমার', 'Start → Reached → Task Completed stopwatch', 'Caregiver', 'High', 'Planned'],
  ['F32', '🏥 Caregiver', 'Report Upload', 'রিপোর্ট আপলোড', 'Camera upload to client Medical Vault', 'Caregiver', 'High', 'Planned'],
  ['F33', '🏥 Caregiver', 'Availability Calendar', 'অ্যাভেইলেবিলিটি ক্যালেন্ডার', 'Set weekly availability and service types', 'Caregiver', 'High', 'Planned'],
  ['F34', '🏥 Caregiver', 'Earnings Dashboard', 'আর্নিং ড্যাশবোর্ড', 'Monthly earnings bar chart', 'Caregiver', 'Medium', 'Planned'],
  ['F35', '🏥 Caregiver', 'Payment Request', 'পেমেন্ট রিকোয়েস্ট', 'Request payout via bKash / Nagad', 'Caregiver', 'Medium', 'Planned'],

  // Admin
  ['F36', '🛡️ Admin', 'SOS Alert Center', 'SOS অ্যালার্ট সেন্টার', 'Real-time red flash + audio alert for SOS', 'Admin', 'Critical', 'Planned'],
  ['F37', '🛡️ Admin', 'Dispatch & Map', 'ডিসপ্যাচ ও ম্যাপ', 'Assign nearest available caregiver via map', 'Admin', 'Critical', 'Planned'],
  ['F38', '🛡️ Admin', 'KYC Verification', 'KYC যাচাই', 'Review NID + selfie, Approve or Reject', 'Admin', 'High', 'Planned'],
  ['F39', '🛡️ Admin', 'User Management', 'ইউজার ম্যানেজমেন্ট', 'View, suspend, reactivate user accounts', 'Admin', 'High', 'Planned'],
  ['F40', '🛡️ Admin', 'Analytics Dashboard', 'অ্যানালিটিক্স ড্যাশবোর্ড', 'Revenue, service distribution, NRB vs local', 'Admin', 'Medium', 'Planned'],

  // Partners
  ['F41', '🤝 Partner', 'Order Management', 'অর্ডার ম্যানেজমেন্ট', 'Accept and fulfill partner orders', 'Partner', 'High', 'Planned'],
  ['F42', '🤝 Partner', 'Report Upload', 'রিপোর্ট আপলোড', 'Upload PDF/image directly to client vault', 'Partner', 'High', 'Planned'],
  ['F43', '🤝 Partner', 'Partner Onboarding', 'পার্টনার অনবোর্ডিং', 'Submit business info + trade license for approval', 'Partner / Public', 'Medium', 'Planned'],
];
addSheet(wb, '📋 Features', features);


// ═══════════════════════════════════════════════════════════
// SHEET 2 — CORE COMPONENTS
// ═══════════════════════════════════════════════════════════
const coreComponents = [
  ['Component Name', 'File Path', 'Used In Page', 'Description', 'Props / Key State'],

  // Home
  ['HeroSection', 'components/pages/home/HeroSection.tsx', 'Home (/)', 'Hero banner with image, headline, and CTA buttons', 'headline, ctaText, imageUrl'],
  ['HowItWorksSection', 'components/pages/home/HowItWorksSection.tsx', 'Home (/)', '3-step animated guide cards', 'steps[]'],
  ['ServicesGrid', 'components/pages/home/ServicesGrid.tsx', 'Home (/), Services (/services)', '6 interactive service cards', 'services[]'],
  ['TrustBadges', 'components/pages/home/TrustBadges.tsx', 'Home (/)', 'Row of trust/verification badges', 'badges[]'],
  ['TestimonialsSlider', 'components/pages/home/TestimonialsSlider.tsx', 'Home (/)', 'Auto-play testimonial slider', 'testimonials[], autoPlayInterval'],

  // Dashboard
  ['WelcomeBanner', 'components/pages/dashboard/WelcomeBanner.tsx', 'Client Dashboard', 'Personalized greeting with next booking info', 'userName, nextBooking'],
  ['ActiveBookingCard', 'components/pages/dashboard/ActiveBookingCard.tsx', 'Client Dashboard', 'Current booking status card with caregiver info', 'booking, status'],
  ['LiveTrackingTimeline', 'components/pages/dashboard/LiveTrackingTimeline.tsx', 'Client Dashboard', '4-stage animated tracking timeline', 'currentStage'],
  ['QuickRebook', 'components/pages/dashboard/QuickRebook.tsx', 'Client Dashboard', 'One-click re-order of previous services', 'pastServices[]'],
  ['NRBTimeWidget', 'components/pages/dashboard/NRBTimeWidget.tsx', 'Client Dashboard', 'Dual timezone display (BD + local)', 'localTimezone'],

  // Booking
  ['Step1ServiceSelect', 'components/pages/booking/Step1ServiceSelect.tsx', 'Booking Engine', 'Service selection cards + one-time/subscription toggle', 'onSelect, selectedService'],
  ['Step2DateTime', 'components/pages/booking/Step2DateTime.tsx', 'Booking Engine', 'Calendar picker + time slot grid + address input', 'onConfirm, familyMembers[]'],
  ['Step3Payment', 'components/pages/booking/Step3Payment.tsx', 'Booking Engine', 'Order summary + payment method selection', 'orderSummary, onPay'],

  // Medical Vault
  ['FolderView', 'components/pages/vault/FolderView.tsx', 'Medical Vault', 'Folder-based document organizer', 'folders[], selectedMember'],
  ['FileList', 'components/pages/vault/FileList.tsx', 'Medical Vault', 'List of files within a folder', 'files[], onDelete'],
  ['ShareLinkModal', 'components/pages/vault/ShareLinkModal.tsx', 'Medical Vault', 'Generate time-limited share link', 'fileId, onGenerate'],

  // Provider
  ['TaskCard', 'components/pages/provider/TaskCard.tsx', 'Provider Dashboard', 'Task request card with accept/reject', 'task, onAccept, onReject'],
  ['DutyTimer', 'components/pages/provider/DutyTimer.tsx', 'Provider Dashboard', 'Stopwatch with Start/Reached/Complete stages', 'taskId, onComplete'],
  ['ProviderReportUpload', 'components/pages/provider/ReportUpload.tsx', 'Provider Dashboard', 'Camera/file upload to client vault', 'clientId, taskId'],
  ['AvailabilityCalendar', 'components/pages/provider/AvailabilityCalendar.tsx', 'Availability Manager', 'Weekly availability toggle grid', 'schedule, onSave'],

  // Admin
  ['SOSAlertPod', 'components/pages/admin/SOSAlertPod.tsx', 'Admin Dashboard', 'Live SOS alert with red flash + audio', 'alerts[], onRespond'],
  ['DispatchMap', 'components/pages/admin/DispatchMap.tsx', 'Dispatch Page', 'Map with client + caregiver pins, assign UI', 'requests[], caregivers[]'],
  ['KYCReviewPanel', 'components/pages/admin/KYCReviewPanel.tsx', 'KYC Page', 'NID/selfie display with approve/reject', 'applicant, onApprove, onReject'],
  ['AnalyticsCharts', 'components/pages/admin/AnalyticsCharts.tsx', 'Analytics Page', 'Revenue line chart, service pie chart', 'data'],
];
addSheet(wb, '🔧 Core Components', coreComponents);


// ═══════════════════════════════════════════════════════════
// SHEET 3 — SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════
const sharedComponents = [
  ['Component Name', 'File Path', 'Category', 'Used In', 'Description', 'Key Props'],

  // Layout
  ['Navbar', 'components/shared/layout/Navbar.tsx', 'Layout', 'All Pages', 'Logo, nav links, Language Toggle, Login btn, Bell', 'role, isLoggedIn'],
  ['Footer', 'components/shared/layout/Footer.tsx', 'Layout', 'All Pages', 'Address, hotline, social icons, sitemap links', '—'],
  ['MobileBottomNav', 'components/shared/layout/MobileBottomNav.tsx', 'Layout', 'All Pages (mobile)', 'App-like bottom nav: Home/Services/Book/Profile', 'activeTab'],

  // UI
  ['SOSButton', 'components/shared/ui/SOSButton.tsx', 'UI', 'All Pages', 'Fixed floating red SOS button (bottom-right)', 'onClick'],
  ['SOSModal', 'components/shared/ui/SOSModal.tsx', 'UI', 'All Pages', '4-step full-screen emergency flow modal', 'isOpen, onClose'],
  ['AccessibilityBar', 'components/shared/ui/AccessibilityBar.tsx', 'UI', 'All Pages', 'Font size +/- and High Contrast toggle', 'fontSize, contrast, onChange'],
  ['Button', 'components/shared/ui/Button.tsx', 'UI', 'All Pages', 'Reusable button: Primary / Secondary / Danger', 'variant, onClick, disabled'],
  ['Card', 'components/shared/ui/Card.tsx', 'UI', 'All Pages', 'Base card wrapper with optional border accent', 'accent, children'],
  ['Badge', 'components/shared/ui/Badge.tsx', 'UI', 'All Pages', 'Status badge: Active / Pending / Verified / etc.', 'status, label'],
  ['Modal', 'components/shared/ui/Modal.tsx', 'UI', 'All Pages', 'Reusable modal wrapper with overlay', 'isOpen, onClose, title'],
  ['Toast', 'components/shared/ui/Toast.tsx', 'UI', 'All Pages', 'Success / Error / Info notification popup', 'type, message, duration'],
  ['Spinner', 'components/shared/ui/Spinner.tsx', 'UI', 'All Pages', 'Loading spinner indicator', 'size, color'],
  ['EmptyState', 'components/shared/ui/EmptyState.tsx', 'UI', 'Portal Pages', 'Empty page illustration + message + CTA', 'icon, message, ctaText'],
  ['StepProgressBar', 'components/shared/ui/StepProgressBar.tsx', 'UI', 'Wizards (Booking, Onboarding)', 'Multi-step progress indicator', 'steps[], currentStep'],
  ['StarRating', 'components/shared/ui/StarRating.tsx', 'UI', 'Rating, Provider Reviews', '5-star rating input or display', 'value, readOnly, onChange'],

  // Forms
  ['PhoneInput', 'components/shared/forms/PhoneInput.tsx', 'Forms', 'Login, Contact, Profile', 'Bangladesh phone format input with +88 prefix', 'value, onChange'],
  ['OTPInput', 'components/shared/forms/OTPInput.tsx', 'Forms', 'Login Page', '6-box OTP entry with auto-advance', 'value, onChange, timer'],
  ['FileUpload', 'components/shared/forms/FileUpload.tsx', 'Forms', 'Vault, Report Upload, KYC', 'Drag-drop or click file upload', 'accept, onUpload, multiple'],
  ['DateTimePicker', 'components/shared/forms/DateTimePicker.tsx', 'Forms', 'Booking Step 2', 'Calendar picker + time slot grid', 'selectedDate, slots[], onChange'],

  // Context
  ['AuthContext', 'components/shared/context/AuthContext.tsx', 'Context', 'All Pages', 'Login status, user role, token storage', 'user, role, login(), logout()'],
  ['LanguageContext', 'components/shared/context/LanguageContext.tsx', 'Context', 'All Pages', 'BN ↔ EN toggle with full text substitution', 'lang, setLang'],
  ['AccessibilityContext', 'components/shared/context/AccessibilityCtx.tsx', 'Context', 'All Pages', 'Font size level and high-contrast mode state', 'fontSize, contrast, toggle()'],
];
addSheet(wb, '🧩 Shared Components', sharedComponents);


// ═══════════════════════════════════════════════════════════
// SHEET 4 — USER JOURNEY
// ═══════════════════════════════════════════════════════════
const userJourney = [
  ['Role', 'Step #', 'Step Name', 'Page / URL', 'Action', 'Trigger / Condition', 'Next Step'],

  // Customer
  ['👨‍👩‍👧 Customer', 1, 'Discover', 'Home (/)', 'Views hero, clicks service card', 'First visit', 'Step 2'],
  ['👨‍👩‍👧 Customer', 2, 'Learn Service', '/services/[slug]', 'Reads service detail, clicks "Book Now"', 'Clicked service card', 'Step 3'],
  ['👨‍👩‍👧 Customer', 3, 'Login', '/login', 'Enters phone, receives OTP, selects "Customer"', 'Unauthenticated user books', 'Step 4 or 4b'],
  ['👨‍👩‍👧 Customer', '4 (new user)', 'Onboarding', '/onboarding', 'Fills profile, adds patient, sets emergency contact', 'First-time login', 'Step 5'],
  ['👨‍👩‍👧 Customer', '4b (returning)', 'Dashboard', '/dashboard', 'Views active booking or quick rebook', 'Returning login', 'Step 5'],
  ['👨‍👩‍👧 Customer', 5, 'Book Service', '/dashboard/book', 'Step 1: Service → Step 2: Time/Location → Step 3: Payment', 'Booking initiated', 'Step 6'],
  ['👨‍👩‍👧 Customer', 6, 'Confirmation', '/dashboard', 'Receives confirmation notification', 'Payment success', 'Step 7'],
  ['👨‍👩‍👧 Customer', 7, 'Track Live', '/dashboard', 'Watches Live Tracking Timeline update', 'Caregiver assigned', 'Step 8'],
  ['👨‍👩‍👧 Customer', 8, 'Service Done', 'Notification', 'Receives "Task Completed" notification', 'Caregiver marks complete', 'Step 9'],
  ['👨‍👩‍👧 Customer', 9, 'Rate Service', 'Rating Popup', 'Submits 5-star rating + comment', 'Post-completion prompt', 'End'],
  ['👨‍👩‍👧 Customer', 10, 'View Report', '/dashboard/vault', 'Views report uploaded by caregiver', 'Optional follow-up', 'End'],
  ['👨‍👩‍👧 Customer', 'SOS', 'Emergency', 'SOS Modal (any page)', 'Presses SOS → selects type → sees ETA + hospital', 'Emergency event', 'Admin alerted'],

  // Caregiver
  ['🏥 Caregiver', 1, 'Login', '/login', 'Phone → OTP → selects "Caregiver"', 'First or returning visit', 'Step 2'],
  ['🏥 Caregiver', 2, 'Set Availability', '/provider/availability', 'Sets weekly schedule and service types (once)', 'First login or update', 'Step 3'],
  ['🏥 Caregiver', 3, 'View Tasks', '/provider', 'Views today task cards in dashboard', 'Admin assigns a task', 'Step 4'],
  ['🏥 Caregiver', 4, 'Accept Task', '/provider', 'Clicks Accept on task card', 'New task received', 'Step 5'],
  ['🏥 Caregiver', 5, 'Start Duty', '/provider', 'Clicks "Start Duty" — timer begins', 'En route to client', 'Step 6'],
  ['🏥 Caregiver', 6, 'Reached', '/provider', 'Clicks "Reached" — client notified', 'Arrived at location', 'Step 7'],
  ['🏥 Caregiver', 7, 'Complete Task', '/provider', 'Clicks "Task Completed" → prompted to upload report', 'Service finished', 'Step 8'],
  ['🏥 Caregiver', 8, 'Upload Report', '/provider', 'Takes photo, uploads to client Medical Vault', 'After task completion', 'Step 9'],
  ['🏥 Caregiver', 9, 'View Earnings', '/provider/earnings', 'Sees updated earnings, requests payout', 'End of month or anytime', 'End'],

  // Admin
  ['🛡️ Admin', 1, 'Login', '/login', 'Admin credentials → Admin Dashboard', 'Admin access', 'Step 2'],
  ['🛡️ Admin', 2, 'Monitor', '/admin', 'Views KPIs: bookings, caregivers, revenue', 'Dashboard open', 'Ongoing'],
  ['🛡️ Admin', 3, 'SOS Alert', '/admin/emergency', 'Sees red flash alert, opens client medical history', 'Client presses SOS', 'Step 4'],
  ['🛡️ Admin', 4, 'Dispatch', '/admin/dispatch or /admin/emergency', 'Assigns caregiver via map + confirms dispatch', 'SOS or new booking', 'Step 5'],
  ['🛡️ Admin', 5, 'KYC Review', '/admin/verification', 'Reviews NID/selfie, Approves or Rejects caregiver', 'New caregiver applies', 'End'],
  ['🛡️ Admin', 6, 'User Mgmt', '/admin/users', 'Searches user, suspends or reactivates account', 'Complaint or policy violation', 'End'],

  // Partner
  ['🤝 Partner', 1, 'Register', '/partners/register', 'Submits business info + trade license', 'Wants to join platform', 'Step 2'],
  ['🤝 Partner', 2, 'Approval Wait', '/partners/register (status)', 'Sees "Pending Admin Approval" status page', 'After submission', 'Step 3'],
  ['🤝 Partner', 3, 'Login', '/login', 'Phone → OTP → selects "Partner"', 'Admin approved', 'Step 4'],
  ['🤝 Partner', 4, 'View Orders', '/partners', 'Sees pending order cards (pharmacy/diagnostic)', 'Logged in', 'Step 5'],
  ['🤝 Partner', 5, 'Accept Order', '/partners', 'Clicks Accept on order card', 'New order arrives', 'Step 6'],
  ['🤝 Partner', 6, 'Upload Report', '/partners/upload', 'Uploads PDF/image to client vault', 'Order ready/test done', 'Step 7'],
  ['🤝 Partner', 7, 'Mark Fulfilled', '/partners', 'Confirms order completion', 'After upload', 'End'],
];
addSheet(wb, '🗺️ User Journey', userJourney);


// ═══════════════════════════════════════════════════════════
// SHEET 5 — RBAC
// ═══════════════════════════════════════════════════════════
const rbac = [
  ['Feature / Page', 'URL', '🌐 Public', '👨‍👩‍👧 Customer', '🏥 Caregiver', '🛡️ Admin', '🤝 Partner', 'Notes'],

  // Public
  ['Home Page', '/', 'READ', 'READ', 'READ', 'READ', 'READ', ''],
  ['About Us', '/about', 'READ', 'READ', 'READ', 'READ', 'READ', ''],
  ['Services Overview', '/services', 'READ', 'READ', 'READ', 'READ', 'READ', ''],
  ['Service Detail (×6)', '/services/[slug]', 'READ', 'READ', 'READ', 'READ', 'READ', ''],
  ['Pricing', '/pricing', 'READ', 'READ', 'READ', 'READ', 'READ', ''],
  ['Contact', '/contact', 'READ + WRITE', 'READ + WRITE', 'READ', 'READ', 'READ', 'WRITE = submit contact form'],

  // Auth
  ['Login / Register', '/login', 'WRITE', '—', '—', '—', '—', 'Anyone can login/register'],
  ['Onboarding Wizard', '/onboarding', '—', 'WRITE', 'WRITE', '—', '—', 'First-time login only'],

  // Customer Portal
  ['Client Dashboard', '/dashboard', '—', 'READ', '—', '—', '—', ''],
  ['SOS Button (trigger)', 'All pages (modal)', 'WRITE', 'WRITE', '—', '—', '—', 'Triggers emergency alert'],
  ['Patient Profile', '/dashboard/profile', '—', 'READ + WRITE', '—', '—', '—', ''],
  ['Medical Vault (view/upload)', '/dashboard/vault', '—', 'READ + WRITE', '—', '—', '—', ''],
  ['Medical Vault (upload only)', '/dashboard/vault', '—', '—', 'WRITE', '—', 'WRITE', 'Caregivers and partners upload only'],
  ['Booking Wizard', '/dashboard/book', '—', 'WRITE', '—', '—', '—', ''],
  ['Subscription Management', '/dashboard/subscription', '—', 'READ + WRITE', '—', '—', '—', ''],
  ['Live Order Tracking', '/dashboard', '—', 'READ', '—', '—', '—', ''],
  ['Notifications', '/dashboard/notifications', '—', 'READ', '—', '—', '—', ''],
  ['Payment History', '/dashboard/payments', '—', 'READ', '—', '—', '—', ''],
  ['Rate Caregiver', 'Rating Modal', '—', 'WRITE', '—', '—', '—', 'Post-service only'],
  ['NRB Settings', '/dashboard/profile', '—', 'READ + WRITE', '—', '—', '—', 'Premium plan only for Family Sharing'],

  // Caregiver Portal
  ['Provider Dashboard', '/provider', '—', '—', 'READ + WRITE', '—', '—', ''],
  ['Accept/Reject Task', '/provider', '—', '—', 'WRITE', '—', '—', ''],
  ['Duty Timer', '/provider', '—', '—', 'WRITE', '—', '—', ''],
  ['Report Upload to Vault', '/provider', '—', '—', 'WRITE', '—', '—', 'Uploads to client vault'],
  ['Availability Calendar', '/provider/availability', '—', '—', 'READ + WRITE', '—', '—', ''],
  ['Earnings Dashboard', '/provider/earnings', '—', '—', 'READ', '—', '—', ''],
  ['Payment Request', '/provider/earnings', '—', '—', 'WRITE', '—', '—', ''],
  ['Received Reviews', '/provider/reviews', '—', '—', 'READ', '—', '—', ''],

  // Admin Panel
  ['Admin Dashboard', '/admin', '—', '—', '—', 'READ', '—', ''],
  ['SOS Alert Center', '/admin/emergency', '—', '—', '—', 'READ + WRITE', '—', 'WRITE = dispatch response'],
  ['Dispatch & Matching', '/admin/dispatch', '—', '—', '—', 'READ + WRITE', '—', ''],
  ['KYC Verification', '/admin/verification', '—', '—', '—', 'READ + WRITE', '—', ''],
  ['User Management', '/admin/users', '—', '—', '—', 'READ + WRITE', '—', 'Can suspend/reactivate all roles'],
  ['Analytics', '/admin/analytics', '—', '—', '—', 'READ', '—', ''],

  // Partners
  ['Partners Dashboard', '/partners', '—', '—', '—', '—', 'READ + WRITE', ''],
  ['Report Upload to Vault', '/partners/upload', '—', '—', '—', '—', 'WRITE', ''],
  ['Partner Onboarding', '/partners/register', 'WRITE', '—', '—', '—', 'WRITE', 'Anyone can apply to be a partner'],
];
addSheet(wb, '🔐 RBAC', rbac);


// ═══════════════════════════════════════════════════════════
// SHEET 6 — PAGES SUMMARY
// ═══════════════════════════════════════════════════════════
const pages = [
  ['Page #', 'Zone', 'Page Name (EN)', 'Page Name (BN)', 'URL', 'Access Role(s)', 'Priority'],
  [1, '🌐 Public', 'Home Page', 'হোম পেজ', '/', 'All', 'Critical'],
  [2, '🌐 Public', 'About Us', 'আমাদের সম্পর্কে', '/about', 'All', 'High'],
  [3, '🌐 Public', 'Services Overview', 'সার্ভিস তালিকা', '/services', 'All', 'High'],
  [4, '🌐 Public', 'Service: Diagnostic', 'ডায়াগনস্টিক সেবা', '/services/diagnostic', 'All', 'High'],
  [5, '🌐 Public', 'Service: Doctor', 'চিকিৎসক সেবা', '/services/doctor', 'All', 'High'],
  [6, '🌐 Public', 'Service: Medicine', 'ঔষধ সেবা', '/services/medicine', 'All', 'High'],
  [7, '🌐 Public', 'Service: Emergency', 'জরুরি সেবা', '/services/emergency', 'All', 'Critical'],
  [8, '🌐 Public', 'Service: Daily Needs', 'দৈনন্দিন সেবা', '/services/daily', 'All', 'High'],
  [9, '🌐 Public', 'Service: Companion', 'মানসিক সঙ্গ', '/services/companion', 'All', 'High'],
  [10, '🌐 Public', 'Pricing & Packages', 'প্যাকেজ ও মূল্য', '/pricing', 'All', 'High'],
  [11, '🌐 Public', 'Contact & Helpdesk', 'যোগাযোগ', '/contact', 'All', 'High'],
  [12, '🔐 Auth', 'Login / Register', 'লগইন/রেজিস্ট্রেশন', '/login', 'All', 'Critical'],
  [13, '🔐 Auth', 'Onboarding Wizard', 'অনবোর্ডিং উইজার্ড', '/onboarding', 'Customer / Caregiver', 'High'],
  [14, '👨‍👩‍👧 Customer', 'Client Dashboard', 'ক্লায়েন্ট ড্যাশবোর্ড', '/dashboard', 'Customer', 'Critical'],
  [15, '👨‍👩‍👧 Customer', 'SOS Flow Modal', 'SOS ফ্লো', 'All pages (modal)', 'Public / Customer', 'Critical'],
  [16, '👨‍👩‍👧 Customer', 'Patient Profile', 'রোগীর প্রোফাইল', '/dashboard/profile', 'Customer', 'High'],
  [17, '👨‍👩‍👧 Customer', 'Medical Vault', 'মেডিকেল ভল্ট', '/dashboard/vault', 'Customer', 'High'],
  [18, '👨‍👩‍👧 Customer', 'Booking Engine', 'বুকিং উইজার্ড', '/dashboard/book', 'Customer', 'Critical'],
  [19, '👨‍👩‍👧 Customer', 'Subscription Mgmt', 'সাবস্ক্রিপশন', '/dashboard/subscription', 'Customer', 'High'],
  [20, '👨‍👩‍👧 Customer', 'Notifications', 'নোটিফিকেশন', '/dashboard/notifications', 'Customer', 'Medium'],
  [21, '👨‍👩‍👧 Customer', 'Payment History', 'পেমেন্ট হিস্ট্রি', '/dashboard/payments', 'Customer', 'Medium'],
  [22, '🏥 Caregiver', 'Provider Dashboard', 'প্রোভাইডার ড্যাশবোর্ড', '/provider', 'Caregiver', 'Critical'],
  [23, '🏥 Caregiver', 'Availability Manager', 'অ্যাভেইলেবিলিটি', '/provider/availability', 'Caregiver', 'High'],
  [24, '🏥 Caregiver', 'Provider Profile', 'প্রোভাইডার প্রোফাইল', '/provider/profile', 'Caregiver', 'High'],
  [25, '🏥 Caregiver', 'Earnings', 'আর্নিং', '/provider/earnings', 'Caregiver', 'Medium'],
  [26, '🏥 Caregiver', 'Reviews Received', 'রিভিউ', '/provider/reviews', 'Caregiver', 'Medium'],
  [27, '🛡️ Admin', 'Admin Dashboard', 'অ্যাডমিন ড্যাশবোর্ড', '/admin', 'Admin', 'Critical'],
  [28, '🛡️ Admin', 'Emergency Alert Center', 'জরুরি অ্যালার্ট', '/admin/emergency', 'Admin', 'Critical'],
  [29, '🛡️ Admin', 'Dispatch & Matching', 'ডিসপ্যাচ', '/admin/dispatch', 'Admin', 'Critical'],
  [30, '🛡️ Admin', 'KYC Verification', 'KYC যাচাই', '/admin/verification', 'Admin', 'High'],
  [31, '🛡️ Admin', 'User Management', 'ইউজার ম্যানেজমেন্ট', '/admin/users', 'Admin', 'High'],
  [32, '🛡️ Admin', 'Analytics', 'অ্যানালিটিক্স', '/admin/analytics', 'Admin', 'Medium'],
  [33, '🤝 Partner', 'Partners Dashboard', 'পার্টনার ড্যাশবোর্ড', '/partners', 'Partner', 'High'],
  [34, '🤝 Partner', 'Report Upload', 'রিপোর্ট আপলোড', '/partners/upload', 'Partner', 'High'],
  [35, '🤝 Partner', 'Partner Onboarding', 'পার্টনার অনবোর্ডিং', '/partners/register', 'Public / Partner', 'Medium'],
];
addSheet(wb, '📄 Pages (35)', pages);


// ─── WRITE FILE ─────────────────────────────────────────────
const outputPath = 'C:\\Users\\Bioxin\\.gemini\\antigravity\\brain\\a8f33308-a660-4620-9a85-9fc6878f6c67\\NirvaarCare_Documentation.xlsx';
XLSX.writeFile(wb, outputPath);
console.log('✅ Excel file created at:', outputPath);
console.log('Sheets: Features (43), Core Components (24), Shared Components (23), User Journey (41 rows), RBAC (38), Pages (35)');

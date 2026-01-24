# KitStruck

### Project Overview
**KitStruck** is an e-commerce platform where users can browse and purchase authentic jerseys of their favorite teams. They can buy their favorite jerseys via Cash on Delivery (COD) or Stripe, enjoying a secure payment system and a smooth, seamless shopping experience.

---

### Key Features
**User Features**
- 🛒 Browse jerseys and purchase with Cash on Delivery (COD) or Stripe.
- ⭐ Give reviews for purchased jerseys.
- 💬 Submit issues or support requests to admins.
- 📊 View all orders in a clean, intuitive dashboard.

**Admin Features**
- 📈 View overall stats: total jerseys, users, earned revenue, reviews and recent user activity.
- 📊 Access graph-based analytics for performance tracking.
- ✅ Manage orders: update delivery status and process user requests.
- 🎽 Manage jerseys: add, update or remove products easily.
- 🛠 Monitor user activity and reviews to maintain quality and engagement.

---

### Tech Stack & Dependencies
- **Next.js 16** – Fast and SEO-friendly React framework
- **React 19** – Scalable frontend for dynamic UI
- **Tailwind CSS 4 & DaisyUI** – Utility-first styling for responsive and modern design
- **React Query 5** – Efficient server-state management and caching
- **NextAuth** – Secure authentication with role-based access
- **Stripe JS & React Stripe JS** – Seamless online payment integration
- **Axios** – Simplified HTTP requests
- **Framer Motion & Motion** – Smooth page transitions and animations
- **SweetAlert2** – Elegant confirmation popups for actions like order updates
- **React Icons & Lottie React** – Iconography and high-quality animations
- **Recharts** – Interactive graphs for admin stats
- **React Fast Marquee** – Smooth scrolling banners or promotions
- **Swiper & React Slick** – Carousel sliders for featured jerseys
- **bcryptjs & jsonwebtoken** – Secure password hashing and JWT-based authentication

---

### How to run locally

1. **Clone the repository & install dependencies**
```bash
git clone https://github.com/tahmid-khan-hub/KitStruck.git
cd kit-struck

npm install
npm run dev
```

2. **Set up project**
**Environment Variables**
Create `.env.local` and set the keys
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_BASE_URL=
GOOGLE_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
NEXTAUTH_SECRET=
DATABASE_URL=
```

---

### Future improvements
1. **Order Tracking System**
- Allow users to track order status in real time (Processing → Shipped → Out for Delivery → Delivered) with timeline updates.

2. **Map Integration for Delivery Address**
- Integrate Google Maps / Mapbox during checkout so users can pin their exact delivery location for more accurate shipping.

3. **Real-Time Customer Support Chat**
- Replace the current request-based support system with a real-time chat experience.

---

### Folder Structure
```bash
├── public/
    ├── logo.png
    ├── banner2.jpg
    ├── default.png
    ├── banner1.jpeg
    ├── banner3.avif
    ├── forbidden.png
    ├── Navbar-logo.png
    ├── default_user.jpg
    └── Sign In image.png
├── postcss.config.mjs
├── app/
    ├── hooks/
    │   ├── isValidUrl.ts
    │   ├── useAxiosSecure.ts
    │   ├── Logo.tsx
    │   ├── NavLink.tsx
    │   ├── ActiveLink.tsx
    │   ├── Menu.tsx
    │   ├── AnimateOnView.tsx
    │   └── UseSweetAlert.tsx
    ├── api/
    │   ├── auth/
    │   │   └── [...nextauth]/
    │   │   │   └── route.ts
    │   ├── kitsTruck/
    │   │   ├── topSelling/
    │   │   │   └── route.ts
    │   │   ├── retro/
    │   │   │   └── route.ts
    │   │   └── newArrivals/
    │   │   │   └── route.ts
    │   ├── admin/
    │   │   ├── add-jersey/
    │   │   │   └── route.ts
    │   │   ├── recent/
    │   │   │   └── users/
    │   │   │   │   └── route.ts
    │   │   ├── manage-orders/
    │   │   │   ├── [order_id]/
    │   │   │   │   └── route.ts
    │   │   │   └── route.ts
    │   │   ├── stats/
    │   │   │   └── route.ts
    │   │   ├── support/
    │   │   │   └── route.ts
    │   │   └── allJersey/
    │   │   │   ├── route.ts
    │   │   │   └── jersey-form/
    │   │   │       └── route.ts
    │   ├── jersey-details/
    │   │   └── [id]/
    │   │   │   └── route.ts
    │   ├── user/
    │   │   ├── myOrders/
    │   │   │   ├── lastOrders/
    │   │   │   │   └── route.ts
    │   │   │   └── route.ts
    │   │   ├── user-stats/
    │   │   │   └── route.ts
    │   │   ├── support/
    │   │   │   └── route.ts
    │   │   └── review/
    │   │   │   └── route.ts
    │   ├── cart/
    │   │   ├── sync-merge/
    │   │   │   └── route.ts
    │   │   ├── route.ts
    │   │   └── sync/
    │   │   │   └── route.ts
    │   ├── jerseys/
    │   │   └── route.ts
    │   ├── orders/
    │   │   └── create-draft/
    │   │   │   └── route.ts
    │   └── payment/
    │   │   ├── payment-intent/
    │   │       └── route.ts
    │   │   └── save-payment/
    │   │       └── route.ts
    ├── providers.tsx
    ├── components/
    │   ├── Banner/
    │   │   ├── BannerWrapper.tsx
    │   │   └── Banner.tsx
    │   ├── LayoutVisibility/
    │   │   └── LayoutVisibility.tsx
    │   ├── CartSync/
    │   │   └── CartSync.tsx
    │   ├── Review/
    │   │   ├── ReviewCard.tsx
    │   │   └── Review.tsx
    │   ├── Footer/
    │   │   └── Footer.tsx
    │   ├── WhyChooseUs/
    │   │   └── WhyChooseUs.tsx
    │   └── NewArrivals/
    │   │   └── NewArrivals.tsx
    ├── dashboard/
    │   ├── components/
    │   │   ├── OrdersTable/
    │   │   │   ├── OrdersSkeleton.tsx
    │   │   │   ├── OrdersTable.tsx
    │   │   │   └── OrderRow.tsx
    │   │   ├── DashboardSidebar/
    │   │   │   └── SidebarAnimation.ts
    │   │   ├── DashboardTablesPagination/
    │   │   │   └── DashboardTablesPagination.tsx
    │   │   ├── CategoryDrawer/
    │   │   │   └── CategoryDrawer.tsx
    │   │   └── DashboardNavbar/
    │   │   │   └── DashboardNavbar.tsx
    │   ├── admin/
    │   │   ├── addJersey/
    │   │   │   ├── page.tsx
    │   │   │   └── components/
    │   │   │   │   ├── FormFields.tsx
    │   │   │   │   └── AddJerseyForm.tsx
    │   │   ├── allJersey/
    │   │   │   ├── components/
    │   │   │   │   ├── JerseysTableSkeleton.tsx
    │   │   │   │   ├── JerseysTable.tsx
    │   │   │   │   └── JerseysTableRow.tsx
    │   │   │   ├── jersey-form/
    │   │   │   │   ├── page.tsx
    │   │   │   │   └── components/
    │   │   │   │   │   ├── JerseyFormClient.tsx
    │   │   │   │   │   ├── JerseyFormSkeleton.tsx
    │   │   │   │   │   └── JerseyForm.tsx
    │   │   │   └── page.tsx
    │   │   ├── supportAndIssues/
    │   │   │   ├── components/
    │   │   │   │   ├── AllSupportAndIssuesLottie.tsx
    │   │   │   │   ├── AllSupportAndIssuesSkeleton.tsx
    │   │   │   │   └── AllSupportAndIssues.tsx
    │   │   │   └── page.tsx
    │   │   ├── adminProfile/
    │   │   │   ├── RecentData/
    │   │   │   │   ├── RecentDataSkeleton.tsx
    │   │   │   │   └── RecentData.tsx
    │   │   │   ├── StatsCards/
    │   │   │   │   ├── StatsSkeleton.tsx
    │   │   │   │   └── StatsCards.tsx
    │   │   │   └── DashboardGraph/
    │   │   │   │   ├── DashboardGraphSkeleton.tsx
    │   │   │   │   └── DashboardGraph.tsx
    │   │   ├── page.tsx
    │   │   └── manageOrders/
    │   │   │   └── page.tsx
    │   ├── user/
    │   │   ├── reviewPage/
    │   │   │   ├── page.tsx
    │   │   │   └── components/
    │   │   │   │   └── ReviewForm.tsx
    │   │   ├── UserDashboardContent/
    │   │   │   ├── LastOrders/
    │   │   │   │   ├── LastOrdersSkeleton.tsx
    │   │   │   │   ├── LastOrdersEmpty.tsx
    │   │   │   │   └── LastOrders.tsx
    │   │   │   ├── UserStats/
    │   │   │   │   ├── UserStatsSkeleton.tsx
    │   │   │   │   └── UserStats.tsx
    │   │   │   └── UserDashboardContent.tsx
    │   │   ├── page.tsx
    │   │   ├── supportPage/
    │   │   │   ├── components/
    │   │   │   │   ├── SupportPageHistoryEmpty.tsx
    │   │   │   │   ├── SupportPageHistorySkeleton.tsx
    │   │   │   │   ├── SupportPageDropDown.tsx
    │   │   │   │   └── SupportPageForm.tsx
    │   │   │   └── page.tsx
    │   │   └── myOrders/
    │   │   │   └── page.tsx
    │   ├── page.tsx
    │   └── layout.tsx
    ├── jerseyDetailsModals/
    │   ├── JerseyTotalPrice.tsx
    │   ├── JerseyPurchasePaymentMethod.tsx
    │   ├── JerseySizeSelector.tsx
    │   ├── JerseyLoginModal.tsx
    │   └── JerseyPurchaseLocation.tsx
    ├── sign-in/
    │   ├── page.tsx
    │   └── components/
    │   │   ├── SignInFormSkeleton.tsx
    │   │   ├── SignInPageClient.tsx
    │   │   └── SignInForm.tsx
    ├── sign-up/
    │   ├── page.tsx
    │   └── components/
    |   |   ├── SignUpForm.tsx
    │   │   ├── SignUpFormSkeleton.tsx
    │   │   └── SignUpPageClient.tsx
    ├── payment/
    │   ├── page.tsx
    │   ├── PaymentPageClient.tsx
    │   └── CheckoutForm.tsx
    ├── SkeletonLoading/
    │   ├── CardSkeleton.tsx
    │   ├── PaymentSkeleton.tsx
    │   ├── JerseyCardSkeleton.tsx
    │   ├── ReviewCardSkeleton.tsx
    │   └── JerseyDetailsSkeleton.tsx
    ├── jersey-details/
    │   └── [id]/
    │   │   ├── components/
    │   │       └── JerseyDetails/
    │   │       │   ├── JerseyDetailsLottie.tsx
    │   │       │   ├── JerseyDetails.tsx
    │   │       │   ├── JerseyDetailsButtons.tsx
    │   │       │   └── JerseyDetailsContainer.tsx
    │   │   └── page.tsx
    ├── QueryProvider.tsx
    ├── jerseys/
    │   ├── components/
    │   │   ├── JerseyLottie.tsx
    │   │   ├── JerseyPagination.tsx
    |   |   ├── JerseysContainer.tsx
    │   │   └── dropDown.tsx
    │   └── page.tsx
    ├── page.tsx
    ├── not-found.tsx
    ├── cart/
    │   └── components/
    │   │   ├── EmptyCartLottie.tsx
    │   │   ├── CartSkeleton.tsx
    │   │   └── CartList.tsx
    ├── actions/
    │   └── auth/
    │   │   ├── signInUsers.ts
    │   │   └── signUpUsers.ts
    ├── forbidden/
    │   └── page.tsx
    ├── layout.tsx
    ├── globals.css
    └── about/
    │   └── page.tsx
├── types/
    ├── db.ts
    ├── review.ts
    ├── PaginatedSupportIssues.ts
    ├── SupportIssue.ts
    ├── jerseyPayload.ts
    ├── PaymentRow.ts
    ├── orders.ts
    ├── jersey.ts
    ├── next-auth.d.ts
    └── ordersType.ts
├── lib/
    ├── mysql.ts
    ├── postgresql.ts
    └── authOptions.ts
├── next.config.ts
├── eslint.config.mjs
├── .gitignore
├── tsconfig.json
├── middleware.ts
├── README.md
└── package.json
```

---

### 🔗 Live Link
- 🌐 [Live Site](https://kit-struck.vercel.app)

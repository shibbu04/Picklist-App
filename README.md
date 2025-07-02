# 📦 Warehouse Picklist App

<div align="center">

![Warehouse Picklist](https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

**A modern, full-stack warehouse management system for efficient order picking and inventory tracking**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-🚀%20View%20App-brightgreen?style=for-the-badge)](https://picklist-warehouse.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-⭐%20Star%20Repo-blue?style=for-the-badge&logo=github)](https://github.com/shibbu04/Picklist-App)

</div>

---

## 🌟 **Overview**

The Warehouse Picklist App is a comprehensive solution designed to streamline warehouse operations, optimize picking workflows, and maintain accurate inventory tracking. Built with modern technologies and a mobile-first approach, it empowers warehouse workers with an intuitive interface for efficient order processing.

### 🎯 **Key Benefits**
- **Increased Efficiency**: Streamlined picking workflows reduce processing time
- **Real-time Tracking**: Live updates on order status and inventory changes
- **Mobile Optimized**: Perfect for warehouse workers using handheld devices
- **Audit Trail**: Complete tracking of all warehouse activities
- **Error Reduction**: Built-in validation and alternative location suggestions

---

## 🚀 **Live Demo**

🔗 **[View Live Application](https://picklist-warehouse.vercel.app/)**

### Demo Credentials
```
Username: picker1
Password: password
```

*Additional test accounts: picker2, supervisor (same password)*

---

## 🛠️ **Tech Stack**

### **Frontend**
- ⚛️ **React 18** with TypeScript
- 🎨 **Tailwind CSS** with custom design system
- 🧭 **React Router** for navigation
- 📡 **Axios** for API communication
- 🎉 **React Hot Toast** for notifications
- 🎯 **Lucide React** for icons

### **Backend**
- 🟢 **Node.js** with Express.js
- 🍃 **MongoDB** with Mongoose ODM
- 🔐 **JWT Authentication**
- 🛡️ **bcryptjs** for password hashing
- 🌐 **CORS** enabled

### **Development Tools**
- ⚡ **Vite** for fast development
- 📝 **TypeScript** for type safety
- 🎨 **PostCSS** with Autoprefixer
- 🔧 **ESLint** for code quality

---

## 📥 **Installation & Setup**

### **Prerequisites**
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Git

### **Quick Start**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/Picklist-App.git
   cd Picklist-App
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

3. **Environment Setup**
   
   **Backend Configuration:**
   ```bash
   cd backend
   npm install
   npm start
   cp .env.example .env
   ```
   
   Edit `backend/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/warehouse-picklist
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

   **Frontend Configuration:**
   ```bash
   cd frontend
   cp .env.example .env
   ```
   
   Edit `frontend/.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_APP_NAME=Warehouse Picklist
   VITE_APP_VERSION=1.0.0
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas cloud connection
   ```

5. **Run the Application**
   ```bash
   # Start frontend
   npm run dev

    # Start Backend
   npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api
   - Health Check: http://localhost:5000/api/health

---

## ✨ **Features**

### 🔐 **Authentication System**
- Secure JWT-based authentication
- Role-based access control (Picker, Supervisor, Admin)
- Session management with automatic token refresh

### 📊 **Dashboard & Analytics**
- Real-time order statistics
- Progress tracking with visual indicators
- Order filtering by status and priority
- Performance metrics

### 📋 **Order Management**
- Dynamic order assignment
- Priority-based sorting
- Real-time status updates
- Bulk operations support

### 📦 **Picking Workflow**
- Optimized picking routes
- Item location mapping
- Alternative location suggestions
- Barcode scanning ready

### 🔄 **Inventory Management**
- Cycle count triggers
- Stock level monitoring
- Location-based tracking
- Inventory discrepancy reporting

### 📈 **Audit & Reporting**
- Complete activity logging
- User action tracking
- Performance analytics
- Export capabilities

### 📱 **Mobile Experience**
- Responsive design for all devices
- Touch-friendly interface
- Offline capability (coming soon)
- PWA support (coming soon)

---

## 🏗️ **Project Structure**

```
warehouse-picklist-app/
├── 📁 backend/
│   ├── 📁 middleware/          # Authentication & validation
│   ├── 📁 models/              # MongoDB schemas
│   ├── 📁 routes/              # API endpoints
│   ├── 📁 utils/               # Helper functions
│   ├── 📄 server.js            # Express server
│   └── 📄 .env.example         # Environment template
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/      # Reusable UI components
│   │   ├── 📁 contexts/        # React contexts
│   │   ├── 📁 pages/           # Application pages
│   │   ├── 📁 services/        # API services
│   │   └── 📄 main.tsx         # Application entry
│   ├── 📄 vite.config.ts       # Vite configuration
│   └── 📄 .env.example         # Environment template
├── 📄 package.json             # Root dependencies
└── 📄 README.md                # This file
```

---

## 🚀 **Deployment**

### **Production Environment Variables**

**Backend (.env):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/warehouse-picklist
JWT_SECRET=your-production-secret-key-very-long-and-secure
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

**Frontend (.env):**
```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_APP_NAME=Warehouse Picklist
VITE_APP_VERSION=1.0.0
```

### **Build for Production**
```bash
# Build frontend
cd frontend && npm run build

# Start production server
cd backend && npm start
```

---

## 👨‍💻 **Developer**

<div align="center">

### **Created with ❤️ by Shivam Singh**

[![Portfolio](https://img.shields.io/badge/Portfolio-🌐%20Visit-blue?style=for-the-badge)](https://shivam04.tech/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-💼%20Connect-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/shivamsingh57680/)
[![GitHub](https://img.shields.io/badge/GitHub-👨‍💻%20Follow-black?style=for-the-badge&logo=github)](https://github.com/shibbu04/)
[![Email](https://img.shields.io/badge/Email-📧%20Contact-red?style=for-the-badge&logo=gmail)](mailto:shivamsingh57680@gmail.com)

</div>

---

<div align="center">

**Built for the future of warehouse management** 📦✨

</div>

---
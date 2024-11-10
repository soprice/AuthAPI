const mongoose = require('mongoose');

// สร้าง Schema สำหรับผลิตภัณฑ์
const productSchema = new mongoose.Schema({
    invoiceID: { type: String, required: true },  // Invoice ID
    branch: { type: String, required: true },     // Branch
    city: { type: String, required: true },       // City
    customerType: { type: String, required: true }, // Customer type
    gender: { type: String, required: true },     // Gender
    productLine: { type: String, required: true }, // Product line
    unitPrice: { type: Number, required: true },  // Unit price
    quantity: { type: Number, required: true },   // Quantity
    tax5: { type: Number, required: true },       // Tax 5%
    total: { type: Number, required: true },      // Total
    date: { type: String, required: true },       // Date (อาจใช้ Date type แทน String)
    time: { type: String, required: true },       // Time
    payment: { type: String, required: true },    // Payment
    cogs: { type: Number, required: true },       // cogs
    grossMarginPercentage: { type: Number, required: true }, // gross margin percentage
    grossIncome: { type: Number, required: true },  // gross income
    rating: { type: Number, required: true },      // Rating
}, { collection: 'supermarket-sale' }); // กำหนดชื่อ collection เป็น supermarket-sale

// สร้าง model จาก schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

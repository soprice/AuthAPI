const User = require('../models/userModel');

// ฟังก์ชันเพื่อดึงข้อมูลของผู้ใช้ทั้งหมด ( admin only)
const getUsers = async (req, res) => {
    try {
        // ตรวจสอบ role
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
        }

        // ดึงข้อมูลผู้ใช้ทั้งหมด
        const users = await User.find().select('-password');  // ไม่แสดง password
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// ดึงข้อมูลผู้ใช้โดยใช้ ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        // ค้นหา user จาก ID
        const user = await User.findById(userId).select('-password'); // ไม่แสดง password

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// รอัพเดตข้อมูล user
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // recheck login
        if (req.user.userId !== userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: You can only update your own information' });
        }

        // update ข้อมูล user
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// ลบ user - admin use
const deleteUser = async (req, res) => {
    try {
        
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Only admin can delete users' });
        }

        const userId = req.params.id;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// เปลี่ยนรหัสผ่าน
const changePassword = async (req, res) => {
    try {
        const userId = req.params.id;
        const { oldPassword, newPassword } = req.body;

        if (req.user.userId !== userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: You can only change your own password' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // ตรวจสอบรหัสผ่านเดิม
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect old password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // อัพเดตรหัสผ่าน
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    changePassword
};

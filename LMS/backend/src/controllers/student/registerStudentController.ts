import { Request, Response } from "express";
import User from "../../repository/user/userAuth";
import bcrypt from "bcryptjs";
import {Role} from "../../models/user/userModel";
import teacherAuth from "../../repository/teacher/teacherAuth";

// ===== REGISTER =====
export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, tenant_id } = req.body;
    console.log(tenant_id);

    // 1. required fields
    if (!name || !email || !password || !phone || !tenant_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. name length
    if (name.trim().length < 2) {
      return res
        .status(400)
        .json({ message: "Name must be at least 2 characters" });
    }

    // 3. email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // 4. password length
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    // 5. password strength: uppercase + lowercase + number
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain an uppercase letter, a lowercase letter, and a number",
      });
    }

    // 6. duplicate email (case-insensitive)
    const existingUser = await User.findByEmail({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    // 7. check if the role is valid
    const role = Role.student;

    // 9. hash password (12 rounds)
    const hashedPassword = await bcrypt.hash(password, 12);

    
    const newuser = {
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name.trim(),
        phone,
        role,
        tenant_id: tenant_id,
        created_at: new Date(),
    };
    // 9. create user
    const user = await teacherAuth.create(newuser);

    const { password: _, ...userWithoutPassword } = user.toObject();



    return res.status(201).json({
      message: "Register successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};


import { Request, Response } from "express";
import User from "../../repository/user/userAuth";
import studentAuth from "../../repository/student/studentAuth";
import enrollRepo from "../../repository/student/enrollmentRepository"
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import {Role} from "../../models/user/userModel";

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
        created_at: new Date(),
    };
    // 9. create user
    const user = await studentAuth.create(newuser);
    // 10. create enrollment

    const newenrollment = {
        tenant_id: tenant_id,
        studentId: user._id
    }

    const enroll =await enrollRepo.create(newenrollment);

    const { password: _, ...userWithoutPassword } = user.toObject();



    return res.status(201).json({
      message: "Register successful",
      user: userWithoutPassword,
      enroll: enroll,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};


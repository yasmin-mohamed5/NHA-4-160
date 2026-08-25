import { Request, Response } from "express";
import  User  from "../../repository/user/userAuth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// ===== LOGIN =====
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password} = req.body;

    // 1. required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // 3. find user
    const user = await User.findByEmail({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 4. compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 5. sign token 
    const expiresIn = "1d";
    const token = jwt.sign(
      { id: user._id, email: user.email , role: user.role},
      process.env.JWT_SECRET as string,
      { expiresIn },
    );

    console.log(token);

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Login successful",
      token, // still return it for compatibility if needed
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// ===== LOGOUT =====
export const logout = (_req: Request, res: Response) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
};
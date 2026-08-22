// import { supabase } from "../config/supabase";

const API_URL = "http://localhost:3000/api/auth";

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const getCurrentUser = async () => {
  const response = await fetch(`${API_URL}/profile`, {
    method: "GET",

    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get current user");
  }

  return data.user;
};

export const logoutUser = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",

    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Logout failed");
  }

  return data;
};

// export const registerTeacher = async (formData: {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
//   age: number;
//   role: string;
//   academyName: string;
//   planId: string;
// }) => {
//   const response = await fetch(`${API_URL}/register/teacher`, {
//     method: "POST",

//     headers: {
//       "Content-Type": "application/json",
//     },

//     credentials: "include",

//     body: JSON.stringify(formData),
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Teacher registration failed");
//   }

//   return data;
// };
export const registerTeacher = async (formData) => {
  const { name, email, password, phone, academyName, planId } = formData;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name: name },
    },
  });

  if (authError) throw authError;

  const userId = authData.user.id;
  const tenantId = academyName.toLowerCase().replace(/\s+/g, "-");

  const { error: tenantError } = await supabase.from("tenants").insert([
    {
      id: tenantId,
      academy_name: academyName,
      plan_id: planId,
    },
  ]);

  if (tenantError) throw tenantError;

  const { error: userError } = await supabase.from("users").insert([
    {
      id: userId,
      name: name,
      email: email,
      phone: phone,
      role: "admin",
      tenant_id: tenantId,
    },
  ]);

  if (userError) throw userError;

  const { error: updateTenantError } = await supabase
    .from("tenants")
    .update({ admin_uid: userId })
    .eq("id", tenantId);

  if (updateTenantError) throw updateTenantError;

  return { success: true, tenantId };
};

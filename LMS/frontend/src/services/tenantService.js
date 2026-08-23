// import { supabase } from "../config/supabase";
const API_URL = "http://localhost:3000/api";

export const getAcademyWithCourses = async (tenantId) => {
  const { data, error } = await supabase
    .from("tenants")
    .select(
      `
      *,
      courses(*)
    `,
    )
    .eq("id", tenantId)
    .single();

  if (error) throw error;
  return data;
};

// done in repo
export const getAcademyDetails = async (tenantId) => {
  const response = await fetch(
    `${API_URL}/teacher/enrolledStydents/${tenantId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch academy details");
  }

  return data;
};

export const getTenantById = async (tenantId) => {
  const response = await fetch(
    `${API_URL}/teacher/academyDetails/${tenantId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch academy details");
  }

  return data;
};

export const createTenant = async ({ id, academy_name, admin_uid, planId }) => {
  const { data, error } = await supabase
    .from("tenants")
    .insert([
      {
        id,
        academy_name,
        admin_uid,
        plan_id: planId,
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
};

export const updateAcademySettings = async ({
  tenantId,
  academyName,
  logoUrl,
  discountPercentage,
}) => {
  const { data, error } = await supabase
    .from("tenants")
    .update({
      academy_name: academyName,
      logo_url: logoUrl,
      discount_percentage: discountPercentage,
    })
    .eq("id", tenantId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getTenantStats = async (tenantId) => {
    const response = await fetch(
        `${API_URL}/teacher/statuse/${tenantId}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch tenant stats");
    }

    return data;
};

export const getAcademyAdmin = async (tenantId) => {
  const { data, error } = await supabase
    .from("users")
    .select("name, email, phone, tenants!users_tenant_id_fkey(academy_name)")
    .eq("tenant_id", tenantId)
    .eq("role", "admin")
    .single();
  if (error) throw error;
  return data;
};

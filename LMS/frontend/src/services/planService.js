// import { supabase } from "../config/supabase";
const API_URL = "http://localhost:3000/api/admin/plans";

export const getPlans = async () => {
  const response = await fetch(
    `${API_URL}/getAll`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch plans");
  }

  return await response.json();
};

export const getTenantPlan = async (tenantId) => {
  const { data, error } = await supabase
    .from("tenants")
    .select(
      `
      plan_id,
      plans (*) 
    `,
    )
    .eq("id", tenantId)
    .single();

  if (error) throw error;
  return data;
};

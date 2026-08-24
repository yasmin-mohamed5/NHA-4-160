// import { supabase } from "../config/supabase";

const API_URL = "http://localhost:3000/api/admin";

export const getPaginatedPlans = async (page, limit) => {
  const response = await fetch(
    `${API_URL}/plans/getAllPaginated?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch plans");
  }

  return await response.json();
};

export const createPlan = async (planData) => {
  const response = await fetch(`${API_URL}/plans/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(planData),
  });

  if (!response.ok) {
    throw new Error("Failed to create plan");
  }

  return await response.json();
};

export const updatePlan = async (
  planId,
  updates
) => {

  const response = await fetch(
    `${API_URL}/plans/update/${planId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updates),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update plan");
  }

  return await response.json();
};

export const deletePlan = async (planId) => {

  const response = await fetch(
    `${API_URL}/plans/delete/${planId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete plan");
  }
};

export const getPaginatedTenants = async (page, limit) => {
  const response = await fetch(
    `${API_URL}/adminAcademyRoutes/getAllPaginated?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch academies");
  }

  return await response.json();
};

export const deleteTenant = async (tenantId) => {
  const response = await fetch(
    `${API_URL}/adminAcademyRoutes/delete/${tenantId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete academy");
  }

  return true;
};

export const getPaginatedUsers = async (page, limit) => {
  const response = await fetch(
    `${API_URL}/adminUserRoutes/getAllPaginated?page=${page}&limit=${limit}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const result = await response.json();

  return result;
};

export const deleteUser = async (userId) => {
  const response = await fetch(
    `${API_URL}/adminUserRoutes/delete/${userId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

  return true;
};

export const getSystemStats = async () => {
  const [
    tenantsCount,
    usersCount,
    coursesCount,
    coursesRes,
    usersRes,
    tenantsRes,
    enrollmentsRes,
  ] = await Promise.all([
    supabase.from("tenants").select("id", { count: "exact", head: true }),
    supabase.from("users").select("id", { count: "exact", head: true }),
    supabase.from("courses").select("id", { count: "exact", head: true }),
    supabase.from("courses").select("status"),
    supabase.from("users").select("created_at"),
    supabase.from("tenants").select("created_at"),
    supabase.from("enrollments").select("enrolled_at"),
  ]);

  if (tenantsCount.error) throw tenantsCount.error;
  if (usersCount.error) throw usersCount.error;
  if (coursesCount.error) throw coursesCount.error;

  const published =
    coursesRes.data?.filter((c) => c.status === "published").length || 0;
  const draft =
    coursesRes.data?.filter((c) => c.status === "draft").length || 0;
  const courseStatusData = [
    { name: "Published", value: published },
    { name: "Draft", value: draft },
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const growthMap = {};
  const d = new Date();

  for (let i = 5; i >= 0; i--) {
    const d2 = new Date(d.getFullYear(), d.getMonth() - i, 1);
    const key = `${months[d2.getMonth()]} ${d2.getFullYear()}`;
    growthMap[key] = { name: key, users: 0, academies: 0, enrollments: 0 };
  }

  usersRes.data?.forEach((u) => {
    const date = new Date(u.created_at);
    const key = `${months[date.getMonth()]} ${date.getFullYear()}`;
    if (growthMap[key]) growthMap[key].users += 1;
  });

  tenantsRes.data?.forEach((t) => {
    const date = new Date(t.created_at);
    const key = `${months[date.getMonth()]} ${date.getFullYear()}`;
    if (growthMap[key]) growthMap[key].academies += 1;
  });

  enrollmentsRes.data?.forEach((e) => {
    const date = new Date(e.enrolled_at);
    const key = `${months[date.getMonth()]} ${date.getFullYear()}`;
    if (growthMap[key]) growthMap[key].enrollments += 1;
  });

  const chartData = Object.values(growthMap);

  return {
    totalTenants: tenantsCount.count || 0,
    totalUsers: usersCount.count || 0,
    totalCourses: coursesCount.count || 0,
    courseStatusData,
    chartData,
  };
};

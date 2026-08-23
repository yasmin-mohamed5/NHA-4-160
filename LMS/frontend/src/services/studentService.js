const API_URL = "http://localhost:3000/api/auth";

/**
 * Returns every student (role = "student") that belongs to a given
 * tenant (academy). Used on the Students page and for the dashboard
 * stats count.
 */
export const getAcademyStudents = async (tenantId) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("tenant_id", tenantId)
    .eq("role", "student")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Returns the list of courses a specific student is enrolled in,
 * scoped to the current tenant.
 */
export const getStudentEnrollments = async (studentId, tenantId) => {
  const { data, error } = await supabase
    .from("enrollments")
    .select(
      `
      progress,
      enrolled_at,
      courses (*)
    `,
    )
    .eq("student_id", studentId)
    .eq("tenant_id", tenantId);

  if (error) throw error;
  return data;
};

/**
 * Creates a brand-new student:
 * 1) Creates the Auth user via the SECONDARY client (so the teacher's
 *    own session isn't overwritten).
 * 2) Inserts the profile row in "users" with role="student" and links
 *    it to the teacher's tenant_id so it never leaks into another
 *    academy.
 */
export const addStudent = async ({
  name,
  email,
  password,
  phone,
  tenantId,
}) => {
  const response = await fetch(
    `${API_URL}/register/student`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        phone,
        tenant_id: tenantId,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to register student");
  }

  return data;
};
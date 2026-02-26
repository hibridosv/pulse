export const canViewRole = (userRole: string, roleName: string): boolean => {
  if (userRole === "Root") return true;
  if (userRole === "Gerencia" && roleName !== "Root") return true;
  if (userRole === "Administracion" && roleName !== "Root" && roleName !== "Gerencia") return true;
  return false;
};
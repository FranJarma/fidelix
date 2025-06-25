export function getDialogTitle<T>(
  editingItem: T | null,
  entityName: string,
  labelProp: keyof T = "fullName" as keyof T
): string {
  if (editingItem) {
    const label = String(editingItem[labelProp] ?? "").trim();
    return `Editar ${entityName}: ${label}`;
  }

  return `Crear ${entityName}`;
}

export function getDialogActionLabel<T>(
  editingItem: T | null,
  entityName: string
): string {
  return editingItem ? `Editar ${entityName}` : `Crear ${entityName}`;
}

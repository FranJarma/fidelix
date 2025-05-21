import { useState } from "react";

export function useEntityManager<T extends { id: number }>(initialItems: T[] = []) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [editing, setEditing] = useState<T | null>(null);

  const create = (item: T) => setItems(prev => [...prev, item]);
  const update = (updated: T) =>
    setItems(prev => prev.map(i => (i.id === updated.id ? updated : i)));
  const remove = (selected: T[]) =>
    setItems(prev => prev.filter(i => !selected.some(s => s.id === i.id)));
  const notify = (selected: T[]) => alert(`Notificando a ${selected.length} elemento(s)`);

  return {
    items,
    setItems,
    editing,
    setEditing,
    create,
    update,
    remove,
    notify,
  };
}

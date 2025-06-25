type Option = {
  label: string;
  value: string | number;
};

export function convertApiDataToSelectOptions<T>(
  data: T[],
  name: string
): Option[] {
  return data.map((item: any) => ({
    label: item[name],
    value: item.id,
  }));
}

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

interface DataItem {
  [key: string]: any;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatToBRL = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const isFloatValue = (value: number) => {
  return typeof value === 'number' && !Number.isInteger(value);
};

export const findMoneyKeys = (data: DataItem[]) => {
  if (data.length === 0) return [];

  const keys = Object.keys(data[0]);
  const moneyKeys = [];

  for (const key of keys) {
    if (data.some(item => isFloatValue(item[key]))) {
      moneyKeys.push(key);
    }
  }

  return moneyKeys;
};

export const formatKeyName = (key: string) => {
  return key
  .replace(/[_-]/g, ' ')
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
};

export const calculateTotal = (data: DataItem, list: string[]) => {
  return data.reduce((total: number, item: number) => total + (item[list[0]] || 0), 0);
};

export const agroup = (data: any[], fieldOne: string, fieldTwo: string, moneyKeys: any[]) => {
  const totals = {};
  const totalDepartments = {};

  if (!fieldOne || !fieldTwo) {
    return {
      column: Object.keys(totals),
      departments: Object.keys(totalDepartments),
      totals,
      totalDepartments
    }
  }
    
  data.forEach((item) => {
    if (!totals[item[fieldOne]]) {
      totals[item[fieldOne]] = {};
    }
    if (!totals[item[fieldOne]][item[fieldTwo]]) {
      totals[item[fieldOne]][item[fieldTwo]] = 0;
    }
    totals[item[fieldOne]][item[fieldTwo]] += item[moneyKeys[0]];

    if (!totalDepartments[item[fieldTwo]]) {
      totalDepartments[item[fieldTwo]] = 0;
    }
    totalDepartments[item[fieldTwo]] += item[moneyKeys[0]];
  });

  return { 
    column: Object.keys(totals),
    departments: Object.keys(totalDepartments),
    totals,
    totalDepartments
  }
};

export const findFieldYear = (data: any[]) => {
  const yearPattern = /^\d{4}$/;
  const fieldYear = {};

  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (yearPattern.test(item[key])) {
        if (!fieldYear[key]) {
          fieldYear[key] = 0;
        }
        fieldYear[key] += 1;
      }
    });
  });

  return Object.keys(fieldYear).reduce((a, b) => fieldYear[a] > fieldYear[b] ? a : b, null);
};

export const colors = [
	"#64748b",
  "#1f2937",
  "#737373",
  "#292524",
  "#f87171",
  "#9a3412",
  "#f59e0b",
  "#3f6212",
  "#10b981",
  "#155e75",
  "#60a5fa",
  "#a78bfa",
  "#581c87",
  "#e879f9",
  "#831843" 
];
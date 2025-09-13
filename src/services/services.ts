import { get, post, put, del } from './httpService';

// Métodos estándar
export const getServices = (url: string) => get(url);
export const createService = (url: string, data: any) => post(url, data);
export const updateService = (url: string, data: any) => put(url, data);
export const deleteService = (url: string) => del(url);
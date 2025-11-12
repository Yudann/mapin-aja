// lib/validations.ts
import { z } from 'zod';

// Profile validation
export const profileUpdateSchema = z.object({
  full_name: z.string().min(1, "Nama lengkap harus diisi"),
  phone: z.string().optional(),
  avatar_url: z.string().url().optional().or(z.literal('')),
});

// UMKM validation
export const umkmCreateSchema = z.object({
  name: z.string().min(1, "Nama UMKM harus diisi"),
  category: z.enum(['food_beverage', 'fashion', 'handicraft', 'services', 'retail', 'health_beauty', 'other']),
  description: z.string().optional(),
  address: z.string().min(1, "Alamat harus diisi"),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  phone: z.string().min(1, "Nomor telepon harus diisi"),
  image_url: z.string().url().optional().or(z.literal('')),
});

export const umkmUpdateSchema = umkmCreateSchema.partial();
// Opening hours validation schema
export const openingHoursSchema = z.record(
  z.string(), // key schema (hari dalam minggu, e.g., "monday", "tuesday")
  z.object({
    open: z.string().optional(),
    close: z.string().optional(),
    is_closed: z.boolean().optional(),
  })
);

// Social media validation schema
export const socialMediaSchema = z.record(
  z.string(), // key schema (nama platform, e.g., "instagram", "facebook")
  z.string().url().or(z.literal(''))
);
// Onboarding validation
export const onboardingSchema = umkmCreateSchema.extend({
  banner_url: z.string().url().optional().or(z.literal('')),
  opening_hours: openingHoursSchema.optional(),
  social_media: socialMediaSchema.optional(),
});

// Message validation
export const messageCreateSchema = z.object({
  content: z.string().min(1, "Pesan tidak boleh kosong"),
});
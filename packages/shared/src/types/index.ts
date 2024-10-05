import { z } from "zod";

export const UUIDSchema = z.string().uuid();
export const EmailSchema = z.string().email();
export const PasswordSchema = z.string().min(8).max(16);
export const PhoneNumberSchema = z
  .string()
  .regex(/^010\d{8}$/, "전화번호 형식이 올바르지 않습니다. 예: 01012345678");

export type UUID = z.infer<typeof UUIDSchema>;
export type Email = z.infer<typeof EmailSchema>;
export type Password = z.infer<typeof PasswordSchema>;
export type PhoneNumber = z.infer<typeof PhoneNumberSchema>;

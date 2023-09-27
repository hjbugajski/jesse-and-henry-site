import { config } from 'dotenv';

config();

export const PAYLOAD_API = process.env.NEXT_PUBLIC_PAYLOAD_URL! + '/api';
export const PAYLOAD_GRAPHQL = process.env.NEXT_PUBLIC_PAYLOAD_URL! + '/api/graphql';
export const PROTECTED_EMAIL = process.env.PROTECTED_EMAIL!;
export const PAYLOAD_PROTECTED_TOKEN = process.env.PAYLOAD_PROTECTED_TOKEN!;
export const PAYLOAD_GUEST_TOKEN = process.env.PAYLOAD_GUEST_TOKEN!;

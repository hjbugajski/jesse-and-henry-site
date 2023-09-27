export type FormState = {
  status: 'pending' | 'error' | 'valid' | null;
  message: string | null;
};

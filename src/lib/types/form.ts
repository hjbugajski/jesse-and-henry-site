export type FormState = {
  status: 'pending' | 'error' | 'valid' | null;
  errors: {
    formErrors: string[];
    fieldErrors?: {
      [key: string]: string[];
    };
  };
};

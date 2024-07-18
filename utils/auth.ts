import { RootState } from '@/store/store';

export const isAuthenticated = (req: Request): boolean => {
  const storeState: RootState = (req as any).store?.getState();

  return storeState?.auth?.isLoggedIn ?? false;
};

import { RootState } from "@/store/store";
interface CustomRequest extends Request {
  store?: {
    getState: () => RootState;
  };
}

export const isAuthenticated = (req: CustomRequest): boolean => {
  const storeState = req.store?.getState();

  if (!storeState) {
    return false;
  }

  return storeState.auth?.isLoggedIn ?? false;
};

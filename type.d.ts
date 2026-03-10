interface AuthState {
  isSignedIn: boolean;
  userId: string | null;
  userName: string | null;
}

type AuthContext = {
  isSignedIn: boolean;
  userId: string | null;
  userName: string | null;
  refreshAuth: () => Promise<boolean>;
  signIn: () => Promise<boolean>;
  signOut: () => Promise<boolean>;
};

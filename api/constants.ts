// User
export const SIGN_UP = "/users";
export const LOGIN = "/users/login";
export const LOGIN_WITH_GOOGLE = "/users/login/google";
export const LOGIN_WITH_WALLET = "/users/login/wallet";
export const PROFILE = (id: string) => `/users/${id}`;
export const PROFILE_VERIFY = "/users/verify";
export const PROFILE_RECOVER = "/users/recover";

// Lesson
export const LESSON = "/lesson";
export const MODULE = "/module";
export const COURSE = "/course";
export const COURSES = "/courses";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      email: string;
      isAuth: boolean;
    };
  }
}

export {}
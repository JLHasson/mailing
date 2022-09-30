import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

const password = process.env.MAILING_WEB_SESSION_PASSWORD;

const ironSessionConfig = {
  cookieName: "mailing_web",
  password,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
  ttl: 0,
};

export function withSessionAPIRoute(fn) {
  if ("string" !== typeof password)
    throw new Error("process.env.MAILING_WEB_SESSION_PASSWORD is missing");
  return withIronSessionApiRoute(fn, ironSessionConfig);
}

export function withSession(fn) {
  if ("string" !== typeof password)
    throw new Error("process.env.MAILING_WEB_SESSION_PASSWORD is missing");
  return withIronSessionSsr(fn, ironSessionConfig);
}

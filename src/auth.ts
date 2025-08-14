import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { sendEmail } from "./lib/email";
import prisma from "./lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    // TODO: Put some feature behind an email verification check
    // requireEmailVerification: true, // We don't want to block login completely
    async sendResetPassword({ user, url, token }, request) {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },
  // Doesn't work in dev because missing IP header
  // rateLimit: {
  //   enabled: true, // enable in development
  //   window: 60,
  //   max: 120,
  //   customRules: {
  //     "/sign-in/email": {
  //       window: 30,
  //       max: 5,
  //     },
  //   },
  //   storage: "database",
  //   modelName: "rate_limit", // requires npx @better-auth/cli generate
  // },
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
      },
    },
  },
});

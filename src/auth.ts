import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { sendEmail } from "./lib/email";
import prisma from "./lib/prisma";
import { passwordSchema } from "./lib/validation";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true, // We don't want to block login completely
    // minPasswordLength: 8, // Handled by our Zod schema
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
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email" || ctx.path === "/change-password") {
        const password = ctx.body.newPassword || ctx.body.password;
        const { error } = passwordSchema.safeParse(password);
        if (error) {
          console.log(error);
          throw new APIError("BAD_REQUEST", {
            message: "Invalid password",
          });
        }
      }
    }),
  },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async (
        { user, newEmail, url, token },
        request
      ) => {
        await sendEmail({
          to: user.email,
          subject: "Approve email change",
          text: `Your email has been changed to ${newEmail}. Click the link to approve the change: ${url}`,
        });
      },
    },
    additionalFields: {
      role: {
        type: "string",
        input: false,
      },
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
});

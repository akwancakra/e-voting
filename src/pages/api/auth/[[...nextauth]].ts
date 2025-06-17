import { signIn, signInWithGoogle } from "@/utils/db/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// type UserType = {
//     id: string,
//     name: string,
//     email: string,
//     role: string,
//     password: string
// }

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET!,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                const user: any = await signIn({ email });

                if (user) {
                    console.log(user);
                    const confirmPassword = await compare(
                        password,
                        user.password
                    );
                    if (confirmPassword) {
                        return user;
                    }
                    return null;
                }
                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        jwt: async (params) => {
            const { token, account, user }: any = params;
            if (account?.provider === "credentials") {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }

            if (account?.provider === "google") {
                const data = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    type: "google",
                };

                await signInWithGoogle(
                    data,
                    (result: {
                        status: boolean;
                        message: string;
                        data: any;
                    }) => {
                        if (result.status) {
                            token.email = result.data.email;
                            token.name = result.data.name;
                            token.image = result.data.image;
                            token.type = result.data.type;
                            token.role = result.data.role;
                        }
                    }
                );
            }
            return token;
        },
        session: async ({ session, token }: any) => {
            if (session?.user) {
                if ("id" in token) {
                    session.user.id = token.id;
                }

                if ("email" in token) {
                    session.user.email = token.email;
                }

                if ("name" in token) {
                    session.user.name = token.name;
                }

                if ("role" in token) {
                    session.user.role = token.role;
                }

                if ("image" in token) {
                    session.user.image = token.image;
                }
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};

export default NextAuth(authOptions);

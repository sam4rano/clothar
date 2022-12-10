import NextAuth from 'next-auth';
import User from '../../../models/User';
import db from '../../../utils/db';
import bcryptjs from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
export default NextAuth({
    session: {
        strategy:'jwt',
    },
    callbacks: {
        async jwt({token, user}) {
            if (user?._id) token._id = user._id;
            if (user?.isAdmin) this.session.user.isAdmin = token.isAdmin;
            return this.session;
        },
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                await db.connect();
                const user = await User.findOne({
                    email: credentials.email,
                });
                await db.disconnect();
                if (user && bcryptjs.compareSync(credentials.password, user.password)) {
                    return {
                        _id:user._id,
                        name:user.name,
                        email:user.email,
                        image:'f',
                        isAdmin: user.isAdmin,
                    }
                }
                throw new Error('Invalid email or password');
            },
        })
    ]
});
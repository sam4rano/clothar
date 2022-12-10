import Link from "next/link";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";




const Login = () => {

  const {data: session} = useSession();

  const router = useRouter();
  const { redirect } = router.query;


  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);
  
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch(err){
      toast.error(getError(err))
    }
  };
  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
            type="email"
            autoComplete="on"
            className="w-full"
            id="email"
            autoFocus
          ></input>
          {errors.email && <div>{errors.email.message}</div>}
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            className="w-full"
            id="password"
            autoFocus
            {...register("password", {
              required: "Please enter password",
              minLength: { value: 6, message: "password is more than 5 chars" },
            })}
          ></input>
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account? &nbsp;
          <Link href="register">Register</Link>
        </div>
      </form>
    </Layout>
  );
};

export default Login;

import z from 'zod'

export const userSignup = z.object({
    name:z.string().trim(),
    password:z.
             string()
             .trim()
             .minLength(6,"Password must be of length of 6"),
    email:z.
          email(),
    role:z.enum(["admin","customer"])
})

export const authLogin = z.object({
    email:z.email(),
    password:z.string().trim()
})
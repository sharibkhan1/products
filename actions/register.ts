"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/app/firebase/config";

// Define the Product schema allowing null values
const ProductSchema = z.object({
    CompanyName: z.string().nullable(), // Company name can be null
    ProductName: z.string().nullable(), // Product name can be null
    Details: z.object({
        Category: z.string().nullable(),         // Category can be null
        Description: z.string().nullable(),      // Description can be null
        NutrientsScore: z.string().nullable(),   // Nutrients score can be null
        Photo: z.string().nullable(),             // Photo can be null
    }).nullable(), // Details can be null
}).nullable(); // ProductSchema itself can be null

// Update the RegisterSchema to include the new fields
const ExtendedRegisterSchema = RegisterSchema.extend({
    password: z.string(), // assuming RegisterSchema already includes this
    profileImage: z.string().nullable().optional(), // profileImage can be null or omitted
    Products: z.array(ProductSchema).default([]), // Default to an empty array, allowing null products
});

export const Register = async (values: z.infer<typeof ExtendedRegisterSchema>) => {
    const validatedFields = ExtendedRegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, name, profileImage, Products } = validatedFields.data;

    try {
        // Hash the password

        // Create a user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create a user document in Firestore
        await setDoc(doc(db, "retailers", user.uid), {
            id: user.uid,
            email: user.email,
            name,
            password,  // Storing the plaintext password here for testing
            profileImage: profileImage || null, // Explicitly set null if not provided
            Products: Products, // Include the products in the Firestore document
        });
            
    } catch (error) {
        if (error === "auth/email-already-in-use") {
            return { error: "Email already in use!" };
        } else {
            console.error(`Registration error: ${error}`);
            return { error: "Something went wrong!" };
        }
    }
};

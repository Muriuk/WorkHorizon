// app/api/register/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const formData = new URLSearchParams(await request.text());
    const fullName = formData.get('full_name');
    const email = formData.get('email');
    const phoneNumber = formData.get('phone_number');
    const password = formData.get('password');
    const workCategory = formData.get('work_category');
    const county = formData.get('county');

    // Validate form fields
    if (!fullName || !email || !phoneNumber || !password || !workCategory || !county) {
        return NextResponse.json({ success: false, message: "Missing fields." }, { status: 400 });
    }

    try {
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ success: false, message: "Email is already registered." }, { status: 409 });
        }

        // Create the new user in the database with plain text password
        const newUser = await prisma.user.create({
            data: {
                fullName,
                email,
                phoneNumber,
                password, // Store the plain text password
                workCategory,
                county
            }
        });

        return NextResponse.json({ success: true, message: "Account created successfully." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error." }, { status: 500 });
    }
}

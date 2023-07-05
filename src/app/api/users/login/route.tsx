import {connect} from '@/dbConfig/dbconfig';
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody)

        //check User exists?
        const user = User.findOne({email}) 
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400});
        }

        // Password verification
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: " Invalid Password"}, {status: 400})
        }

        //JWT Token Data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        //Create Token
        const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login Successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status : 500})
    }
}
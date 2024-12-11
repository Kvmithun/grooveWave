import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse} from "next/server";
import { supabase } from '@supabase/auth-ui-shared';

export async function middleware(req:NextResponse) {
    const res= NextResponse.next();
    const supabase= createMiddlewareClient({
        req,
        res
    });
    await supabase.auth.getSession();
    return res;
    
};


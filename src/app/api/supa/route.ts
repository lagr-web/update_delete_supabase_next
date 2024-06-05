import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, createBrowserClient } from "@supabase/ssr";


export async function GET(req: NextRequest, res: NextResponse) {


    const cookieStore = cookies();

    const supabase = createServerClient(

        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                }
            }
        }
    )

    const { data, error } = await supabase
        .from("testarea")
        .select(`id, name, lastname`)
        .order('id', { ascending: false })

      return NextResponse.json({ data })


}
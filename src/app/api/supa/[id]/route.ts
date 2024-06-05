import { createServerClient } from "@supabase/ssr";
import { NextApiRequest } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type RouteParams = {

    params: {

        id: string
    }
}

export const GET = async (req: NextApiRequest, route: RouteParams) => {


    const id = route.params.id;

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
        .from('testarea')
        .select('*')
        .eq('id', id)


    if (error == null) return NextResponse.json({ data });

    return NextResponse.json({ error: error.message })




}
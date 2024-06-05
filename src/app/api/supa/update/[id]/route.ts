//src/app/api/supa/update/[id]/route.ts

import { cookies } from "next/headers"
import { NextResponse, NextRequest } from "next/server";
import { createServerClient } from '@supabase/ssr';

type RouteParams = {

    params: {
        id: string
    }
}

export const PUT = async (req: NextRequest, route: RouteParams ) => {

    const cookieStore = cookies();

    const id = route.params.id;

    console.log(id);

    const formdata = await req.json();

    console.log(formdata);

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


    const { data, error } = await supabase.from('testarea')
        .update({

            name: formdata.name,
            lastname: formdata.lastname

        }).match({ id });

    if (error == null) {

        return NextResponse.json({ data });
    }

    return NextResponse.json({ error: error.message });

}

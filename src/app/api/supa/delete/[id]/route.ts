import { cookies } from "next/headers"
import { NextResponse, NextRequest } from "next/server";
import { createServerClient} from '@supabase/ssr';

type RouteParams = {

    params: {
        id: string
    }
}

export const DELETE = async (req: NextRequest, route: RouteParams) => {

    const cookieStore = cookies();

    const id: string = route.params.id;

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

    const { error, data } = await supabase
        .from('testarea')
        .delete()
        .eq('id', id)

    if (error == null) {

        return NextResponse.json({ data });
    }

    return NextResponse.json({ error: error.message });
}

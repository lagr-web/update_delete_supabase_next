
import Link from "next/link";
import { getData } from "./data";

const Page = async() => {

const names = await getData();

console.log(names);

    return (

        <>
        {names &&
        
        names.data.map( (item:any)=>(

            <div>

             <Link
                href={{

                    pathname:'/useapisupabasequery',
                    query:{id:item.id}
                }}
                >
                    {item.name}
                </Link>


            </div>



        ) )
         
        
        }
        </>

    );
}

export default Page;
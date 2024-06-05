import { getData } from "./data";

const Page = async( {searchParams}:{searchParams:{id:string}} )=>{

    const id = searchParams.id;

    const lastname = await getData(id);

    return(

        <>

        {lastname &&

          <div>{lastname.data[0].lastname}</div>


        }
        
        </>
    )
}

export default Page;
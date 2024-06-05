import { FormEvent, useState } from "react";
import modalStyles from "../admin.module.scss";
import { useRouter } from "next/navigation";


interface Dataset {
    id: number
    created_at: Date;
    name: string;
    lastname: string;
 }

 interface modalProps {
    modal: boolean
    mFunc(b: boolean): any
    data: Dataset | undefined
 }

const DeleteData = (props: modalProps) => {

    const router = useRouter();

    const [ok, setOk] = useState<string>('')

    if (!props.modal) return; 


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
     
        try {
     
        const res = await  fetch(`http://localhost:3000/api/supa/delete/${props?.data?.id}`, {
                     cache: 'no-store',
                     method: 'DELETE',
                   
                     headers: {
                         'content-type': 'application/json'
                     }
     
                 })
     
                 if (res.ok) {
                     console.log("ok")
                     setOk("Dine data er Slettet");
                     props.mFunc(true);

                     window.location.reload();
     
                 } else {
                     console.log("not ok")
                 }
     
                 res.ok ? console.log("ok") : console.log("not ok")
     
             } catch (error) {
     
                 console.log(error)
     
             } 
     
         }
     


    return (
       
        <>

 {props.data &&

  <div id={modalStyles.modalContainer}>
                
   <div id={modalStyles.headline}>

     <div id={modalStyles.name}>{props.data.name + " " + props.data.lastname}</div>
       <div id={modalStyles.close} onClick={() => props.mFunc(false)}>
         <img src = "/assets/close.svg" />
       </div>

     </div>
  <div style={{textAlign:'center', marginTop:"30px",fontWeight:'bold',color:"#999999", height:'100px'}}>vil du slette denne post</div>

   <form onSubmit={handleSubmit}>

    <div id={modalStyles.update}><button type="submit">SLET POST</button></div>
        <div id={modalStyles.ok}>{ok}</div>
    </form>

                
    </div>

    }

    </>

    )
 }

export default DeleteData;

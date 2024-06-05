"use client";
  import { useState, useEffect, } from "react";
  import styles from "./admin.module.scss";
  import UpdateData from "./components/updateData";
  import DeleteData from "./components/deleteData";

  interface Dataset {
    id: number;
    created_at: Date;
    name: string;
    lastname: string;
 }

 const page = () => {

    const [modal, setModal] = useState<boolean>(false);
    const [modalDelete, setModalDelete] = useState<boolean>(false);

    const [myData, setMyData] = useState<Dataset[] | null>(null);

    const [modalData, setModalData] = useState<Dataset>();

    const openModal = (data: Dataset, modalWindow:string) => {

        console.log(modalWindow);

        setModalData(data);
      

        if( modalWindow == "update"){
            setModalDelete(false)
            setModal(true);
    
           }else{
            console.log('ahhh');

            setModal(false);
            setModalDelete(true)
           }
    

    }

    const closeModal = (showModal?: boolean) => {

        console.log(showModal);

        if (!showModal) {

            setModal(false);
            setModalDelete(false)

        } else {

            const timer = setTimeout(() => {

                setModal(false);
                setModalDelete(false)
            }, 2000)
        }
    }

      useEffect(() => {
          (async () => {
            const res = await fetch('http://localhost:3000/api/supa/', {
            cache: 'no-store' 

           });

            const dataResponse = await res.json();

            if (res.ok) {

                setMyData(dataResponse.data)
            }

        })();

    }, [])

 return (

    
    <>
    <div id={styles.dataContainer}>
        <table style={{ width: "500px" }}>
        <tbody>
            {myData &&

                myData.map((item: Dataset) => (

                    <tr key={item.id}>
                        <td className={styles.id}>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.lastname}</td>
                        <td className={styles.dataBut} onClick={(e) => openModal(item, "update")}  >Opdater</td>
                        <td className={styles.dataBut} onClick={(e) => openModal(item, "delete")}>Slet post</td>
                    </tr>

                ))//** end loop */
            }
                   </tbody>
        </table>
    </div>

    <UpdateData data={modalData} modal={modal} mFunc={closeModal} />
    <DeleteData data={modalData} modal={modalDelete} mFunc={closeModal}  />

 </>
)

       
    
 }

 export default page;

import { FormEvent, useEffect, useRef, useState } from "react";
import modalStyles from "../admin.module.scss";

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


const UpdateData = (props: modalProps) => {

    const [name, setName] = useState<string>('');
    const [lastname, setLastName] = useState<string>('');
    const [ok, setOk] = useState<string>('');

    if (!props.modal) return;

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const submitData = { name, lastname }
        try {
     const res = await fetch(`http://localhost:3000/api/supa/update/${props?.data?.id}`, {
                cache: 'no-store',
                method: 'PUT',
                body: JSON.stringify(submitData),
                headers: {
                    'content-type': 'application/json'
                }
            })

            if (res.ok) {
                console.log("ok")
                setOk("Dine data er opdateret");
                props.mFunc(true);

            } else {
                console.log("not ok")
            }

            //res.ok ? console.log("ok") : console.log("not ok")

        } catch (error) {

            console.log(error)
        }

          setName('')
        setLastName('')




    }

    return (


        <div id={modalStyles.modalContainer}>

            <div id={modalStyles.headline}>
                <div id={modalStyles.name}>{props?.data?.name + " " + props?.data?.lastname}</div>
                <div id={modalStyles.close} onClick={() => props.mFunc(false)}>
                    <img src="/assets/close.svg" />

                </div>

            </div>

            <form onSubmit={handleSubmit}>

                <div>

                    <input
                        type="text"
                        name="name"
                        value={name}
                        placeholder="name"
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div>

                    <input
                        type="text"
                        name="lastname"
                        value={lastname}
                        placeholder="lastname"
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>

                <div id={modalStyles.update}><button type="submit">UPDATE</button></div>
                <div id={modalStyles.ok}>{ok}</div>
            </form>


        </div>






    )


}

export default UpdateData;

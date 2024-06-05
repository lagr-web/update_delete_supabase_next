"use client";
import { useState, useEffect, FormEvent } from "react";

const Page = () => {

    const [name, setName] = useState<string>('');
    const [lastname, setLastName] = useState<string>('');


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const submitData = { name, lastname }

        try {

            const res = await fetch('http://localhost:3000/api/supa/post', {

                method: 'POST',
                body: JSON.stringify(submitData),

                headers: {
                    'content-type': 'application/json'
                }

            })

            res.ok ? console.log('ok') : console.log('not ok');



        } catch (error) {


            console.log(error);
        }

        setName('');
        setLastName('');


    }


    return (

        <>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        placeholder="Enter the name"
                        required
                        onChange={e => setName(e.target.value)}
                    />

                    <input
                        type="text"
                        name="lastname"
                        value={lastname}
                        required
                        placeholder="Enter the lastname"
                        onChange={e => setLastName(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </div>

            </form>

        </>

    )
}

export default Page;
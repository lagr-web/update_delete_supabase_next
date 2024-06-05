export const getData = async (id: string | null) => {

    const res = await fetch(`http://localhost:3000/api/supa/${id}`);

    if (!res.ok) throw new Error('failed');

    return res.json();

}
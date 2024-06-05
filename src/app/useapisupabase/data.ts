export const getData = async () => {

    const res = await fetch('http://localhost:3000/api/supa',{cache:"no-cache"});

    if (!res.ok) throw new Error('failed');

    return res.json();


}
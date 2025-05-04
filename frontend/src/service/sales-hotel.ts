import axios from "axios"

export async function createSale(artefact_id: string, crown_price: number) {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sales-hotel/create-sale`, 
       {
            artefact_id: artefact_id, 
            crown_price: crown_price
       }, 
        {
            withCredentials: true
        }
    )

    return res.data
}

export async function getAllSales() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sales-hotel/get-sales`)

    return res.data
}

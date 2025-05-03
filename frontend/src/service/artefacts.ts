import axios from "axios"
 
export async function getAllArtefacts() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/artefacts/all`)

    return res.data
}

export async function getUserArtefact() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/artefact/user-artefact`,
        {
            withCredentials: true
        }
    )

    return res.data
}

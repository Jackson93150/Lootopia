import Typesense from "typesense"

const typesenseClient = new Typesense.Client({
  nodes: [
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST as string,
      port: Number(process.env.NEXT_PUBLIC_TYPESENSE_PORT),
      protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL as "http" | "https",
    },
  ],
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_ADMIN_KEY as string,
  connectionTimeoutSeconds: 2,
})

export default typesenseClient

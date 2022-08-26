// POST /api/new-meetup
import { MongoClient } from "mongodb"

async function connectDatabase() {
    const client = await MongoClient.connect(
        "mongodb+srv://thedesigner:03JdIWOvRRiGMgbs@cluster0.grbpghc.mongodb.net/?retryWrites=true&w=majority"
    )
    return client
}

const insertDocument = async (client, document) => {
    const db = client.db()
    // console.log('****************API Route start - database: ', db)

    const meetupCollection = db.collection("meetups")

    const result = await meetupCollection.insertOne(document)
}

const handler = async (req, res) => {
    if (req.method === "POST") {
        const data = req.body
        const userImage = req.body.image

        if (!userImage || !userImage.includes("http")) {
            res.status(422).json({ message: "Invalid Image Link" })
            return
        }

        let client

        try {
            client = await connectDatabase()
        } catch (error) {
            res.status(500).json({ message: "Connecting failed" })
            return
        }

        try {
            await insertDocument(client, data)
            client.close()
        } catch (error) {
            res.status(500).json({ message: "Inserting document failed" })
            return
        }

        res.status(201).json({ message: "Meetup Inserted Successfully" })
    }
}

export default handler

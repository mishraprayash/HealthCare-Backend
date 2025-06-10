import express from "express"
import cors from "cors"
import helmet from "helmet";
import errorHandler from "./middleware/errorHandler.js";

import authRoute from "./routes/auth.route.js"
import patientRoute from "./routes/patient.route.js"
import doctorRoute from  "./routes/doctor.route.js"
import mappingRoute from "./routes/patient-doctor-map.route.js"

export function setupExpressApp() {
    const app = express();
    app.use(helmet())
    app.use(cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/api/auth',authRoute)
    app.use('/api/patients',patientRoute)
    app.use('/api/doctors',doctorRoute)
    app.use('/api/mappings',mappingRoute)

    app.get('/', (req, res) => {
        return res.status(200).json({ message: "Server is running..", timestamp: new Date(Date.now()).toISOString() })
    })



    app.use((req, res) => {
        res.status(400).json({ message: "Route doesnot exist" });
    })

    app.use(errorHandler)

    return app
}

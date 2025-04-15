import {Router} from "express"

import { askQuestion } from "../controller/chat.controller.js"

const Route = Router()


Route.post("/ask", askQuestion)

export default Route;


// https://localhost:8000/api/v1/chat/ask
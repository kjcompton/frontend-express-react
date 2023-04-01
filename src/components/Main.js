import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Index from "../pages/Index"
import Show from "../pages/Show"



const Main = (props) => {
    const [people, setPeople] = useState(null)
    const URL = 'http://localhost:4000/people/'

    const getPeople = async() => {
        const response = await fetch(URL)
        const data = await response.json()
        setPeople(data.data)
    }

    const createPerson = async (person) => {
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person)
        })
        //Update List of peoiple in state
        getPeople()
    }

    useEffect(() => {
        getPeople()
    }, [])

    return (
        <main>
            <Routes>
                <Route path='/' element={ <Index people={people} createPerson={createPerson} /> } />
                <Route path='/people/:id' element={ <Show /> } />
            </Routes>
        </main>
    )
}

export default Main

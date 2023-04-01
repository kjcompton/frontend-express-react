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
        console.log(person + "on line 19")
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person)
        })
        console.log(person + "on line 27")
        //Update List of peoiple in state
        getPeople()
    }

    const updatePeople = async (person, id) => {
        //make put request to create people
        await fetch(URL + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(person)
        })
        getPeople()
    }

    const deletePeople = async (id) => {
        // make post request to create people
        await fetch(URL + id, {
            method: "DELETE"
        })
        getPeople()
    }
    useEffect(() => {
        getPeople()
    }, [])

    return (
        <main>
            <Routes>
                <Route path='/' element={ <Index people={people} createPerson={createPerson} /> } />
                <Route path='/people/:id' element={ <Show people={people} updatePeople={updatePeople} deletePeople={deletePeople}/> } />
            </Routes>
        </main>
    )
}

export default Main

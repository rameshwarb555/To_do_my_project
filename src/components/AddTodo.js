import React, {useState} from "react";
import axios from "axios";
import "./AddTodo.css";

const AddTodo = ({setTodos, todos})=>{
    const [input, setInput] = useState('')

    const handleSubmit = async ()=>{
        if (input.trim() === '') return

        const newTodo = {
            title: input,
            description: '',
            completed: false,
        }

        try {
            const response = await axios.post(
                'http://localhost:4000/api/todos/createnewtodo',
                newTodo
            )
            setTodos([...todos, response.data])
            setInput('')
        } catch (error) {
            console.error('Error adding todo:', error)
        }
    }


    return(
        <div >
            <input
                value={input}
                onChange= {(e)=> setInput(e.target.value)}
                placeholder ='Enter a todo' />

            <button onClick={handleSubmit}>Add Todo</button>
        </div>
    )

}

export default AddTodo;

import { useEffect, useState } from 'react'

function ToDoList() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [taskInput, setTaskInput] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])
    
    function handleAddTask() {
        if(taskInput.trim() !== "") {
            setTasks(t => [...t, taskInput]);
            setTaskInput("")
            // console.log(tasks);
        }
    }

    function handleRemoveTask(index) {
        // console.log("working");
        
        setTasks(tasks.filter((_, i) => i !== index))
    }

    function handleMoveTaskUp(index) {
        if(index === 0) return;
        const newTasks = [...tasks];
        [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]]
        setTasks(newTasks)
    }

    function handleMoveTaskDown(index) {
        if(index === tasks.length - 1) return
        const newTasks = [...tasks];
        [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]]
        setTasks(newTasks)
    }

    
    return(
        <>
            <h1 style={{textAlign: "center"}}>To-Do List</h1>
            <div className='todo-form'>
                <input  id="taskInput" 
                        type="text" 
                        placeholder='Enter task'
                        value={taskInput}
                        onChange={(event) => setTaskInput(event.target.value)}
                        onKeyDown={(event) => {
                            if(event.key === "Enter") {
                                console.log("Enter key pressed")
                                handleAddTask()
                            }
                }}/>
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <div className='item-list'>
                {
                    tasks.map((task, index) => {
                        return(<div className="item" key={index}>
                            <h2>{task}</h2>
                            <button onClick={() => handleRemoveTask(index)}>Delete</button>
                            <button onClick={() => handleMoveTaskUp(index)}>👆</button>
                            <button onClick={() => handleMoveTaskDown(index)}>👇</button>
                        </div>)
                    }) 
                }
            {/* <div className="item">
                <button onClick={() => handleRemoveTask}>✏️</button>
                <h2>{tasks}</h2>
                <button onClick={() => handleRemoveTask}>Delete</button>
                <button>👆</button>
                <button>👇</button>
            </div>

            <div className="item">
                <button onClick={() => handleRemoveTask}>✏️</button>
                <h2>Do some react coding</h2>
                <button onClick={() => handleRemoveTask}>Delete</button>
                <button>👆</button>
                <button>👇</button>
            </div> */}
            </div>
        </>
    )
}

export default ToDoList;

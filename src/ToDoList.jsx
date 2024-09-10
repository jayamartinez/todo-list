import React, { useState } from 'react'

function ToDoList() {
    const [tasks, setTasks] = useState(["Example Task"]);
    
    function handleAddTask() {
        const newTask = document.getElementById("taskInput").value;
        document.getElementById("taskInput").value = "";
        setTasks(t => [...t, newTask]);
        console.log(tasks);
    }

    function handleRemoveTask(index) {
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
                <input id="taskInput" type="text" placeholder='Enter task'/>
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <div className='item-list'>
                {
                    tasks.map((task, index) => {
                        <div className="item" key={index}>
                            <button onClick={() => handleRemoveTask}>✏️</button>
                            <h2>{task}</h2>
                            <button onClick={() => handleRemoveTask}>Delete</button>
                            <button onClick={() => handleMoveTaskUp(index)}>👆</button>
                            <button onClick={() => handleMoveTaskDown(index)}>👇</button>
                        </div>
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

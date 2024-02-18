/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import Tarea from "./Tarea";

function App() {
  const [listaTareas, setlistaTareas] = useState([]);
  const [tarea, setTarea] = useState("");
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setlistaTareas(JSON.parse(storedTasks))
    }
  }, []);


  const handleOpen = () => {
    setOpen(!open);
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setTarea(value);

  }

  const nuevaTarea = () => {
    let obj = { "id": listaTareas.length, "name": tarea, "type": type }
    setlistaTareas([...listaTareas, obj]);
    setTarea("");
    localStorage.setItem("tasks", JSON.stringify([...listaTareas, obj]));

  }


  const eliminaTarea = (id) => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const arrayTasks = JSON.parse(storedTasks)
      const updatedTasks = arrayTasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks))
      setlistaTareas(updatedTasks);
    }
  }

  const selectType = (element) => {
    let tipo = element.target.value;
    switch (tipo) {
      case "trabajo":
        setType("trabajo");
        setOpen(false);
        break;
      case "personal":
        setType("personal");
        setOpen(false);
        break;
      case "urgente":
        setType("urgente");
        setOpen(false);
        break;
      case "familia":
        setType("familia");
        setOpen(false);
        break;
    }

    return type;
  }

  const changeColor = () => {

    switch (type) {
      case "trabajo":
        return "blue";
      case "personal":
        return "green";
      case "urgente":
        return "red";
      case "familia":
        return "orange";
      default: return "purple";
    }
  }



  return (
    <>
      <div className="flex gap-4 mx-auto justify-center justify-around">
        <div className="flex flex-col justify-center items-center p-5 gap-5">
          <div className="flex flex-col justify-start items-start p-5 gap-5">
            <label for="tarea">Tarea: </label>
            <input type="text" name="tarea" value={tarea} onChange={handleChange} className="border-2 border-purple-500 rounded-lg pt-2 pb-2 pl-4 pr-4 " />
            <div className="flex flex-col items-center">
              <button onClick={handleOpen} className="bg-purple-500 text-white p-2 rounded-lg">Selecciona el tipo</button>
              {open ? (
                <ul className="list-none mb-5 border-2 border-purple-500 rounded-lg h-fit w-fit p-5 flex flex-col items-center">
                  <li className="mt-2 mb-2">
                    <button className="bg-blue-400 hover:bg-blue-700 p-2 rounded-lg" value="trabajo" onClick={selectType}>Azul: trabajo</button>
                  </li>
                  <li className="mt-2 mb-2">
                    <button className="bg-green-400 hover:bg-green-700 p-2 rounded-lg" value="personal" onClick={selectType}>Verde: personal</button>
                  </li>
                  <li className="mt-2 mb-2">
                    <button className="bg-red-400 hover:bg-red-700 p-2 rounded-lg" value="urgente" onClick={selectType}>Rojo: urgente</button>
                  </li>
                  <li className="mt-2 mb-2">
                    <button className="bg-orange-400 hover:bg-orange-700 p-2 rounded-lg" value="familia" onClick={selectType}>Naranja: familia</button>
                  </li>
                </ul>
              ) : null}
            </div>
            <div className={"bg-" + changeColor() + "-400 rounded-lg p-2 text-white"}>{type}</div>
            <button onClick={nuevaTarea} className="bg-purple-500 rounded-lg p-2 text-white">Enviar</button>
          </div>


        </div>



        <div className="border-4 rounded-lg border-purple-700 flex flex-col justify-center items-center pt-5 pb-20 pl-5 pr-5 gap-5 w-fit h-fit m-5">
          <h6>Tareas</h6>
          {
            listaTareas.map((task) => (
              <Tarea tarea={task.name.toUpperCase()} eliminaTarea={() => eliminaTarea(task.id)} tipo={task.type} key={task.id} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App

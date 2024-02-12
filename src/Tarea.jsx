/* eslint-disable react/prop-types */



function Tarea({ tarea, eliminaTarea, tipo }) {

    const typeColor = () => {
        switch (tipo) {
            case "trabajo":
                return "blue";
            case "personal":
                return "green";
            case "urgente":
                return "red";
            case "familia":
                return "orange";
        }
    }

    return (
        <>
            <div className={"bg-" + typeColor() + "-400 text-white pt-2 pb-2 pl-4 pr-4 flex gap-10 rounded-lg mb-5 mt-2 w-96 flex justify-between items-center align-center"}>
                <div className="flex flex-col justify-start">
                    <p className="text-xl">{tarea}</p>
                    <p className="italic text-sm ">{tipo.toUpperCase()}</p>
                </div>
                <button className="text-3xl" onClick={eliminaTarea}>x</button>
            </div>

        </>
    )
}

export default Tarea;
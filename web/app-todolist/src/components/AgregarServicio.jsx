import { handleModal } from '../helpers/helpers.js'
import { useRef, useState} from 'react';
import { validateService } from '../schemas/service.js';


export const AgregarServicio = ()=> {
    const [message, setMessage] = useState('')

    //Obtenemos valores de los inputs
    let fechaRef = useRef();
    let duenioRef = useRef();
    let marcaRef = useRef();
    let modeloRef = useRef();
    let patenteRef = useRef();
    let servicioRef = useRef();
    let descripcionRef = useRef();
    let costoRepuestosRef = useRef();
    let costoRepuestosTotalRef = useRef();
    let costoManoDeObraRef = useRef();


    const handleAdd = () => {
        const fechaConBarras = fechaRef.current.value.replace(/-/g, '/')
        const [anio, mes, dia] = fechaConBarras.split('/')

        const fechaConvertida = `${dia}/${mes}/${anio}`

        const nuevoServicio = {
            fecha: fechaConvertida,
            duenio: duenioRef.current.value,
            marca: marcaRef.current.value,
            modelo: modeloRef.current.value,
            patente: patenteRef.current.value,
            servicio: servicioRef.current.value,
            descripcion: descripcionRef.current.value,
            costo_repuestos: Number(costoRepuestosRef.current.value),
            costo_repuestos_total: Number(costoRepuestosTotalRef.current.value),
            costo_mano_de_obra: Number(costoManoDeObraRef.current.value),
        };

        //Validamos los datos
        const result = validateService(nuevoServicio)
        if (!result.success) {
            let message = JSON.parse(result.error.message)
            setMessage(message[0].message)
        } else {
            setMessage('')

            fetch('http://localhost:1234/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoServicio),
            })
            .then(res => res.json())
            .then(() => {
                handleModal('agregar-servicio')
                fechaRef.current.value = '';
                duenioRef.current.value = '';
                marcaRef.current.value = '';
                modeloRef.current.value = '';
                patenteRef.current.value = '';
                servicioRef.current.value = '';
                descripcionRef.current.value = '';
                costoRepuestosRef.current.value = '';
                costoRepuestosTotalRef.current.value = '';
                costoManoDeObraRef.current.value = '';
            })
            .catch(()=> {
                setMessage('Error al agregar servicio')
            })
        }
    };

    return (
        <div id="agregar-servicio" className="bg-[#000000d2] h-screen w-full justify-center items-center z-40 absolute top-0 left-0 hidden">
            <div className="bg-black p-6 max-w-[700px] border-azul border-2 relative grid grid-cols-12 gap-4">
                <span className="absolute top-0 right-0 text-center m-2 font-bold cursor-pointer text-white" onClick={()=> handleModal('agregar-servicio')}>X</span>
                <div className="flex flex-col gap-1 col-span-6">
                    <label htmlFor="fecha" className="font-bold text-white">Fecha:</label>
                    <input ref={fechaRef} type="date" name="fecha" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm max-w-[150px] text-center bg-[#ccc]"/>
                </div>
                <div className="flex flex-col gap-1 col-span-6">
                    <label htmlFor="duenio" className="font-bold text-white">Dueño:</label>
                    <input ref={duenioRef} type="string" name="duenio" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm max-w-[250px] bg-[#ccc]"/>
                </div>
                <div className="flex flex-col gap-1 col-span-4">
                    <label htmlFor="marca" className="font-bold text-white">Marca:</label>
                    <input ref={marcaRef} type="string" name="marca" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm bg-[#ccc]"/>
                </div>
                <div className="flex flex-col gap-1 col-span-4">
                    <label htmlFor="modelo" className="font-bold text-white">Modelo:</label>
                    <input ref={modeloRef} type="string" name="modelo" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm bg-[#ccc]"/>
                </div>
                <div className="flex flex-col gap-1 col-span-4">
                    <label htmlFor="patente" className="font-bold text-white">Patente:</label>
                    <input ref={patenteRef} type="string" name="patente" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm bg-[#ccc]"/>
                </div>
                <div className="flex flex-col gap-1 col-span-12">
                    <label htmlFor="servicio" className="font-bold text-white">Servicio:</label>
                    <input ref={servicioRef} type="string" name="servicio" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm bg-[#ccc]"/>
                </div>
                <div className="flex flex-col gap-1 col-span-12">
                    <label htmlFor="descripcion" className="font-bold text-white">Descripcion:</label>
                    <textarea ref={descripcionRef} type="string" name="descripcion" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm resize-none bg-[#ccc]"/>
                </div>
                <div className="flex flex-col gap-1 col-span-4">
                    <label htmlFor="costo_repuestos" className="font-bold text-white">Costo repuestos:</label>
                    <input ref={costoRepuestosRef} type="string" name="costo_repuestos" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm bg-[#ccc]"/>
                </div>
                <div className="flex flex-col gap-1 col-span-4">
                    <label htmlFor="costo_repuestos_total" className="font-bold text-white">Costo repuestos total:</label>
                    <input ref={costoRepuestosTotalRef} type="string" name="costo_repuestos_total" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm bg-[#ccc]"/>
                </div>
                <div className="flex flex-col gap-1 col-span-4">
                    <label htmlFor="costo_mano_de_obra" className="font-bold text-white">Costo mano de obra:</label>
                    <input ref={costoManoDeObraRef} type="string" name="costo_mano_de_obra" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm bg-[#ccc]"/>
                </div>
                <div className="flex justify-end mx-2 gap-1 col-span-12">
                    <button className='text-white border-2 border-azul py-1 px-4 rounded-md font-bold tracking-wide hover:bg-azul hover:transition-all transition-all' onClick={handleAdd}>Agregar</button>
                </div>
                <p className='text-rojo col-span-12 px-1'>{message != "" && message}</p>
            </div>
        </div>
                
    )
}
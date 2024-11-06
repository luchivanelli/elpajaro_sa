import { ServicesContext } from '../context/servicesContext';
import { ServiceInfo } from './ServiceInfo';
import { useContext, useEffect, useState } from 'react';
import iconDelete from '../assets/images/trash.svg';
import iconEdit from '../assets/images/pencil.svg';
import iconEye from '../assets/images/eye.svg';
import { AgregarServicio } from './AgregarServicio';
import { handleModal } from '../helpers/helpers.js';
import { EditarServicio } from './EditarServicio';

export const Lista = () => {
    const servicios = useContext(ServicesContext);
    servicios.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    const [servicio, setServicio] = useState({});
    const [bandera, setBandera] = useState(false);
    const [message, setMessage] = useState('');
    const [valueInput, setValueInput] = useState('');
    const [serviciosFiltrados, setServiciosFiltrados] = useState(servicios); // Nuevo estado para los servicios filtrados
    const [isSorting, setIsSorting] = useState(false)
    
    useEffect(() => {
        if (bandera) {
            fetch(`http://localhost:1234/${servicio.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(servicio),
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Error ${res.status}: ${res.statusText}`);
                    }
                    return res.json();
                })
                .then(() => {
                    handleModal('modal-confirmacion');
                    setMessage('');
                })
                .catch((error) => {
                    setMessage(`Ocurrió un error: ${error.message}`);
                });

            setBandera(false);
        }
    }, [bandera, servicio]);

    // Inicializar servicios filtrados cuando los servicios cambian
    // useEffect(() => {
    //     setServiciosFiltrados(servicios);
    // }, [servicios]);

    useEffect(() => {
        if (!isSorting) { //Si se está ordenando por fecha, no se actualiza por filtro
            const filteredServices = servicios.filter(servicio =>
                servicio.duenio.toLowerCase().includes(valueInput.toLowerCase())
            );
            setServiciosFiltrados(filteredServices);
        }

    }, [valueInput, servicios, isSorting]); // Dependencias para que se ejecute cuando cambie el input o los servicios

    // Guarda el servicio correspondiente para mostrar la info del mismo
    const handleServicio = (servicio, id) => {
        setServicio(servicio);
        handleModal(id);
    };

    const deleteServicio = (servicio) => {
        handleServicio(servicio, 'modal-confirmacion');
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setValueInput(value); // Actualiza el valor del input
        setIsSorting(false) //Desactiva el ordenamiento por fecha
    };

    const handleOrdenar = () => {
        // Crear una nueva copia del array de servicios filtrados
        const serviciosOrdenados = [...serviciosFiltrados];
    
        // Obtener el estado de los radio buttons
        const fechaReciente = document.querySelector('input[name="fecha"]:checked').id === 'fecha-reciente';
    
        // Ordenar según la selección
        if (fechaReciente) {
            serviciosOrdenados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Fecha más reciente primero
        } else {
            serviciosOrdenados.sort((a, b) => new Date(a.fecha) - new Date(b.fecha)); // Fecha más antigua primero
        }
    
        // Actualizar el estado de servicios filtrados
        setServiciosFiltrados(serviciosOrdenados);
        setIsSorting(true)
        
        // Cerrar el modal
        handleModal('modal-ordenar');
    }

    return (
        <div className="border-4 border-naranja rounded-sm mx-auto my-2 max-w-[1200px] w-full">
            <div className="bg-naranja flex justify-between items-center p-2">
                <h3 className="text-black font-bold text-lg">Lista de servicios</h3>
                <div className='flex gap-2'>
                    <button onClick={() => handleModal('agregar-servicio')} className='border-2 border-white py-0.5 px-2 rounded-xl text-sm font-bold hover:bg-white hover:text-naranja text-white bg-naranja transition-all'>+ Agregar</button>    
                    <button onClick={() => handleModal('modal-ordenar')} className='border-2 border-white py-0.5 px-2 rounded-xl text-sm font-bold hover:bg-white hover:text-naranja text-white bg-naranja transition-all'>↑↓ Ordenar</button>
                    <input value={valueInput} onChange={handleChange} type="text" placeholder='Buscar por dueño' className='px-1.5 rounded-xl text-sm' />
                </div>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="text-white">
                        <th>Fecha</th>
                        <th>Dueño</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Patente</th>
                        <th>Servicio</th>
                    </tr>
                </thead>
                <tbody>
                    {serviciosFiltrados.map((servicio) => {
                        return (
                            <tr className="text-white text-center" key={servicio.id}>
                                <td>{new Date(servicio.fecha).toLocaleDateString('es-ES')}</td>
                                <td>{servicio.duenio}</td>
                                <td>{servicio.marca}</td>
                                <td>{servicio.modelo}</td>
                                <td>{servicio.patente}</td>
                                <td>{servicio.servicio}</td>
                                <td className="flex px-4 justify-center items-center h-[40px] gap-1 border-0 border-t">
                                    <img src={iconEye} alt="" className="cursor-pointer" onClick={() => handleServicio(servicio, 'service-info')} />
                                    <img src={iconEdit} alt="" className="cursor-pointer" onClick={() => handleServicio(servicio, 'editar-servicio')} />
                                    <img src={iconDelete} alt="" className="cursor-pointer" onClick={() => deleteServicio(servicio)} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div id='modal-confirmacion' className="bg-[#000000d2] h-screen w-full justify-center items-center z-40 absolute top-0 left-0 hidden">
                <div className='bg-white border-rojo border-2 rounded'>
                    <p className='bg-rojo text-white p-2 text-[18px]'>Estás seguro de eliminar este servicio?</p>
                    <div className='flex justify-center items-center gap-5 p-5'>
                        <button type='button' onClick={() => handleModal('modal-confirmacion')} className='px-3 py-1 border-2 border-rojo hover:text-white hover:bg-rojo transition-all rounded-md'>Cancelar</button>
                        <button type='button' onClick={() => setBandera(true)} className='px-3 py-1 border-2 border-rojo hover:text-white hover:bg-rojo transition-all rounded-md'>Eliminar</button>
                    </div>
                    {message !== '' ? <p className='p-2 pt-0'>{message}</p> : null}
                </div>
            </div>
            <div id='modal-ordenar' className="bg-[#000000d2] h-screen w-full justify-center items-center z-40 absolute top-0 left-0 hidden">
                <div className='bg-white border-azul border-2 rounded'>
                    <p className='bg-azul text-white p-2 text-[18px]'>Ordenar por:</p>
                    <form className='p-3 pb-0'>
                        <div className='p-1'>
                            <input id='fecha-reciente' name='fecha' type="radio" className='mr-2'/>
                            <label htmlFor="fecha-reciente">Fecha mas reciente</label>
                        </div>
                        <div className='p-1'>
                            <input id='fecha-antigua' name='fecha' type="radio" className='mr-2'/>
                            <label htmlFor="fecha-antigua">Fecha mas antigua</label>
                        </div>
                    </form>
                    <div className='flex justify-center items-center gap-5 p-5'>
                        <button type='button' onClick={() => handleOrdenar()} className='px-3 py-1 border-2 border-azul hover:text-white hover:bg-azul transition-all rounded-md'>Aceptar</button>
                    </div>
                    {message !== '' ? <p className='p-2 pt-0'>{message}</p> : null}
                </div>
            </div>
            <ServiceInfo servicio={servicio} />
            <AgregarServicio />
            <EditarServicio servicio={servicio} />
        </div>
    );
}

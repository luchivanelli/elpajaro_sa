import { handleModal } from '../helpers/helpers.js'
import { useState, useEffect } from 'react';
import { validateService } from '../schemas/service.js';
import PropTypes from 'prop-types';

export const EditarServicio = ({ servicio }) => {
    const [message, setMessage] = useState('');
    const [fecha, setFecha] = useState('');
    const [duenio, setDuenio] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [patente, setPatente] = useState('');
    const [servicioName, setServicioName] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [costoRepuestos, setCostoRepuestos] = useState('');
    const [costoRepuestosTotal, setCostoRepuestosTotal] = useState('');
    const [costoManoDeObra, setCostoManoDeObra] = useState('');

    useEffect(() => {
        if (servicio) {
            setFecha(formatDate(servicio.fecha) || '');
            setDuenio(servicio.duenio || '');
            setMarca(servicio.marca || '');
            setModelo(servicio.modelo || '');
            setPatente(servicio.patente || '');
            setServicioName(servicio.servicio || '');
            setDescripcion(servicio.descripcion || '');
            setCostoRepuestos(servicio.costo_repuestos || 0);
            setCostoRepuestosTotal(servicio.costo_repuestos_total || 0);
            setCostoManoDeObra(servicio.costo_mano_de_obra || 0);
        }
    }, [servicio]);

    const handleAdd = () => {
        const fechaConBarras = fecha.replace(/-/g, '/');
        const [anio, mes, dia] = fechaConBarras.split('/');
        const fechaConvertida = `${dia}/${mes}/${anio}`;

        const nuevoServicio = {
            fecha: fechaConvertida,
            duenio,
            marca,
            modelo,
            patente,
            servicio: servicioName,
            descripcion,
            costo_repuestos: Number(costoRepuestos),
            costo_repuestos_total: Number(costoRepuestosTotal),
            costo_mano_de_obra: Number(costoManoDeObra),
        };

        const result = validateService(nuevoServicio);
        if (!result.success) {
            let message = JSON.parse(result.error.message);
            setMessage(message[0].message);
        } else {
            setMessage('');

            fetch(`http://localhost:1234/${servicio.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoServicio),
            })
                .then(res => res.json())
                .then(() => {
                    handleModal('editar-servicio');
                    resetForm();
                })
                .catch(() => {
                    setMessage('Error al agregar servicio');
                });
        }
    };

    const formatDate = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toISOString().split('T')[0];
    };

    const resetForm = () => {
        setFecha('');
        setDuenio('');
        setMarca('');
        setModelo('');
        setPatente('');
        setServicioName('');
        setDescripcion('');
        setCostoRepuestos('');
        setCostoRepuestosTotal('');
        setCostoManoDeObra('');
    };

    return (
        servicio ? (
            <div id="editar-servicio" className="bg-[#000000d2] h-screen w-full justify-center items-center z-40 absolute top-0 left-0 hidden">
                <div className="bg-black p-6 max-w-[700px] border-azul border-2 relative grid grid-cols-12 gap-4">
                    <span className="absolute top-0 right-0 text-center m-2 font-bold cursor-pointer text-white" onClick={() => {
                        handleModal('editar-servicio')
                        setMessage('')
                    }}>X</span>
                    <div className="flex flex-col gap-1 col-span-6">
                        <label htmlFor="fecha" className="font-bold text-white">Fecha:</label>
                        <input value={formatDate(fecha)} onChange={(e) => setFecha(e.target.value)} type="date" name="fecha" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm max-w-[150px] text-center bg-[#ccc]" />
                    </div>
                    <div className="flex flex-col gap-1 col-span-6">
                        <label htmlFor="duenio" className="font-bold text-white">Dueño:</label>
                        <input value={duenio} onChange={(e) => setDuenio(e.target.value)} type="text" name="duenio" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm max-w-[250px] bg-[#ccc]" />
                    </div>
                    <div className="flex flex-col gap-1 col-span-4">
                        <label htmlFor="marca" className="font-bold text-white">Marca:</label>
                        <input value={marca} onChange={(e) => setMarca(e.target.value)} type="text" name="marca" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm bg-[#ccc]" />
                    </div>
                    <div className="flex flex-col gap-1 col-span-4">
                        <label htmlFor="modelo" className="font-bold text-white">Modelo:</label>
                        <input value={modelo} onChange={(e) => setModelo(e.target.value)} type="text" name="modelo" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm bg-[#ccc]" />
                    </div>
                    <div className="flex flex-col gap-1 col-span-4">
                        <label htmlFor="patente" className="font-bold text-white">Patente:</label>
                        <input value={patente} onChange={(e) => setPatente(e.target.value)} type="text" name="patente" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm bg-[#ccc]" />
                    </div>
                    <div className="flex flex-col gap-1 col-span-12">
                        <label htmlFor="servicio" className="font-bold text-white">Servicio:</label>
                        <input value={servicioName} onChange={(e) => setServicioName(e.target.value)} type="text" name="servicio" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm bg-[#ccc]" />
                    </div>
                    <div className="flex flex-col gap-1 col-span-12">
                        <label htmlFor="descripcion" className="font-bold text-white">Descripción:</label>
                        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} name="descripcion" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm resize-none bg-[#ccc]" />
                    </div>
                    <div className="flex flex-col gap-1 col-span-4">
                        <label htmlFor="costo_repuestos" className="font-bold text-white">Costo repuestos:</label>
                        <input value={costoRepuestos} onChange={(e) => setCostoRepuestos(e.target.value)} type="text" name="costo_repuestos" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm bg-[#ccc]" />
                    </div>
                    <div className="flex flex-col gap-1 col-span-4">
                        <label htmlFor="costo_repuestos_total" className="font-bold text-white">Costo repuestos total:</label>
                        <input value={costoRepuestosTotal} onChange={(e) => setCostoRepuestosTotal(e.target.value)} type="text" name="costo_repuestos_total" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm bg-[#ccc]" />
                    </div>
                    <div className="flex flex-col gap-1 col-span-4">
                        <label htmlFor="costo_mano_de_obra" className="font-bold text-white">Costo mano de obra:</label>
                        <input value={costoManoDeObra} onChange={(e) => setCostoManoDeObra(e.target.value)} type="text" name="costo_mano_de_obra" className="border-2 border-azul rounded py-0.5 px-1.5 text-sm bg-[#ccc]" />
                    </div>
                    <div className="flex justify-end mx-2 gap-1 col-span-12">
                        <button className='text-white border-2 border-azul py-1 px-4 rounded-md font-bold tracking-wide hover:bg-azul hover:transition-all transition-all' onClick={handleAdd}>Agregar</button>
                    </div>
                    <p className='text-rojo col-span-12 px-1'>{message && message}</p>
                </div>
            </div>
        ) : null
    );
};

EditarServicio.propTypes = {
    servicio: PropTypes.shape({
        id: PropTypes.number,
        fecha: PropTypes.string,
        duenio: PropTypes.string,
        marca: PropTypes.string,
        modelo: PropTypes.string,
        patente: PropTypes.string,
        servicio: PropTypes.string,
        descripcion: PropTypes.string,
        costo_repuestos: PropTypes.number,
        costo_repuestos_total: PropTypes.number,
        costo_mano_de_obra: PropTypes.number,
    }).isRequired,
};


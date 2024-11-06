/* eslint-disable react/prop-types */
import { handleModal } from '../helpers/helpers.js'

export const ServiceInfo = ({servicio})=> {
    return (
        <div id="service-info" className="bg-[#000000d2] h-screen w-full justify-center items-center z-40 absolute top-0 left-0 hidden">
            <div className="bg-black px-6 py-8 max-w-[800px] border-2 border-naranja relative">
                <span className="absolute top-0 right-0 text-center m-2 font-bold cursor-pointer text-white" onClick={()=> handleModal('service-info')}>X</span>
                <div className="flex gap-5 p-3 justify-between border-2 border-naranja">
                    <div className="flex gap-1">
                        <b className="text-naranja">Fecha:</b>
                        <p className="font-bold text-white">{new Date(servicio.fecha).toLocaleDateString('es-ES')}</p>
                    </div>
                    <div className="flex gap-1">
                        <b className="text-naranja">Dueño:</b>
                        <p className="font-bold text-white">{servicio.duenio}</p>
                    </div>
                </div>

                <div className="flex gap-5 py-3 justify-between px-2">
                    <div className="flex gap-1">
                        <b className="text-naranja">Marca:</b>
                        <p className="text-white">{servicio.marca}</p>
                    </div>
                    <div className="flex gap-1">
                        <b className="text-naranja">Modelo:</b>
                        <p className="text-white">{servicio.modelo}</p>
                    </div>
                    <div className="flex gap-1">
                        <b className="text-naranja">Patente:</b>
                        <p className="text-white">{servicio.patente}</p>
                    </div>
                </div>

                <div className="flex gap-1 py-3 px-2">
                    <b className="text-naranja">Servicio:</b>
                    <p className="text-white">{servicio.servicio}</p>
                </div>

                <div className="flex gap-1 py-3 px-2">
                    <b className="text-naranja">Descripcion:</b>
                    <p className="text-white">{servicio.descripcion}</p>
                </div>

                <div className="flex gap-5 py-3 justify-between px-2">
                    <div className="flex gap-1">
                        <b className="text-naranja">Costo repuesto:</b>
                        <p className="text-white">{Number(servicio.costo_repuestos) || 0}</p>
                    </div>
                    <div className="flex gap-1">
                        <b className="text-naranja">Costo repuesto total:</b>
                        <p className="text-white">{Number(servicio.costo_repuestos_total) || 0}</p>
                    </div>
                    <div className="flex gap-1">
                        <b className="text-naranja">Costo mano de obra:</b>
                        <p className="text-white">{Number(servicio.costo_mano_de_obra) || 0}</p>
                    </div>
                </div>

                <div className="flex gap-1 p-3 justify-end bg-naranja text-[18px]">
                    <b className="text-white">Ganancia:</b>
                    <p className="text-black font-bold">
                        {(() => {
                            const costoManoDeObra = Number(servicio.costo_mano_de_obra) || 0;
                            const costoRepuestosTotal = Number(servicio.costo_repuestos_total) || 0;
                            const costoRepuestos = Number(servicio.costo_repuestos) || 0;

                            const ganancia = costoManoDeObra + (costoRepuestosTotal - costoRepuestos);
                            return isNaN(ganancia) ? '0' : ganancia;
                        })()}
                    </p>
                </div>

            </div>
        </div>
    )
}
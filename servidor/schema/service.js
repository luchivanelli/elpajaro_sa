import z from 'zod'

const serviceSchema = z.object({
    fecha: z.string().length(10),
    duenio: z.string(),
    marca: z.string(),
    modelo: z.string(),
    patente: z.string(),
    servicio: z.string(),
    descripcion: z.string().nullable(),
    costo_repuestos: z.number().int().nonnegative(), // Requerido, debe ser un número entero positivo o cero
    costo_repuestos_total: z.number().int().nonnegative(), // Requerido
    costo_mano_de_obra: z.number().int().nonnegative(), // Requerido
})

export function validateService (input) {
  return serviceSchema.safeParse(input)
}

export function validatePartialService (input) {
  return serviceSchema.partial().safeParse(input)
}
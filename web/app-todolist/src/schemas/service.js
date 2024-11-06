import z from 'zod'

const serviceSchema = z.object({
  fecha: z.string().length(10, 'La fecha debe tener 10 caracteres'), // Requerido y debe tener exactamente 10 caracteres
  duenio: z.string().min(1, { message: "El dueño es requerido" }), // Requerido y debe tener al menos 1 carácter
  marca: z.string().min(1, { message: "La marca es requerida" }), // Requerido
  modelo: z.string().min(1, { message: "El modelo es requerido" }), // Requerido
  patente: z.string().min(1, { message: "La patente es requerida" }), // Requerido
  servicio: z.string().min(1, { message: "El servicio es requerido" }), // Requerido
  descripcion: z.string().nullable(), // Opcional
  costo_repuestos: z.number().int().nonnegative(), // Requerido, debe ser un número entero positivo o cero
  costo_repuestos_total: z.number().int().nonnegative(), // Requerido
  costo_mano_de_obra: z.number().int().nonnegative(), // Requerido
})
export function validateService (input) {
  return serviceSchema.safeParse(input)
}
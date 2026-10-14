import { businessCrudSwagger } from "../../../shared/http/crud-swagger";

export const routineExerciseSwagger = businessCrudSwagger({
  tag: "Rutina-ejercicios",
  description:
    "Relación N:M entre rutina y ejercicio (principal_id / relacionado_id) — SIN AUTH",
  path: "/api/rutina-ejercicios",
  schemaName: "RoutineExercise",
  listKey: "routineExercises",
  itemKey: "routineExercise",
  deactivate: true,
  example: {
    rutinaId: 1,
    ejercicioId: 1,
    datosRelacion: "4x12 60kg",
    status: "active",
  },
});

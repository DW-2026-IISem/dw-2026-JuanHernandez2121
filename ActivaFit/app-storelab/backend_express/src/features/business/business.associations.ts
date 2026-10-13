import { Client } from "./client/client.model";
import { Plan } from "./plans/plan.model";
import { Membership } from "./membership/membership.model";
import { Attendance } from "./attendances/attendance.model";
import { Trainer } from "./trainers/trainer.model";
import { Routine } from "./routines/routine.model";
import { Exercise } from "./exercises/exercise.model";
import { RoutineExercise } from "./routine-exercises/routine-exercise.model";
import { Measurement } from "./measurements/measurement.model";
import { Payment } from "./payments/payment.model";

Membership.belongsTo(Plan, { foreignKey: "planId", as: "plan" });
Plan.hasMany(Membership, { foreignKey: "planId", as: "memberships" });

Membership.belongsTo(Client, { foreignKey: "clienteId", as: "cliente" });
Client.hasMany(Membership, { foreignKey: "clienteId", as: "memberships" });

Attendance.belongsTo(Membership, {
  foreignKey: "membresiaId",
  as: "membresia",
});
Membership.hasMany(Attendance, {
  foreignKey: "membresiaId",
  as: "asistencias",
});

Routine.belongsTo(Trainer, { foreignKey: "entrenadorId", as: "entrenador" });
Trainer.hasMany(Routine, { foreignKey: "entrenadorId", as: "rutinas" });

Routine.belongsTo(Client, { foreignKey: "clienteId", as: "cliente" });
Client.hasMany(Routine, { foreignKey: "clienteId", as: "rutinas" });

RoutineExercise.belongsTo(Routine, { foreignKey: "rutinaId", as: "rutina" });
Routine.hasMany(RoutineExercise, {
  foreignKey: "rutinaId",
  as: "rutinaEjercicios",
});

RoutineExercise.belongsTo(Exercise, {
  foreignKey: "ejercicioId",
  as: "ejercicio",
});
Exercise.hasMany(RoutineExercise, {
  foreignKey: "ejercicioId",
  as: "rutinaEjercicios",
});

Measurement.belongsTo(Client, { foreignKey: "clienteId", as: "cliente" });
Client.hasMany(Measurement, { foreignKey: "clienteId", as: "mediciones" });

Measurement.belongsTo(Trainer, {
  foreignKey: "entrenadorId",
  as: "entrenador",
});
Trainer.hasMany(Measurement, {
  foreignKey: "entrenadorId",
  as: "mediciones",
});

Payment.belongsTo(Membership, {
  foreignKey: "referenciaId",
  constraints: false,
  as: "membresia",
});
Membership.hasMany(Payment, {
  foreignKey: "referenciaId",
  constraints: false,
  as: "pagos",
});

import { Request, Response } from "express";
import {
  RoutineExercise,
  RoutineExerciseI,
} from "./routine-exercise.model";
import { Routine } from "../routines/routine.model";
import { Exercise } from "../exercises/exercise.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

async function assertRoutineAndExercise(
  rutinaId: number,
  ejercicioId: number
) {
  const routine = await Routine.findByPk(rutinaId);
  if (!routine) {
    return { ok: false as const, status: 404, error: "Rutina no encontrada" };
  }

  const exercise = await Exercise.findByPk(ejercicioId);
  if (!exercise) {
    return { ok: false as const, status: 404, error: "Ejercicio no encontrado" };
  }

  return { ok: true as const };
}

export class RoutineExerciseController {
  public async getAll(_req: Request, res: Response) {
    try {
      const items = await RoutineExercise.findAll({
        where: { status: "active" },
        order: [["id", "ASC"]],
      });
      res.status(200).json({ routineExercises: items });
    } catch (error) {
      res.status(500).json({
        error: "Error obteniendo rutina-ejercicios",
        detail: String(error),
      });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const item = await RoutineExercise.findByPk(paramId(req));
      if (!item) {
        res.status(404).json({ error: "Relación rutina-ejercicio no encontrada" });
        return;
      }
      res.status(200).json({ routineExercise: item });
    } catch (error) {
      res.status(500).json({
        error: "Error obteniendo rutina-ejercicio",
        detail: String(error),
      });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const body = req.body as RoutineExerciseI;
      const check = await assertRoutineAndExercise(
        Number(body.rutinaId),
        Number(body.ejercicioId)
      );
      if (!check.ok) {
        res.status(check.status).json({ error: check.error });
        return;
      }

      const item = await RoutineExercise.create({
        rutinaId: body.rutinaId,
        ejercicioId: body.ejercicioId,
        datosRelacion: body.datosRelacion ?? null,
        status: body.status ?? "active",
      });
      res.status(201).json({ routineExercise: item });
    } catch (error) {
      res.status(500).json({
        error: "Error creando rutina-ejercicio",
        detail: String(error),
      });
    }
  }

  public async updatePut(req: Request, res: Response) {
    try {
      const item = await RoutineExercise.findByPk(paramId(req));
      if (!item) {
        res.status(404).json({ error: "Relación rutina-ejercicio no encontrada" });
        return;
      }

      const body = req.body as RoutineExerciseI;
      const check = await assertRoutineAndExercise(
        Number(body.rutinaId),
        Number(body.ejercicioId)
      );
      if (!check.ok) {
        res.status(check.status).json({ error: check.error });
        return;
      }

      await item.update({
        rutinaId: body.rutinaId,
        ejercicioId: body.ejercicioId,
        datosRelacion: body.datosRelacion ?? null,
        status: body.status ?? item.status,
      });
      res.status(200).json({ routineExercise: item });
    } catch (error) {
      res.status(500).json({
        error: "Error actualizando rutina-ejercicio (PUT)",
        detail: String(error),
      });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const item = await RoutineExercise.findByPk(paramId(req));
      if (!item) {
        res.status(404).json({ error: "Relación rutina-ejercicio no encontrada" });
        return;
      }

      const body = req.body as Partial<RoutineExerciseI>;
      const rutinaId = body.rutinaId ?? item.rutinaId;
      const ejercicioId = body.ejercicioId ?? item.ejercicioId;

      if (body.rutinaId !== undefined || body.ejercicioId !== undefined) {
        const check = await assertRoutineAndExercise(
          Number(rutinaId),
          Number(ejercicioId)
        );
        if (!check.ok) {
          res.status(check.status).json({ error: check.error });
          return;
        }
      }

      await item.update({
        ...(body.rutinaId !== undefined && { rutinaId: body.rutinaId }),
        ...(body.ejercicioId !== undefined && { ejercicioId: body.ejercicioId }),
        ...(body.datosRelacion !== undefined && {
          datosRelacion: body.datosRelacion,
        }),
        ...(body.status !== undefined && { status: body.status }),
      });
      res.status(200).json({ routineExercise: item });
    } catch (error) {
      res.status(500).json({
        error: "Error actualizando rutina-ejercicio (PATCH)",
        detail: String(error),
      });
    }
  }

  public async deletePhysical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const item = await RoutineExercise.findByPk(id);
      if (!item) {
        res.status(404).json({ error: "Relación rutina-ejercicio no encontrada" });
        return;
      }
      await item.destroy();
      res.status(200).json({
        message: "Relación rutina-ejercicio eliminada",
        id,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error eliminando rutina-ejercicio",
        detail: String(error),
      });
    }
  }

  public async deleteLogical(req: Request, res: Response) {
    try {
      const item = await RoutineExercise.findByPk(paramId(req));
      if (!item) {
        res.status(404).json({ error: "Relación rutina-ejercicio no encontrada" });
        return;
      }
      await item.update({ status: "inactive" });
      res.status(200).json({
        message: "Relación rutina-ejercicio desactivada",
        routineExercise: item,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error desactivando rutina-ejercicio",
        detail: String(error),
      });
    }
  }
}

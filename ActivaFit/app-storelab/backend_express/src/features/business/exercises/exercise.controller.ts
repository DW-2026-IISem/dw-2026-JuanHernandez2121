import { Request, Response } from "express";
import { Exercise, ExerciseI } from "./exercise.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class ExerciseController {
  public async getAll(req: Request, res: Response) {
    try {
      const exercises = await Exercise.findAll({
        where: { status: "ACTIVE" },
        order: [["id", "ASC"]],
      });

      res.status(200).json({ exercises });
    } catch (error) {
      res.status(500).json({
        error: "Error obteniendo los ejercicios",
        detail: String(error),
      });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const exercise = await Exercise.findByPk(id);

      if (!exercise) {
        res.status(404).json({
          error: "Ejercicio no encontrado",
        });
        return;
      }

      res.status(200).json({ exercise });
    } catch (error) {
      res.status(500).json({
        error: "Error obteniendo el ejercicio",
        detail: String(error),
      });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const body = req.body as ExerciseI;

      const exercise = await Exercise.create({
        nombre: body.nombre,
        descripcion: body.descripcion ?? null,
        tipo: body.tipo,
        nivel: body.nivel ?? "BEGINNER",
        status: body.status ?? "ACTIVE",
      });

      res.status(201).json({ exercise });
    } catch (error) {
      res.status(500).json({
        error: "Error creando el ejercicio",
        detail: String(error),
      });
    }
  }

  public async updatePut(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as ExerciseI;

      const exercise = await Exercise.findByPk(id);

      if (!exercise) {
        res.status(404).json({
          error: "Ejercicio no encontrado",
        });
        return;
      }

      await exercise.update({
        nombre: body.nombre,
        descripcion: body.descripcion ?? null,
        tipo: body.tipo,
        nivel: body.nivel ?? exercise.nivel,
        status: body.status ?? exercise.status,
      });

      res.status(200).json({ exercise });
    } catch (error) {
      res.status(500).json({
        error: "Error actualizando el ejercicio (PUT)",
        detail: String(error),
      });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as Partial<ExerciseI>;

      const exercise = await Exercise.findByPk(id);

      if (!exercise) {
        res.status(404).json({
          error: "Ejercicio no encontrado",
        });
        return;
      }

      await exercise.update({
        ...(body.nombre !== undefined && {
          nombre: body.nombre,
        }),
        ...(body.descripcion !== undefined && {
          descripcion: body.descripcion,
        }),
        ...(body.tipo !== undefined && {
          tipo: body.tipo,
        }),
        ...(body.nivel !== undefined && {
          nivel: body.nivel,
        }),
        ...(body.status !== undefined && {
          status: body.status,
        }),
      });

      res.status(200).json({ exercise });
    } catch (error) {
      res.status(500).json({
        error: "Error actualizando el ejercicio (PATCH)",
        detail: String(error),
      });
    }
  }

  public async deletePhysical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const exercise = await Exercise.findByPk(id);

      if (!exercise) {
        res.status(404).json({
          error: "Ejercicio no encontrado",
        });
        return;
      }

      await exercise.destroy();

      res.status(200).json({
        message: "Ejercicio eliminado permanentemente",
        id,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error eliminando el ejercicio",
        detail: String(error),
      });
    }
  }

  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const exercise = await Exercise.findByPk(id);

      if (!exercise) {
        res.status(404).json({
          error: "Ejercicio no encontrado",
        });
        return;
      }

      await exercise.update({
        status: "INACTIVE",
      });

      res.status(200).json({
        message: "Ejercicio desactivado correctamente",
        exercise,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error desactivando el ejercicio",
        detail: String(error),
      });
    }
  }
}

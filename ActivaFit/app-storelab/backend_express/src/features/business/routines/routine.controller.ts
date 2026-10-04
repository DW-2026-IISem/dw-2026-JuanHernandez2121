import { Request, Response } from "express";
import { Routine, RoutineI } from "./routine.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class RoutineController {
  public async getAll(req: Request, res: Response) {
    try {
      const routines = await Routine.findAll({
        where: { status: "ACTIVE" },
        order: [["id", "ASC"]],
      });

      res.status(200).json({ routines });
    } catch (error) {
      res.status(500).json({
        error: "Error obteniendo las rutinas",
        detail: String(error),
      });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const routine = await Routine.findByPk(id);

      if (!routine) {
        res.status(404).json({
          error: "Rutina no encontrada",
        });
        return;
      }

      res.status(200).json({ routine });
    } catch (error) {
      res.status(500).json({
        error: "Error obteniendo la rutina",
        detail: String(error),
      });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const body = req.body as RoutineI;

      const routine = await Routine.create({
        nombre: body.nombre,
        descripcion: body.descripcion ?? null,
        status: body.status ?? "ACTIVE",
      });

      res.status(201).json({ routine });
    } catch (error) {
      res.status(500).json({
        error: "Error creando la rutina",
        detail: String(error),
      });
    }
  }

  public async updatePut(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as RoutineI;

      const routine = await Routine.findByPk(id);

      if (!routine) {
        res.status(404).json({
          error: "Rutina no encontrada",
        });
        return;
      }

      await routine.update({
        nombre: body.nombre,
        descripcion: body.descripcion ?? null,
        status: body.status ?? routine.status,
      });

      res.status(200).json({ routine });
    } catch (error) {
      res.status(500).json({
        error: "Error actualizando la rutina (PUT)",
        detail: String(error),
      });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as Partial<RoutineI>;

      const routine = await Routine.findByPk(id);

      if (!routine) {
        res.status(404).json({
          error: "Rutina no encontrada",
        });
        return;
      }

      await routine.update({
        ...(body.nombre !== undefined && {
          nombre: body.nombre,
        }),

        ...(body.descripcion !== undefined && {
          descripcion: body.descripcion,
        }),

        ...(body.status !== undefined && {
          status: body.status,
        }),
      });

      res.status(200).json({ routine });
    } catch (error) {
      res.status(500).json({
        error: "Error actualizando la rutina (PATCH)",
        detail: String(error),
      });
    }
  }

  public async deletePhysical(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const routine = await Routine.findByPk(id);

      if (!routine) {
        res.status(404).json({
          error: "Rutina no encontrada",
        });
        return;
      }

      await routine.destroy();

      res.status(200).json({
        message: "Rutina eliminada permanentemente",
        id,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error eliminando la rutina",
        detail: String(error),
      });
    }
  }

  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const routine = await Routine.findByPk(id);

      if (!routine) {
        res.status(404).json({
          error: "Rutina no encontrada",
        });
        return;
      }

      await routine.update({
        status: "INACTIVE",
      });

      res.status(200).json({
        message: "Rutina desactivada correctamente",
        routine,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error desactivando la rutina",
        detail: String(error),
      });
    }
  }
}

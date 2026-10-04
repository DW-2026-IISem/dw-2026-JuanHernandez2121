import { Request, Response } from "express";
import { Trainer, TrainerI } from "./trainer.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class TrainerController {
  public async getAll(req: Request, res: Response) {
    try {
      const trainers = await Trainer.findAll({
        where: { status: "ACTIVE" },
        order: [["id", "ASC"]],
      });

      res.status(200).json({ trainers });
    } catch (error) {
      res.status(500).json({
        error: "Error obteniendo los entrenadores",
        detail: String(error),
      });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const trainer = await Trainer.findByPk(id);

      if (!trainer) {
        res.status(404).json({
          error: "Entrenador no encontrado",
        });
        return;
      }

      res.status(200).json({ trainer });
    } catch (error) {
      res.status(500).json({
        error: "Error obteniendo el entrenador",
        detail: String(error),
      });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const body = req.body as TrainerI;

      const trainer = await Trainer.create({
        nombre: body.nombre,
        descripcion: body.descripcion ?? null,
        status: body.status ?? "ACTIVE",
      });

      res.status(201).json({ trainer });
    } catch (error) {
      res.status(500).json({
        error: "Error creando el entrenador",
        detail: String(error),
      });
    }
  }

  public async updatePut(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as TrainerI;

      const trainer = await Trainer.findByPk(id);

      if (!trainer) {
        res.status(404).json({
          error: "Entrenador no encontrado",
        });
        return;
      }

      await trainer.update({
        nombre: body.nombre,
        descripcion: body.descripcion ?? null,
        status: body.status ?? trainer.status,
      });

      res.status(200).json({ trainer });
    } catch (error) {
      res.status(500).json({
        error: "Error actualizando el entrenador (PUT)",
        detail: String(error),
      });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as Partial<TrainerI>;

      const trainer = await Trainer.findByPk(id);

      if (!trainer) {
        res.status(404).json({
          error: "Entrenador no encontrado",
        });
        return;
      }

      await trainer.update({
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

      res.status(200).json({ trainer });
    } catch (error) {
      res.status(500).json({
        error: "Error actualizando el entrenador (PATCH)",
        detail: String(error),
      });
    }
  }

  public async deletePhysical(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const trainer = await Trainer.findByPk(id);

      if (!trainer) {
        res.status(404).json({
          error: "Entrenador no encontrado",
        });
        return;
      }

      await trainer.destroy();

      res.status(200).json({
        message: "Entrenador eliminado permanentemente",
        id,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error eliminando el entrenador",
        detail: String(error),
      });
    }
  }

  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const trainer = await Trainer.findByPk(id);

      if (!trainer) {
        res.status(404).json({
          error: "Entrenador no encontrado",
        });
        return;
      }

      await trainer.update({
        status: "INACTIVE",
      });

      res.status(200).json({
        message: "Entrenador desactivado correctamente",
        trainer,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error desactivando el entrenador",
        detail: String(error),
      });
    }
  }
}

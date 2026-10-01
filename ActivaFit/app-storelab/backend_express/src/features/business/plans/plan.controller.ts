import { Request, Response } from "express";
import { Plan, PlanI } from "./plan.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class PlanController {
  // ================== READ ==================

  public async getAll(req: Request, res: Response) {
    try {
      const plans = await Plan.findAll({
        where: { is_active: true },
      });

      res.status(200).json({ plans });
    } catch (error) {
      res.status(500).json({
        error: "Error fetching plans",
        detail: String(error),
      });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const plan = await Plan.findByPk(id);

      if (!plan) {
        res.status(404).json({
          error: "Plan not found",
        });
        return;
      }

      res.status(200).json({ plan });
    } catch (error) {
      res.status(500).json({
        error: "Error fetching plan",
        detail: String(error),
      });
    }
  }

  // ================== CREATE ==================

  public async create(req: Request, res: Response) {
    try {
      const body = req.body as PlanI;

      const plan = await Plan.create({
        nombre: body.nombre,
        descripcion: body.descripcion ?? null,
        precio: body.precio,
        duracion: body.duracion,
        is_active: body.is_active ?? true,
      });

      res.status(201).json({ plan });
    } catch (error) {
      res.status(500).json({
        error: "Error creating plan",
        detail: String(error),
      });
    }
  }

  // ================== UPDATE ==================

  public async updatePut(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as PlanI;

      const plan = await Plan.findByPk(id);

      if (!plan) {
        res.status(404).json({
          error: "Plan not found",
        });
        return;
      }

      await plan.update({
        nombre: body.nombre,
        descripcion: body.descripcion ?? null,
        precio: body.precio,
        duracion: body.duracion,
        is_active: body.is_active ?? plan.is_active,
      });

      res.status(200).json({ plan });
    } catch (error) {
      res.status(500).json({
        error: "Error updating plan (PUT)",
        detail: String(error),
      });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as Partial<PlanI>;

      const plan = await Plan.findByPk(id);

      if (!plan) {
        res.status(404).json({
          error: "Plan not found",
        });
        return;
      }

      await plan.update(body);

      res.status(200).json({ plan });
    } catch (error) {
      res.status(500).json({
        error: "Error updating plan (PATCH)",
        detail: String(error),
      });
    }
  }

  // ================== DELETE ==================

  /** Eliminación física */
  public async deletePhysical(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const plan = await Plan.findByPk(id);

      if (!plan) {
        res.status(404).json({
          error: "Plan not found",
        });
        return;
      }

      await plan.destroy();

      res.status(200).json({
        message: "Plan permanently deleted",
        id,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error deleting plan",
        detail: String(error),
      });
    }
  }

  /** Eliminación lógica → is_active = false */
  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const plan = await Plan.findByPk(id);

      if (!plan) {
        res.status(404).json({
          error: "Plan not found",
        });
        return;
      }

      await plan.update({
        is_active: false,
      });

      res.status(200).json({
        message: "Plan deactivated (logical delete)",
        plan,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error deactivating plan",
        detail: String(error),
      });
    }
  }
}

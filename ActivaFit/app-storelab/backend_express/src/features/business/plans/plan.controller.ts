import { Request, Response } from "express";
import { Plan } from "./plan.model";

export class PlanController {

  private paramId(req: Request): number | null {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return null;
    }

    return id;
  }

  // GET /api/planes
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const plans = await Plan.findAll({
        where: {
          isActive: true,
        },
        order: [["id", "ASC"]],
      });

      return res.status(200).json({
        plans,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Error fetching plans",
        detail: String(error),
      });
    }
  }

  // GET /api/planes/:id
  public async getOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = this.paramId(req);

      if (id === null) {
        return res.status(400).json({
          error: "ID de plan inválido",
        });
      }

      const plan = await Plan.findByPk(id);

      if (!plan) {
        return res.status(404).json({
          error: "Plan no encontrado",
        });
      }

      return res.status(200).json(plan);
    } catch (error) {
      return res.status(500).json({
        error: "Error fetching plan",
        detail: String(error),
      });
    }
  }

  // POST /api/planes
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        nombre,
        descripcion,
        isActive,
      } = req.body;

      if (!nombre) {
        return res.status(400).json({
          error: "El campo nombre es obligatorio",
        });
      }

      const plan = await Plan.create({
        nombre,
        descripcion: descripcion ?? null,
        isActive: isActive ?? true,
      });

      return res.status(201).json(plan);
    } catch (error) {
      return res.status(500).json({
        error: "Error creating plan",
        detail: String(error),
      });
    }
  }

  // PUT /api/planes/:id
  public async updatePut(req: Request, res: Response): Promise<Response> {
    try {
      const id = this.paramId(req);

      if (id === null) {
        return res.status(400).json({
          error: "ID de plan inválido",
        });
      }

      const plan = await Plan.findByPk(id);

      if (!plan) {
        return res.status(404).json({
          error: "Plan no encontrado",
        });
      }

      const {
        nombre,
        descripcion,
        isActive,
      } = req.body;

      if (!nombre) {
        return res.status(400).json({
          error: "El campo nombre es obligatorio",
        });
      }

      await plan.update({
        nombre,
        descripcion: descripcion ?? null,
        isActive: isActive ?? true,
      });

      return res.status(200).json(plan);
    } catch (error) {
      return res.status(500).json({
        error: "Error updating plan",
        detail: String(error),
      });
    }
  }

  // PATCH /api/planes/:id
  public async updatePatch(req: Request, res: Response): Promise<Response> {
    try {
      const id = this.paramId(req);

      if (id === null) {
        return res.status(400).json({
          error: "ID de plan inválido",
        });
      }

      const plan = await Plan.findByPk(id);

      if (!plan) {
        return res.status(404).json({
          error: "Plan no encontrado",
        });
      }

      const {
        nombre,
        descripcion,
        isActive,
      } = req.body;

      await plan.update({
        ...(nombre !== undefined && { nombre }),
        ...(descripcion !== undefined && { descripcion }),
        ...(isActive !== undefined && { isActive }),
      });

      return res.status(200).json(plan);
    } catch (error) {
      return res.status(500).json({
        error: "Error patching plan",
        detail: String(error),
      });
    }
  }

  // DELETE /api/planes/:id
  public async deletePhysical(req: Request, res: Response): Promise<Response> {
    try {
      const id = this.paramId(req);

      if (id === null) {
        return res.status(400).json({
          error: "ID de plan inválido",
        });
      }

      const plan = await Plan.findByPk(id);

      if (!plan) {
        return res.status(404).json({
          error: "Plan no encontrado",
        });
      }

      await plan.destroy();

      return res.status(200).json({
        message: "Plan eliminado correctamente",
      });
    } catch (error) {
      return res.status(500).json({
        error: "Error deleting plan",
        detail: String(error),
      });
    }
  }

  // PATCH /api/planes/:id/deactivate
  public async deleteLogical(req: Request, res: Response): Promise<Response> {
    try {
      const id = this.paramId(req);

      if (id === null) {
        return res.status(400).json({
          error: "ID de plan inválido",
        });
      }

      const plan = await Plan.findByPk(id);

      if (!plan) {
        return res.status(404).json({
          error: "Plan no encontrado",
        });
      }

      await plan.update({
        isActive: false,
      });

      return res.status(200).json({
        message: "Plan desactivado correctamente",
        plan,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Error deactivating plan",
        detail: String(error),
      });
    }
  }
}

import { Request, Response } from "express";
import { Membership, MembershipI } from "./membership.model";
import { Plan } from "../plans/plan.model";
import { Client } from "../client/client.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

async function assertActivePlan(
  planId: number
): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const plan = await Plan.findByPk(planId);

  if (!plan) {
    return {
      ok: false,
      status: 404,
      error: "Plan no encontrado",
    };
  }

  if (!plan.isActive) {
    return {
      ok: false,
      status: 400,
      error: "El plan debe estar activo",
    };
  }

  return { ok: true };
}

async function assertActiveClient(
  clienteId: number
): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const client = await Client.findByPk(clienteId);

  if (!client) {
    return {
      ok: false,
      status: 404,
      error: "Cliente no encontrado",
    };
  }

  if (client.status !== "active") {
    return {
      ok: false,
      status: 400,
      error: "El cliente debe estar activo",
    };
  }

  return { ok: true };
}

export class MembershipController {

  // ================== READ ==================

  public async getAll(req: Request, res: Response) {
    try {
      const memberships = await Membership.findAll({
        where: {
          status: "active",
        },
        order: [["id", "ASC"]],
      });

      res.status(200).json({ memberships });
    } catch (error) {
      res.status(500).json({
        error: "Error obteniendo las membresías",
        detail: String(error),
      });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const membership = await Membership.findByPk(id);

      if (!membership) {
        res.status(404).json({
          error: "Membresía no encontrada",
        });
        return;
      }

      res.status(200).json({ membership });
    } catch (error) {
      res.status(500).json({
        error: "Error obteniendo la membresía",
        detail: String(error),
      });
    }
  }

  // ================== CREATE ==================

  public async create(req: Request, res: Response) {
    try {
      const body = req.body as MembershipI;

      const planCheck = await assertActivePlan(Number(body.planId));

      if (!planCheck.ok) {
        res.status(planCheck.status).json({
          error: planCheck.error,
        });
        return;
      }

      const clientCheck = await assertActiveClient(Number(body.clienteId));

      if (!clientCheck.ok) {
        res.status(clientCheck.status).json({
          error: clientCheck.error,
        });
        return;
      }

      const membership = await Membership.create({
        nombre: body.nombre,
        descripcion: body.descripcion ?? null,
        planId: body.planId,
        clienteId: body.clienteId,
        status: body.status ?? "active",
      });

      res.status(201).json({ membership });
    } catch (error) {
      res.status(500).json({
        error: "Error creando la membresía",
        detail: String(error),
      });
    }
  }

  // ================== UPDATE ==================

  public async updatePut(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as MembershipI;

      const membership = await Membership.findByPk(id);

      if (!membership) {
        res.status(404).json({
          error: "Membresía no encontrada",
        });
        return;
      }

      const planCheck = await assertActivePlan(Number(body.planId));

      if (!planCheck.ok) {
        res.status(planCheck.status).json({
          error: planCheck.error,
        });
        return;
      }

      const clientCheck = await assertActiveClient(Number(body.clienteId));

      if (!clientCheck.ok) {
        res.status(clientCheck.status).json({
          error: clientCheck.error,
        });
        return;
      }

      await membership.update({
        nombre: body.nombre,
        descripcion: body.descripcion ?? null,
        planId: body.planId,
        clienteId: body.clienteId,
        status: body.status ?? membership.status,
      });

      res.status(200).json({ membership });
    } catch (error) {
      res.status(500).json({
        error: "Error actualizando la membresía (PUT)",
        detail: String(error),
      });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as Partial<MembershipI>;

      const membership = await Membership.findByPk(id);

      if (!membership) {
        res.status(404).json({
          error: "Membresía no encontrada",
        });
        return;
      }

      if (body.planId !== undefined) {
        const planCheck = await assertActivePlan(Number(body.planId));

        if (!planCheck.ok) {
          res.status(planCheck.status).json({
            error: planCheck.error,
          });
          return;
        }
      }

      if (body.clienteId !== undefined) {
        const clientCheck = await assertActiveClient(
          Number(body.clienteId)
        );

        if (!clientCheck.ok) {
          res.status(clientCheck.status).json({
            error: clientCheck.error,
          });
          return;
        }
      }

      await membership.update({
        ...(body.nombre !== undefined && {
          nombre: body.nombre,
        }),

        ...(body.descripcion !== undefined && {
          descripcion: body.descripcion,
        }),

        ...(body.planId !== undefined && {
          planId: body.planId,
        }),

        ...(body.clienteId !== undefined && {
          clienteId: body.clienteId,
        }),

        ...(body.status !== undefined && {
          status: body.status,
        }),
      });

      res.status(200).json({ membership });
    } catch (error) {
      res.status(500).json({
        error: "Error actualizando la membresía (PATCH)",
        detail: String(error),
      });
    }
  }

  // ================== DELETE ==================

  /** Eliminación física */
  public async deletePhysical(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const membership = await Membership.findByPk(id);

      if (!membership) {
        res.status(404).json({
          error: "Membresía no encontrada",
        });
        return;
      }

      await membership.destroy();

      res.status(200).json({
        message: "Membresía eliminada permanentemente",
        id,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error eliminando la membresía",
        detail: String(error),
      });
    }
  }

  /** Eliminación lógica → status = inactive */
  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const membership = await Membership.findByPk(id);

      if (!membership) {
        res.status(404).json({
          error: "Membresía no encontrada",
        });
        return;
      }

      await membership.update({
        status: "inactive",
      });

      res.status(200).json({
        message: "Membresía desactivada correctamente",
        membership,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error desactivando la membresía",
        detail: String(error),
      });
    }
  }
}

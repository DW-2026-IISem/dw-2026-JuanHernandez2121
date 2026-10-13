import { Request, Response } from "express";
import { Payment, PaymentI } from "./payment.model";
import { Membership } from "../membership/membership.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

async function assertMembership(referenciaId: number) {
  const membership = await Membership.findByPk(referenciaId);
  if (!membership) {
    return { ok: false as const, status: 404, error: "Membresía no encontrada" };
  }
  return { ok: true as const };
}

export class PaymentController {
  public async getAll(_req: Request, res: Response) {
    try {
      const payments = await Payment.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json({ payments });
    } catch (error) {
      res.status(500).json({
        error: "Error obteniendo los pagos",
        detail: String(error),
      });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const payment = await Payment.findByPk(paramId(req));
      if (!payment) {
        res.status(404).json({ error: "Pago no encontrado" });
        return;
      }
      res.status(200).json({ payment });
    } catch (error) {
      res.status(500).json({
        error: "Error obteniendo el pago",
        detail: String(error),
      });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const body = req.body as PaymentI;
      const tipo = body.referenciaTipo ?? "MEMBRESIA";
      const check = await assertMembership(Number(body.referenciaId));
      if (!check.ok) {
        res.status(check.status).json({ error: check.error });
        return;
      }

      const payment = await Payment.create({
        referenciaTipo: tipo,
        referenciaId: body.referenciaId,
        metodo: body.metodo,
        monto: body.monto,
        fecha: body.fecha ?? new Date(),
        estado: body.estado ?? "PENDIENTE",
      });
      res.status(201).json({ payment });
    } catch (error) {
      res.status(500).json({
        error: "Error creando el pago",
        detail: String(error),
      });
    }
  }

  public async updatePut(req: Request, res: Response) {
    try {
      const payment = await Payment.findByPk(paramId(req));
      if (!payment) {
        res.status(404).json({ error: "Pago no encontrado" });
        return;
      }

      const body = req.body as PaymentI;
      const check = await assertMembership(Number(body.referenciaId));
      if (!check.ok) {
        res.status(check.status).json({ error: check.error });
        return;
      }

      await payment.update({
        referenciaTipo: body.referenciaTipo ?? "MEMBRESIA",
        referenciaId: body.referenciaId,
        metodo: body.metodo,
        monto: body.monto,
        fecha: body.fecha,
        estado: body.estado ?? payment.estado,
      });
      res.status(200).json({ payment });
    } catch (error) {
      res.status(500).json({
        error: "Error actualizando el pago (PUT)",
        detail: String(error),
      });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const payment = await Payment.findByPk(paramId(req));
      if (!payment) {
        res.status(404).json({ error: "Pago no encontrado" });
        return;
      }

      const body = req.body as Partial<PaymentI>;
      if (body.referenciaId !== undefined) {
        const check = await assertMembership(Number(body.referenciaId));
        if (!check.ok) {
          res.status(check.status).json({ error: check.error });
          return;
        }
      }

      await payment.update({
        ...(body.referenciaTipo !== undefined && {
          referenciaTipo: body.referenciaTipo,
        }),
        ...(body.referenciaId !== undefined && {
          referenciaId: body.referenciaId,
        }),
        ...(body.metodo !== undefined && { metodo: body.metodo }),
        ...(body.monto !== undefined && { monto: body.monto }),
        ...(body.fecha !== undefined && { fecha: body.fecha }),
        ...(body.estado !== undefined && { estado: body.estado }),
      });
      res.status(200).json({ payment });
    } catch (error) {
      res.status(500).json({
        error: "Error actualizando el pago (PATCH)",
        detail: String(error),
      });
    }
  }

  public async deletePhysical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const payment = await Payment.findByPk(id);
      if (!payment) {
        res.status(404).json({ error: "Pago no encontrado" });
        return;
      }
      await payment.destroy();
      res.status(200).json({
        message: "Pago eliminado permanentemente",
        id,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error eliminando el pago",
        detail: String(error),
      });
    }
  }
}

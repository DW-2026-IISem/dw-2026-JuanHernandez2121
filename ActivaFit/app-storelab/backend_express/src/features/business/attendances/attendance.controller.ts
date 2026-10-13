import { Request, Response } from "express";
import { Attendance, AttendanceI } from "./attendance.model";
import { Membership } from "../membership/membership.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

async function assertActiveMembership(membresiaId: number) {
  const membership = await Membership.findByPk(membresiaId);

  if (!membership) {
    return { ok: false as const, status: 404, error: "Membresía no encontrada" };
  }

  if (membership.status !== "active") {
    return {
      ok: false as const,
      status: 400,
      error: "La membresía debe estar activa para registrar asistencia",
    };
  }

  return { ok: true as const };
}

export class AttendanceController {
  public async getAll(_req: Request, res: Response) {
    try {
      const attendances = await Attendance.findAll({
        where: { status: "active" },
        order: [["id", "ASC"]],
      });
      res.status(200).json({ attendances });
    } catch (error) {
      res.status(500).json({
        error: "Error obteniendo las asistencias",
        detail: String(error),
      });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const attendance = await Attendance.findByPk(paramId(req));
      if (!attendance) {
        res.status(404).json({ error: "Asistencia no encontrada" });
        return;
      }
      res.status(200).json({ attendance });
    } catch (error) {
      res.status(500).json({
        error: "Error obteniendo la asistencia",
        detail: String(error),
      });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const body = req.body as AttendanceI;
      const check = await assertActiveMembership(Number(body.membresiaId));
      if (!check.ok) {
        res.status(check.status).json({ error: check.error });
        return;
      }

      const attendance = await Attendance.create({
        membresiaId: body.membresiaId,
        fecha: body.fecha ?? new Date(),
        observaciones: body.observaciones ?? null,
        status: body.status ?? "active",
      });
      res.status(201).json({ attendance });
    } catch (error) {
      res.status(500).json({
        error: "Error creando la asistencia",
        detail: String(error),
      });
    }
  }

  public async updatePut(req: Request, res: Response) {
    try {
      const attendance = await Attendance.findByPk(paramId(req));
      if (!attendance) {
        res.status(404).json({ error: "Asistencia no encontrada" });
        return;
      }

      const body = req.body as AttendanceI;
      const check = await assertActiveMembership(Number(body.membresiaId));
      if (!check.ok) {
        res.status(check.status).json({ error: check.error });
        return;
      }

      await attendance.update({
        membresiaId: body.membresiaId,
        fecha: body.fecha,
        observaciones: body.observaciones ?? null,
        status: body.status ?? attendance.status,
      });
      res.status(200).json({ attendance });
    } catch (error) {
      res.status(500).json({
        error: "Error actualizando la asistencia (PUT)",
        detail: String(error),
      });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const attendance = await Attendance.findByPk(paramId(req));
      if (!attendance) {
        res.status(404).json({ error: "Asistencia no encontrada" });
        return;
      }

      const body = req.body as Partial<AttendanceI>;
      if (body.membresiaId !== undefined) {
        const check = await assertActiveMembership(Number(body.membresiaId));
        if (!check.ok) {
          res.status(check.status).json({ error: check.error });
          return;
        }
      }

      await attendance.update({
        ...(body.membresiaId !== undefined && { membresiaId: body.membresiaId }),
        ...(body.fecha !== undefined && { fecha: body.fecha }),
        ...(body.observaciones !== undefined && {
          observaciones: body.observaciones,
        }),
        ...(body.status !== undefined && { status: body.status }),
      });
      res.status(200).json({ attendance });
    } catch (error) {
      res.status(500).json({
        error: "Error actualizando la asistencia (PATCH)",
        detail: String(error),
      });
    }
  }

  public async deletePhysical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const attendance = await Attendance.findByPk(id);
      if (!attendance) {
        res.status(404).json({ error: "Asistencia no encontrada" });
        return;
      }
      await attendance.destroy();
      res.status(200).json({
        message: "Asistencia eliminada permanentemente",
        id,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error eliminando la asistencia",
        detail: String(error),
      });
    }
  }

  public async deleteLogical(req: Request, res: Response) {
    try {
      const attendance = await Attendance.findByPk(paramId(req));
      if (!attendance) {
        res.status(404).json({ error: "Asistencia no encontrada" });
        return;
      }
      await attendance.update({ status: "inactive" });
      res.status(200).json({
        message: "Asistencia desactivada correctamente",
        attendance,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error desactivando la asistencia",
        detail: String(error),
      });
    }
  }
}

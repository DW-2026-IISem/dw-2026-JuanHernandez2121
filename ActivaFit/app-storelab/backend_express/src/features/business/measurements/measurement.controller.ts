import { Request, Response } from "express";
import { Measurement, MeasurementI } from "./measurement.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class MeasurementController {
  public async getAll(req: Request, res: Response) {
    try {
      const measurements = await Measurement.findAll({
        order: [["id", "ASC"]],
      });

      res.status(200).json({ measurements });
    } catch (error) {
      res.status(500).json({
        error: "Error obteniendo las mediciones",
        detail: String(error),
      });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const measurement = await Measurement.findByPk(id);

      if (!measurement) {
        res.status(404).json({
          error: "Medición no encontrada",
        });
        return;
      }

      res.status(200).json({ measurement });
    } catch (error) {
      res.status(500).json({
        error: "Error obteniendo la medición",
        detail: String(error),
      });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const body = req.body as MeasurementI;

      const measurement = await Measurement.create({
        clienteId: body.clienteId,
        peso: body.peso,
        altura: body.altura,
        imc: body.imc,
        fecha: body.fecha,
      });

      res.status(201).json({ measurement });
    } catch (error) {
      res.status(500).json({
        error: "Error creando la medición",
        detail: String(error),
      });
    }
  }

  public async updatePut(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as MeasurementI;

      const measurement = await Measurement.findByPk(id);

      if (!measurement) {
        res.status(404).json({
          error: "Medición no encontrada",
        });
        return;
      }

      await measurement.update({
        clienteId: body.clienteId,
        peso: body.peso,
        altura: body.altura,
        imc: body.imc,
        fecha: body.fecha,
      });

      res.status(200).json({ measurement });
    } catch (error) {
      res.status(500).json({
        error: "Error actualizando la medición (PUT)",
        detail: String(error),
      });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as Partial<MeasurementI>;

      const measurement = await Measurement.findByPk(id);

      if (!measurement) {
        res.status(404).json({
          error: "Medición no encontrada",
        });
        return;
      }

      await measurement.update({
        ...(body.clienteId !== undefined && {
          clienteId: body.clienteId,
        }),
        ...(body.peso !== undefined && {
          peso: body.peso,
        }),
        ...(body.altura !== undefined && {
          altura: body.altura,
        }),
        ...(body.imc !== undefined && {
          imc: body.imc,
        }),
        ...(body.fecha !== undefined && {
          fecha: body.fecha,
        }),
      });

      res.status(200).json({ measurement });
    } catch (error) {
      res.status(500).json({
        error: "Error actualizando la medición (PATCH)",
        detail: String(error),
      });
    }
  }

  public async deletePhysical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const measurement = await Measurement.findByPk(id);

      if (!measurement) {
        res.status(404).json({
          error: "Medición no encontrada",
        });
        return;
      }

      await measurement.destroy();

      res.status(200).json({
        message: "Medición eliminada permanentemente",
        id,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error eliminando la medición",
        detail: String(error),
      });
    }
  }
}

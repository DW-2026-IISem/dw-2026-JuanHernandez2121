import { Membership } from "./membership.model";
import { Plan } from "../plans/plan.model";
import { Client } from "../client/client.model";

// Relación Membresía → Plan
Membership.belongsTo(Plan, {
  foreignKey: "planId",
  as: "plan",
});

Plan.hasMany(Membership, {
  foreignKey: "planId",
  as: "memberships",
});

// Relación Membresía → Cliente
Membership.belongsTo(Client, {
  foreignKey: "clienteId",
  as: "cliente",
});

Client.hasMany(Membership, {
  foreignKey: "clienteId",
  as: "memberships",
});

import { Resource } from "../resources/resource.model";
import { ResourceRole } from "./resource-role.model";
import { RoleUser } from "../role-users/role-user.model";
import { EffectivePermissionDto } from "./dto";

export class ResourceRolesService {
  public async findEffectiveForUser(
    userId: number
  ): Promise<EffectivePermissionDto[]> {
    const roleUsers = await RoleUser.findAll({
      where: {
        user_id: userId,
        status: "active",
      },
      attributes: ["role_id"],
    });

    const roleIds = roleUsers.map(
      (roleUser) => roleUser.role_id
    );

    if (roleIds.length === 0) {
      return [];
    }

    const resourceRoles = await ResourceRole.findAll({
      where: {
        role_id: roleIds,
        status: "active",
      },
      include: [
        {
          model: Resource,
          as: "resource",
          where: {
            status: "active",
          },
          required: true,
        },
      ],
    });

    return resourceRoles
      .map((item) => {
        const resource = item.get("resource") as Resource;

        return {
          id: resource.id,
          method: resource.method,
          path: resource.path,
          description: resource.description ?? null,
        };
      })
      .filter(
        (permission, index, array) =>
          array.findIndex(
            (item) =>
              item.method === permission.method &&
              item.path === permission.path
          ) === index
      );
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  UserJwtPersona,
  UserResourceOperationsEnum,
  UserResourcesEnum,
  BasePaginationQuery,
  CustomResponse,
  Persona,
} from '@common';
import { RoleIdParamDto } from '../../../../shared';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleBodyDto } from './dto/update-role.dto';
import { ListAllRolesForList } from './dto/list-all-roles.dto';
import { UserPermission } from '@common/decorators/metadata/user-permission.decorator';
import { UserRolesService } from './user-roles.service';

@Controller({ path: 'private/roles', version: VERSION_NEUTRAL })
@ApiTags('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  // @Post()
  // @ApiBearerAuth()
  // @UseGuards(UserJwtAuthGuard)
  // @UserPermission({ resource: UserResourcesEnum.USER_ROLES, operation: UserResourceOperationsEnum.CREATE })
  // async createRole(@Persona() userJWT: UserJwtPersona, @Body() body: CreateRoleDto) {
  //   const newRole = await this.userRolesService.createRole(userJWT._id, body);

  //   return new CustomResponse().success({
  //     payload: { data: newRole },
  //   });
  // }

  // @Patch(':roleId')
  // @ApiBearerAuth()
  // @UseGuards(UserJwtAuthGuard)
  // @UserPermission({ resource: UserResourcesEnum.USER_ROLES, operation: UserResourceOperationsEnum.UPDATE })
  // async updateRole(
  //   @Persona() userJWT: UserJwtPersona,
  //   @Param() param: RoleIdParamDto,
  //   @Body() body: UpdateRoleBodyDto,
  // ) {
  //   const updatedRole = await this.userRolesService.updateRole(userJWT._id, param, body);

  //   return new CustomResponse().success({
  //     payload: { data: updatedRole },
  //   });
  // }

  // @Delete(':roleId')
  // @ApiBearerAuth()
  // @UseGuards(UserJwtAuthGuard)
  // @UserPermission({ resource: UserResourcesEnum.USER_ROLES, operation: UserResourceOperationsEnum.DELETE })
  // async deleteRole(@Persona() userJWT: UserJwtPersona, @Param() param: RoleIdParamDto) {
  //   await this.userRolesService.deleteRole(userJWT._id, param);

  //   return new CustomResponse().success({});
  // }

  // @Get()
  // @ApiBearerAuth()
  // @UseGuards(UserJwtAuthGuard)
  // @UserPermission({ resource: UserResourcesEnum.USER_ROLES, operation: UserResourceOperationsEnum.READ })
  // async getRoles(@Persona() userJWT: UserJwtPersona, @Query() query: BasePaginationQuery) {
  //   const roles = await this.userRolesService.getRoles(userJWT._id, query);

  //   return new CustomResponse().success({
  //     payload: roles,
  //   });
  // }

  // @ApiBearerAuth()
  // @UseGuards(UserJwtAuthGuard)
  // @ApiOperation({ summary: 'Get roles list' })
  // @Get('list')
  // @UserPermission({ resource: UserResourcesEnum.USER_ROLES, operation: UserResourceOperationsEnum.FILTER })
  // async getRolesList(@Query() query: ListAllRolesForList) {
  //   const roles = await this.userRolesService.getRoleIdList(query);
  //   return new CustomResponse().success({
  //     payload: { data: roles },
  //   });
  // }

  // @Get(':roleId')
  // @ApiBearerAuth()
  // @UseGuards(UserJwtAuthGuard)
  // @UserPermission({ resource: UserResourcesEnum.USER_ROLES, operation: UserResourceOperationsEnum.READ })
  // async getRoleById(@Persona() userJWT: UserJwtPersona, @Param() param: RoleIdParamDto) {
  //   const role = await this.userRolesService.getRoleById(userJWT._id, param);

  //   return new CustomResponse().success({
  //     payload: {
  //       data: role,
  //     },
  //   });
  // }
}

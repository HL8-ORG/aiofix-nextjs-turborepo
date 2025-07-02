import type { Prisma } from '../generated/client';

// Utility types using Prisma's built-in inference
import type {
  getBrandsForForm,
  getCars,
  getModelsByBrand,
  getUserOrganizations,
} from '@/lib/data';

// Car with full relations (used in dashboard and forms)
export type CarWithRelations = Prisma.CarGetPayload<{
  include: {
    model: {
      include: {
        brand: true;
      };
    };
  };
}>;

// Brand with models (used in forms)
export type BrandWithModels = Prisma.BrandGetPayload<{
  include: {
    models: {
      include: {
        _count: {
          select: { cars: true };
        };
      };
    };
  };
}>;

// Organization types using Prisma's built-in inference
export type Organization = Prisma.OrganizationGetPayload<Record<string, never>>;

export type OrganizationWithMembers = Prisma.OrganizationGetPayload<{
  include: {
    members: {
      include: {
        user: true;
      };
    };
  };
}>;

export type Member = Prisma.MemberGetPayload<{
  include: {
    user: true;
    organization: true;
  };
}>;

export type Invitation = Prisma.InvitationGetPayload<{
  include: {
    organization: true;
    user: true;
  };
}>;

// Infer types from function return types
export type Car = Awaited<ReturnType<typeof getCars>>[0];
export type BrandForForm = Awaited<ReturnType<typeof getBrandsForForm>>[0];
export type ModelForForm = Awaited<ReturnType<typeof getModelsByBrand>>[0];
export type UserOrganization = Awaited<
  ReturnType<typeof getUserOrganizations>
>[0];

// User types from Better Auth (re-export for convenience)
export type { Session, User } from '@/lib/auth';

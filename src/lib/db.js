import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// // Function to set the current organization context
// async function setCurrentOrganization(organizationId) {
//   if (!organizationId) {
//     throw new Error("Organization ID must be provided");
//   }
//   await prisma.$executeRawUnsafe(
//     `SET local nextcrm.current_organization = '${organizationId}';`,
//   );
// }

export default prisma;

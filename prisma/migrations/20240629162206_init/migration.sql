/*
  Warnings:

  - You are about to drop the column `created_at` on the `TeamMember` table. All the data in the column will be lost.
  - You are about to drop the column `team_id` on the `TeamMember` table. All the data in the column will be lost.
  - You are about to drop the `Grade` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_team_id_fkey";

-- AlterTable
ALTER TABLE "TeamMember" DROP COLUMN "created_at",
DROP COLUMN "team_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "teamId" UUID;

-- DropTable
DROP TABLE "Grade";

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

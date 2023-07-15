/*
  Warnings:

  - You are about to drop the `Ability` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ability" DROP CONSTRAINT "Ability_role_id_fkey";

-- DropTable
DROP TABLE "Ability";

-- CreateTable
CREATE TABLE "abilities" (
    "id" SERIAL NOT NULL,
    "action" "Action" NOT NULL,
    "role_id" INTEGER NOT NULL,
    "entity" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "abilities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "abilities" ADD CONSTRAINT "abilities_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

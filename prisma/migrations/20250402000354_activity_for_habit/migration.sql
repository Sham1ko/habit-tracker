/*
  Warnings:

  - You are about to drop the `HabitEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HabitEntry" DROP CONSTRAINT "HabitEntry_habitId_fkey";

-- DropTable
DROP TABLE "HabitEntry";

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "habitId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Activity_habitId_date_key" ON "Activity"("habitId", "date");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

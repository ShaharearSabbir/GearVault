/*
  Warnings:

  - Added the required column `dailyRate` to the `gears` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gears" ADD COLUMN     "dailyRate" DECIMAL(65,30) NOT NULL;

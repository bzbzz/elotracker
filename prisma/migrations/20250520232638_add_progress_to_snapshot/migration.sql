/*
  Warnings:

  - Added the required column `progress` to the `EloSnapshot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EloSnapshot" ADD COLUMN     "progress" DOUBLE PRECISION NOT NULL;

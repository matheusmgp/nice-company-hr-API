-- CreateTable
CREATE TABLE "registers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "knowledges" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "registers_pkey" PRIMARY KEY ("id")
);

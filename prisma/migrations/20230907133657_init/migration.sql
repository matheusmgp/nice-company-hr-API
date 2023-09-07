-- CreateTable
CREATE TABLE "registers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "registers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knowledges" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "registerId" INTEGER,

    CONSTRAINT "knowledges_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "knowledges" ADD CONSTRAINT "knowledges_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "registers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

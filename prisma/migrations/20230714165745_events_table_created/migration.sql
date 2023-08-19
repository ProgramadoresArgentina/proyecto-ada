-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "avatar" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "emailUser" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cv" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "emailUser" TEXT NOT NULL,

    CONSTRAINT "Cv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "startYear" TIMESTAMP(3) NOT NULL,
    "endYear" TIMESTAMP(3) NOT NULL,
    "description" JSONB,
    "experienceId" INTEGER NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "startYear" TIMESTAMP(3) NOT NULL,
    "endYear" TIMESTAMP(3) NOT NULL,
    "description" JSONB,
    "educationId" INTEGER NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certifications" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" JSONB,
    "startYear" TIMESTAMP(3) NOT NULL,
    "endYear" TIMESTAMP(3) NOT NULL,
    "certificationsId" INTEGER NOT NULL,

    CONSTRAINT "Certifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_emailUser_key" ON "UserSettings"("emailUser");

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cv_userId_key" ON "Cv"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cv_emailUser_key" ON "Cv"("emailUser");

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_emailUser_fkey" FOREIGN KEY ("emailUser") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Cv" ADD CONSTRAINT "Cv_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Cv" ADD CONSTRAINT "Cv_emailUser_fkey" FOREIGN KEY ("emailUser") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Cv"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES "Cv"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Certifications" ADD CONSTRAINT "Certifications_certificationsId_fkey" FOREIGN KEY ("certificationsId") REFERENCES "Cv"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

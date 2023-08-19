-- CreateTable
CREATE TABLE "PermissionComponent" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "softDelete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PermissionComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER,
    "permissionComponentId" INTEGER,
    "view" BOOLEAN NOT NULL DEFAULT false,
    "add" BOOLEAN NOT NULL DEFAULT false,
    "update" BOOLEAN NOT NULL DEFAULT false,
    "remove" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_permissionComponentId_fkey" FOREIGN KEY ("permissionComponentId") REFERENCES "PermissionComponent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

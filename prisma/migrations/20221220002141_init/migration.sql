-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('normalUser', 'admin', 'superAdmin');

-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('DRAFT', 'APPROVED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('game', 'image', 'video', 'article');

-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('spotTheDifferenceGame', 'matchingGame', 'sortingGame');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" "UserType" NOT NULL DEFAULT 'normalUser',
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "name" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "normalUsers" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "normalUsers_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "admins" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "superAdmins" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "superAdmins_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "userCourses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "correctQns" INTEGER NOT NULL,
    "stars" INTEGER NOT NULL,

    CONSTRAINT "userCourses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "learningObjectives" TEXT NOT NULL,
    "price" DECIMAL(5,2) NOT NULL,
    "creatorId" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedUserId" TEXT NOT NULL,
    "lastUpdatedDate" TIMESTAMP(3) NOT NULL,
    "coverImageUrl" TEXT,
    "status" "CourseStatus" NOT NULL DEFAULT 'DRAFT',
    "categoryId" TEXT,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "chapterNumber" INTEGER NOT NULL,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages" (
    "chapterId" TEXT,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pageNumber" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "assetType" "AssetType" NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageItem" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "pageItemNumber" INTEGER NOT NULL,
    "assetType" "AssetType" NOT NULL,
    "assetId" TEXT NOT NULL,
    "caption" TEXT,

    CONSTRAINT "PageItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets" (
    "id" TEXT NOT NULL,
    "assetType" "AssetType" NOT NULL,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "url" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("assetId")
);

-- CreateTable
CREATE TABLE "videos" (
    "url" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("assetId")
);

-- CreateTable
CREATE TABLE "articles" (
    "text" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("assetId")
);

-- CreateTable
CREATE TABLE "games" (
    "type" "GameType" NOT NULL,
    "assetId" TEXT NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("assetId")
);

-- CreateTable
CREATE TABLE "SpotTheDifferenceGame" (
    "gameId" TEXT NOT NULL,
    "leftImageId" TEXT NOT NULL,
    "rightImageId" TEXT NOT NULL,
    "differences" DOUBLE PRECISION[],

    CONSTRAINT "SpotTheDifferenceGame_pkey" PRIMARY KEY ("gameId")
);

-- CreateTable
CREATE TABLE "MatchingGame" (
    "gameId" TEXT NOT NULL,

    CONSTRAINT "MatchingGame_pkey" PRIMARY KEY ("gameId")
);

-- CreateTable
CREATE TABLE "SortingGame" (
    "gameId" TEXT NOT NULL,

    CONSTRAINT "SortingGame_pkey" PRIMARY KEY ("gameId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userCourses_userId_courseId_key" ON "userCourses"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "courses_title_key" ON "courses"("title");

-- CreateIndex
CREATE UNIQUE INDEX "SpotTheDifferenceGame_leftImageId_key" ON "SpotTheDifferenceGame"("leftImageId");

-- CreateIndex
CREATE UNIQUE INDEX "SpotTheDifferenceGame_rightImageId_key" ON "SpotTheDifferenceGame"("rightImageId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "normalUsers" ADD CONSTRAINT "normalUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "superAdmins" ADD CONSTRAINT "superAdmins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userCourses" ADD CONSTRAINT "userCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userCourses" ADD CONSTRAINT "userCourses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "admins"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_lastUpdatedUserId_fkey" FOREIGN KEY ("lastUpdatedUserId") REFERENCES "admins"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageItem" ADD CONSTRAINT "PageItem_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageItem" ADD CONSTRAINT "PageItem_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotTheDifferenceGame" ADD CONSTRAINT "SpotTheDifferenceGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("assetId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotTheDifferenceGame" ADD CONSTRAINT "SpotTheDifferenceGame_leftImageId_fkey" FOREIGN KEY ("leftImageId") REFERENCES "images"("assetId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotTheDifferenceGame" ADD CONSTRAINT "SpotTheDifferenceGame_rightImageId_fkey" FOREIGN KEY ("rightImageId") REFERENCES "images"("assetId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchingGame" ADD CONSTRAINT "MatchingGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("assetId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SortingGame" ADD CONSTRAINT "SortingGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("assetId") ON DELETE CASCADE ON UPDATE CASCADE;

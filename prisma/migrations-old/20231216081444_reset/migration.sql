-- CreateEnum
CREATE TYPE "QuizGameOptionType" AS ENUM ('text', 'image', 'textAndImage');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('normalUser', 'admin', 'courseEditor', 'staff');

-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('DRAFT', 'APPROVED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('game', 'image', 'video', 'article');

-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('spotTheDifferenceGame', 'matchingGame', 'sortingGame', 'quizGame');

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
    "password" TEXT,
    "image" TEXT,
    "name" TEXT,
    "age" INTEGER,
    "pdpa" BOOLEAN NOT NULL DEFAULT false,

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
    "disabled" BOOLEAN NOT NULL DEFAULT true,
    "role" TEXT NOT NULL DEFAULT 'Staff',

    CONSTRAINT "admins_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "courseEditors" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "courseEditors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userCourses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "correctQns" INTEGER NOT NULL,
    "stars" INTEGER NOT NULL,
    "lastSeenBy" TIMESTAMP(3) NOT NULL,

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
    "status" "CourseStatus" NOT NULL DEFAULT 'DRAFT',
    "categoryId" TEXT,
    "coverImageAssetId" TEXT,

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
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pageNumber" INTEGER NOT NULL,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "chapterId" TEXT,
    "assetId" TEXT NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets" (
    "id" TEXT NOT NULL,
    "assetType" "AssetType" NOT NULL,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "filename" TEXT,
    "url" TEXT NOT NULL,
    "key" TEXT,
    "assetId" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("assetId")
);

-- CreateTable
CREATE TABLE "videos" (
    "filename" TEXT,
    "url" TEXT NOT NULL,
    "key" TEXT,
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

    CONSTRAINT "SpotTheDifferenceGame_pkey" PRIMARY KEY ("gameId")
);

-- CreateTable
CREATE TABLE "SpotTheDifferenceRegion" (
    "id" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "SpotTheDifferenceRegion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SortingGame" (
    "gameId" TEXT NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SortingGame_pkey" PRIMARY KEY ("gameId")
);

-- CreateTable
CREATE TABLE "Bucket" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortingGameId" TEXT NOT NULL,

    CONSTRAINT "Bucket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BucketItem" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "imageId" TEXT,
    "bucketId" TEXT NOT NULL,

    CONSTRAINT "BucketItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SortingGameImage" (
    "id" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,

    CONSTRAINT "SortingGameImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchingGame" (
    "gameId" TEXT NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MatchingGame_pkey" PRIMARY KEY ("gameId")
);

-- CreateTable
CREATE TABLE "MatchingGameImage" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "imageId" TEXT NOT NULL,
    "matchingGameId" TEXT NOT NULL,

    CONSTRAINT "MatchingGameImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizGame" (
    "gameId" TEXT NOT NULL,

    CONSTRAINT "QuizGame_pkey" PRIMARY KEY ("gameId")
);

-- CreateTable
CREATE TABLE "QuizGameQuestion" (
    "id" TEXT NOT NULL,
    "questionNumber" INTEGER NOT NULL,
    "isMultipleResponse" BOOLEAN NOT NULL,
    "questionTitle" TEXT NOT NULL,
    "imageId" TEXT,
    "quizGameId" TEXT NOT NULL,

    CONSTRAINT "QuizGameQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizGameOption" (
    "id" TEXT NOT NULL,
    "isCorrectOption" BOOLEAN NOT NULL,
    "quizGameOptionType" "QuizGameOptionType" NOT NULL,
    "optionText" TEXT,
    "optionImageId" TEXT,
    "quizGameQuestionId" TEXT NOT NULL,

    CONSTRAINT "QuizGameOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CoursesInCart" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
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
CREATE UNIQUE INDEX "courseEditors_adminId_courseId_key" ON "courseEditors"("adminId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "userCourses_userId_courseId_key" ON "userCourses"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "pages_assetId_key" ON "pages"("assetId");

-- CreateIndex
CREATE UNIQUE INDEX "SpotTheDifferenceGame_leftImageId_key" ON "SpotTheDifferenceGame"("leftImageId");

-- CreateIndex
CREATE UNIQUE INDEX "SpotTheDifferenceGame_rightImageId_key" ON "SpotTheDifferenceGame"("rightImageId");

-- CreateIndex
CREATE UNIQUE INDEX "SortingGameImage_imageId_key" ON "SortingGameImage"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchingGameImage_imageId_key" ON "MatchingGameImage"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "_CoursesInCart_AB_unique" ON "_CoursesInCart"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursesInCart_B_index" ON "_CoursesInCart"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "normalUsers" ADD CONSTRAINT "normalUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courseEditors" ADD CONSTRAINT "courseEditors_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courseEditors" ADD CONSTRAINT "courseEditors_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userCourses" ADD CONSTRAINT "userCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userCourses" ADD CONSTRAINT "userCourses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_coverImageAssetId_fkey" FOREIGN KEY ("coverImageAssetId") REFERENCES "images"("assetId") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "pages" ADD CONSTRAINT "pages_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "SpotTheDifferenceRegion" ADD CONSTRAINT "SpotTheDifferenceRegion_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "SpotTheDifferenceGame"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SortingGame" ADD CONSTRAINT "SortingGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("assetId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bucket" ADD CONSTRAINT "Bucket_sortingGameId_fkey" FOREIGN KEY ("sortingGameId") REFERENCES "SortingGame"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BucketItem" ADD CONSTRAINT "BucketItem_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "SortingGameImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BucketItem" ADD CONSTRAINT "BucketItem_bucketId_fkey" FOREIGN KEY ("bucketId") REFERENCES "Bucket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SortingGameImage" ADD CONSTRAINT "SortingGameImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("assetId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchingGame" ADD CONSTRAINT "MatchingGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("assetId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchingGameImage" ADD CONSTRAINT "MatchingGameImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("assetId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchingGameImage" ADD CONSTRAINT "MatchingGameImage_matchingGameId_fkey" FOREIGN KEY ("matchingGameId") REFERENCES "MatchingGame"("gameId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizGame" ADD CONSTRAINT "QuizGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("assetId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizGameQuestion" ADD CONSTRAINT "QuizGameQuestion_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("assetId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizGameQuestion" ADD CONSTRAINT "QuizGameQuestion_quizGameId_fkey" FOREIGN KEY ("quizGameId") REFERENCES "QuizGame"("gameId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizGameOption" ADD CONSTRAINT "QuizGameOption_optionImageId_fkey" FOREIGN KEY ("optionImageId") REFERENCES "images"("assetId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizGameOption" ADD CONSTRAINT "QuizGameOption_quizGameQuestionId_fkey" FOREIGN KEY ("quizGameQuestionId") REFERENCES "QuizGameQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesInCart" ADD CONSTRAINT "_CoursesInCart_A_fkey" FOREIGN KEY ("A") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesInCart" ADD CONSTRAINT "_CoursesInCart_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

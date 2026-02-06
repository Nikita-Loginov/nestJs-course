-- DropForeignKey
ALTER TABLE "posters" DROP CONSTRAINT "posters_movieId_fkey";

-- AddForeignKey
ALTER TABLE "posters" ADD CONSTRAINT "posters_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

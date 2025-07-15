-- AlterTable
ALTER TABLE `blog` MODIFY `title` TEXT NOT NULL,
    MODIFY `content` LONGTEXT NOT NULL,
    MODIFY `image` TEXT NULL;

-- AlterTable
ALTER TABLE `contact` MODIFY `name` TEXT NOT NULL,
    MODIFY `email` TEXT NOT NULL,
    MODIFY `message` LONGTEXT NOT NULL;

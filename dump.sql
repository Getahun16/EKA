/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.6.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: eka
-- ------------------------------------------------------
-- Server version	11.6.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `abouts`
--

DROP TABLE IF EXISTS `abouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `abouts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abouts`
--

LOCK TABLES `abouts` WRITE;
/*!40000 ALTER TABLE `abouts` DISABLE KEYS */;
INSERT INTO `abouts` VALUES
(1,'The Ethiopian Kidney Association (EKA) is a leading professional organization dedicated to advancing kidney health in Ethiopia since 1998 E.C (2005 G.C). For over 17 years, EKA has united nephrologists, health professionals, governmental and non-governmental organizations to improve prevention, care, and research in kidney disease.\r\n\r\nGuided by 19 central and 9 regional board members, EKA actively celebrates World Kidney Day (WKD), World Hypertension Day (WHD), and hosts an annual nephrology conference. It collaborates with international partners to strengthen the nephrology workforce through fellowships, grants, and training. EKA welcomes partnerships that contribute to building a healthier future for kidney patients in Ethiopia.','abouts/O9e8tI2e55W4PBStySFLY6r2gSAF03RJWNTjdkSl.png','2025-07-28 14:30:28','2025-07-28 15:08:05');
/*!40000 ALTER TABLE `abouts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bios`
--

DROP TABLE IF EXISTS `bios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bios` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `bio_text` longtext NOT NULL,
  `quote` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bios`
--

LOCK TABLES `bios` WRITE;
/*!40000 ALTER TABLE `bios` DISABLE KEYS */;
INSERT INTO `bios` VALUES
(1,'Abebe Kebede','Abebe has over 10 years of experience in management.','Leadership is about vision and responsibility.','2025-07-28 07:04:37','2025-07-28 18:25:37','2025-07-28 18:25:37'),
(2,'Almaz Tadesse','Almaz is a certified accountant with a passion for numbers.','Accuracy is the key to success.','2025-07-28 07:04:37','2025-07-28 18:29:35','2025-07-28 18:29:35'),
(3,'Tesfaye Mekonnen','Tesfaye provides expert advice in business development.','Consulting is about helping others grow.','2025-07-28 07:04:37','2025-07-28 18:29:28','2025-07-28 18:29:28'),
(4,'Catherine Clay','Adipisicing et et es','Nostrud ex laboris m','2025-07-28 17:56:15','2025-07-28 18:29:28','2025-07-28 18:29:28'),
(5,'The Ethiopian Kidney Association (EKA)','is a leading organization dedicated to advancing kidney health in Ethiopia since 1998 E.C (2005 GC). For over 17 years, EKA has united nephrologists and healthcare professionals to improve prevention, care, and research in kidney disease.','Guided by 19 central and 9 regional board members, EKA celebrates World Kidney Day, World Transplantation Day, and hosts an annual nephrology conference. The association partners globally to strengthen nephrology care through fellowships, grants, and training—building a healthier future for kidney patients across Ethiopia.','2025-07-28 18:27:07','2025-07-28 18:27:07',NULL);
/*!40000 ALTER TABLE `bios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branches`
--

DROP TABLE IF EXISTS `branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `branches` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `is_main` tinyint(1) NOT NULL DEFAULT 0,
  `location` varchar(255) DEFAULT NULL,
  `map_location` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` VALUES
(1,'Head Office',1,'Addis Ababa','https://maps.google.com/?q=Addis+Ababa','+251-11-1234567','2025-07-28 07:04:37','2025-07-28 07:04:37',NULL),
(2,'Branch 1',0,'Adama','https://maps.google.com/?q=Adama','+251-22-7654321','2025-07-28 07:04:37','2025-07-28 07:04:37',NULL),
(3,'Branch 2',0,'Hawassa','https://maps.google.com/?q=Hawassa','+251-46-1234567','2025-07-28 07:04:37','2025-07-28 07:04:37',NULL),
(4,'Matthew Thornton',0,'Vitae placeat sunt',NULL,'+1 (103) 532-7214','2025-07-28 17:41:10','2025-07-28 17:41:10',NULL),
(5,'Kylan Ruiz',1,'Sequi incidunt dele',NULL,'+1 (414) 766-5148','2025-07-28 17:42:54','2025-07-28 17:42:54',NULL),
(6,'Alec Murray',0,'Officia odio sit ani',NULL,'+1 (957) 688-4315','2025-07-28 17:53:34','2025-07-28 17:53:34',NULL);
/*!40000 ALTER TABLE `branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` VALUES
('ethiopian_kidney_association_eka_cache_test@example.com|127.0.0.1','i:1;',1753746595),
('ethiopian_kidney_association_eka_cache_test@example.com|127.0.0.1:timer','i:1753746595;',1753746595);
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_us`
--

DROP TABLE IF EXISTS `contact_us`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_us` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_us`
--

LOCK TABLES `contact_us` WRITE;
/*!40000 ALTER TABLE `contact_us` DISABLE KEYS */;
INSERT INTO `contact_us` VALUES
(1,'getahun negash','get@gmail.com','cmywefokefweroif\nfrejfyu3yoggetwr\nke3wry7erfgyhkgi5tg\nvfl23r347opgehg5\nrkef34hohplg35jntg','2025-07-28 08:27:24','2025-07-28 08:27:24'),
(2,'Getahun Negash Tilahun','getsa@gmail.com','jferfurfugiu8rvfyefr\nreyfjerug rfg7ur4\nw','2025-07-28 08:33:57','2025-07-28 08:33:57'),
(3,'getahun negash','get@gmail.com','jkddwfgewrfwerfewrf','2025-07-28 17:32:09','2025-07-28 17:32:09'),
(4,'Flippers International school','hre4422@gmail.com','dfihspothdjpoaijh','2025-07-28 17:32:56','2025-07-28 17:32:56'),
(5,'getahun negash','gett@gmail.com','trdeuhswufygcjhn','2025-07-28 17:34:02','2025-07-28 17:34:02');
/*!40000 ALTER TABLE `contact_us` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_management`
--

DROP TABLE IF EXISTS `content_management`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `content_management` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `content_management_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_management`
--

LOCK TABLES `content_management` WRITE;
/*!40000 ALTER TABLE `content_management` DISABLE KEYS */;
INSERT INTO `content_management` VALUES
(1,'phone','0987654321 / 0974374356','2025-07-28 08:04:14','2025-07-28 08:13:34'),
(2,'email','somson@gmail.com','2025-07-28 08:06:22','2025-07-28 19:07:01'),
(3,'address','Addis Ababa, Ethiopia','2025-07-28 08:13:10','2025-07-28 08:14:50'),
(5,'linkedin','https://www.linkedin.com/help/linkedin/answer/a522735','2025-07-28 19:03:20','2025-07-28 19:03:20'),
(6,'telegram','https://www.linkedin.com/help/linkedin/answer/a522735','2025-07-28 19:03:48','2025-07-28 19:03:48'),
(7,'facebook','https://www.linkedin.com/help/linkedin/answer/a522735','2025-07-28 19:04:01','2025-07-28 19:04:01'),
(8,'whatsapp','https://www.linkedin.com/help/linkedin/answer/a522735','2025-07-28 19:04:11','2025-07-28 19:04:11');
/*!40000 ALTER TABLE `content_management` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation_accounts`
--

DROP TABLE IF EXISTS `donation_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `donation_accounts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `account_name` varchar(255) NOT NULL,
  `account_number` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `finance_institution_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation_accounts`
--

LOCK TABLES `donation_accounts` WRITE;
/*!40000 ALTER TABLE `donation_accounts` DISABLE KEYS */;
INSERT INTO `donation_accounts` VALUES
(1,'Getahun Negash','1000234567890','donation_account_logos/11lJfZCtXeKI4MCl5oAp7JoNNS9ltrXAsbEUadFI.jpg','CBE','2025-07-28 16:06:18','2025-07-28 16:06:18'),
(2,'Getahun Negash','23456789','donation_account_logos/6DShc907VXErm3y4Lz275EaT1zt42ueDciYhadAi.png','Telebirr','2025-07-28 16:06:40','2025-07-28 16:07:03');
/*!40000 ALTER TABLE `donation_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faqs`
--

DROP TABLE IF EXISTS `faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faqs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faqs`
--

LOCK TABLES `faqs` WRITE;
/*!40000 ALTER TABLE `faqs` DISABLE KEYS */;
INSERT INTO `faqs` VALUES
(1,'leading force in Nephrology care by fostering the professional','leading force in Nephrology care by fostering the professional development of healthcare professionals.To be a leading force in Nephrology care by fostering the professional development of healthcare professionals.','2025-07-28 16:18:06','2025-07-28 18:49:14',NULL),
(2,'Who can become a member of EKA?','Healthcare professionals, nephrologists, students, and individuals interested in kidney health can become members by registering through our website or contacting our offices.','2025-07-28 18:47:49','2025-07-28 18:47:49',NULL);
/*!40000 ALTER TABLE `faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hero_slides`
--

DROP TABLE IF EXISTS `hero_slides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hero_slides` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hero_slides`
--

LOCK TABLES `hero_slides` WRITE;
/*!40000 ALTER TABLE `hero_slides` DISABLE KEYS */;
INSERT INTO `hero_slides` VALUES
(1,'Hello Wolrdrt','During this year the most intelegent in this year for during this last most of the time in this','hero_slide_images/OMwSvpXFd7vZaGjGmYSo0k2duHBpE5PC6XXLZ1sL.jpg',1,'2025-07-28 15:36:00','2025-07-28 16:05:24'),
(2,'Aute voluptas non qu','Voluptatem Nostrud HOW TO PREVENT KIDNEY DISEASEHOW TO PREVENT KIDNEY DISEASEHOW TO PREVENT KIDNEY DISEASE','hero_slide_images/5Wt4KQqMwZpT0xFnkdu2pvnir0gZWFs2tNaBeh53.jpg',62,'2025-07-28 18:24:08','2025-07-28 18:24:08'),
(3,'HYPERTENSION','High blood pressure is present in approximately 80 percent of patients with CKD. High blood pressure is related to CKD in a number of ways.','hero_slide_images/D0w7HLBeMYYXd5TExvcJkhe1AAZy6wv4z7ciBIfo.jpg',3,'2025-07-28 20:50:28','2025-07-28 20:50:28');
/*!40000 ALTER TABLE `hero_slides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `members` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `branch_id` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `members_branch_id_foreign` (`branch_id`),
  CONSTRAINT `members_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES
(1,'Mr.','Abebe Kebede','Manager','Full-time',1,'2025-07-28 07:04:37','2025-07-28 17:39:51','2025-07-28 17:39:51'),
(2,'Anim non duis nostru','Castor Knight','Pariatur Quos do mo','Branch Member',2,'2025-07-28 07:04:37','2025-07-28 17:39:41','2025-07-28 17:39:41'),
(3,'Dr.','Tesfaye Mekonnen','Consultant','Contract',1,'2025-07-28 07:04:37','2025-07-28 07:04:37',NULL),
(4,'Voluptas placeat do','Galena Guy','Eos ratione qui dol','Branch Member',3,'2025-07-28 17:38:50','2025-07-28 18:31:56','2025-07-28 18:31:56'),
(5,'Enim libero voluptat','Dominic Witt','Nemo ea enim nobis q','Branch Member',1,'2025-07-28 17:49:50','2025-07-28 18:31:56','2025-07-28 18:31:56'),
(6,'Dr.','Lisane Seifu','President','Board Member',1,'2025-07-28 18:32:53','2025-07-28 18:32:53',NULL),
(7,'Dr.','Atinafu Tutulo','Member','Board Member',1,'2025-07-28 18:33:48','2025-07-28 18:33:48',NULL),
(8,'Dr.','Muluken Tamirat','Hawassa Representative','Branch Member',3,'2025-07-28 18:34:34','2025-07-28 18:34:34',NULL),
(9,'Dr.','Fethi Mohammed','Diredawa Representative','Branch Member',5,'2025-07-28 18:35:11','2025-07-28 18:35:11',NULL);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memberships`
--

DROP TABLE IF EXISTS `memberships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `memberships` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `occupation` varchar(255) NOT NULL,
  `id_type` varchar(255) NOT NULL,
  `id_number` varchar(255) NOT NULL,
  `issued_authority` varchar(255) NOT NULL,
  `issued_place` varchar(255) NOT NULL,
  `issued_date` date NOT NULL,
  `expiry_date` date NOT NULL,
  `address_type` varchar(255) NOT NULL,
  `nationality` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `district_or_wereda` varchar(255) NOT NULL,
  `district_or_wereda_number` varchar(255) NOT NULL,
  `father_name` varchar(255) NOT NULL,
  `mother_name` varchar(255) NOT NULL,
  `grandfather_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memberships`
--

LOCK TABLES `memberships` WRITE;
/*!40000 ALTER TABLE `memberships` DISABLE KEYS */;
/*!40000 ALTER TABLE `memberships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES
(1,'0000_00_28_062230_create_contact_us_table',1),
(2,'0001_01_01_000000_create_users_table',1),
(3,'0001_01_01_000001_create_cache_table',1),
(4,'0001_01_01_000002_create_jobs_table',1),
(5,'0001_01_01_000003_create_content_management_table',1),
(6,'0001_01_01_000004_create_hero_slides_table',1),
(7,'0001_01_01_000005_create_abouts_table',1),
(8,'0001_01_01_000006_create_mission_visions_table',1),
(9,'0001_01_01_000007_create_news_table',1),
(10,'0001_01_01_000008_create_bios_table',1),
(11,'0001_01_01_000009_create_services_table',1),
(12,'0001_01_01_000010_create_faqs_table',1),
(13,'0001_01_01_000011_create_partners_table',1),
(14,'0001_01_01_000013_create_branches_table',1),
(15,'0001_01_01_000014_create_members_table',1),
(16,'2024_01_01_000000_create_donation_accounts_table',1),
(17,'2024_01_01_000010_create_newsletters_table',1),
(18,'2025_07_26_221705_create_memberships_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mission_visions`
--

DROP TABLE IF EXISTS `mission_visions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mission_visions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `type` enum('mission','vision') NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mission_visions`
--

LOCK TABLES `mission_visions` WRITE;
/*!40000 ALTER TABLE `mission_visions` DISABLE KEYS */;
INSERT INTO `mission_visions` VALUES
(1,'mission','To be a leading force in Nephrology care by fostering the professional development of healthcare professionals.','2025-07-28 15:36:47','2025-07-28 15:36:47'),
(2,'vision','The expertise and professional development of healthcare professionals through CPD training,. fellowship opportunities, while supporting clinical practice through free screenings.','2025-07-28 15:37:08','2025-07-28 15:37:08');
/*!40000 ALTER TABLE `mission_visions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `content` longtext NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES
(1,'THE MAIN FUNCTION OF KIDNEY',NULL,'<h1></h1><p>Our&nbsp;kidneys&nbsp;filter&nbsp;up&nbsp;to&nbsp;200&nbsp;liters&nbsp;of&nbsp;blood&nbsp;daily&nbsp;Our&nbsp;kidneys&nbsp;eliminate&nbsp;via&nbsp;the&nbsp;urine&nbsp;poisonous&nbsp;nitrogenous&nbsp;waste&nbsp;products,&nbsp;excess&nbsp;quantities&nbsp;of&nbsp;salt&nbsp;and&nbsp;water&nbsp;The&nbsp;kidneys&nbsp;are&nbsp;essential&nbsp;for&nbsp;maintaining&nbsp;normal&nbsp;blood&nbsp;pressure</p><p></p>','news_images/ChqL0XBXfYqoOdmauMTZv02WfeAgTE04NFt3ib3w.jpg',NULL,'2025-07-28 15:39:08','2025-07-28 16:04:16'),
(2,'HOW TO PREVENT KIDNEY DISEASE',NULL,'<h1></h1><p><span style=\"color: rgb(255, 255, 255);\">To&nbsp;prevent&nbsp;kidney&nbsp;problems,&nbsp;focus&nbsp;on&nbsp;managing&nbsp;risk&nbsp;factors&nbsp;like&nbsp;diabetes&nbsp;and&nbsp;high&nbsp;blood&nbsp;pressure,&nbsp;maintaining&nbsp;a&nbsp;healthy&nbsp;lifestyle,&nbsp;and&nbsp;seeking&nbsp;regular&nbsp;medical&nbsp;checkups.&nbsp;This&nbsp;includes&nbsp;eating&nbsp;a&nbsp;balanced&nbsp;diet,&nbsp;exercising&nbsp;regularly,&nbsp;limiting&nbsp;alcohol&nbsp;and&nbsp;tobacco&nbsp;use,&nbsp;and&nbsp;taking&nbsp;medications&nbsp;as&nbsp;prescribed.</span></p><p></p>','news_images/3IWnP0nrJNhMDj5ownHwMjZltnXzwhdFNlGB07rV.jpg',NULL,'2025-07-28 18:22:34','2025-07-28 18:22:34');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsletters`
--

DROP TABLE IF EXISTS `newsletters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newsletters` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `status` enum('pending','active','unsubscribe_requested','unsubscribed') NOT NULL DEFAULT 'pending',
  `confirmation_token` varchar(255) DEFAULT NULL,
  `unsubscribe_token` varchar(255) DEFAULT NULL,
  `subscribed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `confirmed_at` timestamp NULL DEFAULT NULL,
  `unsubscribed_at` timestamp NULL DEFAULT NULL,
  `unsubscribe_requested_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `newsletters_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsletters`
--

LOCK TABLES `newsletters` WRITE;
/*!40000 ALTER TABLE `newsletters` DISABLE KEYS */;
INSERT INTO `newsletters` VALUES
(1,'getahun1@gmail.com','pending','VZ0Me9rb3sfStvdALKc7Cuav2WdqTvBpCehQhJybOTRGotMxBgScNnfrJERjABwZ','dPe5zt18a7fiUp9xWjyro4bmx3HECKzRK0zqwF7UAz6hE9lz05WFlePxKFaepyrZ','2025-07-28 12:04:30',NULL,NULL,NULL,'2025-07-28 12:04:30','2025-07-28 12:04:30'),
(2,'get@gmail.com','pending','3YzXmOUlZKIiMWbN0Dtt3C5hV33cSnoM9Y6ooVXAnzEaeiS6I68NVlVD2EQNymiX','bXvywczbgsOAhhigSneG4r3GUKxWec1StxobvT0eEoF48x8U261y2CeDajZD8MgQ','2025-07-28 16:57:06',NULL,NULL,NULL,'2025-07-28 16:57:06','2025-07-28 16:57:06'),
(3,'gettttt@gmail.com','pending','z8BAGFbRoVXupX9mpZo9zgoH11wpjlF6O8h7IGzgwXj0slx6HYfjwNNxueL1ZBpz','jwbPM5dTDXp7RSIAfNEJquGMSYXokSSou3SFHLkVjl9hRmD3BIKUaSqQmIsNTD6i','2025-07-28 16:58:03',NULL,NULL,NULL,'2025-07-28 16:58:03','2025-07-28 16:58:03'),
(4,'somsonengda@gmail.com','pending','1ni5vrVUwEyasGFjjNldjDBKVgUzW9SLCXJ7iUGGr4Qri97x5mkRebW2E0JTVs6a','kx6aKcwiKNhID5BclWnoSmPpKhKgL0mcSRK0tVK2Kc8P04jXMgwPBfJmpU5LMEov','2025-07-28 16:58:51',NULL,NULL,NULL,'2025-07-28 16:58:51','2025-07-28 16:58:51'),
(5,'somsonenhdhsg@gmail.com','pending','pEnQ5OSPDNFcuoXvab5NiAqeQTSE6y5LdmipVGbp3avomqtZ08nseb9J1gpUBLKl','BpiNlUT2mgzEyxDNv7khjd0NGjd4T8DK9T5Ae23D3qZx9U4gSclGDquRmgqpNNpu','2025-07-28 17:05:01',NULL,NULL,NULL,'2025-07-28 17:05:01','2025-07-28 17:05:01'),
(6,'sdfge@gmail.com','pending','dwkiMaF2eGyt7zPiJtb1yTqswaDpEDgz99ZYCsDqRhvBpGlnAJqpdGbYrJqK6aXG','bpgV8omp8GNC1NHQzmC9zO1c4igXzaQD3xnLpyHf4CZLJmTvEEOHRdZ9gRdOn0Dn','2025-07-28 17:05:54',NULL,NULL,NULL,'2025-07-28 17:05:54','2025-07-28 17:05:54'),
(7,'geert@gmail.com','pending','PufGJKYLLNuJBdglkDrvTREBJVb2BelHtbVnaL3GTUCSLsueXKZNpMuiIgIalj98','6eOWDttkyj4XIGd6UsCokXpiAs6dMlU4Fawv02mUcrWaT7Gm03X8G56avwbnuISm','2025-07-28 17:12:59',NULL,NULL,NULL,'2025-07-28 17:12:59','2025-07-28 17:12:59'),
(8,'gklhad@gmail.com','pending','d0ZB1GFOnMZ8y5mldWhMHI5oRbYtwStejpNldoieQyQmHzXzYNlrltdWbBnBWmxM','tYzAJPuElQyvtdqt4ULd6NSiVEeb3PV629K5ftCzi46j3S5C8HBg2T7MtRXlc4i8','2025-07-28 17:29:30',NULL,NULL,NULL,'2025-07-28 17:29:30','2025-07-28 17:29:30');
/*!40000 ALTER TABLE `newsletters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partners`
--

DROP TABLE IF EXISTS `partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partners` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partners`
--

LOCK TABLES `partners` WRITE;
/*!40000 ALTER TABLE `partners` DISABLE KEYS */;
INSERT INTO `partners` VALUES
(1,'Getahun Nnegash','partners/4Bh8v6JeIttOBw4dR9PwZdE48CJ8zFUM7gpQ6uj9.jpg','2025-07-28 18:37:36','2025-07-28 18:37:36'),
(2,'sewmehon engda.','partners/htpo5Y4u7sgxoD3IJkCxEdbLSmmbZmunmwDZRM35.png','2025-07-28 18:37:50','2025-07-28 18:37:50'),
(3,'Vegtable','partners/hCm40OOu4xG0Nuxn5sKNDOImiCoPgZNpfjwPlPvJ.jpg','2025-07-28 18:38:06','2025-07-28 18:38:06'),
(4,'Getahun','partners/hugyplryKzzGd87T784zhzZSK7ta1YqptST0A707.jpg','2025-07-28 18:38:25','2025-07-28 18:38:25'),
(5,'Wollo University','partners/N7XxS0sW5g8veWqwsUXUI5P16mAnnoBSyph8MdZx.png','2025-07-28 18:38:46','2025-07-28 18:38:46');
/*!40000 ALTER TABLE `partners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
INSERT INTO `password_reset_tokens` VALUES
('somsonengda@gmail.com','$2y$12$CdVK.WX8e.bo8csQrk0yh.9grwmg3pUvyCQUN/spz/MDcJDcS30hS','2025-07-28 20:08:28');
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES
('9ZjC3izrwOz319wf0rVs92Pvo4ns8DPOI6EJsBwH',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiTFVLVXd5aDJ2cTVWRmdWNFBMSWM3NjlWNmpOMWFSelZXZWRCZDNDUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1753741622),
('HLRLW6ES6T7DWUzeKdS8UJj46uN3X9CTFISzGhLj',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiSUJ1UWIydjcwRkpDaW9HbjZyZkFncjZPMVBtY0hQSkxkNnVMcEdOYiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1753743272),
('sMaPLxkMjW3C2uCP7z6HHdOCkrNhFTOvmKUQVcjX',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36','YTo1OntzOjY6Il90b2tlbiI7czo0MDoiTjBKZTFCMnZuTUZxVTkzQ3Y4a0d5TDM0WU16ZzQ2YXkydDU0R3U0VCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6MzoidXJsIjthOjA6e31zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=',1753747565),
('TtKzd3S6OGIt7fHG0JDDqdFtUfOju0ngOOspHAZw',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36','YTo1OntzOjY6Il90b2tlbiI7czo0MDoiM2hWeWFYM25NdU0zbVlYS1VWbFBHMXFXWnFMelJVSlhGTlVKSU14cSI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjEyNjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2Fib3V0cz9vcmRlcj1kZXNjJnBhZ2U9MSZwZXJfcGFnZT0xMCZzZWFyY2hhYmxlX2NvbHVtbnM9Y29udGVudCZzb3J0PWNyZWF0ZWRfYXQmc29ydGFibGVfY29sdW1ucz1jb250ZW50Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9',1753741399),
('Vc5hPgyVCWUkok4fU6A9juMdw5ALpzPdJ59KleC7',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiZWhtSzQ3M1ltQktqdEI0bWtjMzVzWFE3dnBaaDJYYlNmSnp3VzY4TiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czozMToiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2Rhc2hib2FyZCI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjM3OiJodHRwOi8vbG9jYWxob3N0OjgwMDAvZm9yZ290LXBhc3N3b3JkIjt9fQ==',1753742978);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'somson','somsonengda@gmail.com','2025-07-28 07:04:36','$2y$12$POG3vRk2q1XT.5G7sgZKsunzEaiusZ27XWbX0kVqzRg86XZx8QS/m','LlgRxmKvy6ie2lGQv98ND2XiEHnjnWFPG6Pxw0X8HAsHbpT0dWrL0GbNVA0f','2025-07-28 07:04:37','2025-07-28 07:04:37');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-07-29  3:29:06

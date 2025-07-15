/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.6.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: kidney
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
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES
('247b68a3-b985-4216-9e71-a8d9df4ca18a','6488aa992cbbbc52389948d80955cb9556508dda873e544ecb9cf54015548703','2025-07-07 21:50:44.159','20250707215044_add_slide',NULL,NULL,'2025-07-07 21:50:44.145',1),
('8cd2d0f9-8d27-43c3-9086-3a5ef5840690','ceb0c0f766f75bd7bcfdf8ae66bbf24b9130f62084186814cc2cb4375435f432','2025-07-07 19:28:25.760','20250702192044_add_partner_model',NULL,NULL,'2025-07-07 19:28:25.745',1),
('b4737930-04e4-4f68-a9c4-a3160b9d4fae','13c95a726fd212a8399906affdb85a34c09c2b4570445eeb82daf37c70aa76b1','2025-07-07 19:31:57.856','20250707193157_extend_message_length',NULL,NULL,'2025-07-07 19:31:57.832',1),
('b7d16e6a-c61c-4759-aeac-201d7085d8ea','4cf10991dcd4ac8a549ac617cd265322dab04b14209561dc0a27c033f8421495','2025-07-07 20:23:24.943','20250707202324_add_registration_model',NULL,NULL,'2025-07-07 20:23:24.929',1),
('c33b1116-ee4e-4413-8f54-85adc05f22aa','5d54f7b0eb0db5bd2563cd2a319e5a975b7f8343a1a5fb5d5dca436facea4f7d','2025-07-07 19:45:56.589','20250707194556_increase_text_size',NULL,NULL,'2025-07-07 19:45:56.543',1),
('fb512f17-8dfb-4789-8ba6-eb92d7ab8e90','173c5aad2d28d7cc6c36220413f9389bc2165054fe6eb357b5286fff0d7b3b53','2025-07-07 19:28:25.800','20250703061558_add_partner_model',NULL,NULL,'2025-07-07 19:28:25.784',1),
('fde70c98-3e6b-4ed0-9628-5104d89b7f57','793642222bbafb3b68fd9ce5f40d03d4be2baaa4c0472052d4143bd41d562860','2025-07-07 19:28:25.782','20250702200030_add_partner',NULL,NULL,'2025-07-07 19:28:25.762',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Admin_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `content` longtext NOT NULL,
  `image` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` VALUES
(1,'THE MAIN FUNCTION OF KIDNEY','THE MAIN FUNCTION OF KIDNEY\r\nOur kidneys filter up to 200 liters of blood daily Our kidneys eliminate via the urine poisonous nitrogenous waste products, excess quantities of salt and water The kidneys are essential for maintaining normal blood pressure','/uploads/1751917103442-kidney2.jpeg','2025-07-07 19:38:23.447'),
(2,'HOW TO PREVENT KIDNEY DISEASE','HOW TO PREVENT KIDNEY DISEASE\r\nTo prevent kidney problems, focus on managing risk factors like diabetes and high blood pressure, maintaining a healthy lifestyle, and seeking regular medical checkups. This includes eating a balanced diet, exercising regularly, limiting alcohol and tobacco use, and taking medications as prescribed.','/uploads/1751918003659-kidney3.jpeg','2025-07-07 19:53:23.667'),
(3,'KIDNEY DISEASE IN ETHIOPIA','KIDNEY DISEASE IN ETHIOPIA\r\nIn our country, though national data is lacking the number of kidney/Hypertension (High Blood Pressure) patients are increasing from time to time.','/uploads/1751918135013-img.png','2025-07-07 19:55:35.019'),
(4,'HYPERTENSION','HYPERTENSION\r\nHigh blood pressure is present in approximately 80 percent of patients with CKD. High blood pressure is related to CKD in a number of ways.','/uploads/1751918188324-course-1.jpg','2025-07-07 19:56:28.331');
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `message` longtext NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES
(1,'getahun negash','get@gmail.com','For the migration name, you can type a short, meaningful description of what this migration is doing.\n\n✅ Since you are extending the length of the message field in the Contact model, you can name the migration:','2025-07-07 19:36:19.618'),
(2,'Bini','biniyanbelen@gmail.com','For the migration name, you can type a short, meaningful description of what this migration is doing.\n\n✅ Since you are extending the length of the message field in the Contact model, you can name the migration:','2025-07-07 19:36:40.983'),
(3,'Haile','hailemariyam3298@gmail.com','For the migration name, you can type a short, meaningful description of what this migration is doing.\n\n✅ Since you are extending the length of the message field in the Contact model, you can name the migration:','2025-07-07 19:37:01.954'),
(4,'sewmehon engda.','ssdsa@gmail.com','For the migration name, you can type a short, meaningful description of what this migration is doing.\n\n✅ Since you are extending the length of the message field in the Contact model, you can name the migration:','2025-07-07 19:37:16.351'),
(5,'Kebede','get@gmail.com','validateForm() runs on submit, sets validationErrors state if invalid\n\nShows inline error messages below inputs\n\nAdds red borders and ARIA attributes for accessibility\n\nPrevents submission if invalid\n\nTry it out — it’s user-friendly and blocks bad submissions! Need any tweaks?','2025-07-08 07:47:46.932');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partner`
--

DROP TABLE IF EXISTS `partner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `logo` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner`
--

LOCK TABLES `partner` WRITE;
/*!40000 ALTER TABLE `partner` DISABLE KEYS */;
INSERT INTO `partner` VALUES
(1,'Commercial bank of Ethiopia','2025-07-07 19:39:42.421','/uploads/1751917182416-cbe.jpeg'),
(2,'Ethio Telecom','2025-07-07 19:39:58.595','/uploads/1751917198590-ethio.jpeg'),
(3,'Wollo university','2025-07-07 19:40:17.876','/uploads/1751917217870-kidney2.jpeg'),
(4,'Woldia University','2025-07-07 19:40:34.525','/uploads/1751917234515-about.png'),
(5,'CBE E','2025-07-07 19:40:49.915','/uploads/1751917249910-cbe.jpeg'),
(6,'EthioTelelcom','2025-07-07 19:54:21.397','/uploads/1751918061387-ethio.jpeg');
/*!40000 ALTER TABLE `partner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registration`
--

DROP TABLE IF EXISTS `registration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(191) NOT NULL,
  `dateOfBirth` datetime(3) NOT NULL,
  `email` varchar(191) NOT NULL,
  `mobileNumber` varchar(191) NOT NULL,
  `gender` varchar(191) NOT NULL,
  `occupation` varchar(191) NOT NULL,
  `idType` varchar(191) NOT NULL,
  `idNumber` varchar(191) NOT NULL,
  `issuedAuthority` varchar(191) NOT NULL,
  `issuedPlace` varchar(191) NOT NULL,
  `issuedDate` datetime(3) NOT NULL,
  `expiryDate` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration`
--

LOCK TABLES `registration` WRITE;
/*!40000 ALTER TABLE `registration` DISABLE KEYS */;
INSERT INTO `registration` VALUES
(1,'getahun negash','2011-06-07 00:00:00.000','get@gmail.com','0921030278','Male','Student','Passport','EP3938788','EPRD','Addis Ababa','2022-07-07 00:00:00.000','2028-06-07 00:00:00.000','2025-07-07 20:55:15.125'),
(2,'Hailemariam Kebede','2025-07-25 00:00:00.000','hailemariyam3298@gmail.com','0921030278','Male','Student','Passport','EP3938788','EPRD','Addis Ababa','2022-06-08 00:00:00.000','2025-07-24 00:00:00.000','2025-07-07 21:04:34.474');
/*!40000 ALTER TABLE `registration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slide`
--

DROP TABLE IF EXISTS `slide`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `slide` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `image` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slide`
--

LOCK TABLES `slide` WRITE;
/*!40000 ALTER TABLE `slide` DISABLE KEYS */;
INSERT INTO `slide` VALUES
(1,'HYPERTENSION','\r\nHigh blood pressure is present in approximately 80 percent of patients with CKD. High blood pressure is related to CKD in a number of ways.','/uploads/1751925680198-course-1.jpg','2025-07-07 22:01:20.206'),
(2,'KIDNEY DISEASE IN ETHIOPIA','\r\nIn our country, though national data is lacking the number of kidney/Hypertension (High Blood Pressure) patients are increasing from time to time.','/uploads/1751925981721-course-2.jpg','2025-07-07 22:06:21.727'),
(3,'KIDNEY DISEASE IN ETHIOPIA','\r\nIn our country, though national data is lacking the number of kidney/Hypertension (High Blood Pressure) patients are increasing from time to time.','/uploads/1751926037580-background_gugut.jpg','2025-07-07 22:07:17.586'),
(4,'World kidney Day','\r\nWorld Kidney Day is an annual global campaign held on the second Thursday of March, dedicated to raising awareness about kidney health and reducing the','/uploads/1751964427619-book-1.webp','2025-07-07 22:19:06.704');
/*!40000 ALTER TABLE `slide` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-07-08 13:48:28

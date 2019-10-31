-- MySQL dump 10.13  Distrib 8.0.17, for Linux (x86_64)
--
-- Host: localhost    Database: icms
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agent`
--

DROP TABLE IF EXISTS `agent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agent` (
  `agent_id` int(5) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `commission` decimal(5,2) DEFAULT '10.00',
  `branch` char(5) DEFAULT NULL,
  `mgr_id` int(5) DEFAULT NULL,
  PRIMARY KEY (`agent_id`),
  KEY `fk_mgr` (`mgr_id`),
  CONSTRAINT `fk_mgr` FOREIGN KEY (`mgr_id`) REFERENCES `manager` (`mgr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50022 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agent`
--

LOCK TABLES `agent` WRITE;
/*!40000 ALTER TABLE `agent` DISABLE KEYS */;
INSERT INTO `agent` VALUES (50016,'Abheek','Babel',12.00,'B0001',70000),(50017,'Lewis','Phillip',10.00,'B0002',70001),(50018,'Pranav','Rai',12.00,'B0003',70002),(50019,'Ankit','Rai',11.00,'B0004',70003),(50020,'Rohit','Raj',12.00,'B0005',70004),(50021,'Varun','Mehra',12.00,'B0001',70000);
/*!40000 ALTER TABLE `agent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agent_login`
--

DROP TABLE IF EXISTS `agent_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agent_login` (
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `agent_id` int(5) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`agent_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=50022 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agent_login`
--

LOCK TABLES `agent_login` WRITE;
/*!40000 ALTER TABLE `agent_login` DISABLE KEYS */;
INSERT INTO `agent_login` VALUES ('abheek@ccicc.com','asdf',50016),('lewis@ccicc.com','asdf',50017),('pranav@ccicc.com','asdf',50018),('ankit@ccicc.com','asdf',50019),('rohit@ccicc.com','asdf',50020),('varun@ccicc.com','asdf',50021);
/*!40000 ALTER TABLE `agent_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agent_requests`
--

DROP TABLE IF EXISTS `agent_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agent_requests` (
  `agent_id` int(5) NOT NULL,
  `rid` int(5) NOT NULL,
  PRIMARY KEY (`agent_id`,`rid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agent_requests`
--

LOCK TABLES `agent_requests` WRITE;
/*!40000 ALTER TABLE `agent_requests` DISABLE KEYS */;
INSERT INTO `agent_requests` VALUES (50000,30040),(50000,30043),(50000,30044),(50016,30045),(50016,30046),(50016,30047),(50016,30048),(50017,30055),(50017,30056),(50017,30057),(50017,30058),(50017,30059),(50017,30068),(50017,30069),(50017,30070),(50017,30071),(50017,30072),(50017,30073),(50018,30050),(50019,30060),(50019,30061),(50019,30062),(50020,30063),(50020,30064),(50020,30065),(50020,30066);
/*!40000 ALTER TABLE `agent_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `branch_id` char(5) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES ('B0001','Mangalore','India'),('B0002','Dubai','UAE'),('B0003','Mumbai','India'),('B0004','Bangalore','India'),('B0005','Delhi','India');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `claims`
--

DROP TABLE IF EXISTS `claims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `claims` (
  `claim_id` int(5) NOT NULL AUTO_INCREMENT,
  `cid` int(5) DEFAULT NULL,
  `pid` int(5) DEFAULT NULL,
  `aid` int(5) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`claim_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `claims`
--

LOCK TABLES `claims` WRITE;
/*!40000 ALTER TABLE `claims` DISABLE KEYS */;
INSERT INTO `claims` VALUES (15,10000,20006,30016,5000),(16,10000,20011,30030,250000),(17,10000,20009,30013,30000),(18,10002,20004,30007,30000),(19,10002,20004,30008,400000),(20,10002,20005,30018,150),(21,10002,20010,30011,500000),(22,10002,20013,30032,50000),(23,10002,20005,30015,3500),(24,10002,20010,30014,15000),(25,10003,20006,30022,150000),(26,10003,20012,30028,350000),(27,10004,20002,30002,1500000),(28,10004,20002,30005,50000),(29,10004,20008,30012,25000),(30,10004,20002,30008,400000),(31,10005,20008,30012,15000),(32,10005,20009,30010,250000),(33,10005,20011,30024,500000),(34,10005,20005,30015,3500),(35,10002,20005,30015,2500),(36,10000,20000,30000,50000);
/*!40000 ALTER TABLE `claims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `cid` int(5) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `branch` char(5) NOT NULL,
  `balance` int(11) DEFAULT '0',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (10000,'Tejas','Choudhary','1999-06-25','B0001',41750),(10001,'Priyam','Chaddah','1999-08-25','B0003',11500),(10002,'Souhard','K','1998-02-21','B0002',35250),(10003,'Post','Malone','1997-05-20','B0004',8500),(10004,'Taylor','Swift','1992-05-12','B0005',31500),(10005,'Alan','Walker','1994-05-21','B0002',10750),(10038,'Test','User','1999-09-28','B0001',0);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_login`
--

DROP TABLE IF EXISTS `customer_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_login` (
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `cid` int(5) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`cid`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10039 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_login`
--

LOCK TABLES `customer_login` WRITE;
/*!40000 ALTER TABLE `customer_login` DISABLE KEYS */;
INSERT INTO `customer_login` VALUES ('tejas@ccicc.com','tejas',10000),('priyam@ccicc.com','priyam',10001),('souhard@ccicc.com','souhard',10002),('post@gmail.com','post',10003),('taylor@gmail.com','taylor',10004),('alan@gmail.com','alan',10005),('test@gmail.com','asdf',10038);
/*!40000 ALTER TABLE `customer_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investigates`
--

DROP TABLE IF EXISTS `investigates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `investigates` (
  `inv_id` char(5) DEFAULT NULL,
  `claim_id` char(5) NOT NULL,
  `granted` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`claim_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investigates`
--

LOCK TABLES `investigates` WRITE;
/*!40000 ALTER TABLE `investigates` DISABLE KEYS */;
INSERT INTO `investigates` VALUES ('60009','15',1),('60009','16',0),('60009','18',1),('60010','19',1),('60010','21',1),('60011','22',1),('60011','23',1),('60010','24',0),('60010','25',0),('60011','26',1),('60009','27',1),('60009','28',1),('60010','29',1),('60009','30',0),('60010','31',1),('60010','32',1),('60011','33',0),('60010','34',1),('60009','35',1),('60009','36',0);
/*!40000 ALTER TABLE `investigates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investigator`
--

DROP TABLE IF EXISTS `investigator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `investigator` (
  `inv_id` int(5) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`inv_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investigator`
--

LOCK TABLES `investigator` WRITE;
/*!40000 ALTER TABLE `investigator` DISABLE KEYS */;
INSERT INTO `investigator` VALUES (60009,'Raju','Pant'),(60010,'Rakshith','Kumar'),(60011,'Sachin','Kumar');
/*!40000 ALTER TABLE `investigator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investigator_login`
--

DROP TABLE IF EXISTS `investigator_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `investigator_login` (
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `inv_id` int(5) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`inv_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=60012 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investigator_login`
--

LOCK TABLES `investigator_login` WRITE;
/*!40000 ALTER TABLE `investigator_login` DISABLE KEYS */;
INSERT INTO `investigator_login` VALUES ('raju@ccicc.com','asdf',60009),('rakshith@ccicc.com','asdf',60010),('sachin@ccicc.com','asdf',60011);
/*!40000 ALTER TABLE `investigator_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manager`
--

DROP TABLE IF EXISTS `manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manager` (
  `mgr_id` int(5) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `branch` char(5) DEFAULT NULL,
  PRIMARY KEY (`mgr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager`
--

LOCK TABLES `manager` WRITE;
/*!40000 ALTER TABLE `manager` DISABLE KEYS */;
INSERT INTO `manager` VALUES (70000,'Ramesh','Kumar','B0001'),(70001,'Sukesh','Gupta','B0002'),(70002,'Mahesh','Kumar','B0003'),(70003,'Mukesh','Gupta','B0004'),(70004,'Suresh','Reddy','B0005');
/*!40000 ALTER TABLE `manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manager_login`
--

DROP TABLE IF EXISTS `manager_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manager_login` (
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `mgr_id` int(5) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`mgr_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=70005 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager_login`
--

LOCK TABLES `manager_login` WRITE;
/*!40000 ALTER TABLE `manager_login` DISABLE KEYS */;
INSERT INTO `manager_login` VALUES ('ramesh@ccicc.com','asdf',70000),('sukesh@ccicc.com','asdf',70001),('mahesh@ccicc.com','asdf',70002),('mukesh@ccicc.com','asdf',70003),('suresh@ccicc.com','asdf',70004);
/*!40000 ALTER TABLE `manager_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policy`
--

DROP TABLE IF EXISTS `policy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `policy` (
  `pid` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` int(1) NOT NULL,
  `premium` int(11) NOT NULL,
  `duration` int(2) NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=40000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy`
--

LOCK TABLES `policy` WRITE;
/*!40000 ALTER TABLE `policy` DISABLE KEYS */;
INSERT INTO `policy` VALUES (20000,'Basic Life Insurance',1,20000,50),(20001,'Premium Life Insurance',1,35000,50),(20002,'Silver Home Insurance',2,5000,10),(20003,'Gold Home Insurance',2,10000,10),(20004,'Platinum Home Insurance',2,15000,10),(20005,'Senior Health Insurance',3,1000,1),(20006,'General Health Insurance',3,1500,1),(20007,'Premium Health Insurance',3,2000,1),(20008,'Two Wheeler Insuarance',4,1500,1),(20009,'Four Wheeler Insurance',4,1750,1),(20010,'Utility Vehical Insurance',4,2000,1),(20011,'Level 1 Protection',5,10000,3),(20012,'Level 2 Protection',5,25000,3),(20013,'Level 3 Protection ',5,50000,3);
/*!40000 ALTER TABLE `policy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policy_attributes`
--

DROP TABLE IF EXISTS `policy_attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `policy_attributes` (
  `aid` char(5) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy_attributes`
--

LOCK TABLES `policy_attributes` WRITE;
/*!40000 ALTER TABLE `policy_attributes` DISABLE KEYS */;
INSERT INTO `policy_attributes` VALUES ('30000','Fatal Accident Cover',100000),('30001','Kidnap Cover',202000),('30002','Natural Disaster 1',200000),('30003','Natural Disaster 2 ',500000),('30004','Natural Disaster 3',900000),('30005','Theft Cover 1',100000),('30006','Theft Cover 2',250000),('30007','Theft Cover 3',450000),('30008','Man Made Disaster ',800000),('30009','Accident Cover 1',150000),('30010','Accident Cover 2',500000),('30011','Accident Cover 3',1100000),('30012','Agency Servicing 1',30000),('30013','Agency Servicing 2',60000),('30014','Agency Servicing 3',90000),('30015','Dental Cover 1',5000),('30016','Dental Cover 2',10000),('30017','Dental Cover 3',15000),('30018','OPD Cover 1',200),('30019','OPD Cover 2',500),('30020','OPD Cover 3',800),('30021','Surgery Cover 1',100000),('30022','Surgery Cover 2',250000),('30023','Surgery Cover 3',1000000),('30024','Malware Cover 1',1000000),('30025','Malware Cover 2',1500000),('30026','Malware Cover 3',2000000),('30027','Ransomware Cover 1',500000),('30028','Ransomware Cover 2',700000),('30029','Ransomware Cover 3',900000),('30030','DOS Cover 1',500000),('30031','DOS Cover 2',700000),('30032','DOS Cover 3',1000000);
/*!40000 ALTER TABLE `policy_attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `rid` int(5) NOT NULL AUTO_INCREMENT,
  `cid` int(5) NOT NULL,
  `pid` int(5) NOT NULL,
  `type` int(1) NOT NULL,
  PRIMARY KEY (`rid`,`cid`,`pid`),
  KEY `fk_req_policy` (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=30075 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (30045,10000,20006,3),(30046,10000,20011,5),(30047,10000,20000,1),(30048,10000,20009,4),(30049,10000,20002,2),(30050,10001,20001,1),(30051,10001,20003,2),(30052,10001,20007,3),(30053,10001,20008,4),(30054,10001,20012,5),(30055,10002,20001,1),(30056,10002,20004,2),(30057,10002,20005,3),(30058,10002,20010,4),(30059,10002,20013,5),(30060,10003,20001,1),(30061,10003,20006,3),(30062,10003,20012,5),(30063,10004,20001,1),(30064,10004,20007,3),(30065,10004,20002,2),(30066,10004,20008,4),(30067,10004,20012,5),(30068,10005,20000,1),(30069,10005,20005,3),(30070,10005,20011,5),(30071,10005,20002,2),(30072,10005,20008,4),(30073,10005,20009,4),(30074,10002,20009,4);
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `selected_attributes`
--

DROP TABLE IF EXISTS `selected_attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `selected_attributes` (
  `pid` int(5) NOT NULL,
  `aid` int(5) NOT NULL,
  PRIMARY KEY (`pid`,`aid`),
  KEY `fk_selatt_policy_idx` (`pid`),
  KEY `fk_selatt_polatt_idx` (`aid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `selected_attributes`
--

LOCK TABLES `selected_attributes` WRITE;
/*!40000 ALTER TABLE `selected_attributes` DISABLE KEYS */;
INSERT INTO `selected_attributes` VALUES (20000,30000),(20000,30001),(20001,30000),(20001,30001),(20002,30002),(20002,30005),(20002,30008),(20003,30003),(20003,30006),(20003,30008),(20004,30004),(20004,30007),(20004,30008),(20005,30015),(20005,30018),(20005,30022),(20006,30016),(20006,30019),(20006,30022),(20007,30017),(20007,30020),(20007,30023),(20008,30009),(20008,30012),(20009,30010),(20009,30013),(20010,30011),(20010,30014),(20011,30024),(20011,30027),(20011,30030),(20012,30025),(20012,30028),(20012,30031),(20013,30026),(20013,30029),(20013,30032);
/*!40000 ALTER TABLE `selected_attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `firstName` varchar(200) DEFAULT NULL,
  `lastName` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('Jane','Doe');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-31 16:45:24

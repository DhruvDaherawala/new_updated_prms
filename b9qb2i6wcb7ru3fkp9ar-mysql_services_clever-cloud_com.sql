-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: b9qb2i6wcb7ru3fkp9ar-mysql.services.clever-cloud.com:3306
-- Generation Time: Mar 12, 2025 at 10:03 AM
-- Server version: 8.0.22-13
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `b9qb2i6wcb7ru3fkp9ar`
--
CREATE DATABASE IF NOT EXISTS `b9qb2i6wcb7ru3fkp9ar` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `b9qb2i6wcb7ru3fkp9ar`;

-- --------------------------------------------------------

--
-- Table structure for table `child_properties`
--

CREATE TABLE `child_properties` (
  `id` int NOT NULL,
  `floor` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `rooms` int DEFAULT NULL,
  `washroom` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gas` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `electricity` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `deposit` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `rent` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `property_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `child_properties`
--

INSERT INTO `child_properties` (`id`, `floor`, `title`, `description`, `rooms`, `washroom`, `gas`, `electricity`, `deposit`, `rent`, `property_id`) VALUES
(4, '1', 'Deluxe Rooms', 'First floor ', 2, '1', 'yes', 'yes', '30000', '13000', 13),
(8, '1', 'standard Room', 'hello', 2, '2', 'yes', 'yes', '40000', '21000', 18),
(9, '1', 'dd', 'dd', 2, '', 'yes', 'yes', '2000', '5000', 18),
(10, '3', 'dd', 'd', 2, '2', 'yes', 'yes', '2000', '5000', 4),
(11, '0', 'krishna', 'sssssssss', 2, '1', 'no', 'yes', '2000', '20000', 12),
(12, '0', 'sunny', 'hhhhhh', 1, '1', 'yes', 'yes', '22000', '5000', 1),
(13, '1', 'dev', 'ddddd', 1, '2', 'yes', 'yes', '2000', '5000', 3),
(14, '3', 'ss', '2', 1, '1', 'yes', 'yes', '2000', '5000', 4),
(15, '1', 'ffff', 'hum', 1, '1', 'yes', 'yes', '2000', '5000', 13),
(16, '2', 'ssss', 'ssss', 1, '1', 'yes', 'yes', '2000', '5000', 4);

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` int NOT NULL,
  `propertyName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ownerName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `documents` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `numberOfFloors` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `propertyName`, `ownerName`, `address`, `documents`, `numberOfFloors`) VALUES
(1, 'Demo Property One', 'Alice Smith', '123 Main St, Demo City', NULL, NULL),
(2, 'Demo Property Two', 'Bob Johnson', '456 Side St, Demo Town', 'demo2.pdf', 3),
(3, 'Demo Property Three', 'Carol White', '789 High St, Demo Village', 'demo3.pdf', 1),
(4, 'Blue Lagoon ', 'Ronnie', 'Hello Demo data ', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741266962/properties/ztdauyo06ztylrcbvpa4.png', 3),
(5, 'Blue Lagoon -2', 'Ronnie-2', 'Hello Demo data 2', NULL, NULL),
(6, 'cc', 'ttt', 'gggggg', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741338464/properties/dcinsl9dcwiagmpeb5ua.png', NULL),
(8, 'ddu', 'yy', 'yyyyyyyyyyy', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741338726/properties/svhpae4modqf2hn5biqr.png', NULL),
(12, 'Asutos Apt. -2', 'Asutos Bhai -2 ', 'Near bharuch Railway Station', NULL, NULL),
(13, 'Blue lagoon Villa -19', 'Ronnie-19', 'Hello Demo data ', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741596069/properties/griyckxye9lbyfrx7xya.jpg', 2),
(14, 'gg', 'gg', 'ggggggggg', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741601510/properties/mwytnr27vxzdl75dcj05.png', NULL),
(15, 'gg', 'gg', 'ggggggggg', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741601511/properties/wipkwz3jc3zzyu8bwvdn.png', NULL),
(18, 'gayatri', 'ddddddddddddd', 'dddddddddddddddddd', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741620612/properties/flychb3bq1ggpkfqpan2.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `id` int NOT NULL,
  `username` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `renters`
--

CREATE TABLE `renters` (
  `id` int NOT NULL,
  `renterName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fullAddress` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `age` int DEFAULT NULL,
  `numberOfStayers` int DEFAULT NULL,
  `aadhaarCard` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `panCard` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `passportPhoto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `otherDocument` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact1` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact2` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `remarks` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `renters`
--

INSERT INTO `renters` (`id`, `renterName`, `fullAddress`, `age`, `numberOfStayers`, `aadhaarCard`, `panCard`, `passportPhoto`, `otherDocument`, `contact1`, `contact2`, `remarks`) VALUES
(1, 'John Doe ', '101 Demo Lane, Demo City SUrat', 35, 1, '111122223333', 'ABCDE1234F', 'photo1.jpg', 'doc1.pdf', '1234567890', '0987654321', 'Demo renter one Surat'),
(2, 'Jane Roe', '202 Sample Road, Demo Town Gujarat', 28, 2, '444455556666', 'XYZDE5678L', 'photo2.jpg', 'doc2.pdf', '2345678901', '1987654321', 'Demo renter two'),
(3, 'gvIKAS', 'Surat, Gujarat', 25, 5, NULL, NULL, NULL, NULL, '123456977', '7894513216', 'DHKDV'),
(4, 'VIKAS SINGH', 'SURAT GUJARAT', 25, 3, 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741673726/renters/q1e1hi2kaug6grsz9ldz.pdf', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741673726/renters/nmjrpddfg0vbnjeo50yk.pdf', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741673726/renters/vzptm3kmsso2iicutp2g.pdf', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741673739/renters/o2114jsugnwolafrwmj1.pdf', '1234567890', '9874563210', 'FOR 6 MONTHS');

-- --------------------------------------------------------

--
-- Table structure for table `renter_allocation`
--

CREATE TABLE `renter_allocation` (
  `id` int NOT NULL,
  `renter_id` int NOT NULL,
  `property_id` int NOT NULL,
  `childproperty_id` int NOT NULL,
  `allocation_date` date NOT NULL,
  `rent_agreement` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `other_document` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `remarks` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Active',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `renter_allocation`
--

INSERT INTO `renter_allocation` (`id`, `renter_id`, `property_id`, `childproperty_id`, `allocation_date`, `rent_agreement`, `other_document`, `remarks`, `status`, `created_at`, `updated_at`) VALUES
(7, 1, 13, 4, '2025-03-12', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741598983/renter_allocations/i6o1rdnmewbwf0tzcpil.png', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741598982/renter_allocations/ahfumjncwdzwd1pm3n3y.png', 'Notes! Additional okay', 'Active', '2025-03-10 09:29:44', '2025-03-10 09:29:44'),
(8, 1, 18, 4, '2025-03-12', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741669492/renter_allocations/kzv0lousbwc153kgfgy4.pdf', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741669492/renter_allocations/zfeprhl2xin25k4fvly6.pdf', 'FOR SIX MOTHS MAY BE', 'Active', '2025-03-11 05:04:53', '2025-03-11 05:04:53'),
(9, 4, 18, 4, '2025-03-12', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741675271/renter_allocations/r2cwrlw5hj6myi6sakhw.pdf', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741675271/renter_allocations/s0dhfx4xwl9otgtds8bb.pdf', 'Will stay for 9 months', 'Active', '2025-03-11 06:41:12', '2025-03-11 06:41:12'),
(10, 1, 8, 11, '2025-03-11', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741769897/renter_allocations/bwgtsr9snobrrqsaifqk.png', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741769897/renter_allocations/vmd3xr8t1guapfbcyfrp.png', 'dddd', 'Inactive', '2025-03-12 08:58:18', '2025-03-12 08:58:18'),
(11, 1, 8, 11, '2025-03-11', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741769900/renter_allocations/d4npsi8phcxc2ijlgqaa.png', 'https://res.cloudinary.com/dticgi3cc/image/upload/v1741769899/renter_allocations/cia4vfzfmu6gvfmjtin3.png', 'dddd', 'Inactive', '2025-03-12 08:58:22', '2025-03-12 08:58:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `child_properties`
--
ALTER TABLE `child_properties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_child_properties_property` (`property_id`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `renters`
--
ALTER TABLE `renters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `renter_allocation`
--
ALTER TABLE `renter_allocation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_renter_allocation_renter` (`renter_id`),
  ADD KEY `fk_renter_allocation_property` (`property_id`),
  ADD KEY `fk_renter_allocation_child` (`childproperty_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `child_properties`
--
ALTER TABLE `child_properties`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `renters`
--
ALTER TABLE `renters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `renter_allocation`
--
ALTER TABLE `renter_allocation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `child_properties`
--
ALTER TABLE `child_properties`
  ADD CONSTRAINT `fk_child_properties_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `renter_allocation`
--
ALTER TABLE `renter_allocation`
  ADD CONSTRAINT `fk_renter_allocation_child` FOREIGN KEY (`childproperty_id`) REFERENCES `child_properties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_renter_allocation_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_renter_allocation_renter` FOREIGN KEY (`renter_id`) REFERENCES `renters` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

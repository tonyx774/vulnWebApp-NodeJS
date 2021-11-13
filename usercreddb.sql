-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Nov 08, 2021 at 04:48 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `usercreddb`
--

-- --------------------------------------------------------

--
-- Table structure for table `usercred`
--

CREATE TABLE `usercred` (
  `userID` int(11) NOT NULL,
  `user` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usercred`
--

INSERT INTO `usercred` (`userID`, `user`, `password`) VALUES
(1, 'admin', 'c741a8125c68c7a8d7632fa8a9419f0b4d7cf2a902cc77cf83d437341061afe3'),
(2, 'tony', 'a6ffeca0f4f851cf726ec2818a1159336fa70b2abab9eba4afc9ef518b196792'),
(3, 'jack', '5ac9b33956fc6a72d608fed4427a7f226cf1c82bb190a83f168139c3820e03fe');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `usercred`
--
ALTER TABLE `usercred`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `usercred`
--
ALTER TABLE `usercred`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

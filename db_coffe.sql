-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2021 at 09:06 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_coffe`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(20) DEFAULT NULL,
  `category_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `category_updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `category_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_created_at`, `category_updated_at`, `category_status`) VALUES
(1, 'Coffee', '2020-12-11 13:55:36', '2020-12-11 13:56:22', 1),
(2, 'Non Coffee', '2020-12-11 13:55:36', '2020-12-11 13:56:22', 1),
(3, 'Foods', '2020-12-11 13:56:35', '2020-12-11 13:57:04', 1),
(4, 'Add-on', '2020-12-11 13:56:35', '2020-12-11 13:57:04', 1),
(5, 'Favourite', '2020-12-21 02:38:13', '2020-12-21 02:38:13', 1);

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `coupon_id` int(11) NOT NULL,
  `coupon_name` varchar(30) DEFAULT NULL,
  `coupon_code` varchar(30) DEFAULT NULL,
  `coupon_image` varchar(255) DEFAULT NULL,
  `coupon_discount` int(11) DEFAULT NULL,
  `coupon_min_purchase` int(11) DEFAULT NULL,
  `coupon_max_limit` int(11) DEFAULT NULL,
  `coupon_start` datetime DEFAULT NULL,
  `coupon_end` datetime DEFAULT NULL,
  `coupon_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `coupon_updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coupon`
--

INSERT INTO `coupon` (`coupon_id`, `coupon_name`, `coupon_code`, `coupon_image`, `coupon_discount`, `coupon_min_purchase`, `coupon_max_limit`, `coupon_start`, `coupon_end`, `coupon_created_at`, `coupon_updated_at`) VALUES
(11, '', 'POIOP', '2021-02-17T16-35-59.973Zarkademy.png', 90, 90000, 50000, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2021-02-17 16:35:59', '2021-02-17 23:35:59'),
(12, '', 'MERDEKA', '2021-02-23T03-21-20.512Z1.jpg', 40, 40000, 20000, '2021-02-26 00:00:00', '2021-02-27 00:00:00', '2021-02-23 03:21:20', '2021-02-23 10:21:20');

-- --------------------------------------------------------

--
-- Table structure for table `detail_history`
--

CREATE TABLE `detail_history` (
  `detail_history_id` int(11) NOT NULL,
  `invoice` varchar(255) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `detail_qty` int(11) DEFAULT NULL,
  `detail_total` int(20) DEFAULT NULL,
  `detail_size` varchar(255) DEFAULT NULL,
  `detail_delivery` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_history`
--

INSERT INTO `detail_history` (`detail_history_id`, `invoice`, `product_id`, `product_name`, `product_image`, `detail_qty`, `detail_total`, `detail_size`, `detail_delivery`, `created_at`) VALUES
(12, '', 71, 'kebab', '2021-02-19T09-13-53.958Zarkademy.png', 2, 80000, '500 gr', 'Home Delivery', '2021-02-22 22:46:57'),
(15, 'CFS96168', 72, 'Kopi Selir', '2021-02-20T14-40-34.917Zd55c3cc78cb1df042bda37774c9a8743.jpg', 2, 40000, '', 'Home Delivery', '2021-02-22 23:37:12'),
(16, 'CFS29183', 72, 'kebab', '2021-02-19T09-13-53.958Zarkademy.png', 2, 40000, 'Extra Large', 'Take Away', '2021-02-23 00:25:29'),
(17, 'CFS29183', 71, 'Kopi Selir', '2021-02-20T14-40-34.917Zd55c3cc78cb1df042bda37774c9a8743.jpg', 2, 80000, '300 gr', 'Home Delivery', '2021-02-23 00:25:29'),
(21, 'CFS62973', 74, 'Espresso', '2021-02-23T03-03-11.275ZEspresso.jpg', 3, 30000, 'Large', 'Home Delivery', '2021-02-23 04:11:53'),
(22, 'CFS62973', 75, 'Kopi', '2021-02-23T03-11-45.595Z1.jpg', 2, 30000, 'Large', 'Home Delivery', '2021-02-23 04:11:53');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `invoice` varchar(255) DEFAULT NULL,
  `sub_total` int(20) DEFAULT NULL,
  `tax_fees` int(20) DEFAULT NULL,
  `shipping` int(20) DEFAULT NULL,
  `discount` int(20) DEFAULT NULL,
  `grand_total` int(20) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL,
  `history_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`history_id`, `invoice`, `sub_total`, `tax_fees`, `shipping`, `discount`, `grand_total`, `payment_method`, `created_at`, `user_id`, `history_status`) VALUES
(26, 'CFS96168', 40000, 0, 0, 0, 40000, 'Bank Account', '2021-02-22 23:37:12', 3, 1),
(27, 'CFS29183', 120000, 0, 0, 30000, 90000, 'Bank Account', '2021-02-23 00:25:29', 3, 1),
(30, 'CFS62973', 60000, 0, 0, 0, 60000, 'Bank Account', '2021-02-23 04:11:53', 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `product_price` int(11) DEFAULT NULL,
  `product_qty` int(11) DEFAULT NULL,
  `product_desc` varchar(200) DEFAULT NULL,
  `product_status` int(11) DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `time_start` time DEFAULT NULL,
  `time_end` time DEFAULT NULL,
  `product_sizeR` int(11) DEFAULT NULL,
  `product_sizeL` int(11) DEFAULT NULL,
  `product_sizeXL` int(11) DEFAULT NULL,
  `product_size250` int(11) DEFAULT NULL,
  `product_size300` int(11) DEFAULT NULL,
  `product_size500` int(11) DEFAULT NULL,
  `product_deliv_home` int(11) DEFAULT NULL,
  `product_deliv_dine` int(11) DEFAULT NULL,
  `product_deliv_take` int(11) DEFAULT NULL,
  `product_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `product_updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_price`, `product_qty`, `product_desc`, `product_status`, `product_image`, `time_start`, `time_end`, `product_sizeR`, `product_sizeL`, `product_sizeXL`, `product_size250`, `product_size300`, `product_size500`, `product_deliv_home`, `product_deliv_dine`, `product_deliv_take`, `product_created_at`, `product_updated_at`) VALUES
(74, 'Espresso', 1, 10000, 10, 'Choose the Git provider where your site’s source code is hosted. When you push to Git, we run your build tool of choice on our servers and deploy the result.  You can unlock options for self-hosted Gi', 1, '2021-02-23T03-03-11.275ZEspresso.jpg', '09:00:00', '22:00:00', 1, 1, 1, 0, 0, 0, 1, 1, 1, '2021-02-23 03:03:11', '2021-02-23 10:03:11'),
(75, 'Kopi', 2, 15000, 10, 'Choose the Git provider where your site’s source code is hosted. When you push to Git, we run your build tool of choice on our servers and deploy the result.  You can unlock options for self-hosted Gi', 1, '2021-02-23T04-51-36.581Zarkademy.png', '10:00:00', '20:00:00', 1, 1, 1, 0, 0, 0, 1, 1, 1, '2021-02-23 03:05:25', '2021-02-23 04:51:36');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `user_password` varchar(100) DEFAULT NULL,
  `user_role` int(11) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `user_firstname` varchar(30) DEFAULT NULL,
  `user_lastname` varchar(30) DEFAULT NULL,
  `user_gender` varchar(10) DEFAULT NULL,
  `user_contact` int(30) DEFAULT NULL,
  `user_image` varchar(100) DEFAULT NULL,
  `user_address` varchar(255) DEFAULT NULL,
  `user_birth` date DEFAULT NULL,
  `user_status` int(11) DEFAULT NULL,
  `user_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `user_password`, `user_role`, `user_name`, `user_firstname`, `user_lastname`, `user_gender`, `user_contact`, `user_image`, `user_address`, `user_birth`, `user_status`, `user_created_at`, `user_updated_at`) VALUES
(3, 'ivan@gmail.com', '$2b$10$ErZ5l6GviKBrVOIxZ6mqXen9WPfF.4hloB2QDAo4ObY47LGEHuwe.', 1, 'Ivan', 'rozak', 'abcd', 'male', 2147483647, '2021-02-16T01-34-58.249Zarkademy.png', 'lamongan', '1995-01-30', 0, '2020-12-27 17:50:46', '2021-02-16 01:34:58'),
(6, 'user@gmail.com', '$2b$10$WgR3d7LdM37.nT/WTOQ.NucTrGs0PSTE3HLLxCzVKZm2AMMXozkM2', 0, 'user', 'user', 'name', 'male', 9875, '2021-01-12T01-57-08.701Zarkademy.png', 'lamongan', '1995-01-30', 0, '2021-01-11 17:30:01', '2021-01-12 01:57:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`coupon_id`);

--
-- Indexes for table `detail_history`
--
ALTER TABLE `detail_history`
  ADD PRIMARY KEY (`detail_history_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `coupon`
--
ALTER TABLE `coupon`
  MODIFY `coupon_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `detail_history`
--
ALTER TABLE `detail_history`
  MODIFY `detail_history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

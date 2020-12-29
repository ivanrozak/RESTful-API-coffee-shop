-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 29, 2020 at 10:04 AM
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
  `category_name` varchar(20) NOT NULL,
  `category_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `category_updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `category_status` int(11) NOT NULL
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
  `coupon_name` varchar(30) NOT NULL,
  `coupon_code` varchar(30) NOT NULL,
  `product_list` varchar(30) NOT NULL,
  `coupon_discount` int(11) NOT NULL,
  `coupon_min_purchase` int(11) NOT NULL,
  `coupon_max_limit` int(11) NOT NULL,
  `coupon_start` datetime NOT NULL,
  `coupon_end` datetime NOT NULL,
  `coupon_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `coupon_updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coupon`
--

INSERT INTO `coupon` (`coupon_id`, `coupon_name`, `coupon_code`, `product_list`, `coupon_discount`, `coupon_min_purchase`, `coupon_max_limit`, `coupon_start`, `coupon_end`, `coupon_created_at`, `coupon_updated_at`) VALUES
(1, '', 'HARBOLNAS', 'Hazelnut Latte', 40, 50000, 40000, '2020-12-14 00:00:00', '0000-00-00 00:00:00', '2020-12-13 22:34:36', '2020-12-14 05:34:36'),
(4, '', 'HARBOLNAS', 'Brew Coffee', 60, 50000, 45000, '2020-12-14 00:00:00', '2020-12-27 00:00:00', '2020-12-20 20:28:32', '2020-12-21 03:28:32');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_method`
--

CREATE TABLE `delivery_method` (
  `delivery_method_id` int(11) NOT NULL,
  `delivery_method_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `delivery_method`
--

INSERT INTO `delivery_method` (`delivery_method_id`, `delivery_method_name`) VALUES
(1, 'Home Delivery'),
(2, 'Dine In'),
(3, 'Take Away');

-- --------------------------------------------------------

--
-- Table structure for table `detail_history`
--

CREATE TABLE `detail_history` (
  `detail_history_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `detail_history_qty` int(11) NOT NULL,
  `detail_size_id` int(11) NOT NULL,
  `detail_history_total` int(11) NOT NULL,
  `history_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_history`
--

INSERT INTO `detail_history` (`detail_history_id`, `product_id`, `detail_history_qty`, `detail_size_id`, `detail_history_total`, `history_id`) VALUES
(1, 5, 2, 2, 60000, 1),
(2, 4, 2, 2, 55000, 2),
(3, 4, 2, 2, 55000, 2);

-- --------------------------------------------------------

--
-- Table structure for table `detail_size`
--

CREATE TABLE `detail_size` (
  `detail_size_id` int(11) NOT NULL,
  `detail_size_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_size`
--

INSERT INTO `detail_size` (`detail_size_id`, `detail_size_name`) VALUES
(1, 'Regular'),
(2, 'Large'),
(3, 'Extra Large'),
(4, '250 gr'),
(5, '300 gr'),
(6, '500 gr');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `history_invoice` varchar(30) NOT NULL,
  `sub_total` int(11) NOT NULL,
  `payment_method` varchar(30) NOT NULL,
  `delivery_method_id` int(11) NOT NULL,
  `history_status` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `history_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `history_updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`history_id`, `history_invoice`, `sub_total`, `payment_method`, `delivery_method_id`, `history_status`, `user_id`, `history_created_at`, `history_updated_at`) VALUES
(1, 'LKFHLDHFL', 0, 'Cash', 1, 1, 1, '2020-12-14 00:34:52', '2020-12-14 07:34:52'),
(3, 'WIKH687', 0, 'dine in', 2, 1, 1, '2020-12-14 04:41:51', '2020-12-14 11:41:51');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `category_id` int(11) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_desc` varchar(200) NOT NULL,
  `product_status` int(11) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `product_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `product_updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_price`, `product_desc`, `product_status`, `product_image`, `product_created_at`, `product_updated_at`) VALUES
(2, 'Pisang Goreng', 4, 16000, '', 1, '', '2020-12-13 21:03:08', '2020-12-13 21:04:30'),
(4, 'nasi padang', 3, 19000, '', 1, '', '2020-12-13 21:05:09', '2020-12-23 07:40:17'),
(5, 'French Fries', 4, 16000, '', 1, '', '2020-12-13 21:05:09', '2020-12-13 21:06:14'),
(6, 'Special Fried Rice', 3, 25000, '', 1, '', '2020-12-13 21:06:17', '2020-12-13 21:07:13'),
(7, 'Burger', 3, 30000, '', 1, '', '2020-12-13 21:06:17', '2020-12-13 21:07:13'),
(8, 'Spaghetti', 3, 27000, '', 1, '', '2020-12-13 21:07:16', '2020-12-13 21:09:35'),
(9, 'Chicken Wings', 3, 27000, '', 1, '', '2020-12-13 21:07:16', '2020-12-13 21:09:35'),
(10, 'Special Instant Noodles', 3, 18000, '', 1, '', '2020-12-13 21:09:38', '2020-12-13 21:10:34'),
(11, 'Salted Egg Instant Noodles', 3, 18000, '', 1, '', '2020-12-13 21:09:38', '2020-12-13 21:10:34'),
(12, 'Hot Tea', 2, 9000, '', 1, '', '2020-12-13 21:10:45', '2020-12-13 21:12:00'),
(13, 'Iced Tea', 2, 9000, '', 1, '', '2020-12-13 21:10:45', '2020-12-13 21:12:00'),
(14, 'Hot Lemon Tea', 2, 15000, '', 1, '', '2020-12-13 21:12:25', '2020-12-13 21:13:19'),
(15, 'Iced Lemon Tea', 2, 16000, '', 1, '', '2020-12-13 21:12:25', '2020-12-13 21:13:19'),
(16, 'Iced Lychee Tea', 2, 15000, '', 1, '', '2020-12-13 21:13:21', '2020-12-13 21:14:07'),
(17, 'Avocado Juice', 2, 20000, '', 1, '', '2020-12-13 21:13:21', '2020-12-13 21:14:07'),
(18, 'Fresh Orange', 2, 20000, '', 1, '', '2020-12-13 21:14:11', '2020-12-13 21:15:35'),
(19, 'Mineral Water', 2, 7000, '', 1, '', '2020-12-13 21:14:11', '2020-12-13 21:15:35'),
(20, 'Banana Ice Cream', 2, 22000, '', 1, '', '2020-12-13 21:15:38', '2020-12-13 21:16:06'),
(21, 'Brews Americano', 1, 25000, '', 1, '', '2020-12-13 21:16:08', '2020-12-13 21:17:47'),
(22, 'Brews Espresso', 1, 15000, '', 1, '', '2020-12-13 21:16:08', '2020-12-13 21:17:47'),
(23, 'Cappucino Latte', 1, 25000, '', 1, '', '2020-12-13 21:17:50', '2020-12-13 21:20:21'),
(24, 'Mochaccino Latte', 1, 28000, '', 1, '', '2020-12-13 21:17:50', '2020-12-13 21:20:21'),
(25, 'Caffe Latte', 1, 25000, '', 1, '', '2020-12-13 21:20:24', '2020-12-13 21:21:04'),
(26, 'Caramel Latte', 1, 26000, '', 1, '', '2020-12-13 21:20:24', '2020-12-13 21:21:04'),
(27, 'Vanilla Late', 1, 28000, '', 1, '', '2020-12-13 21:21:06', '2020-12-13 21:22:04'),
(28, 'Hazelnut Latte', 1, 28000, '', 1, '', '2020-12-13 21:21:06', '2020-12-13 21:22:04'),
(29, 'Almond Latte', 1, 30000, '', 1, '', '2020-12-13 21:22:07', '2020-12-13 21:22:51'),
(37, 'soto lamongan', 3, 18000, '', 1, '', '2020-12-14 07:18:28', '2020-12-14 14:18:28'),
(38, 'kopi baru', 1, 10000, '', 1, '', '2020-12-16 04:25:21', '2020-12-16 11:25:21'),
(39, 'kopi baru', 1, 10000, '', 1, '', '2020-12-16 04:29:44', '2020-12-16 11:29:44'),
(40, 'brew coffee', 1, 25000, '', 1, '', '2020-12-16 04:39:52', '2020-12-16 11:39:52'),
(41, 'brew coffee', 1, 25000, '', 1, '', '2020-12-16 04:40:00', '2020-12-16 11:40:00'),
(42, 'Kopi Hitam', 1, 20000, '', 1, '', '2020-12-16 04:43:59', '2020-12-16 11:43:59'),
(43, 'asdsadsa', 1, 20000, '', 0, '2020-12-23T04-06-33.985Zarkademy.png', '2020-12-23 04:06:33', '2020-12-23 11:06:34');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_displayname` varchar(30) NOT NULL,
  `user_firstname` varchar(30) NOT NULL,
  `user_lastname` varchar(30) NOT NULL,
  `user_gender` varchar(10) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_image` varchar(100) NOT NULL,
  `user_contact` int(30) NOT NULL,
  `user_birth` date DEFAULT NULL,
  `user_role` int(11) NOT NULL,
  `user_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_displayname`, `user_firstname`, `user_lastname`, `user_gender`, `user_email`, `user_password`, `user_image`, `user_contact`, `user_birth`, `user_role`, `user_created_at`, `user_updated_at`) VALUES
(1, 'ivan Rozak', '', '', '', '', 'ivanrozack@gmail.com', '$2b$10$byXRw2v69w9ee0RCW4JLl.cBw8qWDjfJhUMG5.MZ5gk/n/qPCp.yG', '', 0, NULL, 0, '2020-12-22 07:54:56', '2020-12-22 14:54:56'),
(3, 'ivan', '', '', '', '', 'ivan@gmail.com', '$2b$10$ErZ5l6GviKBrVOIxZ6mqXen9WPfF.4hloB2QDAo4ObY47LGEHuwe.', '', 0, NULL, 1, '2020-12-27 17:50:46', '2020-12-28 00:50:46'),
(4, 'ivan', '', '', '', '', 'rozack@gmail.com', '$2b$10$tXFk9Zxi/j/PMLzxbY4kz.QRIsENikdk5qJeoPbcffx3BgKrxiI4K', '', 0, NULL, 0, '2020-12-27 17:58:10', '2020-12-28 00:58:10');

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
-- Indexes for table `delivery_method`
--
ALTER TABLE `delivery_method`
  ADD PRIMARY KEY (`delivery_method_id`);

--
-- Indexes for table `detail_history`
--
ALTER TABLE `detail_history`
  ADD PRIMARY KEY (`detail_history_id`);

--
-- Indexes for table `detail_size`
--
ALTER TABLE `detail_size`
  ADD PRIMARY KEY (`detail_size_id`);

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
  MODIFY `coupon_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `delivery_method`
--
ALTER TABLE `delivery_method`
  MODIFY `delivery_method_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `detail_history`
--
ALTER TABLE `detail_history`
  MODIFY `detail_history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `detail_size`
--
ALTER TABLE `detail_size`
  MODIFY `detail_size_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

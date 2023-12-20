-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 06, 2023 at 03:32 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ql_banhang`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(4) DEFAULT 1,
  `createdate` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `name`, `email`, `password`, `status`, `createdate`, `updatedate`) VALUES
(1, 'admin', 'admin@gmail.com', '123456', 1, '2023-07-31 07:20:13', '2023-07-31 07:20:13');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(4) DEFAULT 1,
  `image` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdate` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `status`, `image`, `createdate`, `updatedate`) VALUES
(15, 'Burger Set', 1, '1696507238790.jpg', '2023-09-29 09:19:11', '2023-10-05 12:03:22'),
(16, 'Promotion', 1, '1696593071739.jpg', '2023-09-29 10:42:22', '2023-10-06 11:51:11'),
(22, 'Rice & Spaghetti', 1, '1696507814896.jpg', '2023-09-30 01:19:22', '2023-10-05 12:10:14'),
(23, 'Chicken Set', 1, '1696507724056.jpg', '2023-09-30 10:40:03', '2023-10-05 12:08:44'),
(24, 'Chicken', 1, '1696507679357.jpg', '2023-09-30 10:41:17', '2023-10-05 12:07:59'),
(29, 'Burger', 1, '1696507562482.jpg', '2023-10-03 01:16:20', '2023-10-05 12:06:02'),
(37, 'All', 1, '1696572740889.jpg', '2023-10-05 08:26:12', '2023-10-06 06:22:30'),
(39, 'Drinks', 1, '1696585179372.jpg', '2023-10-06 09:39:39', '2023-10-06 09:39:39');

-- --------------------------------------------------------

--
-- Table structure for table `favourites`
--

CREATE TABLE `favourites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `createDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `favourites`
--

INSERT INTO `favourites` (`id`, `user_id`, `product_id`, `createDate`) VALUES
(103, 143, 45, '2023-10-03 16:13:48'),
(104, 145, 47, '2023-10-03 16:14:18'),
(105, 145, 44, '2023-10-03 16:22:51'),
(113, 143, 44, '2023-10-04 20:03:43');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `orderDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(4) DEFAULT 0,
  `shipDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `note` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `detailaddress` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `updatedate` timestamp NOT NULL DEFAULT current_timestamp(),
  `totalPrice` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` float NOT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `price` float NOT NULL,
  `sale_price` float DEFAULT 0,
  `image` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `status` tinyint(4) DEFAULT 1,
  `createdate` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `sale_price`, `image`, `description`, `category_id`, `status`, `createdate`, `updatedate`) VALUES
(44, 'LChicken Combo', 92000, 82000, '1696508598550.png', '01 LChicken Burger, 01 Fried Fries, 01 Pepsi (M)', 15, 1, '2023-09-23 22:19:51', '2023-10-05 13:43:10'),
(45, 'Milo', 22000, 0, '1696585212991.png', 'nice', 39, 1, '2023-09-22 04:32:44', '2023-10-06 09:40:12'),
(46, 'Orange Juice', 27000, 0, '1696585343912.png', 'nice', 39, 1, '2023-09-30 01:19:51', '2023-10-06 09:42:23'),
(47, 'Lipton Tea', 18000, 0, '1696585397313.png', 'nice', 39, 1, '2023-09-30 01:19:51', '2023-10-06 09:43:17'),
(48, 'Pepsi Zero', 18000, 0, '1696585597346.jpg', 'nice', 39, 1, '2023-09-30 01:19:51', '2023-10-06 09:46:37'),
(49, 'Pepsi', 14000, 0, '1696585803602.png', 'nice', 39, 1, '2023-09-30 01:19:51', '2023-10-06 09:50:03'),
(52, 'Milkis', 22000, 0, '1696585262411.png', 'nice', 39, 0, '2023-10-04 07:50:44', '2023-10-06 09:41:02'),
(54, 'Beef Combo', 77000, 52000, '1696508835500.png', '01 Burger Beef,01 Khoai tây chiên (M),01 Pepsi (M)', 15, 1, '2023-10-04 20:19:20', '2023-10-05 12:27:15'),
(60, 'Double Double Combo', 116000, 98000, '1696586439057.png', '01 Double Double Burger, 01 French Fries, 01 Pepsi (M)', 15, 1, '2023-10-06 10:00:39', '2023-10-06 10:00:39'),
(61, 'Mozzarella Combo', 128000, 107000, '1696586837526.png', '01 Mozzarella Burger, 01 French Fries, 01 Pepsi (M)', 15, 1, '2023-10-06 10:07:17', '2023-10-06 10:07:17'),
(62, 'Shrimp Combo', 90000, 80000, '1696586948252.png', '01 Shrimp Burger, 01 French Fries, 01 Pepsi (M)', 15, 1, '2023-10-06 10:09:08', '2023-10-06 10:09:08'),
(63, 'Bulgogi Combo', 90000, 80000, '1696587019655.png', '01 Bulgogi Burger, 01 French Fries, 01 Pepsi (M)', 15, 1, '2023-10-06 10:10:19', '2023-10-06 10:10:19'),
(64, 'Cheese Combo', 87000, 72000, '1696587403127.png', '01 Cheese Burger, 01 French Fries, 01 Pepsi (M)', 15, 1, '2023-10-06 10:16:43', '2023-10-06 10:16:43'),
(65, 'Teriyaki Combo', 85000, 70000, '1696587487541.png', '01 Teriyaki Burger, 01 French Fries, 01 Pepsi (M)', 15, 1, '2023-10-06 10:18:07', '2023-10-06 10:18:07'),
(66, 'Chicken Ball Rice', 45000, 0, '1696589218682.png', 'nice', 22, 1, '2023-10-06 10:46:58', '2023-10-06 10:46:58'),
(67, 'Teri LChicken Rice', 45000, 0, '1696589297681.png', 'nice', 22, 1, '2023-10-06 10:48:17', '2023-10-06 10:48:17'),
(68, 'Soybean Chicken Rice', 45000, 0, '1696589353885.png', 'nice', 22, 1, '2023-10-06 03:49:13', '2023-10-06 10:51:16'),
(69, 'HS Chicken Rice', 45000, 0, '1696589406159.png', 'nice', 22, 1, '2023-10-06 10:50:06', '2023-10-06 10:50:06'),
(70, 'Buffalo Chicken Rice', 45000, 0, '1696589462350.png', 'nice', 22, 1, '2023-10-06 10:51:02', '2023-10-06 10:51:02'),
(71, 'Cheese Chicken Rice', 45000, 0, '1696589641277.png', 'nice', 22, 1, '2023-10-06 10:54:01', '2023-10-06 10:54:01'),
(72, 'Spaghetti', 32000, 0, '1696589693479.png', 'nice', 22, 1, '2023-10-06 10:54:53', '2023-10-06 10:54:53'),
(73, 'Beef Spaghetti', 42000, 0, '1696589744986.png', 'nice', 22, 1, '2023-10-06 10:55:44', '2023-10-06 10:55:44'),
(74, 'Chicken Set', 112000, 83000, '1696589999061.png', '02 Fried Chicken, 01 French Fries, 01 Pepsi (M)', 23, 1, '2023-10-06 10:59:59', '2023-10-06 10:59:59'),
(75, 'HS Chicken Set', 122000, 93000, '1696590119114.png', '02 HS Chicken, 01 French Fries, 01 Pepsi (M)', 23, 1, '2023-10-06 11:01:59', '2023-10-06 11:01:59'),
(76, 'Cheese Chicken Set', 122000, 93000, '1696590197955.png', '02 Cheese Chicken, 01 French Fries, 01 Pepsi (M)', 23, 1, '2023-10-06 11:03:17', '2023-10-06 11:03:17'),
(77, 'Buffalo Chicken Set', 122000, 93000, '1696590254641.png', '02 Buffalo Chicken, 01 French Fries, 01 Pepsi (M)', 23, 1, '2023-10-06 11:04:14', '2023-10-06 11:04:14'),
(78, 'Fried Chicken', 35000, 0, '1696590621887.png', 'nice', 24, 1, '2023-10-06 11:10:21', '2023-10-06 11:10:21'),
(79, 'Chicken Family', 105000, 102000, '1696590852179.png', 'nice', 24, 1, '2023-10-06 11:14:12', '2023-10-06 11:14:12'),
(80, 'HS Family', 240000, 221000, '1696590945241.png', 'nice', 24, 1, '2023-10-06 11:15:45', '2023-10-06 11:15:45'),
(81, 'Soy Bean Chicken', 40000, 0, '1696591041430.png', 'nice', 24, 1, '2023-10-06 11:17:21', '2023-10-06 11:17:21'),
(82, 'Soy Bean Family', 120000, 116000, '1696591136929.png', 'nice', 24, 1, '2023-10-06 11:18:56', '2023-10-06 11:18:56'),
(83, 'Cheese Chicken', 40000, 0, '1696591200318.png', 'nice', 24, 1, '2023-10-06 11:20:00', '2023-10-06 11:20:00'),
(84, 'Cheese Family', 120000, 116000, '1696591248601.png', 'nice', 24, 1, '2023-10-06 11:20:48', '2023-10-06 11:20:48'),
(85, 'Buffalo', 40000, 0, '1696591310915.png', 'nice', 24, 1, '2023-10-06 11:21:50', '2023-10-06 11:21:50'),
(86, 'Buffalo Family', 120000, 116000, '1696591367362.png', 'nice', 24, 1, '2023-10-06 11:22:47', '2023-10-06 11:22:47'),
(87, 'Grilled Family', 120000, 116000, '1696591422378.png', 'nice', 24, 1, '2023-10-06 11:23:42', '2023-10-06 11:23:42'),
(88, 'LChicken Burger', 50000, 0, '1696591706146.png', 'nice', 29, 1, '2023-10-06 11:28:26', '2023-10-06 11:28:26'),
(89, 'Beef Burger', 35000, 0, '1696591790825.png', 'nice', 29, 1, '2023-10-06 11:29:50', '2023-10-06 11:29:50'),
(90, 'Double Double Burger', 74000, 0, '1696591828466.png', 'nice', 29, 1, '2023-10-06 04:30:28', '2023-10-06 11:31:45'),
(91, 'Shirmp Burger', 48000, 0, '1696592009791.png', 'nice', 29, 1, '2023-10-06 11:33:29', '2023-10-06 11:33:29'),
(92, 'Blugogi Burger', 48000, 0, '1696592081939.png', 'nice', 29, 1, '2023-10-06 11:34:41', '2023-10-06 11:34:41'),
(93, 'Fish Burger', 40000, 0, '1696592146277.png', 'nice', 29, 1, '2023-10-06 11:35:46', '2023-10-06 11:35:46'),
(94, 'Cheese Burger', 45000, 0, '1696592223456.png', 'nice', 29, 1, '2023-10-06 11:37:03', '2023-10-06 11:37:03'),
(95, 'Teriyaki Burger', 43000, 0, '1696592288793.png', 'nice', 29, 1, '2023-10-06 11:38:08', '2023-10-06 11:38:08'),
(96, 'Combo 79K', 109000, 79000, '1696593222176.png', '01 Fried Chicken, 01 Spaghetti, 01 French Fries, 01 Pepsi (M)', 16, 1, '2023-10-06 11:53:42', '2023-10-06 11:53:42'),
(97, 'Combo 139K', 179000, 139000, '1696593294326.png', '02 Fried Chicken, 01 Bulgogi Burger, 01 French Fries (M), 02 Pepsi (M)', 16, 1, '2023-10-06 11:54:54', '2023-10-06 11:54:54'),
(98, 'Combo 189k', 263000, 189000, '1696593441917.png', '02 Fried Chicken, 01 K-Chicken, 01 Shrimp Burger, 01 French Fries, 03 Pepsi (M)', 16, 1, '2023-10-06 11:57:21', '2023-10-06 11:57:21'),
(99, 'Combo Deli', 126000, 85000, '1696593499126.png', '01 Fried Chicken, 01 Shrimp Burger, 01 French Fries (M), 01 Pepsi (M)', 16, 1, '2023-10-06 11:58:19', '2023-10-06 11:58:19');

-- --------------------------------------------------------

--
-- Table structure for table `savedaddress`
--

CREATE TABLE `savedaddress` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `useraddress` varchar(500) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1,
  `detailaddress` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdate` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `savedaddress`
--

INSERT INTO `savedaddress` (`id`, `user_id`, `store_id`, `useraddress`, `status`, `detailaddress`, `note`, `createdate`, `updatedate`) VALUES
(1, 143, 3, 'My Dinh 2, Từ Liêm, Hanoi, Vietnam', 0, 'cong ty', 'cam on', '2023-09-14 15:23:21', '2023-09-14 15:23:21'),
(2, 143, 4, '250 Hoàng Quốc Việt, Cổ Nhuế, Cầu Giấy, Hà Nội, Việt Nam', 0, 'truong hoc', 'cam on', '2023-09-14 15:23:21', '2023-09-14 15:23:21'),
(11, 145, 5, 'My Dinh 2, Từ Liêm, Hanoi, Vietnam', 0, 'ki tuc xa', '11h dong cua', '2023-09-28 22:07:03', '2023-09-28 22:07:03'),
(12, 145, 3, 'Mễ Trì, Hà Nội, Vietnam', 1, 'cong ty', 'cam on', '2023-09-28 22:12:43', '2023-09-28 22:12:43'),
(16, 145, 1, 'My Dinh 2, Từ Liêm, Hanoi, Vietnam', 0, 'nha rieng', 'cam on', '2023-10-03 17:08:53', '2023-10-03 17:08:53'),
(18, 143, 2, '2/54/86 P. Chùa Hà, Tổ dân phố số 25, Cầu Giấy, Hà Nội, Vietnam', 1, 'truong hoc', 'cam on', '2023-10-06 12:53:06', '2023-10-06 12:53:06');

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `fulladdress` varchar(500) DEFAULT NULL,
  `introduce` varchar(200) DEFAULT NULL,
  `createdate` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`id`, `name`, `fulladdress`, `introduce`, `createdate`, `updatedate`) VALUES
(1, 'KFC CẦU GIẤY', '374 Đ. Cầu Giấy, Dịch Vọng, Cầu Giấy, Hà Nội', 'ngon', '2023-07-31 08:18:36', '2023-07-31 08:18:36'),
(2, 'KFC HOÀNG QUỐC VIỆT', 'Tòa Nhà Hòa Bình, Hoàng Quốc Việt/106 P. Nghĩa Tân, Cổ Nhuế, Hà Nội', 'ngon', '2023-07-31 08:18:36', '2023-07-31 08:18:36'),
(3, 'KFC BIG C HÀ NỘI', '222 Đ. Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội', 'ngon', '2023-07-31 08:18:36', '2023-07-31 08:18:36'),
(4, 'KFC LẠC LONG QUÂN', '481 Đ. Lạc Long Quân, Xuân La, Tây Hồ, Hà Nội', 'ngon', '2023-07-31 08:18:36', '2023-07-31 08:18:36'),
(5, 'KFC LÁNG HẠ', '175 P. Láng Hạ, Trung Hoà, Cầu Giấy, Hà Nội', 'ngon', '2023-07-31 08:18:36', '2023-07-31 08:18:36'),
(6, 'KFC Trương Định Plaza', '461 Trương Định, Tân Mai, Hoàng Mai, Hà Nội', 'ngon', '2023-07-31 08:18:36', '2023-07-31 08:18:36'),
(7, 'KFC Lê Thanh Nghị', '170 P. Lê Thanh Nghị, Đồng Tâm, Hai Bà Trưng, Hà Nội', 'ngon', '2023-07-31 08:18:36', '2023-07-31 08:18:36'),
(8, 'KFC Bạch Mai', '373 P. Bạch Mai, Bạch Mai, Hai Bà Trưng, Hà Nội', 'ngon', '2023-07-31 08:18:36', '2023-07-31 08:18:36'),
(9, 'KFC Vincom Mega Mall', '458 P. Minh Khai, Vĩnh Phú, Hai Bà Trưng, Hà Nội', 'ngon', '2023-07-31 08:18:36', '2023-07-31 08:18:36'),
(10, 'KFC Tam Trinh', '15T2 Đ. Tam Trinh, Mai Động, Hai Bà Trưng, Hà Nội', 'ngon', '2023-07-31 08:18:36', '2023-07-31 08:18:36'),
(11, 'KFC Trần Phú', 'Ng. 102 Đ. Trần Phú, Hà Đông, Hà Nội', 'ngon', '2023-07-31 08:18:36', '2023-07-31 08:18:36'),
(12, 'KFC NGUYỄN TRƯỜNG TỘ', '34 P. Hàng Bún, Nguyễn Trung Trực, Ba Đình, Hà Nội', 'ngon', '2023-07-31 08:18:36', '2023-07-31 08:18:36');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(4) DEFAULT 1,
  `createdate` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedate` timestamp NOT NULL DEFAULT current_timestamp(),
  `phone` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `status`, `createdate`, `updatedate`, `phone`) VALUES
(143, 'Thien Do', 'thien123@gmail.com', '123456', 1, '2023-09-14 15:19:04', '2023-09-14 15:19:04', '0868452821'),
(145, 'Cao Thien', 'caothien@gmail.com', '123456', 1, '2023-09-19 08:36:37', '2023-09-19 08:36:37', '0390002930');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `favourites`
--
ALTER TABLE `favourites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `store_id` (`store_id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `savedaddress`
--
ALTER TABLE `savedaddress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `store_id` (`store_id`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `favourites`
--
ALTER TABLE `favourites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `savedaddress`
--
ALTER TABLE `savedaddress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favourites`
--
ALTER TABLE `favourites`
  ADD CONSTRAINT `favourites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `favourites_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`);

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `savedaddress`
--
ALTER TABLE `savedaddress`
  ADD CONSTRAINT `savedaddress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `savedaddress_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

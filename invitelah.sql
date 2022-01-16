-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 16 Jan 2022 pada 13.28
-- Versi server: 10.4.20-MariaDB
-- Versi PHP: 7.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `invitelah`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `backgrounds`
--

CREATE TABLE `backgrounds` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `invitationId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `digitalenvelopes`
--

CREATE TABLE `digitalenvelopes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `invitationId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `faqlists`
--

CREATE TABLE `faqlists` (
  `id` int(11) NOT NULL,
  `question` varchar(255) DEFAULT NULL,
  `answer` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `faqId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `fiturlists`
--

CREATE TABLE `fiturlists` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `url` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `themeId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `fiturs`
--

CREATE TABLE `fiturs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `invitations`
--

CREATE TABLE `invitations` (
  `id` int(11) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `namaPria` varchar(255) DEFAULT NULL,
  `namaPendekPria` varchar(255) DEFAULT NULL,
  `namaOrangTuaPria` varchar(255) DEFAULT NULL,
  `namaWanita` varchar(255) DEFAULT NULL,
  `namaPendekWanita` varchar(255) DEFAULT NULL,
  `namaOrangTuaWanita` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `alamatKado` text DEFAULT NULL,
  `tanggalNikah` varchar(255) DEFAULT NULL,
  `jamNikah` varchar(255) DEFAULT NULL,
  `alamatNikah` text DEFAULT NULL,
  `mapsNikah` text DEFAULT NULL,
  `tanggalResepsi` varchar(255) DEFAULT NULL,
  `jamResepsi` varchar(255) DEFAULT NULL,
  `alamatResepsi` text DEFAULT NULL,
  `mapsResepsi` text DEFAULT NULL,
  `namaTema` varchar(255) DEFAULT NULL,
  `bissmillah` tinyint(1) DEFAULT NULL,
  `salamPembuka` varchar(255) DEFAULT NULL,
  `salamPembukaDeskripsi` text DEFAULT NULL,
  `salamPenutup` varchar(255) DEFAULT NULL,
  `salamPenutupDeskripsi` text DEFAULT NULL,
  `doa` text DEFAULT NULL,
  `tipeGaleri` text DEFAULT NULL,
  `backgroundModal` varchar(255) DEFAULT NULL,
  `turutMengundang` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `invitationtypes`
--

CREATE TABLE `invitationtypes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `invitationId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `keunggulanlists`
--

CREATE TABLE `keunggulanlists` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `keunggulanId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `keunggulans`
--

CREATE TABLE `keunggulans` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `lovestories`
--

CREATE TABLE `lovestories` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `invitationId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `mainlandinglists`
--

CREATE TABLE `mainlandinglists` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `mainLandingId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `mainlandings`
--

CREATE TABLE `mainlandings` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `mysocialmedia`
--

CREATE TABLE `mysocialmedia` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `odersteps`
--

CREATE TABLE `odersteps` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `ordersteplists`
--

CREATE TABLE `ordersteplists` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `orderStepId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `photogalleries`
--

CREATE TABLE `photogalleries` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `invitationId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pricelists`
--

CREATE TABLE `pricelists` (
  `id` int(11) NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `harga` varchar(255) DEFAULT NULL,
  `discountPrice` varchar(255) DEFAULT NULL,
  `discountAmount` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `list` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `priceId` int(11) DEFAULT NULL,
  `priceListId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pricelisturls`
--

CREATE TABLE `pricelisturls` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `priceListId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `prices`
--

CREATE TABLE `prices` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `discount` varchar(255) DEFAULT NULL,
  `discountTitle` varchar(255) DEFAULT NULL,
  `discountDescription` text DEFAULT NULL,
  `discountExpired` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `prokes`
--

CREATE TABLE `prokes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `prokeslists`
--

CREATE TABLE `prokeslists` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `prokesId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `refreshtokens`
--

CREATE TABLE `refreshtokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expiryDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `refreshtokens`
--

INSERT INTO `refreshtokens` (`id`, `token`, `expiryDate`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, '11dd0250-cc82-4ffd-afb6-a378971a7abb', '2022-01-16 05:38:49', '2022-01-16 05:36:49', '2022-01-16 05:36:49', 1),
(2, '37ffb9ee-f63c-495a-a63d-60b19dbc1a79', '2022-01-16 05:39:24', '2022-01-16 05:37:24', '2022-01-16 05:37:24', 1),
(3, '9c62855f-ddf1-425d-9d54-a86037c320c9', '2022-01-16 05:39:29', '2022-01-16 05:37:29', '2022-01-16 05:37:29', 1),
(4, '99587285-d057-4c29-9001-4df51d7f19ff', '2022-01-16 05:49:45', '2022-01-16 05:47:45', '2022-01-16 05:47:45', 1),
(5, '24058513-8043-41aa-87ca-23ebc288322f', '2022-01-16 05:52:28', '2022-01-16 05:50:28', '2022-01-16 05:50:28', 1),
(6, '4d7a257a-6dde-4407-bcf3-387fe2659516', '2022-01-16 06:10:48', '2022-01-16 06:08:48', '2022-01-16 06:08:48', 1),
(7, 'c0b7af8a-3036-4a7a-abd5-5daa774eb6db', '2022-01-16 06:12:07', '2022-01-16 06:10:07', '2022-01-16 06:10:07', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `reservasikehadirans`
--

CREATE TABLE `reservasikehadirans` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `confirmation` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `invitationId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'user', '2022-01-16 04:56:38', '2022-01-16 04:56:38'),
(2, 'moderator', '2022-01-16 04:56:38', '2022-01-16 04:56:38'),
(3, 'admin', '2022-01-16 04:56:38', '2022-01-16 04:56:38');

-- --------------------------------------------------------

--
-- Struktur dari tabel `socialmedia`
--

CREATE TABLE `socialmedia` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `invitationId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `themes`
--

CREATE TABLE `themes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `phoneNumberVerifiedAt` datetime DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `emailVerifiedAt` datetime DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `passwordChangeAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `fullName`, `username`, `phoneNumber`, `phoneNumberVerifiedAt`, `email`, `emailVerifiedAt`, `password`, `passwordChangeAt`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin', '0987654321', NULL, 'admin@invitlah.com', NULL, '$2a$08$IMx4EPLvCZu0IiY8GCZ0eu98i1AsnJTnKMNT7ZpRAYtBCUhYeSUKy', NULL, NULL, '2022-01-16 05:35:13', '2022-01-16 05:35:13'),
(2, 'moderator', 'moderator', '0123456789', NULL, 'moderator@invitlah.com', NULL, '$2a$08$U04rFaRtgLGZfj/hTza1Iu.TqlXQG8qqFxm0XGJVFcR4Nn/mAfV5e', NULL, NULL, '2022-01-16 06:05:50', '2022-01-16 06:05:50'),
(3, 'user', 'user', '01234567890', NULL, 'user@invitlah.com', NULL, '$2a$08$bgsswNcvPeSwmsZo1.N10uujjov8EZK0cglgL3Yf3RSx8I.2MoUSq', NULL, NULL, '2022-01-16 06:06:09', '2022-01-16 06:06:09');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_roles`
--

CREATE TABLE `user_roles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_roles`
--

INSERT INTO `user_roles` (`createdAt`, `updatedAt`, `roleId`, `userId`) VALUES
('2022-01-16 06:06:09', '2022-01-16 06:06:09', 1, 3),
('2022-01-16 06:05:50', '2022-01-16 06:05:50', 2, 2),
('2022-01-16 05:35:13', '2022-01-16 05:35:13', 3, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `youtubes`
--

CREATE TABLE `youtubes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `invitationId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `backgrounds`
--
ALTER TABLE `backgrounds`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `digitalenvelopes`
--
ALTER TABLE `digitalenvelopes`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `faqlists`
--
ALTER TABLE `faqlists`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `fiturlists`
--
ALTER TABLE `fiturlists`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `fiturs`
--
ALTER TABLE `fiturs`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `invitations`
--
ALTER TABLE `invitations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indeks untuk tabel `invitationtypes`
--
ALTER TABLE `invitationtypes`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `keunggulanlists`
--
ALTER TABLE `keunggulanlists`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `keunggulans`
--
ALTER TABLE `keunggulans`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `lovestories`
--
ALTER TABLE `lovestories`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `mainlandinglists`
--
ALTER TABLE `mainlandinglists`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `mainlandings`
--
ALTER TABLE `mainlandings`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `mysocialmedia`
--
ALTER TABLE `mysocialmedia`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `odersteps`
--
ALTER TABLE `odersteps`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `ordersteplists`
--
ALTER TABLE `ordersteplists`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `photogalleries`
--
ALTER TABLE `photogalleries`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pricelists`
--
ALTER TABLE `pricelists`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pricelisturls`
--
ALTER TABLE `pricelisturls`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `prices`
--
ALTER TABLE `prices`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `prokes`
--
ALTER TABLE `prokes`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `prokeslists`
--
ALTER TABLE `prokeslists`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `refreshtokens`
--
ALTER TABLE `refreshtokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indeks untuk tabel `reservasikehadirans`
--
ALTER TABLE `reservasikehadirans`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `socialmedia`
--
ALTER TABLE `socialmedia`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `themes`
--
ALTER TABLE `themes`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `phoneNumber` (`phoneNumber`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`roleId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indeks untuk tabel `youtubes`
--
ALTER TABLE `youtubes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `backgrounds`
--
ALTER TABLE `backgrounds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `digitalenvelopes`
--
ALTER TABLE `digitalenvelopes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `faqlists`
--
ALTER TABLE `faqlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `fiturlists`
--
ALTER TABLE `fiturlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `fiturs`
--
ALTER TABLE `fiturs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `invitations`
--
ALTER TABLE `invitations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `invitationtypes`
--
ALTER TABLE `invitationtypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `keunggulanlists`
--
ALTER TABLE `keunggulanlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `keunggulans`
--
ALTER TABLE `keunggulans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `lovestories`
--
ALTER TABLE `lovestories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `mainlandinglists`
--
ALTER TABLE `mainlandinglists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `mainlandings`
--
ALTER TABLE `mainlandings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `mysocialmedia`
--
ALTER TABLE `mysocialmedia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `odersteps`
--
ALTER TABLE `odersteps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `ordersteplists`
--
ALTER TABLE `ordersteplists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `photogalleries`
--
ALTER TABLE `photogalleries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pricelists`
--
ALTER TABLE `pricelists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pricelisturls`
--
ALTER TABLE `pricelisturls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `prices`
--
ALTER TABLE `prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `prokes`
--
ALTER TABLE `prokes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `prokeslists`
--
ALTER TABLE `prokeslists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `refreshtokens`
--
ALTER TABLE `refreshtokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `reservasikehadirans`
--
ALTER TABLE `reservasikehadirans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `socialmedia`
--
ALTER TABLE `socialmedia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `themes`
--
ALTER TABLE `themes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `youtubes`
--
ALTER TABLE `youtubes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `invitations`
--
ALTER TABLE `invitations`
  ADD CONSTRAINT `invitations_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `refreshtokens`
--
ALTER TABLE `refreshtokens`
  ADD CONSTRAINT `refreshtokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

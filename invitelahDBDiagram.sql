CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `full_name` varchar(255),
  `username` varchar(255),
  `phone_number` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `invitation_type` (
  `id` int,
  `name` varchar(255)
);

CREATE TABLE `invitation` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `photo_gallery_id` int,
  `digital_envelope_id` varchar(255),
  `social_media_id` int,
  `youtube_id` int,
  `background_id` int,
  `reservasi_kehadiran_id` int,
  `love_story_id` int,
  `messages_id` int,
  `invitation_type` int,
  `slug` varchar(255),
  `nama_pria` varchar(255),
  `nama_pendek_pria` varchar(255),
  `nama_orang_tua_pria` varchar(255),
  `nama_orang_tua_wanita` varchar(255),
  `nama_wanita` varchar(255),
  `nama_pendek_wanita` varchar(255),
  `alamat_rumah` text,
  `avatar` varchar(255),
  `tanggal_nikah` datetime,
  `jam_nikah` varchar(255),
  `alamat_nikah` text,
  `maps_nikah` text,
  `tanggal_resepsi` datetime,
  `jam_resepsi` varchar(255),
  `alamat_resepsi` text,
  `maps_resepsi` text,
  `theme` varchar(255),
  `tipe_galeri` varchar(255),
  `bismillah` varchar(255),
  `doa` text,
  `turut_mengundang` text,
  `background_modal` varchar(255)
);

CREATE TABLE `photo_gallery` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `image` text,
  `description` text
);

CREATE TABLE `background` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `image` text
);

CREATE TABLE `digital_envelope` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `number` varchar(255)
);

CREATE TABLE `social_media` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `url` text
);

CREATE TABLE `youtube` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `url` text
);

CREATE TABLE `messages` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `message` text
);

CREATE TABLE `love_story` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `description` text,
  `date` datetime
);

CREATE TABLE `reservasi_kehadiran` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `message` text,
  `confirmation` varchar(255)
);

CREATE TABLE `keunggulan` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `description` text,
  `keunggulan_list_id` int
);

CREATE TABLE `keunggulan_list` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `description` varchar(255),
  `image` varchar(255)
);

CREATE TABLE `fitur` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `description` text,
  `fitur_list_id` int
);

CREATE TABLE `fitur_list` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `description` varchar(255),
  `image` varchar(255)
);

CREATE TABLE `themes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `description` text,
  `theme_list_id` int
);

CREATE TABLE `theme_list` (
  `id` int,
  `name` varchar(255),
  `image` varchar(255),
  `url` varchar(255)
);

CREATE TABLE `main_landing` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `description` text,
  `main_landing_list` int
);

CREATE TABLE `main_landing_list` (
  `id` int,
  `name` varchar(255),
  `image` varchar(255),
  `description` text
);

CREATE TABLE `testimonial` (
  `id` int,
  `name` varchar(255),
  `description` text,
  `rating` int,
  `image` varchar(255)
);

CREATE TABLE `price` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `description` text,
  `discount` varchar(255),
  `discount_title` varchar(255),
  `discount_description` varchar(255),
  `discount_expired` varchar(255),
  `price_list_id` int
);

CREATE TABLE `price_list` (
  `id` int,
  `price` varchar(255),
  `discount_price` varchar(255),
  `discount_amount` varchar(255),
  `url_price_list_id` int,
  `type` varchar(255),
  `list` text,
  `label` varchar(255)
);

CREATE TABLE `url_price_list` (
  `id` int,
  `name` varchar(255),
  `url` text
);

CREATE TABLE `faq` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `description` text,
  `faq_list_id` int
);

CREATE TABLE `faq_list` (
  `id` int,
  `question` varchar(255),
  `answer` varchar(255)
);

CREATE TABLE `order_step` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `description` text,
  `order_step_list_id` int
);

CREATE TABLE `order_step_list` (
  `id` int,
  `title` varchar(255),
  `image` varchar(255)
);

CREATE TABLE `my_social_media` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `url` text
);

CREATE TABLE `prokes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `description` text,
  `prokes_list_id` int
);

CREATE TABLE `prokes_list` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `image` varchar(255)
);

CREATE TABLE `footer` (
  `id` int,
  `description` text,
  `copyright` text
);

ALTER TABLE `invitation` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `invitation` ADD FOREIGN KEY (`photo_gallery_id`) REFERENCES `photo_gallery` (`id`);

ALTER TABLE `invitation` ADD FOREIGN KEY (`digital_envelope_id`) REFERENCES `digital_envelope` (`id`);

ALTER TABLE `invitation` ADD FOREIGN KEY (`social_media_id`) REFERENCES `social_media` (`id`);

ALTER TABLE `invitation` ADD FOREIGN KEY (`youtube_id`) REFERENCES `youtube` (`id`);

ALTER TABLE `invitation` ADD FOREIGN KEY (`background_id`) REFERENCES `background` (`id`);

ALTER TABLE `invitation` ADD FOREIGN KEY (`reservasi_kehadiran_id`) REFERENCES `reservasi_kehadiran` (`id`);

ALTER TABLE `invitation` ADD FOREIGN KEY (`love_story_id`) REFERENCES `love_story` (`id`);

ALTER TABLE `invitation` ADD FOREIGN KEY (`messages_id`) REFERENCES `messages` (`id`);

ALTER TABLE `invitation` ADD FOREIGN KEY (`invitation_type`) REFERENCES `invitation_type` (`id`);

ALTER TABLE `keunggulan` ADD FOREIGN KEY (`keunggulan_list_id`) REFERENCES `keunggulan_list` (`id`);

ALTER TABLE `fitur` ADD FOREIGN KEY (`fitur_list_id`) REFERENCES `fitur_list` (`id`);

ALTER TABLE `themes` ADD FOREIGN KEY (`theme_list_id`) REFERENCES `theme_list` (`id`);

ALTER TABLE `main_landing` ADD FOREIGN KEY (`main_landing_list`) REFERENCES `main_landing_list` (`id`);

ALTER TABLE `price` ADD FOREIGN KEY (`price_list_id`) REFERENCES `price_list` (`id`);

ALTER TABLE `price_list` ADD FOREIGN KEY (`url_price_list_id`) REFERENCES `url_price_list` (`id`);

ALTER TABLE `faq` ADD FOREIGN KEY (`faq_list_id`) REFERENCES `faq_list` (`id`);

ALTER TABLE `order_step` ADD FOREIGN KEY (`order_step_list_id`) REFERENCES `order_step_list` (`id`);

ALTER TABLE `prokes` ADD FOREIGN KEY (`prokes_list_id`) REFERENCES `prokes_list` (`id`);

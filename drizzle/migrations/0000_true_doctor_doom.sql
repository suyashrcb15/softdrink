CREATE TABLE `drinks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`flavor` text NOT NULL,
	`price` integer NOT NULL,
	`ingredients` text NOT NULL,
	`image` text NOT NULL
);

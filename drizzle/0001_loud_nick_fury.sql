CREATE TABLE `users` (
	`UserId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Username` numeric NOT NULL,
	`Password` numeric NOT NULL,
	`UserType` numeric NOT NULL,
	`AlbumId` integer,
	FOREIGN KEY (`AlbumId`) REFERENCES `customers`(`CustomerId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `IFK_UserCustomerId` ON `users` (`AlbumId`);
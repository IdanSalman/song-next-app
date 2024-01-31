-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `albums` (
	`AlbumId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Title` numeric NOT NULL,
	`ArtistId` integer NOT NULL,
	FOREIGN KEY (`ArtistId`) REFERENCES `artists`(`ArtistId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `artists` (
	`ArtistId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Name` numeric
);
--> statement-breakpoint
CREATE TABLE `customers` (
	`CustomerId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`FirstName` numeric NOT NULL,
	`LastName` numeric NOT NULL,
	`Company` numeric,
	`Address` numeric,
	`City` numeric,
	`State` numeric,
	`Country` numeric,
	`PostalCode` numeric,
	`Phone` numeric,
	`Fax` numeric,
	`Email` numeric NOT NULL,
	`SupportRepId` integer,
	FOREIGN KEY (`SupportRepId`) REFERENCES `employees`(`EmployeeId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`EmployeeId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`LastName` numeric NOT NULL,
	`FirstName` numeric NOT NULL,
	`Title` numeric,
	`ReportsTo` integer,
	`BirthDate` numeric,
	`HireDate` numeric,
	`Address` numeric,
	`City` numeric,
	`State` numeric,
	`Country` numeric,
	`PostalCode` numeric,
	`Phone` numeric,
	`Fax` numeric,
	`Email` numeric,
	FOREIGN KEY (`ReportsTo`) REFERENCES `employees`(`EmployeeId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `genres` (
	`GenreId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Name` numeric
);
--> statement-breakpoint
CREATE TABLE `invoices` (
	`InvoiceId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`CustomerId` integer NOT NULL,
	`InvoiceDate` numeric NOT NULL,
	`BillingAddress` numeric,
	`BillingCity` numeric,
	`BillingState` numeric,
	`BillingCountry` numeric,
	`BillingPostalCode` numeric,
	`Total` numeric NOT NULL,
	FOREIGN KEY (`CustomerId`) REFERENCES `customers`(`CustomerId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `invoice_items` (
	`InvoiceLineId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`InvoiceId` integer NOT NULL,
	`TrackId` integer NOT NULL,
	`UnitPrice` numeric NOT NULL,
	`Quantity` integer NOT NULL,
	FOREIGN KEY (`TrackId`) REFERENCES `tracks`(`TrackId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`InvoiceId`) REFERENCES `invoices`(`InvoiceId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `media_types` (
	`MediaTypeId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Name` numeric
);
--> statement-breakpoint
CREATE TABLE `playlists` (
	`PlaylistId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Name` numeric
);
--> statement-breakpoint
CREATE TABLE `playlist_track` (
	`PlaylistId` integer NOT NULL,
	`TrackId` integer NOT NULL,
	PRIMARY KEY(`PlaylistId`, `TrackId`),
	FOREIGN KEY (`TrackId`) REFERENCES `tracks`(`TrackId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`PlaylistId`) REFERENCES `playlists`(`PlaylistId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tracks` (
	`TrackId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Name` numeric NOT NULL,
	`AlbumId` integer,
	`MediaTypeId` integer NOT NULL,
	`GenreId` integer,
	`Composer` numeric,
	`Milliseconds` integer NOT NULL,
	`Bytes` integer,
	`UnitPrice` numeric NOT NULL,
	FOREIGN KEY (`MediaTypeId`) REFERENCES `media_types`(`MediaTypeId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`GenreId`) REFERENCES `genres`(`GenreId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`AlbumId`) REFERENCES `albums`(`AlbumId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `IFK_AlbumArtistId` ON `albums` (`ArtistId`);--> statement-breakpoint
CREATE INDEX `IFK_CustomerSupportRepId` ON `customers` (`SupportRepId`);--> statement-breakpoint
CREATE INDEX `IFK_EmployeeReportsTo` ON `employees` (`ReportsTo`);--> statement-breakpoint
CREATE INDEX `IFK_InvoiceCustomerId` ON `invoices` (`CustomerId`);--> statement-breakpoint
CREATE INDEX `IFK_InvoiceLineTrackId` ON `invoice_items` (`TrackId`);--> statement-breakpoint
CREATE INDEX `IFK_InvoiceLineInvoiceId` ON `invoice_items` (`InvoiceId`);--> statement-breakpoint
CREATE INDEX `IFK_PlaylistTrackTrackId` ON `playlist_track` (`TrackId`);--> statement-breakpoint
CREATE INDEX `IFK_TrackMediaTypeId` ON `tracks` (`MediaTypeId`);--> statement-breakpoint
CREATE INDEX `IFK_TrackGenreId` ON `tracks` (`GenreId`);--> statement-breakpoint
CREATE INDEX `IFK_TrackAlbumId` ON `tracks` (`AlbumId`);
*/
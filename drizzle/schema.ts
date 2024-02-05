import { sqliteTable, AnySQLiteColumn, index, foreignKey, integer, numeric, primaryKey } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export var albums = sqliteTable("albums", {
	albumId: integer("AlbumId").primaryKey({ autoIncrement: true }).notNull(),
	title: numeric("Title").notNull(),
	artistId: integer("ArtistId").notNull().references(() => artists.artistId),
},
	(table) => {
		return {
			ifkAlbumArtistId: index("IFK_AlbumArtistId").on(table.artistId),
		}
	});

export var artists = sqliteTable("artists", {
	artistId: integer("ArtistId").primaryKey({ autoIncrement: true }).notNull(),
	name: numeric("Name"),
});

export var customers = sqliteTable("customers", {
	customerId: integer("CustomerId").primaryKey({ autoIncrement: true }).notNull(),
	firstName: numeric("FirstName").notNull(),
	lastName: numeric("LastName").notNull(),
	company: numeric("Company"),
	address: numeric("Address"),
	city: numeric("City"),
	state: numeric("State"),
	country: numeric("Country"),
	postalCode: numeric("PostalCode"),
	phone: numeric("Phone"),
	fax: numeric("Fax"),
	email: numeric("Email").notNull(),
	supportRepId: integer("SupportRepId").references(() => employees.employeeId),
},
	(table) => {
		return {
			ifkCustomerSupportRepId: index("IFK_CustomerSupportRepId").on(table.supportRepId),
		}
	});

export var employees = sqliteTable("employees", {
	employeeId: integer("EmployeeId").primaryKey({ autoIncrement: true }).notNull(),
	lastName: numeric("LastName").notNull(),
	firstName: numeric("FirstName").notNull(),
	title: numeric("Title"),
	reportsTo: integer("ReportsTo"),
	birthDate: numeric("BirthDate"),
	hireDate: numeric("HireDate"),
	address: numeric("Address"),
	city: numeric("City"),
	state: numeric("State"),
	country: numeric("Country"),
	postalCode: numeric("PostalCode"),
	phone: numeric("Phone"),
	fax: numeric("Fax"),
	email: numeric("Email"),
},
	(table) => {
		return {
			ifkEmployeeReportsTo: index("IFK_EmployeeReportsTo").on(table.reportsTo),
			employeesReportsToEmployeesEmployeeIdFk: foreignKey(() => ({
				columns: [table.reportsTo],
				foreignColumns: [table.employeeId],
				name: "employees_ReportsTo_employees_EmployeeId_fk"
			})),
		}
	});

export var genres = sqliteTable("genres", {
	genreId: integer("GenreId").primaryKey({ autoIncrement: true }).notNull(),
	name: numeric("Name"),
});

export var invoices = sqliteTable("invoices", {
	invoiceId: integer("InvoiceId").primaryKey({ autoIncrement: true }).notNull(),
	customerId: integer("CustomerId").notNull().references(() => customers.customerId),
	invoiceDate: numeric("InvoiceDate").notNull(),
	billingAddress: numeric("BillingAddress"),
	billingCity: numeric("BillingCity"),
	billingState: numeric("BillingState"),
	billingCountry: numeric("BillingCountry"),
	billingPostalCode: numeric("BillingPostalCode"),
	total: numeric("Total").notNull(),
},
	(table) => {
		return {
			ifkInvoiceCustomerId: index("IFK_InvoiceCustomerId").on(table.customerId),
		}
	});

export var invoiceItems = sqliteTable("invoice_items", {
	invoiceLineId: integer("InvoiceLineId").primaryKey({ autoIncrement: true }).notNull(),
	invoiceId: integer("InvoiceId").notNull().references(() => invoices.invoiceId),
	trackId: integer("TrackId").notNull().references(() => tracks.trackId),
	unitPrice: numeric("UnitPrice").notNull(),
	quantity: integer("Quantity").notNull(),
},
	(table) => {
		return {
			ifkInvoiceLineTrackId: index("IFK_InvoiceLineTrackId").on(table.trackId),
			ifkInvoiceLineInvoiceId: index("IFK_InvoiceLineInvoiceId").on(table.invoiceId),
		}
	});

export var mediaTypes = sqliteTable("media_types", {
	mediaTypeId: integer("MediaTypeId").primaryKey({ autoIncrement: true }).notNull(),
	name: numeric("Name"),
});

export var playlists = sqliteTable("playlists", {
	playlistId: integer("PlaylistId").primaryKey({ autoIncrement: true }).notNull(),
	name: numeric("Name"),
});

export var playlistTrack = sqliteTable("playlist_track", {
	playlistId: integer("PlaylistId").notNull().references(() => playlists.playlistId),
	trackId: integer("TrackId").notNull().references(() => tracks.trackId),
},
	(table) => {
		return {
			ifkPlaylistTrackTrackId: index("IFK_PlaylistTrackTrackId").on(table.trackId),
			pk0: primaryKey({ columns: [table.playlistId, table.trackId], name: "playlist_track_PlaylistId_TrackId_pk" })
		}
	});

export var tracks = sqliteTable("tracks", {
	trackId: integer("TrackId").primaryKey({ autoIncrement: true }).notNull(),
	name: numeric("Name").notNull(),
	albumId: integer("AlbumId").references(() => albums.albumId),
	mediaTypeId: integer("MediaTypeId").notNull().references(() => mediaTypes.mediaTypeId),
	genreId: integer("GenreId").references(() => genres.genreId),
	composer: numeric("Composer"),
	milliseconds: integer("Milliseconds").notNull(),
	bytes: integer("Bytes"),
	unitPrice: numeric("UnitPrice").notNull(),
},
	(table) => {
		return {
			ifkTrackMediaTypeId: index("IFK_TrackMediaTypeId").on(table.mediaTypeId),
			ifkTrackGenreId: index("IFK_TrackGenreId").on(table.genreId),
			ifkTrackAlbumId: index("IFK_TrackAlbumId").on(table.albumId),
		}
	});

export var users = sqliteTable("users", {
	userId: integer("UserId").primaryKey({ autoIncrement: true }).notNull(),
	username: numeric("Username").notNull(),
	password: numeric("Password").notNull(),
	userType: numeric("UserType").notNull(),
	matchedId: integer("MatchedId").references(() => customers.customerId || employees.employeeId),
},
	(table) => {
		return {
			ifkUserCustomerId: index("IFK_UserMatchedId").on(table.matchedId),
		}
	});

/**
 * TODO Correct the table data
export var carts = sqliteTable("carts", {
	userId: integer("UserId").primaryKey({ autoIncrement: true }).notNull(),
	username: numeric("Username").notNull(),
	password: numeric("Password").notNull(),
	userType: numeric("UserType").notNull(),
	matchedId: integer("MatchedId").references(() => customers.customerId || employees.employeeId),
},
	(table) => {
		return {
			ifkUserCustomerId: index("IFK_UserMatchedId").on(table.matchedId),
		}
	});
 */
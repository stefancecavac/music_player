CREATE TABLE "playlists" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "playlistSongsTable" (
	"playlist_id" uuid NOT NULL,
	"song_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "playlistSongsTable" ADD CONSTRAINT "playlistSongsTable_playlist_id_playlists_id_fk" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlists"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "playlistSongsTable" ADD CONSTRAINT "playlistSongsTable_song_id_songs_id_fk" FOREIGN KEY ("song_id") REFERENCES "public"."songs"("id") ON DELETE cascade ON UPDATE no action;
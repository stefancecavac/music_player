ALTER TABLE "playlistSongsTable" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "playlistSongsTable" CASCADE;--> statement-breakpoint
ALTER TABLE "songs" ADD COLUMN "playlistId" uuid;--> statement-breakpoint
ALTER TABLE "songs" ADD CONSTRAINT "songs_playlistId_playlists_id_fk" FOREIGN KEY ("playlistId") REFERENCES "public"."playlists"("id") ON DELETE cascade ON UPDATE no action;
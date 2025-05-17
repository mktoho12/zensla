CREATE TABLE "channel_histories" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"channel_id" integer,
	"target_date" date NOT NULL,
	"message_count" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "channels" ALTER COLUMN "purpose" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "channels" ADD COLUMN "birthday" date;--> statement-breakpoint
ALTER TABLE "channel_histories" ADD CONSTRAINT "channel_histories_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "channels" DROP COLUMN "message_count";--> statement-breakpoint
ALTER TABLE "channels" ADD CONSTRAINT "channels_slack_id_unique" UNIQUE("slack_id");
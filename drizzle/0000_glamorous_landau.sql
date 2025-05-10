CREATE TABLE "channels" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"member_count" numeric(10, 0) NOT NULL,
	"purpose" text NOT NULL
);

CREATE TABLE "public"."plan" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL PRIMARY KEY,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "name" "text" NOT NULL,
    "ordered_item_ids" "uuid"[] NOT NULL,
    "user_id" "uuid" NOT NULL,

    CONSTRAINT "plan_user_id_fkey" 
      FOREIGN KEY ("user_id") 
      REFERENCES "auth"."users"("id") 
      ON DELETE CASCADE 
      ON UPDATE CASCADE
);


CREATE FUNCTION update_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = "timezone"('utc'::"text", "now"());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_plan_updated_at_trigger
BEFORE UPDATE ON "public"."plan"
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at();

ALTER TABLE "public"."plan" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."plan" OWNER TO "postgres";
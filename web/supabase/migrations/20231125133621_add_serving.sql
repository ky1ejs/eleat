CREATE TABLE "public"."serving" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL PRIMARY KEY,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "name" "text" NOT NULL,
    "plural" "text" NOT NULL,
    "protein_grams" numeric NOT NULL,
    "fat_grams" numeric NOT NULL,
    "carb_grams" numeric NOT NULL,
    "item_id" "uuid" NOT NULL,
    "created_by_user_id" "uuid" NOT NULL,

    CONSTRAINT "serving_item_id_fkey" 
      FOREIGN KEY ("item_id") 
      REFERENCES "public"."item"("id") 
      ON DELETE CASCADE 
      ON UPDATE CASCADE,

    CONSTRAINT serving_user_id_fkey
      FOREIGN KEY ("item_id") 
      REFERENCES "public"."item"("id")
);


CREATE TRIGGER update_serving_updated_at_trigger
BEFORE UPDATE ON "public"."serving"
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at();

ALTER TABLE "public"."serving" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."serving" OWNER TO "postgres";
CREATE POLICY "Enable insert for authenticated users only" ON "public"."serving" FOR INSERT TO "authenticated" WITH CHECK (true);
CREATE POLICY "Enable select for authenticated users only" ON "public"."serving" FOR SELECT TO "authenticated" USING (true);

